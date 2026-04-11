import React, { useState, useEffect } from 'react';
import './ProfileModal.css';

const ProfileModal = ({ onClose }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const vpaId = sessionStorage.getItem('active_vpa');
        if (!vpaId) {
          setLoading(false);
          return;
        }
        
        // 1. Encrypt Payload
        const encryptRes = await fetch("/api/iserveu/encr", {
          method: "POST",
          headers: {
             "Content-Type": "application/json",
             "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU="
          },
          body: JSON.stringify({ vpa_id: vpaId })
        });
        const encryptData = await encryptRes.json();

        // 2. Fetch Profile Info
        const token = sessionStorage.getItem('access_token');
        const fetchRes = await fetch("/pnb/api/fetch/fetchById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "pass_key":"QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA"
          },
          body: JSON.stringify( encryptData )
        });
        
        let encryptedString = "";
        const contentType = fetchRes.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const fetchEncryptedData = await fetchRes.json();
            encryptedString = fetchEncryptedData.data || fetchEncryptedData.ResponseData || fetchEncryptedData.response || fetchEncryptedData;
        } else {
            encryptedString = await fetchRes.text();
        }

        // 3. Decrypt Profile Info
        const decrRes = await fetch("/api/iserveu/decr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU="
          },
          body: JSON.stringify({ req: encryptedString })
        });
        const decryptedData = await decrRes.json();
        const info = (decryptedData.data && decryptedData.data.length > 0) ? decryptedData.data[0] : null;

        setProfileData(info);
      } catch (err) {
        console.error("Failed fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const basicInfo = {
    "Name": profileData?.merchant_name || profileData?.user_name || "N/A",
    "Phone": profileData?.merchant_mobile ? `+91 ${profileData.merchant_mobile}` : "N/A",
  };

  const formatAccountNumber = (accNo) => {
    if (!accNo || accNo === "N/A" || accNo.length <= 4) return accNo || "N/A";
    return 'X'.repeat(accNo.length - 4) + accNo.slice(-4);
  };

  const deviceInfo = {
    "Device Serial Number": profileData?.serial_number || "N/A",
    "Linked Account Number": formatAccountNumber(profileData?.merchant_account_no),
    "UPI ID": profileData?.vpa_id || "N/A",
    "IFSC Code": profileData?.ifsc || "N/A",
    "Device Model Name": profileData?.device_model_name || "N/A",
    "Device Mobile Number": profileData?.merchant_mobile ? `+91 ${profileData.merchant_mobile}` : "N/A",
    "Network Type": profileData?.network_type || "N/A",
    "Device Status": profileData?.device_status || "N/A",
    "Battery Percentage": profileData?.battery_percentage || "N/A",
    "Network Strength": profileData?.network_strength || "N/A",
  };

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal-box">
        <div className="profile-modal-header">
          <h2>View Profile Details</h2>
        </div>
        
        {loading ? (
          <div className="profile-modal-loading">Loading...</div>
        ) : (
          <div className="profile-modal-content">
            <div className="profile-section">
              <h3 className="profile-section-title">Basic Information</h3>
              <div className="profile-section-grid">
                {Object.entries(basicInfo).map(([k, v]) => (
                  <div className="profile-row" key={k}>
                    <span className="profile-key">{k}</span>
                    <span className="profile-value">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h3 className="profile-section-title">Device Information</h3>
              <div className="profile-section-grid">
                {Object.entries(deviceInfo).map(([k, v]) => (
                  <div className="profile-row" key={k}>
                    <span className="profile-key">{k}</span>
                    <span className="profile-value">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="profile-modal-footer">
          <button className="profile-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
