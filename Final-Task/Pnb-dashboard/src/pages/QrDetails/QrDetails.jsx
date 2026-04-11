import React, { useState, useEffect } from 'react';
import upiLogo from '../../assets/images/upi-logo.png';
import './QrDetails.css';

const QrDetails = () => {
  const [loading, setLoading] = useState(true);
  const [qrBase64, setQrBase64] = useState(null);
  const [merchantName, setMerchantName] = useState("");
  const [vpaId, setVpaId] = useState("");

  useEffect(() => {
    const fetchAndRenderQr = async () => {
      try {
        setLoading(true);
        const activeVpa = sessionStorage.getItem('active_vpa');
        const token = sessionStorage.getItem('access_token');
        if (!activeVpa || !token) return;
        setVpaId(activeVpa);

        // 1. Encrypt active vpa for fetchById
        const encrObj1 = await fetch("/api/iserveu/encr", {
          method: "POST",
          headers: { "Content-Type": "application/json", "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=" },
          body: JSON.stringify({ vpa_id: activeVpa })
        });
        const encrData1 = await encrObj1.json();

        // 2. call fetchById
        const fetchRes = await fetch("/pnb/api/fetch/fetchById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "pass_key": "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA"
          },
          body: JSON.stringify(encrData1)
        });

        let encryptedString = "";
        const contentType = fetchRes.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
           const fetchEncryptedData = await fetchRes.json();
           encryptedString = fetchEncryptedData.data || fetchEncryptedData.ResponseData || fetchEncryptedData.response || fetchEncryptedData;
        } else {
           encryptedString = await fetchRes.text();
        }

        // 3. Decrypt output
        const decrObj1 = await fetch("/api/iserveu/decr", {
          method: "POST",
          headers: { "Content-Type": "application/json", "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=" },
          body: JSON.stringify({ req: encryptedString })
        });
        const decrData1 = await decrObj1.json();
        
        const profileInfo = (decrData1.data && decrData1.data.length > 0) ? decrData1.data[0] : null;
        if (!profileInfo || !profileInfo.qr_string) {
          throw new Error("No QR String found for active VPA");
        }
        
        setMerchantName(profileInfo.merchant_name || profileInfo.user_name || "Merchant");
        const rawQrString = profileInfo.qr_string;

        // 4. Encrypt rawQrString
        const encrObj2 = await fetch("/api/iserveu/encr", {
          method: "POST",
          headers: { "Content-Type": "application/json", "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=" },
          body: JSON.stringify({ qrString: rawQrString })
        });
        const encrData2 = await encrObj2.json();

        // 5. Fetch Base64 Image
        const qrRes = await fetch("/pnb/api/merchant/qr_convert_to_base64", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // using same token proxy model
            "pass_key": "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA"            
          },
          body: JSON.stringify(encrData2)
        });
        
        // 6. Output is either direct base64, or needs decryption based on IsServeU patterns
        let encryptedQrString = "";
        const qrContentType = qrRes.headers.get("content-type");
        if (qrContentType && qrContentType.includes("application/json")) {
           const fetchEncryptedQrData = await qrRes.json();
           encryptedQrString = fetchEncryptedQrData.data || fetchEncryptedQrData.ResponseData || fetchEncryptedQrData.response || fetchEncryptedQrData;
        } else {
           encryptedQrString = await qrRes.text();
        }

        // Let's decrypt the result from qr api
        const decrObj2 = await fetch("/api/iserveu/decr", {
          method: "POST",
          headers: { "Content-Type": "application/json", "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=" },
          body: JSON.stringify({ req: encryptedQrString }) 
        });
        const decrData2 = await decrObj2.json();
        
        let base64Result = decrData2.base64Image || decrData2.data || decrData2.ResponseData || decrData2;

        const cleanedStr = typeof base64Result === 'object' ? base64Result.response : base64Result;
        setQrBase64(cleanedStr);
        setLoading(false);

      } catch (err) {
        console.error("QR Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchAndRenderQr();
  }, []);

  const handleDownload = () => {
    if (!qrBase64) return;
    const link = document.createElement("a");
    // Some API's send the "data:image/jpeg;base64," natively, some dont
    const prefix = qrBase64.includes("data:image") ? "" : "data:image/jpeg;base64,";
    link.href = prefix + qrBase64;
    link.download = "qr-code.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="qr-details-container">
      <h2 className="qr-details-title">QR Details</h2>
      
      <div className="qr-type-selector">
         <div className="qr-type-desc">Select The Type of QR</div>
         <div className="qr-type-options">
            <label className="qr-radio-label active">
               <input type="radio" name="qrType" value="Static" defaultChecked />
               Static
            </label>
            <label className="qr-radio-label disabled">
               <input type="radio" name="qrType" value="Dynamic" disabled />
               Dynamic
            </label>
         </div>
      </div>

      <div className="qr-card-container">
         {loading ? (
           <div className="loading-state">Generating QR Code...</div>
         ) : (
           <div className="qr-card">
              {/* <div className="qr-merchant-info">
                 <div className="qr-merchant-avatar"></div>
                 <span className="qr-merchant-name">{merchantName}</span>
              </div> */}

              {qrBase64 ? (
                <img 
                  src={qrBase64.includes('data:image') ? qrBase64 : `data:image/jpeg;base64,${qrBase64}`} 
                  alt="QR Code" 
                  className="qr-image-display" 
                />
              ) : (
                <div className="qr-placeholder">QR Unavailable</div>
              )}

              <div className="qr-upi-info-bottom">UPI ID : {vpaId}</div>

              <button className="qr-download-btn" onClick={handleDownload} disabled={!qrBase64}>
                 Download QR Code
              </button>

              <div className="upi-powered-footer">
                 <span className="upi-text">POWERED BY</span>
                 <img src={upiLogo} alt="Powered by UPI" className="qr-upi-logo-img" />
              </div>
           </div>
         )}
      </div>
    </div>
  );
};

export default QrDetails;
