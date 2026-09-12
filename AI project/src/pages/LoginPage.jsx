import React, { useState } from 'react';
import { INITIAL_USERS } from '../data/mockData';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('client@campus.edu');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('client');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    const matched = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
      id: Date.now(),
      name: role === 'admin' ? 'Administrator' : 'Client',
      email: email,
      role: role,
      department: role === 'admin' ? 'IT Security Department' : 'Main Gate Security'
    };
    onLoginSuccess({ ...matched, role });
  };

  const handleQuickDemo = (selectedRole) => {
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
        <div className="col-12 col-md-7 col-lg-5">
          <div className="card shadow-sm border">
            {/* Header */}
            <div className="card-header bg-dark text-white text-center py-3">
              <i className="bi bi-camera-video fs-2 mb-2 d-block text-warning"></i>
              <h5 className="fw-bold mb-0">Campus CCTV Surveillance System</h5>
              <small className="text-secondary">College Engineering Project (RBAC Protected)</small>
            </div>

            <div className="card-body p-4">
              {/* Demo 1-Click Login for Presentation */}
              <div className="bg-light p-3 rounded mb-3 border text-center">
                <div className="small fw-bold text-secondary mb-2">
                  <i className="bi bi-person-check me-1"></i> Quick Demo Login:
                </div>
                <div className="d-flex gap-2 justify-content-center">
                  <button 
                    type="button" 
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleQuickDemo('client')}
                  >
                    Login as Client
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleQuickDemo('admin')}
                  >
                    Login as Admin
                  </button>
                </div>
              </div>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control"
                    placeholder="e.g. guard@campus.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Password</label>
                  <input 
                    type="password" 
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Login Role (RBAC)</label>
                  <select 
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="client">Client (Monitor)</option>
                    <option value="admin">Admin (System Administrator)</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold">
                  Sign In to System
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
