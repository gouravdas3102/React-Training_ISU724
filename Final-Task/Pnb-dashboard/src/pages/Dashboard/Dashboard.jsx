import React, { useState, useEffect } from 'react';
import StatCard from '../../components/StatCard';
import VpaSelector from '../../components/VpaSelector';
import { BiMoney } from 'react-icons/bi';
import { GrTransaction } from 'react-icons/gr';
import { FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../auth/useAuth';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Extract VPAs from user context
  // Fallback string array provided in case API yields none
  const vpas = user?.vpaData?.length 
    ? user.vpaData.map(v => v.vpa_id) 
    : ['Pabitra.hota@pnb', '9283032322742bis@pnb', 'Pabitra@pnb'];
  
  const [selectedVpa, setSelectedVpa] = useState(vpas[0]);

  useEffect(() => {
    if (user?.vpaData?.length && !vpas.includes(selectedVpa)) {
      setSelectedVpa(vpas[0]);
    } else if (selectedVpa) {
      sessionStorage.setItem('active_vpa', selectedVpa);
    }
  }, [user, selectedVpa, vpas]);
  
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('Today');

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
      </div>
      
      <div className="dashboard-controls">
        <div className="controls-left">
          <VpaSelector 
            vpas={vpas}
            selectedVpa={selectedVpa}
            onSelect={setSelectedVpa}
          />
        </div>
        <div className="controls-right">
          <div className="date-selector">
            <button className="date-button" onClick={() => setIsDateOpen(!isDateOpen)}>
              <span>{dateFilter}</span>
              <FaChevronDown />
            </button>
            {isDateOpen && (
              <div className="date-dropdown">
                <div 
                  className={`dropdown-item ${dateFilter === 'Today' ? 'active' : ''}`}
                  onClick={() => { setDateFilter('Today'); setIsDateOpen(false); }}
                >
                  <span className="radio-circle">{dateFilter === 'Today' && <span className="radio-fill" />}</span>
                  Today
                </div>
                <div 
                  className={`dropdown-item ${dateFilter === 'Yesterday' ? 'active' : ''}`}
                  onClick={() => { setDateFilter('Yesterday'); setIsDateOpen(false); }}
                >
                  <span className="radio-circle">{dateFilter === 'Yesterday' && <span className="radio-fill" />}</span>
                  Yesterday
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-metrics">
        <StatCard 
          icon={<GrTransaction />}
          title="Total No Of Transaction"
          value="20.7K"
        />
        <StatCard 
          icon={<BiMoney />}
          title="Total Amount"
          value="76,000 cr"
        />
      </div>
    </div>
  );
};

export default Dashboard;
