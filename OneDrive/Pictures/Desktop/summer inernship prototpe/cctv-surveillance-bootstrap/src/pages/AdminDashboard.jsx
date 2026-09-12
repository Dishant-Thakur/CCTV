import React, { useState } from 'react';

export default function AdminDashboard({
  cameras = [],
  setCameras,
  users = [],
  setUsers,
  activities = [],
  onSimulateTrigger,
  aiRules = [],
  setAiRules,
  onSwitchRole
}) {
  const [activeTab, setActiveTab] = useState('overview'); // overview | cameras | users | ai-rules
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [notification, setNotification] = useState('');

  // New Camera Form State
  const [newCam, setNewCam] = useState({
    name: '',
    location: '',
    ip: '192.168.1.',
    resolution: '1080p (30fps)',
    type: 'Outdoor Bullet',
    scene: 'gate'
  });

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'client',
    department: 'Campus Security & Patrol'
  });

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Add Camera Handler
  const handleAddCamera = (e) => {
    e.preventDefault();
    if (!newCam.name || !newCam.location || !newCam.ip) {
      alert('Please fill out all camera fields.');
      return;
    }

    const camId = `CAM-0${cameras.length + 1}`;
    const createdCamera = {
      id: camId,
      name: newCam.name,
      location: newCam.location,
      ip: newCam.ip,
      status: 'online',
      resolution: newCam.resolution,
      type: newCam.type,
      scene: newCam.scene,
      aiDetections: ['Camera Online']
    };

    setCameras(prev => [...prev, createdCamera]);
    setShowAddModal(false);
    setNewCam({
      name: '',
      location: '',
      ip: '192.168.1.',
      resolution: '1080p (30fps)',
      type: 'Outdoor Bullet',
      scene: 'gate'
    });
    showToast(`Successfully added new camera: ${createdCamera.name} (${camId})`);
  };

  // Delete Camera Handler
  const handleDeleteCamera = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} (${id}) from the surveillance network?`)) {
      setCameras(prev => prev.filter(c => c.id !== id));
      showToast(`Removed camera ${id} from system.`);
    }
  };

  // Toggle Camera Status (Online / Offline)
  const handleToggleCameraStatus = (id) => {
    setCameras(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'online' ? 'offline' : 'online';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
    showToast(`Updated status for camera ${id}.`);
  };

  // Toggle User Role
  const handleToggleUserRole = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newRole = u.role === 'admin' ? 'client' : 'admin';
        return { ...u, role: newRole };
      }
      return u;
    }));
    showToast('User role updated successfully.');
  };

  // Add User Handler
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert('Please provide name and email.');
      return;
    }
    const created = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department
    };
    setUsers(prev => [...prev, created]);
    setShowAddUserModal(false);
    setNewUser({
      name: '',
      email: '',
      role: 'client',
      department: 'Campus Security & Patrol'
    });
    showToast(`Added new authorized user: ${created.name}`);
  };

  // Toggle AI Rule
  const handleToggleAiRule = (ruleId) => {
    setAiRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        return { ...r, enabled: !r.enabled };
      }
      return r;
    }));
    showToast('AI rule configuration saved.');
  };

  const onlineCameras = cameras.filter(c => c.status === 'online').length;
  const offlineCameras = cameras.filter(c => c.status === 'offline').length;
  const pendingActivities = activities.filter(a => a.status === 'Pending').length;

  return (
    <div className="container-fluid px-4 py-4">
      {/* Toast Notification */}
      {notification && (
        <div className="alert alert-success alert-dismissible fade show shadow-sm d-flex align-items-center mb-4" role="alert">
          <i className="bi bi-check-circle-fill fs-5 me-2 text-success"></i>
          <div><strong>System Admin Update:</strong> {notification}</div>
          <button type="button" className="btn-close" onClick={() => setNotification('')}></button>
        </div>
      )}

      {/* Header Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <div className="d-flex align-items-center gap-2">
            <h4 className="fw-bold text-dark mb-0 d-flex align-items-center">
              <i className="bi bi-shield-lock-fill text-danger me-2"></i>
              System Administration & Control Center
            </h4>
            <span className="badge bg-danger">Full Privileges (RBAC Admin)</span>
          </div>
          <p className="text-muted small mb-0 mt-1">
            Configure camera hardware, manage user access rights (RBAC), and tune AI detection models.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={onSwitchRole}
            title="Switch to Client view to see what the security guard sees"
          >
            <i className="bi bi-person-badge me-1"></i> Preview Client View
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => {
              const triggered = onSimulateTrigger();
              showToast(`Simulated event: ${triggered.event} on ${triggered.camera}`);
            }}
          >
            <i className="bi bi-lightning-charge me-1"></i> Test Trigger Event
          </button>
        </div>
      </div>

      {/* Admin Sub-Navigation Tabs */}
      <ul className="nav nav-pills mb-4 bg-white p-2 rounded shadow-sm border">
        <li className="nav-item">
          <button 
            className={`nav-link btn-sm ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="bi bi-speedometer2 me-1"></i> System Overview
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link btn-sm ${activeTab === 'cameras' ? 'active' : ''}`}
            onClick={() => setActiveTab('cameras')}
          >
            <i className="bi bi-camera-video me-1"></i> Camera Hardware ({cameras.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link btn-sm ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="bi bi-people me-1"></i> RBAC Access Control ({users.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link btn-sm ${activeTab === 'ai-rules' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai-rules')}
          >
            <i className="bi bi-cpu me-1"></i> AI Detection Engine Rules
          </button>
        </li>
      </ul>

      {/* TAB 1: SYSTEM OVERVIEW */}
      {activeTab === 'overview' && (
        <>
          {/* Top Status Cards */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card shadow-sm border-0 border-start border-primary border-4 h-100">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="text-muted small fw-semibold text-uppercase">Total Cameras</div>
                      <h3 className="fw-bold mb-0 text-primary">{cameras.length}</h3>
                    </div>
                    <div className="bg-primary-subtle p-2 rounded text-primary fs-3">
                      <i className="bi bi-camera-video"></i>
                    </div>
                  </div>
                  <small className="text-muted d-block mt-2">
                    {onlineCameras} Online • {offlineCameras} Offline
                  </small>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card shadow-sm border-0 border-start border-success border-4 h-100">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="text-muted small fw-semibold text-uppercase">AI Engine Status</div>
                      <h3 className="fw-bold mb-0 text-success">Healthy</h3>
                    </div>
                    <div className="bg-success-subtle p-2 rounded text-success fs-3">
                      <i className="bi bi-cpu"></i>
                    </div>
                  </div>
                  <small className="text-success d-block mt-2">
                    <i className="bi bi-activity me-1"></i> YOLOv8 + OpenCV 4.8
                  </small>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card shadow-sm border-0 border-start border-warning border-4 h-100">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="text-muted small fw-semibold text-uppercase">NVR Storage</div>
                      <h3 className="fw-bold mb-0 text-warning">74%</h3>
                    </div>
                    <div className="bg-warning-subtle p-2 rounded text-warning fs-3">
                      <i className="bi bi-hdd-network"></i>
                    </div>
                  </div>
                  <small className="text-muted d-block mt-2">
                    2.4 TB used / 3.2 TB Total (RAID-5)
                  </small>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card shadow-sm border-0 border-start border-danger border-4 h-100">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="text-muted small fw-semibold text-uppercase">Triggered Events</div>
                      <h3 className="fw-bold mb-0 text-danger">{activities.length}</h3>
                    </div>
                    <div className="bg-danger-subtle p-2 rounded text-danger fs-3">
                      <i className="bi bi-bell"></i>
                    </div>
                  </div>
                  <small className="text-danger d-block mt-2">
                    <i className="bi bi-exclamation-circle me-1"></i> {pendingActivities} require client review
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Project Architecture & RBAC Flow */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-lg-7">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3">
                  <h6 className="fw-bold mb-0 text-dark">
                    <i className="bi bi-info-circle-fill text-primary me-2"></i>
                    Project System Architecture & RBAC Flow
                  </h6>
                </div>
                <div className="card-body">
                  <p className="small text-muted mb-3">
                    This Smart CCTV Surveillance & AI Detection System is built as a complete modular safety platform for campus monitoring. It separates administrative tasks from client guard monitoring through Role-Based Access Control (RBAC).
                  </p>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded border h-100">
                        <h6 className="fw-bold text-danger mb-2">
                          <i className="bi bi-shield-lock me-1"></i> Admin Privileges
                        </h6>
                        <ul className="small text-secondary ps-3 mb-0">
                          <li>Add, edit, or decommission CCTV cameras.</li>
                          <li>Assign user roles (Admin vs Client).</li>
                          <li>Turn AI Detection rules ON / OFF.</li>
                          <li>View network server storage and stream health.</li>
                          <li>Perform system configuration changes.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded border h-100">
                        <h6 className="fw-bold text-primary mb-2">
                          <i className="bi bi-person-badge me-1"></i> Client / Guard Privileges
                        </h6>
                        <ul className="small text-secondary ps-3 mb-0">
                          <li>Real-time multi-camera grid monitoring.</li>
                          <li>Receive immediate AI-triggered alerts.</li>
                          <li>Filter activities by severity and status.</li>
                          <li>Acknowledge and resolve incident flags.</li>
                          <li>Trigger simulated tests for demonstrations.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-primary-subtle rounded text-primary small">
                    <i className="bi bi-mortarboard-fill me-1"></i>
                    <strong>Student Presentation Tip:</strong> Use the <strong>"Switch to Client / Admin"</strong> button in the top navbar to showcase how the interface immediately shifts permissions between the Security Guard and the IT Administrator.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Server Health Status */}
            <div className="col-12 col-lg-5">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white py-3">
                  <h6 className="fw-bold mb-0 text-dark">
                    <i className="bi bi-hdd-stack text-success me-2"></i>
                    Campus Server & Stream Health
                  </h6>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between small mb-1">
                      <span className="fw-semibold">NVR Disk Storage</span>
                      <span className="text-muted">2.4 TB / 3.2 TB (74%)</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className="progress-bar bg-warning" role="progressbar" style={{ width: '74%' }}></div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between small mb-1">
                      <span className="fw-semibold">AI Inference Pipeline (CPU/GPU)</span>
                      <span className="text-muted">48% Load</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className="progress-bar bg-success" role="progressbar" style={{ width: '48%' }}></div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between small mb-1">
                      <span className="fw-semibold">Network Bandwidth (RTSP Streams)</span>
                      <span className="text-muted">38.4 Mbps</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: '35%' }}></div>
                    </div>
                  </div>

                  <hr />

                  <div className="small">
                    <div className="d-flex justify-content-between py-1">
                      <span className="text-muted">RTSP Stream Protocol:</span>
                      <span className="fw-bold font-monospace">H.264 / TCP Port 554</span>
                    </div>
                    <div className="d-flex justify-content-between py-1">
                      <span className="text-muted">AI Detection Framework:</span>
                      <span className="fw-bold">YOLOv8 + OpenCV DNN</span>
                    </div>
                    <div className="d-flex justify-content-between py-1">
                      <span className="text-muted">Frame Sampling Rate:</span>
                      <span className="fw-bold">10 FPS per channel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* TAB 2: CAMERA HARDWARE MANAGEMENT */}
      {activeTab === 'cameras' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-0 text-dark">
                <i className="bi bi-camera-video-fill text-primary me-2"></i>
                Connected CCTV Hardware Registry
              </h6>
              <small className="text-muted">Total registered cameras: {cameras.length}</small>
            </div>
            <button 
              className="btn btn-primary btn-sm fw-semibold"
              onClick={() => setShowAddModal(true)}
            >
              <i className="bi bi-plus-circle me-1"></i> Add New Camera
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light small text-uppercase">
                <tr>
                  <th>Camera ID</th>
                  <th>Camera Name & Zone</th>
                  <th>IP Address</th>
                  <th>Resolution / FPS</th>
                  <th>Type</th>
                  <th>Stream Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cameras.map(cam => (
                  <tr key={cam.id}>
                    <td>
                      <span className="badge bg-secondary font-monospace">{cam.id}</span>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">{cam.name}</div>
                      <small className="text-muted">{cam.location}</small>
                    </td>
                    <td>
                      <code className="text-dark bg-light px-2 py-1 rounded">{cam.ip}</code>
                    </td>
                    <td className="small text-muted">{cam.resolution}</td>
                    <td>
                      <span className="badge bg-light text-dark border">{cam.type}</span>
                    </td>
                    <td>
                      {cam.status === 'online' ? (
                        <span className="badge bg-success-subtle text-success border border-success">
                          <i className="bi bi-circle-fill fs-8 me-1 text-success"></i> Online
                        </span>
                      ) : (
                        <span className="badge bg-danger-subtle text-danger border border-danger">
                          <i className="bi bi-circle-fill fs-8 me-1 text-danger"></i> Offline
                        </span>
                      )}
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button 
                          className={`btn ${cam.status === 'online' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                          onClick={() => handleToggleCameraStatus(cam.id)}
                          title={cam.status === 'online' ? 'Simulate disconnection / offline' : 'Reactivate camera'}
                        >
                          <i className={`bi ${cam.status === 'online' ? 'bi-power' : 'bi-arrow-clockwise'} me-1`}></i>
                          {cam.status === 'online' ? 'Disable' : 'Enable'}
                        </button>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteCamera(cam.id, cam.name)}
                          title="Delete camera"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RBAC USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-0 text-dark">
                <i className="bi bi-shield-check text-primary me-2"></i>
                Role-Based Access Control (RBAC) User Registry
              </h6>
              <small className="text-muted">Define who can view feeds vs who can change system configurations.</small>
            </div>
            <button 
              className="btn btn-primary btn-sm fw-semibold"
              onClick={() => setShowAddUserModal(true)}
            >
              <i className="bi bi-person-plus me-1"></i> Add Authorized User
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light small text-uppercase">
                <tr>
                  <th>User ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Assigned Department</th>
                  <th>RBAC Role</th>
                  <th>Access Scope</th>
                  <th className="text-end">Role Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>
                      <span className="badge bg-light text-secondary border font-monospace">USR-0{u.id}</span>
                    </td>
                    <td className="fw-semibold text-dark">{u.name}</td>
                    <td className="small text-muted">{u.email}</td>
                    <td className="small">{u.department}</td>
                    <td>
                      {u.role === 'admin' ? (
                        <span className="badge bg-danger">
                          <i className="bi bi-shield-lock-fill me-1"></i> Admin
                        </span>
                      ) : (
                        <span className="badge bg-primary">
                          <i className="bi bi-person-badge me-1"></i> Client (Guard)
                        </span>
                      )}
                    </td>
                    <td className="small text-muted">
                      {u.role === 'admin' ? 'Full System Configuration & RBAC' : 'Live Stream Monitoring & Alerts Acknowledge'}
                    </td>
                    <td className="text-end">
                      <button 
                        className={`btn btn-sm ${u.role === 'admin' ? 'btn-outline-primary' : 'btn-outline-danger'}`}
                        onClick={() => handleToggleUserRole(u.id)}
                        title="Change role for this user"
                      >
                        <i className="bi bi-arrow-left-right me-1"></i>
                        Make {u.role === 'admin' ? 'Client' : 'Admin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AI DETECTION RULES ENGINE */}
      {activeTab === 'ai-rules' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3">
            <h6 className="fw-bold mb-0 text-dark">
              <i className="bi bi-cpu text-primary me-2"></i>
              AI Surveillance Detection Algorithms & Rules
            </h6>
            <small className="text-muted">
              Enable or disable specific machine learning models running on live camera frames.
            </small>
          </div>

          <div className="card-body">
            <div className="list-group">
              {aiRules.map(rule => (
                <div key={rule.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="mb-0 fw-bold">{rule.name}</h6>
                      {rule.enabled ? (
                        <span className="badge bg-success small">ACTIVE</span>
                      ) : (
                        <span className="badge bg-secondary small">DISABLED</span>
                      )}
                    </div>
                    <p className="text-muted small mb-0 mt-1">{rule.description}</p>
                  </div>

                  <div className="form-check form-switch fs-4">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      role="switch"
                      checked={rule.enabled}
                      onChange={() => handleToggleAiRule(rule.id)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="alert alert-info mt-4 mb-0 small">
              <i className="bi bi-lightbulb-fill me-2"></i>
              <strong>How AI Triggers Work:</strong> When a rule is enabled, the backend model processes incoming RTSP frames. When confidence exceeds the threshold (&gt;85%), a triggered activity is immediately broadcast to the <strong>Client Dashboard</strong> for the on-duty guard to review and acknowledge.
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD CAMERA */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleAddCamera}>
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title fs-6 fw-bold">
                    <i className="bi bi-camera-video me-2"></i> Register New CCTV Camera
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Camera Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="e.g., Auditorium Rear Exit"
                      value={newCam.name}
                      onChange={(e) => setNewCam({ ...newCam, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Campus Zone / Location</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="e.g., Cultural Center, Block C"
                      value={newCam.location}
                      onChange={(e) => setNewCam({ ...newCam, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Static IP Address</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="192.168.1.107"
                      value={newCam.ip}
                      onChange={(e) => setNewCam({ ...newCam, ip: e.target.value })}
                      required
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Hardware Model</label>
                      <select 
                        className="form-select form-select-sm"
                        value={newCam.type}
                        onChange={(e) => setNewCam({ ...newCam, type: e.target.value })}
                      >
                        <option value="Outdoor Bullet">Outdoor Bullet</option>
                        <option value="Indoor Dome">Indoor Dome</option>
                        <option value="Outdoor PTZ">Outdoor PTZ</option>
                        <option value="Infrared Night-Vision">Infrared Night-Vision</option>
                      </select>
                    </div>

                    <div className="col-6">
                      <label className="form-label small fw-semibold">Stream Resolution</label>
                      <select 
                        className="form-select form-select-sm"
                        value={newCam.resolution}
                        onChange={(e) => setNewCam({ ...newCam, resolution: e.target.value })}
                      >
                        <option value="1080p (30fps)">1080p (30fps)</option>
                        <option value="1080p (25fps)">1080p (25fps)</option>
                        <option value="720p (25fps)">720p (25fps)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm" 
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm fw-semibold">
                    <i className="bi bi-save me-1"></i> Save Camera
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD USER (RBAC) */}
      {showAddUserModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleAddUser}>
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title fs-6 fw-bold">
                    <i className="bi bi-person-plus me-2"></i> Register New Authorized User
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setShowAddUserModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="e.g. Officer John Doe"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Campus Email</label>
                    <input 
                      type="email" 
                      className="form-control form-control-sm"
                      placeholder="e.g. jdoe@campus.edu"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Department / Station</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="e.g. Gate 2 Night Shift"
                      value={newUser.department}
                      onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Assign Role (RBAC)</label>
                    <select 
                      className="form-select form-select-sm"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option value="client">Client (Security Guard / Stream Viewer)</option>
                      <option value="admin">Admin (Full System & Hardware Access)</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm" 
                    onClick={() => setShowAddUserModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm fw-semibold">
                    <i className="bi bi-check-lg me-1"></i> Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
