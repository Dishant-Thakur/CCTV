import React, { useState, useEffect } from 'react';

export default function CameraCard({ camera, onTriggerAlert }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleDateString() + ' ' + now.toLocaleTimeString());
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card shadow-sm h-100 border">
      {/* Header: Camera ID & Online Status */}
      <div className="card-header bg-white py-2 d-flex justify-content-between align-items-center">
        <span className="fw-bold text-truncate small" title={camera.name}>
          <i className="bi bi-camera-video-fill text-primary me-1"></i>
          {camera.id}: {camera.name}
        </span>
        <span className={`badge ${camera.status === 'online' ? 'bg-success' : 'bg-danger'}`}>
          {camera.status === 'online' ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>

      {/* CCTV Screen Box */}
      {camera.status === 'online' ? (
        <div className="cctv-box">
          <img 
            src={camera.image} 
            alt={camera.name}
            onError={(e) => {
              // Fallback if image fails to load
              e.target.style.display = 'none';
            }}
          />
          {/* Top OSD: REC + Channel */}
          <div className="cctv-osd-top">
            <span className="cctv-rec-indicator"></span> REC &bull; {camera.id}
          </div>
          {/* Bottom OSD: Real-time Date/Time */}
          <div className="cctv-osd-bottom">
            {currentTime}
          </div>
        </div>
      ) : (
        <div className="cctv-offline text-center p-3">
          <i className="bi bi-exclamation-triangle-fill text-warning fs-3 mb-2"></i>
          <div className="fw-bold text-light">SIGNAL LOST / OFFLINE</div>
          <small className="text-secondary">{camera.ip} (Connection Timeout)</small>
        </div>
      )}

      {/* Card Body: Camera Details */}
      <div className="card-body p-2 bg-light small">
        <div className="d-flex justify-content-between text-muted mb-1">
          <span><strong>Location:</strong> {camera.location}</span>
        </div>
        <div className="d-flex justify-content-between text-muted mb-2">
          <span><strong>IP:</strong> <code>{camera.ip}</code></span>
          <span><strong>Model:</strong> {camera.type}</span>
        </div>

        {/* AI Detection Tag */}
        {camera.status === 'online' && camera.latestDetection && (
          <div className="alert alert-info py-1 px-2 mb-0 small d-flex align-items-center justify-content-between">
            <span>
              <i className="bi bi-cpu me-1"></i>
              <strong>AI:</strong> {camera.latestDetection}
            </span>
            <span className="badge bg-primary">Active</span>
          </div>
        )}
      </div>

      {/* Card Footer: Trigger Button for Demo */}
      {camera.status === 'online' && (
        <div className="card-footer bg-white p-2 text-end">
          <button 
            type="button" 
            className="btn btn-outline-danger btn-sm"
            style={{ fontSize: '12px' }}
            onClick={() => onTriggerAlert(camera.id)}
            title="Click to simulate an AI alert on this camera for evaluation"
          >
            <i className="bi bi-lightning-fill me-1"></i> Simulate Trigger
          </button>
        </div>
      )}
    </div>
  );
}
