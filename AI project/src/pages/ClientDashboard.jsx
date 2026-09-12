import React, { useState } from 'react';
import CameraCard from '../components/CameraCard';

export default function ClientDashboard({ 
  cameras = [], 
  activities = [], 
  onAcknowledgeActivity, 
  onSimulateTrigger 
}) {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Filter activities
  const filteredActivities = activities.filter(act => {
    const matchSeverity = filterSeverity === 'all' || act.severity.toLowerCase() === filterSeverity.toLowerCase();
    const matchStatus = filterStatus === 'all' || act.status.toLowerCase() === filterStatus.toLowerCase();
    const matchSearch = act.camera.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        act.event.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSeverity && matchStatus && matchSearch;
  });

  const onlineCameras = cameras.filter(c => c.status === 'online').length;
  const pendingCount = activities.filter(a => a.status === 'Pending').length;
  const highSeverityCount = activities.filter(a => a.severity === 'High').length;

  const handleSimulate = () => {
    const newAct = onSimulateTrigger();
    setAlertMessage(`New Alert Triggered: "${newAct.event}" on ${newAct.camera}`);
    setTimeout(() => setAlertMessage(''), 5000);
  };

  return (
    <div className="container-fluid px-4 py-3">
      {/* Alert banner when new event is simulated */}
      {alertMessage && (
        <div className="alert alert-danger alert-dismissible fade show shadow-sm mb-3" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <strong>AI ALERT TRIGGERED:</strong> {alertMessage}
          <button type="button" className="btn-close" onClick={() => setAlertMessage('')}></button>
        </div>
      )}

      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 pb-2 border-bottom">
        <div>
          <h4 className="fw-bold text-dark mb-1">
            <i className="bi bi-shield-check text-primary me-2"></i>
            Client Monitoring Dashboard
          </h4>
          <p className="text-muted small mb-0">
            Real-time CCTV feeds & AI activity detection monitor (Client View).
          </p>
        </div>

        {/* Demo Button to simulate an AI alert */}
        <div className="mt-2 mt-md-0">
          <button 
            className="btn btn-danger btn-sm fw-semibold shadow-sm"
            onClick={handleSimulate}
            title="Click during project demonstration to show a live triggered event"
          >
            <i className="bi bi-plus-circle me-1"></i>
            Simulate New AI Trigger (Demo)
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-primary border-4">
            <div className="card-body p-3">
              <div className="text-muted small fw-semibold">ONLINE CAMERAS</div>
              <h3 className="fw-bold mb-0 text-primary">{onlineCameras} / {cameras.length}</h3>
              <small className="text-success"><i className="bi bi-check-circle me-1"></i>Streams Active</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-danger border-4">
            <div className="card-body p-3">
              <div className="text-muted small fw-semibold">PENDING ALERTS</div>
              <h3 className="fw-bold mb-0 text-danger">{pendingCount}</h3>
              <small className="text-danger"><i className="bi bi-bell me-1"></i>Require Client Review</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-warning border-4">
            <div className="card-body p-3">
              <div className="text-muted small fw-semibold">HIGH SEVERITY ALERTS</div>
              <h3 className="fw-bold mb-0 text-warning">{highSeverityCount}</h3>
              <small className="text-muted">Urgent Campus Events</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-success border-4">
            <div className="card-body p-3">
              <div className="text-muted small fw-semibold">AI DETECTION STATUS</div>
              <h3 className="fw-bold mb-0 text-success">Running</h3>
              <small className="text-muted">YOLOv8 Model Connected</small>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: TRIGGERED ACTIVITIES STREAM TABLE */}
      <div className="card shadow-sm border mb-4">
        <div className="card-header bg-white py-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div>
            <h5 className="fw-bold mb-0 text-dark">
              <i className="bi bi-bell-fill text-danger me-2"></i>
              Triggered Activities & AI Detection Stream
            </h5>
            <small className="text-muted">Events detected automatically by campus CCTV AI detection models.</small>
          </div>

          {/* Table Filters */}
          <div className="d-flex flex-wrap gap-2">
            <input 
              type="text" 
              className="form-control form-control-sm"
              placeholder="Search camera or event..."
              style={{ width: '180px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select 
              className="form-select form-select-sm"
              style={{ width: '130px' }}
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select 
              className="form-select form-select-sm"
              style={{ width: '140px' }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th style={{ width: '90px' }}>Status</th>
                <th style={{ width: '100px' }}>Time</th>
                <th style={{ width: '220px' }}>Camera Source</th>
                <th>Triggered Activity / Event Details</th>
                <th style={{ width: '150px' }}>Detection Model</th>
                <th style={{ width: '80px' }}>AI Conf.</th>
                <th style={{ width: '80px' }}>Severity</th>
                <th style={{ width: '140px' }} className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    No activities found matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredActivities.map((act) => (
                  <tr key={act.id}>
                    <td>
                      {act.status === 'Pending' && <span className="badge bg-danger">Pending</span>}
                      {act.status === 'Acknowledged' && <span className="badge bg-warning text-dark">Acknowledged</span>}
                      {act.status === 'Resolved' && <span className="badge bg-success">Resolved</span>}
                    </td>
                    <td className="small text-muted">{act.time}</td>
                    <td>
                      <div className="fw-semibold small text-dark">{act.camera}</div>
                      <code className="text-muted small">{act.cameraId}</code>
                    </td>
                    <td>
                      <div className="fw-bold small">{act.event}</div>
                      <div className="text-muted small">{act.details}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{act.type}</span>
                    </td>
                    <td className="small fw-bold text-primary">{act.confidence}</td>
                    <td>
                      <span className={`badge ${
                        act.severity === 'High' ? 'bg-danger' :
                        act.severity === 'Medium' ? 'bg-warning text-dark' : 'bg-info text-dark'
                      }`}>
                        {act.severity}
                      </span>
                    </td>
                    <td className="text-end">
                      {act.status === 'Pending' && (
                        <button 
                          className="btn btn-sm btn-warning text-dark fw-semibold"
                          onClick={() => onAcknowledgeActivity(act.id)}
                          title="Acknowledge event"
                        >
                          <i className="bi bi-check-lg me-1"></i> Acknowledge
                        </button>
                      )}
                      {act.status === 'Acknowledged' && (
                        <button 
                          className="btn btn-sm btn-success fw-semibold"
                          onClick={() => onAcknowledgeActivity(act.id)}
                          title="Mark resolved"
                        >
                          <i className="bi bi-check2-all me-1"></i> Resolve
                        </button>
                      )}
                      {act.status === 'Resolved' && (
                        <span className="text-muted small">
                          <i className="bi bi-check-circle text-success me-1"></i> Cleared
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: LIVE CAMERA FEEDS GRID */}
      <div className="card shadow-sm border">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <div>
            <h5 className="fw-bold mb-0 text-dark">
              <i className="bi bi-grid-fill text-primary me-2"></i>
             CCTV Camera Grid ({cameras.length} Feeds)
            </h5>
            <small className="text-muted">Live surveillance feeds from searching areas, buildings and gates.</small>
          </div>
          <span className="badge bg-primary">{onlineCameras} Cameras Active</span>
        </div>

        <div className="card-body p-3">
          <div className="row g-3">
            {cameras.map(cam => (
              <div key={cam.id} className="col-12 col-md-6 col-lg-4">
                <CameraCard 
                  camera={cam} 
                  onTriggerAlert={(camId) => onSimulateTrigger(camId)} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
