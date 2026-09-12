import React, { useState } from 'react';
import CameraCard from '../components/CameraCard';

export default function ClientDashboard({ 
  cameras = [], 
  activities = [], 
  onAcknowledgeActivity, 
  onSimulateTrigger, 
  onViewDetails 
}) {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchCamera, setSearchCamera] = useState('');
  const [recentNotification, setRecentNotification] = useState(null);

  // Filter activities
  const filteredActivities = activities.filter(act => {
    const matchesSeverity = filterSeverity === 'all' || act.severity.toLowerCase() === filterSeverity.toLowerCase();
    const matchesStatus = filterStatus === 'all' || act.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = act.camera.toLowerCase().includes(searchCamera.toLowerCase()) || 
                          act.event.toLowerCase().includes(searchCamera.toLowerCase());
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const onlineCameras = cameras.filter(c => c.status === 'online').length;
  const pendingCount = activities.filter(a => a.status === 'Pending').length;
  const highSeverityCount = activities.filter(a => a.severity === 'High').length;

  const handleTriggerSim = () => {
    const newAct = onSimulateTrigger();
    setRecentNotification(newAct);
    setTimeout(() => setRecentNotification(null), 5000);
  };

  return (
    <div className="container-fluid px-4 py-4">
      {/* Top Banner Alert (Triggered when new activity occurs) */}
      {recentNotification && (
        <div className="alert alert-danger alert-dismissible fade show shadow-sm d-flex align-items-center justify-content-between mb-4 border-danger" role="alert">
          <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-octagon-fill fs-4 me-3 text-danger pulse-badge"></i>
            <div>
              <strong className="d-block">⚡ Real-Time Security Trigger Fired!</strong>
              <span className="small">{recentNotification.camera} — {recentNotification.event} ({recentNotification.time})</span>
            </div>
          </div>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setRecentNotification(null)}
          ></button>
        </div>
      )}

      {/* Page Header & Test Trigger Demo Button */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center">
            <i className="bi bi-shield-check text-primary me-2"></i>
            Client Security Operator Dashboard
          </h4>
          <p className="text-muted small mb-0">
            Real-time feed monitoring and AI triggered activity review for on-duty security guard.
          </p>
        </div>

        {/* Demo Button to test triggered activity during presentation */}
        <div className="mt-3 mt-md-0">
          <button
            onClick={handleTriggerSim}
            className="btn btn-danger btn-sm fw-semibold shadow-sm d-flex align-items-center"
            title="Click to simulate a new AI trigger event occurring right now"
          >
            <i className="bi bi-lightning-charge-fill me-1"></i>
            <span>Simulate New Activity Trigger (Demo)</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="row g-3 mb-4">
        {/* Stat 1: Online Cameras */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-primary border-4 h-100">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-muted small fw-semibold text-uppercase">Online Cameras</div>
                  <h3 className="fw-bold mb-0 text-primary">{onlineCameras} / {cameras.length}</h3>
                </div>
                <div className="bg-primary-subtle p-2 rounded text-primary fs-3">
                  <i className="bi bi-camera-video"></i>
                </div>
              </div>
              <small className="text-success mt-2 d-block">
                <i className="bi bi-check-circle-fill me-1"></i> {onlineCameras} streams operational
              </small>
            </div>
          </div>
        </div>

        {/* Stat 2: Pending Triggers Requiring Action */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-danger border-4 h-100">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-muted small fw-semibold text-uppercase">Pending Triggers</div>
                  <h3 className="fw-bold mb-0 text-danger">{pendingCount}</h3>
                </div>
                <div className="bg-danger-subtle p-2 rounded text-danger fs-3">
                  <i className="bi bi-bell"></i>
                </div>
              </div>
              <small className="text-danger mt-2 d-block">
                <i className="bi bi-exclamation-triangle-fill me-1"></i> {pendingCount} require operator review
              </small>
            </div>
          </div>
        </div>

        {/* Stat 3: High Severity Alerts */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-warning border-4 h-100">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-muted small fw-semibold text-uppercase">High Severity</div>
                  <h3 className="fw-bold mb-0 text-warning">{highSeverityCount}</h3>
                </div>
                <div className="bg-warning-subtle p-2 rounded text-warning fs-3">
                  <i className="bi bi-shield-exclamation"></i>
                </div>
              </div>
              <small className="text-muted mt-2 d-block">
                Critical priority security events
              </small>
            </div>
          </div>
        </div>

        {/* Stat 4: AI Engine Status */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-success border-4 h-100">
            <div className="card-body p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-muted small fw-semibold text-uppercase">AI Engine Status</div>
                  <h3 className="fw-bold mb-0 text-success">Active</h3>
                </div>
                <div className="bg-success-subtle p-2 rounded text-success fs-3">
                  <i className="bi bi-cpu"></i>
                </div>
              </div>
              <small className="text-success mt-2 d-block">
                <i className="bi bi-activity me-1"></i> YOLOv8 + OpenCV running
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: TRIGGERED ACTIVITIES STREAM (Core client requirement) */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-white py-3 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div>
            <h5 className="fw-bold mb-0 text-dark d-flex align-items-center">
              <i className="bi bi-broadcast text-danger me-2"></i>
              Live Triggered Activities & AI Detection Stream
            </h5>
            <small className="text-muted">
              Real-time feed of events flagged by AI models across campus surveillance zones.
            </small>
          </div>

          {/* Quick Filters */}
          <div className="d-flex flex-wrap gap-2 align-items-center">
            {/* Search Input */}
            <input 
              type="text" 
              className="form-control form-control-sm"
              placeholder="Search camera or event..."
              style={{ width: '180px' }}
              value={searchCamera}
              onChange={(e) => setSearchCamera(e.target.value)}
            />

            {/* Severity Filter */}
            <select 
              className="form-select form-select-sm" 
              style={{ width: '130px' }}
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="high">High Severity</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Status Filter */}
            <select 
              className="form-select form-select-sm" 
              style={{ width: '130px' }}
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

        {/* Table of Triggered Activities */}
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small text-uppercase">
              <tr>
                <th style={{ width: '120px' }}>Status</th>
                <th style={{ width: '100px' }}>Time</th>
                <th style={{ width: '220px' }}>Camera Location</th>
                <th>Triggered Event & Details</th>
                <th style={{ width: '140px' }}>Detection Type</th>
                <th style={{ width: '90px' }}>AI Conf.</th>
                <th style={{ width: '90px' }}>Severity</th>
                <th style={{ width: '130px' }} className="text-end">Guard Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    <i className="bi bi-inbox fs-3 d-block mb-1"></i>
                    No triggered activities matching selected filters.
                  </td>
                </tr>
              ) : (
                filteredActivities.map((act) => (
                  <tr key={act.id} className={act.status === 'Pending' ? 'table-warning-subtle' : ''}>
                    {/* Status Badge */}
                    <td>
                      {act.status === 'Pending' && (
                        <span className="badge bg-danger pulse-badge">
                          <i className="bi bi-exclamation-circle-fill me-1"></i> Pending
                        </span>
                      )}
                      {act.status === 'Acknowledged' && (
                        <span className="badge bg-warning text-dark">
                          <i className="bi bi-eye-fill me-1"></i> Acknowledged
                        </span>
                      )}
                      {act.status === 'Resolved' && (
                        <span className="badge bg-success">
                          <i className="bi bi-check-circle-fill me-1"></i> Resolved
                        </span>
                      )}
                    </td>

                    {/* Timestamp */}
                    <td className="small text-muted font-monospace">{act.time}</td>

                    {/* Camera */}
                    <td>
                      <div className="fw-semibold text-dark small">{act.camera}</div>
                      <span className="badge bg-light text-secondary border font-monospace fs-8">{act.cameraId}</span>
                    </td>

                    {/* Event Title & Summary */}
                    <td>
                      <div className="fw-bold text-dark small">{act.event}</div>
                      <div className="text-muted small" style={{ fontSize: '12px' }}>{act.details}</div>
                    </td>

                    {/* Type */}
                    <td>
                      <span className="badge bg-light text-dark border small">{act.type}</span>
                    </td>

                    {/* Confidence */}
                    <td className="small font-monospace fw-bold text-primary">{act.confidence}</td>

                    {/* Severity */}
                    <td>
                      <span className={`badge ${
                        act.severity === 'High' ? 'bg-danger' : 
                        act.severity === 'Medium' ? 'bg-warning text-dark' : 'bg-info text-dark'
                      }`}>
                        {act.severity}
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="text-end">
                      {act.status === 'Pending' && (
                        <button 
                          className="btn btn-sm btn-outline-warning fw-semibold text-dark"
                          onClick={() => onAcknowledgeActivity(act.id)}
                          title="Acknowledge you have seen this alert"
                        >
                          <i className="bi bi-check-lg me-1"></i> Acknowledge
                        </button>
                      )}
                      {act.status === 'Acknowledged' && (
                        <button 
                          className="btn btn-sm btn-outline-success fw-semibold"
                          onClick={() => onAcknowledgeActivity(act.id)}
                          title="Mark incident resolved"
                        >
                          <i className="bi bi-check2-all me-1"></i> Resolve
                        </button>
                      )}
                      {act.status === 'Resolved' && (
                        <span className="text-muted small">
                          <i className="bi bi-check2 text-success me-1"></i> Done
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

      {/* SECTION 2: LIVE SURVEILLANCE CAMERAS GRID */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <div>
            <h5 className="fw-bold mb-0 text-dark d-flex align-items-center">
              <i className="bi bi-grid-3x3-gap-fill text-primary me-2"></i>
              Live Campus Camera Feeds ({cameras.length} Channels)
            </h5>
            <small className="text-muted">High-priority camera streams with simulated RTSP feeds and AI detection bounding boxes.</small>
          </div>
          <span className="badge bg-primary">{onlineCameras} Active Channels</span>
        </div>

        <div className="card-body p-3">
          <div className="row g-3">
            {cameras.map(camera => (
              <div key={camera.id} className="col-12 col-md-6 col-xl-4">
                <CameraCard 
                  camera={camera} 
                  onTriggerAlert={(camId) => onSimulateTrigger(camId)}
                  onViewDetails={onViewDetails}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
