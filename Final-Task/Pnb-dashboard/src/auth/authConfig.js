export const AUTH_CONFIG = {
  authorization_endpoint: "https://pnb-auth-stage.isupay.in/application/o/authorize/",
  token_endpoint: "https://pnb-auth-stage.isupay.in/application/o/token/",
  userinfo_endpoint: "https://pnb-auth-stage.isupay.in/application/o/userinfo/",
  client_id: "SaDG8kozoNOUC07Uv46et8",
  redirect_uri: "http://localhost:3000/redirected",
  scope: 'path openid profile email offline_access authorities privileges user_name created adminName bankCode goauthentik.io/api',
  dangerouslyAllowInsecureHttpRequests: false,
};