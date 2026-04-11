import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaDownload, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './TransactionReports.css';

const TransactionReports = () => {
  const [filterType, setFilterType] = useState('Today'); // 'Today', 'Monthly', 'Custom'
  const [monthlyRange, setMonthlyRange] = useState("Last 3 month's Report");
  const [isMonthlyDropdownOpen, setIsMonthlyDropdownOpen] = useState(false);
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState('');

  const monthlyOptions = [
    "Last Month's Report",
    "Last 3 month's Report",
    "Last 6 month's Report",
    "Last 12 month's Report"
  ];

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDateRange = () => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    if (filterType === 'Today') {
      start = today;
      end = today;
    } else if (filterType === 'Monthly') {
      let months = 1;
      if (monthlyRange.includes('3')) months = 3;
      else if (monthlyRange.includes('6')) months = 6;
      else if (monthlyRange.includes('12')) months = 12;
      
      start = new Date(today.getFullYear(), today.getMonth() - months, today.getDate());
      end = today;
    } else if (filterType === 'Custom Range') {
      if (!customRange.start || !customRange.end) return null;
      const s = new Date(customRange.start);
      const e = new Date(customRange.end);
      return { start: formatDate(s), end: formatDate(e) };
    }

    return { start: formatDate(start), end: formatDate(end) };
  };

  const fetchReport = async (mode = 'both') => {
    const dates = getDateRange();
    if (!dates) {
      alert("Please select both start and end dates for custom range.");
      return;
    }

    const vpaId = sessionStorage.getItem('active_vpa') || "8959423523m@pnbupi";
    
    setLoading(true);
    setError(null);

    const payload = {
      startDate: dates.start,
      endDate: dates.end,
      vpa_id: vpaId,
      mode: mode
    };

    try {
      // Fetch report directly without encryption
      const response = await fetch("https://api-dev-stage.iserveu.online/pnb/sb/reports/querysubmit_user", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (mode === 'excel') {
        if (result.status === "SUCCESS" || result.result === "success") {
          alert(`Excel report initiated. Query ID: ${result.query_id}`);
        } else {
          alert(`Failed: ${result.statusDescription || result.message || "Unknown error"}`);
        }
      } else {
        const data = result.data || result;
        if (Array.isArray(data)) {
          setReportData(data);
          setCurrentPage(1);
        } else if (result.status === "FAILED" || result.result === "failed") {
          setError(result.statusDescription || result.message || "Request failed");
        } else if (data && typeof data === 'object') {
           // Handle if data is wrapped in another object { data: [...] }
           setReportData(data.data || []);
           setCurrentPage(1);
        } else {
           setReportData([]);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch transaction reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport('both');
  }, []);

  const handleFilterChange = (type) => {
    setFilterType(type);
    if (type === 'Today') {
      setTimeout(() => fetchReport('both'), 0);
    }
  };

  // Pagination and Search logic
  const totalPages = Math.ceil(reportData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  
  // Step 1: Paginating the data
  const paginatedData = reportData.slice(startIndex, startIndex + rowsPerPage);
  
  // Step 2: Searching ONLY the currently visible rows
  const currentRows = paginatedData.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleGoToPage = (e) => {
    if (e.key === 'Enter') {
      const pageNum = parseInt(goToPage);
      if (pageNum >= 1 && pageNum <= totalPages) {
        setCurrentPage(pageNum);
        setGoToPage('');
      } else {
        alert(`Please enter a page between 1 and ${totalPages}`);
      }
    }
  };

  const formatAmount = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amt);
  };

  return (
    <div className="reports-container">
      <div className="reports-header title-section">
        <h1 className="reports-title">Transaction Reports</h1>
      </div>

      <div className="filter-card">
        <div className="filter-label">Select a Report Filter</div>
        <div className="filter-options">
          <label className="radio-label">
            <input 
              type="radio" 
              name="filter" 
              checked={filterType === 'Today'} 
              onChange={() => handleFilterChange('Today')} 
            />
            <span className="radio-custom"></span>
            Today
          </label>
          <label className="radio-label">
            <input 
              type="radio" 
              name="filter" 
              checked={filterType === 'Monthly'} 
              onChange={() => handleFilterChange('Monthly')} 
            />
            <span className="radio-custom"></span>
            Monthly
          </label>
          <label className="radio-label">
            <input 
              type="radio" 
              name="filter" 
              checked={filterType === 'Custom Range'} 
              onChange={() => handleFilterChange('Custom Range')} 
            />
            <span className="radio-custom"></span>
            Custom Range
          </label>
        </div>

        {filterType === 'Monthly' && (
          <div className="filter-subset monthly-subset">
            <div className="subset-title">Monthly</div>
            <div className="subset-row">
              <div className="custom-select-wrapper">
                <div 
                  className="custom-select" 
                  onClick={() => setIsMonthlyDropdownOpen(!isMonthlyDropdownOpen)}
                >
                  {monthlyRange}
                  <FaChevronDown className={`select-arrow ${isMonthlyDropdownOpen ? 'open' : ''}`} />
                </div>
                {isMonthlyDropdownOpen && (
                  <div className="select-dropdown">
                    {monthlyOptions.map((opt, i) => (
                      <div 
                        key={i} 
                        className="select-item"
                        onClick={() => {
                          setMonthlyRange(opt);
                          setIsMonthlyDropdownOpen(false);
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button className="btn-submit" onClick={() => fetchReport('both')}>Submit</button>
            </div>
          </div>
        )}

        {filterType === 'Custom Range' && (
          <div className="filter-subset custom-subset">
            <div className="subset-title">Custom Range</div>
            <div className="subset-row">
               <input 
                type="date" 
                className="date-input" 
                value={customRange.start}
                onChange={(e) => setCustomRange({...customRange, start: e.target.value})}
              />
               <input 
                type="date" 
                className="date-input" 
                value={customRange.end}
                onChange={(e) => setCustomRange({...customRange, end: e.target.value})}
              />
              <button className="btn-submit" onClick={() => fetchReport('both')}>Submit</button>
            </div>
          </div>
        )}
      </div>

      <div className="table-actions-card">
        <div className="action-row">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search here..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-download" onClick={() => fetchReport('excel')} disabled={loading}>
            <FaDownload /> Download
          </button>
        </div>

        <div className="table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Transaction ID</th>
                <th>RRN Number</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="text-center">Loading transactions...</td></tr>
              ) : error ? (
                <tr><td colSpan="6" className="text-center error-text">{error}</td></tr>
              ) : currentRows.length === 0 ? (
                <tr><td colSpan="6" className="text-center">No transactions found on this page.</td></tr>
              ) : (
                currentRows.map((row, index) => (
                  <tr key={index}>
                    <td>{startIndex + index + 1}</td>
                    <td>{row.Transaction_Id || "N/A"}</td>
                    <td>{row.Transaction_Id || "N/A"}</td>
                    <td>₹{formatAmount(row.Transaction_Amount || 0)}</td>
                    <td>{row["Date_&_Time"] || "N/A"}</td>
                    <td><span className="status-tag success">Received</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-footer">
          <div className="pagination-left">
            <span>Row per page</span>
            <select 
              className="rows-select" 
              value={rowsPerPage} 
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="goto-label">Go to</span>
            <input 
              type="text" 
              className="goto-input" 
              value={goToPage}
              placeholder="9"
              onChange={(e) => setGoToPage(e.target.value)}
              onKeyDown={handleGoToPage}
            />
          </div>

          <div className="pagination-right">
            <button 
              className="page-btn nav-btn" 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <FaChevronLeft />
            </button>
            <div className="page-numbers">
              {totalPages > 0 && [...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                  return (
                    <button 
                      key={pageNum}
                      className={`page-btn num-btn ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                   return <span key={pageNum} className="pagination-ellipsis">...</span>;
                }
                return null;
              })}
            </div>
            <button 
              className="page-btn nav-btn" 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionReports;
