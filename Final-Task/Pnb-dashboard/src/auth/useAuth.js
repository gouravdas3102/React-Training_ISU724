import { useState, useCallback } from "react";
import { AUTH_CONFIG } from "./authConfig";

//helpers
const generateRandom = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await globalThis.crypto.subtle.digest("SHA-256", data);
};

const base64urlencode = (buffer) => {
  return btoa(String.fromCodePoint(...new Uint8Array(buffer)))
    .replaceAll(/\+/g, "-")
    .replaceAll(/\//g, "_")
    .replaceAll(/=/g, "");
};

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!user;

  //LOGIN
  const login = useCallback(async () => {
    const state = generateRandom(32);
    const codeVerifier = generateRandom(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64urlencode(hashed);

    sessionStorage.setItem("oauth_state", state);
    sessionStorage.setItem("code_verifier", codeVerifier);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: AUTH_CONFIG.client_id,
      redirect_uri: AUTH_CONFIG.redirect_uri,
      scope: AUTH_CONFIG.scope,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    globalThis.location.href = `${AUTH_CONFIG.authorization_endpoint}?${params.toString()}`;
  }, []);

  //CALLBACK HANDLER
  const handleCallback = useCallback(async () => {
    const params = new URLSearchParams(globalThis.location.search);
    const code = params.get("code");
    const state = params.get("state");

    const savedState = sessionStorage.getItem("oauth_state");
    const codeVerifier = sessionStorage.getItem("code_verifier");

    if (!code) throw new Error("No code found");
    if (state !== savedState) throw new Error("Invalid state");

    const response = await fetch(AUTH_CONFIG.token_endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: AUTH_CONFIG.client_id,
        redirect_uri: AUTH_CONFIG.redirect_uri,
        code,
        code_verifier: codeVerifier,
      }),
    });

    const tokens = await response.json();

    if (tokens.error) {
      throw new Error(tokens.error_description || tokens.error);
    }

    sessionStorage.setItem("access_token", tokens.access_token);
    sessionStorage.setItem("id_token", tokens.id_token);

    // 1. Extract mobile number from access_token
    const accessPayload = JSON.parse(atob(tokens.access_token.split(".")[1]));
    const mobileNumber = accessPayload.preferred_username;

    let vpaData = [];
    try {
      // 2. Encrypt Mobile Number
      const encryptRes = await fetch("/api/iserveu/encr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU="
        },
        body: JSON.stringify({ mobile_number: mobileNumber })
      });
      const encryptData = await encryptRes.json();
      // 3. Fetch By ID
      const fetchRes = await fetch("/pnb/api/fetch/fetchById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokens.access_token}`,
          "pass_key": "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA"
        },
        body: JSON.stringify(encryptData)
      });
      let encryptedString = "";
      const contentType = fetchRes.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const fetchEncryptedData = await fetchRes.json();
        encryptedString = fetchEncryptedData.data || fetchEncryptedData.ResponseData || fetchEncryptedData.response || fetchEncryptedData;
      } else {
        encryptedString = await fetchRes.text();
      }
      console.log(encryptedString)
      // 4. Decrypt Response
      const decrRes = await fetch("/api/iserveu/decr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU="
        },
        body: JSON.stringify({ req: encryptedString })
      });
      const decryptedData = await decrRes.json();
      vpaData = decryptedData.data || [];
    } catch (apiError) {
      console.error("Failed to fetch extended profile data", apiError);
    }

    const payload = JSON.parse(atob(tokens.id_token.split(".")[1]));
    // Attach the fetched VPA Data
    payload.vpaData = vpaData;
    payload.extracted_username = accessPayload.name || accessPayload.username || vpaData[0]?.merchant_name || vpaData[0]?.user_name || mobileNumber;

    sessionStorage.setItem("user", JSON.stringify(payload));

    setUser(payload);

    return payload;
  }, []);

  //LOGOUT
  const logout = useCallback(() => {
    sessionStorage.clear();
    localStorage.clear();
    globalThis.location.href = "/";
  }, []);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    handleCallback,
  };


};