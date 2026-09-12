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
  const [activeTab, setActiveTab] = useState('cameras'); // cameras | users | ai-rules | overview
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [message, setMessage] = useState('');

  // Add Camera Form
  const [newCam, setNewCam] = useState({
    name: '',
    location: '',
    ip: '192.168.1.',
    resolution: '1080p Full HD',
    type: 'Bullet Camera'
  });

  // Add User Form
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'client',
    department: 'Campus Security Patrol'
  });

  const showToast = (txt) => {
    setMessage(txt);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleAddCamera = (e) => {
    e.preventDefault();
    if (!newCam.name || !newCam.location || !newCam.ip) {
      alert('Please fill out all required fields.');
      return;
    }
    const newId = `CAM-0${cameras.length + 1}`;
    const created = {
      id: newId,
      name: newCam.name,
      location: newCam.location,
      ip: newCam.ip,
      status: 'online',
      resolution: newCam.resolution,
      type: newCam.type,
      image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&auto=format&fit=crop&q=60',
      latestDetection: 'Camera Operational'
    };
    setCameras(prev => [...prev, created]);
    setShowAddModal(false);
    setNewCam({
      name: '',
      location: '',
      ip: '192.168.1.',
      resolution: '1080p Full HD',
      type: 'Bullet Camera'
    });
    showToast(`Camera ${created.name} (${newId}) added successfully!`);
  };

  const handleDeleteCamera = (id, name) => {
    if (window.confirm(`Are you sure you want to delete camera: ${name} (${id})?`)) {
      setCameras(prev => prev.filter(c => c.id !== id));
      showToast(`Camera ${id} deleted.`);
    }
  };

  const handleToggleStatus = (id) => {
    setCameras(prev => prev.map(c => {
      if (c.id === id) {
        const next = c.status === 'online' ? 'offline' : 'online';
        return { ...c, status: next };
      }
      return c;
    }));
    showToast(`Camera ${id} status updated.`);
  };

  const handleToggleUserRole = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextRole = u.role === 'admin' ? 'client' : 'admin';
        return { ...u, role: nextRole };
      }
      return u;
    }));
    showToast('User role updated successfully.');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert('Please fill out user details.');
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
      department: 'Campus Security Patrol'
    });
    showToast(`User ${created.name} added with role ${created.role}.`);
  };

  const handleToggleRule = (ruleId) => {
    setAiRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        return { ...r, enabled: !r.enabled };
      }
      return r;
    }));
    showToast('AI Rule setting saved.');
  };

  return (
    <div className="container-fluid px-4 py-3">
      {/* Toast alert */}
      {message && (
        <div className="alert alert-success alert-dismissible fade show shadow-sm mb-3">
          <i className="bi bi-check-circle-fill me-2"></i> {message}
          <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
        </div>
      )}

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 pb-2 border-bottom">
        <div>
          <h4 className="fw-bold text-dark mb-1">
            <i className="bi bi-gear-fill text-danger me-2"></i>
            Admin Control Center & System Configuration
          </h4>
          <p className="text-muted small mb-0">
            Full administrative access: Configure hardware, assign RBAC roles, and manage AI rules.
          </p>
        </div>

        <div className="mt-2 mt-md-0 d-flex gap-2">
          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={onSwitchRole}
            title="Switch to Client view to see guard interface"
          >
            <i className="bi bi-person-badge me-1"></i> Switch to Client View
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => {
              const res = onSimulateTrigger();
              showToast(`Simulated alert on ${res.camera}`);
            }}
          >
            <i className="bi bi-lightning-fill me-1"></i> Test Trigger
          </button>
        </div>
      </div>

      {/* Standard Bootstrap Nav Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'cameras' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('cameras')}
          >
            <i className="bi bi-camera-video me-1"></i> Camera Management ({cameras.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'users' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="bi bi-people me-1"></i> User Roles (RBAC) ({users.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'ai-rules' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('ai-rules')}
          >
            <i className="bi bi-cpu me-1"></i> AI Detection Rules
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="bi bi-info-circle me-1"></i> System Overview & Viva Notes
          </button>
        </li>
      </ul>

      {/* TAB 1: CAMERA MANAGEMENT */}
      {activeTab === 'cameras' && (
        <div className="card shadow-sm border">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h6 className="fw-bold mb-0">Registered CCTV Cameras</h6>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
              <i className="bi bi-plus-circle me-1"></i> Add New Camera
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle mb-0">
              <thead className="table-light small">
                <tr>
                  <th>Camera ID</th>
                  <th>Name & Location</th>
                  <th>IP Address</th>
                  <th>Resolution</th>
                  <th>Hardware Type</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cameras.map(c => (
                  <tr key={c.id}>
                    <td><code>{c.id}</code></td>
                    <td>
                      <div className="fw-bold small">{c.name}</div>
                      <small className="text-muted">{c.location}</small>
                    </td>
                    <td><code>{c.ip}</code></td>
                    <td className="small">{c.resolution}</td>
                    <td className="small">{c.type}</td>
                    <td>
                      {c.status === 'online' ? (
                        <span className="badge bg-success">Online</span>
                      ) : (
                        <span className="badge bg-danger">Offline</span>
                      )}
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button 
                          className={`btn ${c.status === 'online' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                          onClick={() => handleToggleStatus(c.id)}
                        >
                          {c.status === 'online' ? 'Disable' : 'Enable'}
                        </button>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteCamera(c.id, c.name)}
                        >
                          Delete
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

      {/* TAB 2: RBAC USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="card shadow-sm border">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-0">Role-Based Access Control (RBAC) Users</h6>
              <small className="text-muted">Separate administrative rights from guard monitoring access.</small>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddUserModal(true)}>
              <i className="bi bi-person-plus me-1"></i> Add User
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle mb-0">
              <thead className="table-light small">
                <tr>
                  <th>User ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Assigned Role</th>
                  <th>Permissions</th>
                  <th className="text-end">Change Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td><code>USR-{u.id}</code></td>
                    <td className="fw-bold small">{u.name}</td>
                    <td className="small text-muted">{u.email}</td>
                    <td className="small">{u.department}</td>
                    <td>
                      {u.role === 'admin' ? (
                        <span className="badge bg-danger">Admin</span>
                      ) : (
                        <span className="badge bg-primary">Client</span>
                      )}
                    </td>
                    <td className="small text-muted">
                      {u.role === 'admin' ? 'Manage cameras, users & AI rules' : 'View live feeds & acknowledge alerts'}
                    </td>
                    <td className="text-end">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleToggleUserRole(u.id)}
                      >
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

      {/* TAB 3: AI RULES */}
      {activeTab === 'ai-rules' && (
        <div className="card shadow-sm border">
          <div className="card-header bg-white py-3">
            <h6 className="fw-bold mb-0">AI Surveillance Detection Rules</h6>
            <small className="text-muted">Enable or disable specific detection algorithms running on live camera frames.</small>
          </div>

          <div className="card-body">
            <div className="list-group">
              {aiRules.map(rule => (
                <div key={rule.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div>
                    <div className="fw-bold">{rule.name}</div>
                    <small className="text-muted">{rule.description}</small>
                  </div>
                  <div className="form-check form-switch fs-5">
                    <input 
                      className="form-check-input"
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => handleToggleRule(rule.id)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="alert alert-secondary mt-3 mb-0 small">
              <i className="bi bi-info-circle me-1"></i>
              <strong>How it works:</strong> When a rule is enabled, the backend detection model scans incoming camera frames. When confidence exceeds the threshold (&gt;85%), an alert is pushed to the <strong>Client Dashboard</strong> table.
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM OVERVIEW & VIVA NOTES */}
      {activeTab === 'overview' && (
        <div className="card shadow-sm border">
          <div className="card-header bg-white py-3">
            <h6 className="fw-bold mb-0">Project System Overview & Architecture</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded border h-100">
                  <h6 className="fw-bold text-primary">Role-Based Access Control (RBAC)</h6>
                  <p className="small text-muted mb-2">
                    RBAC is implemented to secure the surveillance system:
                  </p>
                  <ul className="small text-muted ps-3 mb-0">
                    <li><strong>Admin Role:</strong> Can register new cameras, toggle cameras on/off, change AI rules, and manage user accounts.</li>
                    <li><strong>Client Role:</strong> Intent. Can only view live streams and acknowledge/resolve incoming alerts.</li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 bg-light rounded border h-100">
                  <h6 className="fw-bold text-success">Technology Stack</h6>
                  <ul className="small text-muted ps-3 mb-0">
                    <li><strong>Frontend:</strong> React.js (Component-based architecture)</li>
                    <li><strong>Styling:</strong> Bootstrap 5.3 + Bootstrap Icons</li>
                    <li><strong>State Management:</strong> React useState and useEffect</li>
                    <li><strong>Design Concept:</strong> Medium-level authentic student engineering project</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD CAMERA */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddCamera}>
                <div className="modal-header bg-primary text-white">
                  <h6 className="modal-title fw-bold">Add New CCTV Camera</h6>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <label className="form-label small fw-bold">Camera Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="e.g. Auditorium Hallway"
                      value={newCam.name}
                      onChange={(e) => setNewCam({ ...newCam, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-bold">Location / Zone</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="e.g. Academic Block C"
                      value={newCam.location}
                      onChange={(e) => setNewCam({ ...newCam, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-bold">IP Address</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="192.168.1.107"
                      value={newCam.ip}
                      onChange={(e) => setNewCam({ ...newCam, ip: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-bold">Camera Type</label>
                    <select 
                      className="form-select form-select-sm"
                      value={newCam.type}
                      onChange={(e) => setNewCam({ ...newCam, type: e.target.value })}
                    >
                      <option value="Bullet Camera">Bullet Camera</option>
                      <option value="Dome Camera">Dome Camera</option>
                      <option value="PTZ Outdoor">PTZ Outdoor</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Save Camera</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD USER */}
      {showAddUserModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddUser}>
                <div className="modal-header bg-primary text-white">
                  <h6 className="modal-title fw-bold">Add New User (RBAC)</h6>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddUserModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <label className="form-label small fw-bold">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="e.g. Officer Alex"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-bold">Email</label>
                    <input 
                      type="email" 
                      className="form-control form-control-sm"
                      placeholder="e.g. alex@campus.edu"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-bold">Department</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="e.g. Gate 2 Shift"
                      value={newUser.department}
                      onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-bold">Assign Role</label>
                    <select 
                      className="form-select form-select-sm"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option value="client">Client</option>
                      <option value="admin">Admin (System Administrator)</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddUserModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Add User</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
