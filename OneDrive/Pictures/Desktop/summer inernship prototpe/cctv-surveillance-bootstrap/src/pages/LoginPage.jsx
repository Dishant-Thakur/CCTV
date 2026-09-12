import React, { useState } from 'react';
import { INITIAL_USERS } from '../data/mockData';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('guard@campus.edu');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('client');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    const matchedUser = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
      id: Date.now(),
      name: role === 'admin' ? 'Administrator' : 'Security Guard',
      email: email,
      role: role,
      department: role === 'admin' ? 'IT Security Department' : 'Main Gate Security'
    };

    onLoginSuccess({ ...matchedUser, role });
  };

  const handleQuickLogin = (selectedRole) => {
    if (selectedRole === 'admin') {
      setEmail('admin@campus.edu');
      setPassword('admin123');
      setRole('admin');
      onLoginSuccess(INITIAL_USERS.find(u => u.role === 'admin'));
    } else {
      setEmail('guard@campus.edu');
      setPassword('guard123');
      setRole('client');
      onLoginSuccess(INITIAL_USERS.find(u => u.role === 'client'));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-md-8 col-lg-5">
          {/* Main Login Card */}
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <i className="bi bi-camera-video-fill fs-2 mb-2 d-inline-block text-warning"></i>
              <h4 className="card-title fw-bold mb-0">Smart Campus CCTV System</h4>
              <p className="small mb-0 opacity-75">AI Detection & Real-Time Event Surveillance</p>
            </div>

            <div className="card-body p-4">
              {/* Quick RBAC Role Demo Buttons (Ideal for college viva / presentation) */}
              <div className="bg-light p-3 rounded mb-4 border">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="fw-bold text-secondary">
                    <i className="bi bi-lightning-fill text-warning me-1"></i> Quick Login (Project Demo):
                  </small>
                  <span className="badge bg-secondary">RBAC Ready</span>
                </div>
                <div className="d-grid gap-2">
                  <button 
                    type="button" 
                    onClick={() => handleQuickLogin('client')} 
                    className="btn btn-outline-primary btn-sm text-start d-flex justify-content-between align-items-center"
                  >
                    <span><i className="bi bi-person-badge me-2"></i><strong>Login as Client (Security Guard)</strong></span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleQuickLogin('admin')} 
                    className="btn btn-outline-danger btn-sm text-start d-flex justify-content-between align-items-center"
                  >
                    <span><i className="bi bi-shield-lock me-2"></i><strong>Login as Admin (Full Control)</strong></span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>

              {/* Error message alert */}
              {errorMsg && (
                <div className="alert alert-danger py-2 small d-flex align-items-center mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Standard Login Form */}
              <form onSubmit={handleLogin}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                    <input 
                      type="email" 
                      className="form-control"
                      placeholder="name@campus.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input 
                      type="password" 
                      className="form-control"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Role Selection Dropdown (RBAC) */}
                <div className="mb-4">
                  <label className="form-label small fw-semibold">
                    <i className="bi bi-shield-check me-1 text-primary"></i>
                    Role Assignment (RBAC)
                  </label>
                  <select 
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="client">Client (Security Guard / Stream Viewer)</option>
                    <option value="admin">Admin (System Configuration & Management)</option>
                  </select>
                  <div className="form-text small">
                    {role === 'client' 
                      ? 'Client role can view live cameras and review/acknowledge AI triggered activities.' 
                      : 'Admin role can add/delete cameras, configure AI detection rules, and manage user roles.'}
                  </div>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary w-100 fw-semibold shadow-sm">
                  <i className="bi bi-box-arrow-in-right me-2"></i> Sign In to Dashboard
                </button>
              </form>
            </div>

            {/* College Project Footer */}
            <div className="card-footer bg-light text-center py-2 text-muted small border-top">
              <strong>College Capstone Project</strong> &bull; Final Year B.Tech / BE Computer Science
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
