import React from 'react';

export default function Navbar({ 
  currentUser, 
  currentView, 
  setCurrentView, 
  onLogout, 
  onSwitchRole, 
  activities = [] 
}) {
  const pendingCount = activities.filter(a => a.status === 'Pending').length;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid px-3">
        {/* Brand Name & Project Title */}
        <a 
          className="navbar-brand d-flex align-items-center fw-bold" 
          href="#" 
          onClick={(e) => { e.preventDefault(); setCurrentView('dashboard'); }}
        >
          <i className="bi bi-camera-video-fill text-warning me-2 fs-5"></i>
          <span>Smart Campus CCTV</span>
          <span className="badge bg-light text-primary ms-2 fs-7 fw-normal">College Project</span>
        </a>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links based on Role (RBAC) */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Dashboard Link */}
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-decoration-none ${currentView === 'dashboard' ? 'active fw-bold text-white' : 'text-white-50'}`}
                onClick={() => setCurrentView('dashboard')}
              >
                <i className="bi bi-speedometer2 me-1"></i> 
                {currentUser?.role === 'admin' ? 'Admin Dashboard' : 'Client Dashboard'}
              </button>
            </li>

            {/* Live Camera Feeds */}
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-decoration-none ${currentView === 'cameras' ? 'active fw-bold text-white' : 'text-white-50'}`}
                onClick={() => setCurrentView('cameras')}
              >
                <i className="bi bi-webcam me-1"></i> Live Cameras
              </button>
            </li>

            {/* Triggered Activities Link */}
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-decoration-none position-relative ${currentView === 'activities' ? 'active fw-bold text-white' : 'text-white-50'}`}
                onClick={() => setCurrentView('activities')}
              >
                <i className="bi bi-bell-fill me-1"></i> Triggered Activities
                {pendingCount > 0 && (
                  <span className="badge bg-danger ms-1 rounded-pill">
                    {pendingCount}
                  </span>
                )}
              </button>
            </li>

            {/* Admin-Only Links (RBAC) */}
            {currentUser?.role === 'admin' && (
              <>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link text-decoration-none ${currentView === 'admin-cameras' ? 'active fw-bold text-white' : 'text-white-50'}`}
                    onClick={() => setCurrentView('admin-cameras')}
                  >
                    <i className="bi bi-gear-fill me-1"></i> Manage Cameras
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link text-decoration-none ${currentView === 'admin-users' ? 'active fw-bold text-white' : 'text-white-50'}`}
                    onClick={() => setCurrentView('admin-users')}
                  >
                    <i className="bi bi-people-fill me-1"></i> User Roles (RBAC)
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* Right Side: Role Badge, Quick Switcher & Logout */}
          <div className="d-flex align-items-center gap-2">
            {/* Active User & Role Badge */}
            <div className="d-none d-md-block text-end me-2 text-white">
              <div className="small fw-semibold">{currentUser?.name}</div>
              <span className={`badge ${currentUser?.role === 'admin' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                <i className={`bi ${currentUser?.role === 'admin' ? 'bi-shield-lock-fill' : 'bi-person-badge-fill'} me-1`}></i>
                Role: {currentUser?.role === 'admin' ? 'Admin' : 'Client / Guard'}
              </span>
            </div>

            {/* Quick 1-Click Role Switcher for easy viva / evaluation demo */}
            <button 
              onClick={onSwitchRole} 
              className="btn btn-sm btn-outline-light d-flex align-items-center"
              title="Quickly toggle between Admin and Client roles to demonstrate RBAC"
            >
              <i className="bi bi-arrow-left-right me-1"></i>
              <span>Switch to {currentUser?.role === 'admin' ? 'Client' : 'Admin'}</span>
            </button>

            {/* Logout */}
            <button 
              onClick={onLogout} 
              className="btn btn-sm btn-light text-danger fw-semibold d-flex align-items-center ms-1"
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
