import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../auth/useAuth';
import { FaChevronDown, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './LanguageUpdate.css';

const LanguageUpdate = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [vpaId, setVpaId] = useState("");
  const [tid, setTid] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("success"); // success or failed
  const [modalMessage, setModalMessage] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const activeVpa = sessionStorage.getItem('active_vpa');
        const token = sessionStorage.getItem('access_token');
        if (!activeVpa || !token) return;
        setVpaId(activeVpa);

        // 1. Get Profile Info to get serial_number
        const encrObj1 = await fetch("/api/iserveu/encr", {
          method: "POST",
          headers: { "Content-Type": "application/json", "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=" },
          body: JSON.stringify({ vpa_id: activeVpa })
        });
        const encrData1 = await encrObj1.json();

        const fetchRes = await fetch("/pnb/api/fetch/fetchById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "pass_key": "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA"
          },
          body: JSON.stringify(encrData1)
        });

        let profileEncrypted = "";
        const contentType = fetchRes.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
           const profileEncryptedData = await fetchRes.json();
           profileEncrypted = profileEncryptedData.data || profileEncryptedData.ResponseData || profileEncryptedData.response || profileEncryptedData;
        } else {
           profileEncrypted = await fetchRes.text();
        }

        const decrObj1 = await fetch("/api/iserveu/decr", {
          method: "POST",
          headers: { "Content-Type": "application/json", "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=" },
          body: JSON.stringify({ req: profileEncrypted })
        });
        const profileDecrypted = await decrObj1.json();
        const profileInfo = profileDecrypted.data?.[0];
        
        const serialNumber = profileInfo?.serial_number || "Unknown";
        setTid(serialNumber);

        // 2. Fetch Current Language
        if (serialNumber !== "Unknown") {
          const langRes = await fetch(`https://auth-dev-stage.iserveu.online/pnb/isu_soundbox/user_api/current_language/${serialNumber}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "pass_key": "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA"
            }
          });
          let langEncrypted = "";
          const langEncryptedData = await langRes.json();
          langEncrypted = langEncryptedData.data || langEncryptedData.ResponseData || langEncryptedData.response || langEncryptedData;

          const decrObj2 = await fetch("/api/iserveu/decr", {
            method: "POST",
            headers: { "Content-Type": "application/json", "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=" },
            body: JSON.stringify({ req: langEncrypted })
          });
          const langDecrypted = await decrObj2.json();
          setCurrentLanguage(langDecrypted.data || "Unknown");
        }

        // 3. Fetch All Available Languages
        const allLangRes = await fetch("https://auth-dev-stage.iserveu.online/pnb/isu_soundbox/lang/fetch_language", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "pass_key": "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA"
          }
        });
        const allLangEncrypted = await allLangRes.json();
        const decrObj3 = await fetch("/api/iserveu/decr", {
          method: "POST",
          headers: { "Content-Type": "application/json", "key": "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=" },
          body: JSON.stringify({ req: allLangEncrypted.ResponseData || allLangEncrypted })
        });
        const allLangDecrypted = await decrObj3.json();
        if (allLangDecrypted.data && Array.isArray(allLangDecrypted.data)) {
          setAvailableLanguages(allLangDecrypted.data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Data Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdate = async () => {
    if (!selectedLanguage) return;

    try {
      setIsUpdating(true);
      const res = await fetch("https://api-dev-stage.iserveu.online/pnb/bank/lang/update_language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tid: tid,
          update_language: selectedLanguage.toUpperCase()
        })
      });

      const data = await res.json();
      
      if (data.result === "success") {
        setModalStatus("success");
        setModalMessage(data.message || "Language update request Initiated Successfully");
      } else {
        setModalStatus("failed");
        setModalMessage(data.statusDesc || data.message || "Request failed");
      }
      setIsModalOpen(true);
    } catch (err) {
      console.error("Update Error:", err);
      setModalStatus("failed");
      setModalMessage("Something went wrong. Please try again.");
      setIsModalOpen(true);
    } finally {
      setIsUpdating(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalStatus === "success") {
       // Optional: refresh current language after successful update
       // No instruction to refresh, so just close.
    }
  };

  const handleCancel = () => {
    setSelectedLanguage("");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setIsDropdownOpen(false);
  };

  const formatLang = (lang) => {
    if (!lang) return "";
    return lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase();
  };

  return (
    <div className="language-update-container">
      <div className="language-update-header">
        <h2 className="language-update-title">Language Update</h2>
      </div>

      <div className="language-form-card">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">VPA ID</label>
            <input 
              type="text" 
              className="form-input read-only" 
              value={vpaId} 
              readOnly 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Device Serial Number</label>
            <input 
              type="text" 
              className="form-input read-only" 
              value={tid} 
              readOnly 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Current Language</label>
            <input 
              type="text" 
              className="form-input read-only" 
              value={currentLanguage ? formatLang(currentLanguage) : (loading ? "Loading..." : "Unknown")} 
              readOnly 
            />
          </div>
          <div className="form-group" ref={dropdownRef}>
            <label className="form-label">Language Update</label>
            <div className={`custom-dropdown ${isDropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
              <div className={`dropdown-display ${!selectedLanguage ? 'placeholder' : ''}`}>
                {selectedLanguage ? formatLang(selectedLanguage) : 'Select Language Update'}
                <FaChevronDown className={`dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`} />
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {availableLanguages.map((lang, index) => (
                    <div 
                      key={index}
                      className={`dropdown-item ${selectedLanguage === lang ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectLanguage(lang);
                      }}
                    >
                      {formatLang(lang)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
          <button 
            className="btn-update" 
            onClick={handleUpdate} 
            disabled={!selectedLanguage || isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-content">
              <h3 className="modal-title">{modalMessage}</h3>
              <div className="modal-icon-wrapper">
                {modalStatus === "success" ? (
                  <FaCheckCircle className="modal-icon success" />
                ) : (
                  <FaTimesCircle className="modal-icon failed" />
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageUpdate;
