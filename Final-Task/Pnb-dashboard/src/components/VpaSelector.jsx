import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './VpaSelector.css';

const VpaSelector = ({ vpas, selectedVpa, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMulti = vpas && vpas.length > 1;

  const [showModal, setShowModal] = useState(isMulti && !sessionStorage.getItem('initial_vpa_selected'));
  const [modalSelected, setModalSelected] = useState(selectedVpa || (vpas && vpas[0]));

  useEffect(() => {
    setModalSelected(selectedVpa);
  }, [selectedVpa]);

  if (!isMulti) {
    return (
      <div className="vpa-selector-wrapper">
        <span className="vpa-label">VPA ID : {selectedVpa}</span>
      </div>
    );
  }

  const handleProceed = () => {
    onSelect(modalSelected);
    setShowModal(false);
    sessionStorage.setItem('initial_vpa_selected', 'true');
  };

  const handleCancel = () => {
    setShowModal(false);
    sessionStorage.setItem('initial_vpa_selected', 'true');
  };

  return (
    <>
      <div className="vpa-selector-wrapper">
        <div className="vpa-selector-header">
          <span className="vpa-label">VPA ID :</span>
          <button className="vpa-button" onClick={() => setIsOpen(!isOpen)}>
            <span>{selectedVpa}</span>
            <FaChevronDown />
          </button>
        </div>

        {isOpen && (
          <div className="vpa-dropdown">
            {vpas.map((vpa) => (
              <div 
                key={vpa} 
                className={`dropdown-item ${vpa === selectedVpa ? 'active' : ''}`}
                onClick={() => {
                  onSelect(vpa);
                  setIsOpen(false);
                }}
              >
                {vpa}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="vpa-modal-overlay">
          <div className="vpa-modal">
            <h3 className="vpa-modal-title">Select VPA</h3>
            <p className="vpa-modal-subtitle">Select a VPA to Proceed</p>
            <div className="vpa-modal-list">
              {vpas.map(vpa => (
                <div key={vpa} className="vpa-modal-list-item" onClick={() => setModalSelected(vpa)}>
                  <div className="radio-circle-container">
                      <div className={`radio-circle ${modalSelected === vpa ? 'active' : ''}`}>
                        {modalSelected === vpa && <div className="radio-fill" />}
                      </div>
                  </div>
                  <span>{vpa}</span>
                </div>
              ))}
            </div>
            <div className="vpa-modal-actions">
              <button className="vpa-btn-cancel" onClick={handleCancel}>Cancel</button>
              <button className="vpa-btn-proceed" onClick={handleProceed}>Proceed</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VpaSelector;
