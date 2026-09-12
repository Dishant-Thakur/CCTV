import React, { useState, useEffect } from 'react';

export default function CameraCard({ camera, onTriggerAlert, onViewDetails }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      setTimeStr(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card shadow-sm h-100 border">
      {/* Card Header: Camera ID, Name & Online Badge */}
      <div className="card-header bg-white py-2 d-flex align-items-center justify-content-between border-bottom">
        <div className="d-flex align-items-center text-truncate me-2">
          <i className="bi bi-camera-video me-2 text-primary"></i>
          <strong className="small text-truncate" title={camera.name}>
            {camera.id}: {camera.name}
          </strong>
        </div>
        <span className={`badge ${camera.status === 'online' ? 'bg-success' : 'bg-danger'} rounded-pill small`}>
          {camera.status === 'online' ? 'Online' : 'Offline'}
        </span>
      </div>

      {/* CCTV Screen Frame */}
      <div className={`cctv-screen ${camera.status === 'offline' ? 'cctv-screen-offline' : ''}`}>
        {camera.status === 'offline' ? (
          <div className="text-center p-3 text-secondary font-monospace">
            <i className="bi bi-wifi-off fs-2 text-danger d-block mb-1"></i>
            <span className="text-danger fw-bold small">NO RTSP SIGNAL</span>
            <div className="text-muted small fs-8">{camera.ip} (Timeout)</div>
          </div>
        ) : (
          <>
            {/* Campus Background Representation */}
            <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
              {camera.scene === 'gate' && (
                <div className="text-center text-secondary opacity-50">
                  <i className="bi bi-car-front-fill fs-1 d-block"></i>
                  <small className="font-monospace">Gate 1 Roadway Ingress</small>
                </div>
              )}
              {camera.scene === 'hallway' && (
                <div className="text-center text-secondary opacity-50">
                  <i className="bi bi-door-open-fill fs-1 d-block"></i>
                  <small className="font-monospace">Library Ground Corridor</small>
                </div>
              )}
              {camera.scene === 'parking' && (
                <div className="text-center text-secondary opacity-50">
                  <i className="bi bi-p-square-fill fs-1 d-block"></i>
                  <small className="font-monospace">Parking Deck Bays</small>
                </div>
              )}
              {camera.scene === 'quad' && (
                <div className="text-center text-secondary opacity-50">
                  <i className="bi bi-building fs-1 d-block"></i>
                  <small className="font-monospace">Engineering Lab Quad</small>
                </div>
              )}
              {camera.scene === 'dining' && (
                <div className="text-center text-secondary opacity-50">
                  <i className="bi bi-cup-hot-fill fs-1 d-block"></i>
                  <small className="font-monospace">Student Cafeteria</small>
                </div>
              )}

              {/* Simulated AI Detection Bounding Boxes */}
              {camera.id === 'CAM-01' && (
                <div className="ai-box" style={{ width: '110px', height: '65px', top: '55px', left: '70px' }}>
                  <span className="ai-tag">Vehicle 98%</span>
                </div>
              )}
              {camera.id === 'CAM-02' && (
                <div className="ai-box ai-box-danger" style={{ width: '50px', height: '45px', top: '90px', right: '60px' }}>
                  <span className="ai-tag ai-tag-danger">Bag Flagged</span>
                </div>
              )}
              {camera.id === 'CAM-04' && (
                <div className="ai-box" style={{ width: '45px', height: '80px', top: '50px', left: '100px' }}>
                  <span className="ai-tag">Person 91%</span>
                </div>
              )}
            </div>

            {/* Top OSD Bar */}
            <div className="cctv-overlay-top">
              <span><span className="rec-dot me-1"></span> REC [LIVE]</span>
              <span>{camera.ip}</span>
            </div>

            {/* Bottom OSD Bar */}
            <div className="cctv-overlay-bottom">
              <span>{camera.name}</span>
              <span>{timeStr}</span>
            </div>
          </>
        )}
      </div>

      {/* Card Footer Info & Actions */}
      <div className="card-body p-2 d-flex justify-content-between align-items-center bg-light">
        <div className="small text-muted">
          <i className="bi bi-geo-alt me-1"></i> {camera.location}
        </div>
        <div>
          {camera.status === 'online' && (
            <button 
              className="btn btn-outline-danger btn-sm py-0 px-2"
              style={{ fontSize: '11px' }}
              onClick={() => onTriggerAlert(camera.id)}
              title="Simulate an AI detection trigger on this camera"
            >
              <i className="bi bi-lightning-fill"></i> Trigger Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
