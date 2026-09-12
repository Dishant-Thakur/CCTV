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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid px-3">
        {}
        <a 
          className="navbar-brand d-flex align-items-center fw-bold" 
          href="#" 
          onClick={(e) => { e.preventDefault(); setCurrentView('dashboard'); }}
        >
          <i className="bi bi-camera-video text-warning me-2"></i>
          <span>CCTV Surveillance with AI Detection</span>
        </a>

        {}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarProject"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarProject">
          {}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link ${currentView === 'dashboard' ? 'active fw-bold text-white' : 'text-white-50'}`}
                onClick={() => setCurrentView('dashboard')}
              >
                <i className="bi bi-speedometer2 me-1"></i>
                {currentUser?.role === 'admin' ? 'Admin Dashboard' : 'Client Dashboard'}
              </button>
            </li>

            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link ${currentView === 'cameras' ? 'active fw-bold text-white' : 'text-white-50'}`}
                onClick={() => setCurrentView('cameras')}
              >
                <i className="bi bi-webcam me-1"></i> Live Cameras
              </button>
            </li>

            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link ${currentView === 'activities' ? 'active fw-bold text-white' : 'text-white-50'}`}
                onClick={() => setCurrentView('activities')}
              >
                <i className="bi bi-bell-fill me-1"></i> Triggered Activities
                {pendingCount > 0 && (
                  <span className="badge bg-danger ms-1">{pendingCount}</span>
                )}
              </button>
            </li>

            {}
            {currentUser?.role === 'admin' && (
              <>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link ${currentView === 'admin-cameras' ? 'active fw-bold text-white' : 'text-white-50'}`}
                    onClick={() => setCurrentView('admin-cameras')}
                  >
                    <i className="bi bi-gear-fill me-1"></i> Manage Cameras
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link ${currentView === 'admin-users' ? 'active fw-bold text-white' : 'text-white-50'}`}
                    onClick={() => setCurrentView('admin-users')}
                  >
                    <i className="bi bi-people-fill me-1"></i> RBAC Users
                  </button>
                </li>
              </>
            )}
          </ul>

          {}
          <div className="d-flex align-items-center gap-2">
            <span className={`badge ${currentUser?.role === 'admin' ? 'bg-danger' : 'bg-primary'} p-2`}>
              {currentUser?.role === 'admin' ? 'Role: Administrator' : 'Role: Client'}
            </span>

            {}
            <button 
              onClick={onSwitchRole}
              className="btn btn-sm btn-outline-light"
              title="Click to switch role between Admin and Client during viva"
            >
              <i className="bi bi-arrow-left-right me-1"></i>
              Switch to {currentUser?.role === 'admin' ? 'Client' : 'Admin'}
            </button>

            <button 
              onClick={onLogout}
              className="btn btn-sm btn-light text-danger fw-semibold ms-1"
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
