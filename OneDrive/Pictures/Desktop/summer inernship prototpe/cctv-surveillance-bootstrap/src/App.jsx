import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CameraCard from './components/CameraCard';
import { INITIAL_USERS, INITIAL_CAMERAS, INITIAL_ACTIVITIES, AI_RULE_SETTINGS } from './data/mockData';

export default function App() {
  // Authentication & RBAC User State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]); // Default: Client (Security Guard)
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard | cameras | activities | admin-cameras | admin-users

  // Global Surveillance States
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [aiRules, setAiRules] = useState(AI_RULE_SETTINGS);

  // Demo Events Pool for Viva / Simulation
  const DEMO_EVENTS = [
    {
      event: 'Motion Detected After Hours',
      type: 'Motion Detection',
      severity: 'Medium',
      confidence: '92%',
      details: 'Infrared motion sensor triggered near the secondary laboratory entrance.'
    },
    {
      event: 'Unattended Backpack Flagged',
      type: 'Object Detection',
      severity: 'High',
      confidence: '96%',
      details: 'Object stationary without accompanying person for over 10 minutes.'
    },
    {
      event: 'Unauthorized Vehicle in Loading Bay',
      type: 'Vehicle Alert',
      severity: 'High',
      confidence: '94%',
      details: 'Vehicle detected without authorized campus parking decal in delivery bay.'
    },
    {
      event: 'Restricted Perimeter Fence Crossing',
      type: 'Tripwire Alert',
      severity: 'High',
      confidence: '98%',
      details: 'Virtual boundary line crossed near East boundary sports complex.'
    },
    {
      event: 'Group Gathering / Loitering',
      type: 'Crowd Analysis',
      severity: 'Low',
      confidence: '86%',
      details: 'Cluster of 4 or more individuals detected in parking sector after 11 PM.'
    }
  ];

  // Handler: Simulate New AI Activity Trigger
  const handleSimulateTrigger = (forcedCameraId = null) => {
    const randomEvent = DEMO_EVENTS[Math.floor(Math.random() * DEMO_EVENTS.length)];
    const targetCamera = forcedCameraId 
      ? cameras.find(c => c.id === forcedCameraId) || cameras[0]
      : cameras[Math.floor(Math.random() * cameras.length)];

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newActivity = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      time: timeStr,
      timeAgo: 'Just now',
      camera: targetCamera ? targetCamera.name : 'Main Gate 1',
      cameraId: targetCamera ? targetCamera.id : 'CAM-01',
      event: randomEvent.event,
      type: randomEvent.type,
      severity: randomEvent.severity,
      confidence: randomEvent.confidence,
      status: 'Pending',
      details: randomEvent.details
    };

    setActivities(prev => [newActivity, ...prev]);
    return newActivity;
  };

  // Handler: Acknowledge Triggered Activity (Client Action)
  const handleAcknowledgeActivity = (actId) => {
    setActivities(prev => prev.map(act => {
      if (act.id === actId) {
        return { 
          ...act, 
          status: act.status === 'Pending' ? 'Acknowledged' : 'Resolved' 
        };
      }
      return act;
    }));
  };

  // Handler: Role Toggle Switcher (RBAC Demo)
  const handleSwitchRole = () => {
    if (currentUser.role === 'client') {
      const adminUser = users.find(u => u.role === 'admin') || {
        id: 2,
        name: 'System Administrator',
        email: 'admin@campus.edu',
        role: 'admin',
        department: 'IT & Safety Department'
      };
      setCurrentUser(adminUser);
    } else {
      const clientUser = users.find(u => u.role === 'client') || {
        id: 1,
        name: 'Campus Security Guard',
        email: 'guard@campus.edu',
        role: 'client',
        department: 'Campus Security & Patrol'
      };
      setCurrentUser(clientUser);
    }
  };

  // Login Handler
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  // Logout Handler
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // If not authenticated, render Login Page
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Bootstrap Navigation Header */}
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
        activities={activities}
      />

      {/* Main Content Area based on RBAC and currentView */}
      <main className="flex-grow-1">
        {/* VIEW 1: DASHBOARD */}
        {currentView === 'dashboard' && (
          currentUser.role === 'admin' ? (
            <AdminDashboard
              cameras={cameras}
              setCameras={setCameras}
              users={users}
              setUsers={setUsers}
              activities={activities}
              onSimulateTrigger={handleSimulateTrigger}
              aiRules={aiRules}
              setAiRules={setAiRules}
              onSwitchRole={handleSwitchRole}
            />
          ) : (
            <ClientDashboard
              cameras={cameras}
              activities={activities}
              onAcknowledgeActivity={handleAcknowledgeActivity}
              onSimulateTrigger={handleSimulateTrigger}
              onViewDetails={(act) => alert(`Activity Details:\n${act.event}\nLocation: ${act.camera}\nConfidence: ${act.confidence}\nNotes: ${act.details}`)}
            />
          )
        )}

        {/* VIEW 2: LIVE CAMERAS GRID */}
        {currentView === 'cameras' && (
          <div className="container-fluid px-4 py-4">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
              <div>
                <h4 className="fw-bold mb-1">
                  <i className="bi bi-webcam-fill text-primary me-2"></i>
                  Live Surveillance Camera Feeds
                </h4>
                <p className="text-muted small mb-0">
                  Real-time multi-channel surveillance grid for campus operations.
                </p>
              </div>
              <button 
                className="btn btn-danger btn-sm fw-semibold"
                onClick={() => handleSimulateTrigger()}
              >
                <i className="bi bi-lightning-charge me-1"></i> Trigger Test Event
              </button>
            </div>

            <div className="row g-3">
              {cameras.map(cam => (
                <div key={cam.id} className="col-12 col-md-6 col-xl-4">
                  <CameraCard 
                    camera={cam} 
                    onTriggerAlert={(camId) => handleSimulateTrigger(camId)}
                    onViewDetails={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: TRIGGERED ACTIVITIES STREAM */}
        {currentView === 'activities' && (
          <div className="container-fluid px-4 py-4">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
              <div>
                <h4 className="fw-bold mb-1">
                  <i className="bi bi-bell-fill text-danger me-2"></i>
                  All Triggered AI Activities & Detection Logs
                </h4>
                <p className="text-muted small mb-0">
                  Comprehensive audit trail of every suspicious event or AI alert detected by campus cameras.
                </p>
              </div>
              <button 
                className="btn btn-danger btn-sm fw-semibold"
                onClick={() => handleSimulateTrigger()}
              >
                <i className="bi bi-lightning-charge me-1"></i> Simulate New Trigger
              </button>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-header bg-white py-3">
                <h6 className="fw-bold mb-0 text-dark">
                  <i className="bi bi-list-check me-2 text-primary"></i>
                  Total Recorded Events ({activities.length})
                </h6>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light small text-uppercase">
                    <tr>
                      <th>Status</th>
                      <th>Time</th>
                      <th>Camera Source</th>
                      <th>Triggered Event</th>
                      <th>Detection Type</th>
                      <th>AI Confidence</th>
                      <th>Severity</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map(act => (
                      <tr key={act.id}>
                        <td>
                          {act.status === 'Pending' && (
                            <span className="badge bg-danger pulse-badge">Pending</span>
                          )}
                          {act.status === 'Acknowledged' && (
                            <span className="badge bg-warning text-dark">Acknowledged</span>
                          )}
                          {act.status === 'Resolved' && (
                            <span className="badge bg-success">Resolved</span>
                          )}
                        </td>
                        <td className="small text-muted font-monospace">{act.time}</td>
                        <td className="fw-semibold text-dark small">{act.camera}</td>
                        <td>
                          <div className="fw-bold text-dark small">{act.event}</div>
                          <small className="text-muted">{act.details}</small>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border small">{act.type}</span>
                        </td>
                        <td className="small font-monospace fw-bold text-primary">{act.confidence}</td>
                        <td>
                          <span className={`badge ${
                            act.severity === 'High' ? 'bg-danger' :
                            act.severity === 'Medium' ? 'bg-warning text-dark' : 'bg-info text-dark'
                          }`}>
                            {act.severity}
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            className={`btn btn-sm ${
                              act.status === 'Pending' ? 'btn-outline-warning' :
                              act.status === 'Acknowledged' ? 'btn-outline-success' : 'btn-outline-secondary'
                            }`}
                            onClick={() => handleAcknowledgeActivity(act.id)}
                            disabled={act.status === 'Resolved'}
                          >
                            {act.status === 'Pending' ? 'Acknowledge' : act.status === 'Acknowledged' ? 'Mark Resolved' : 'Completed'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4 & 5: ADMIN SHORTCUT VIEWS */}
        {(currentView === 'admin-cameras' || currentView === 'admin-users') && (
          <AdminDashboard
            cameras={cameras}
            setCameras={setCameras}
            users={users}
            setUsers={setUsers}
            activities={activities}
            onSimulateTrigger={handleSimulateTrigger}
            aiRules={aiRules}
            setAiRules={setAiRules}
            onSwitchRole={handleSwitchRole}
          />
        )}
      </main>

      {/* College Project Footer */}
      <footer className="bg-white border-top py-3 mt-auto">
        <div className="container-fluid px-4 d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small">
          <div>
            <strong>Smart Campus CCTV Surveillance & AI Detection System</strong> &copy; {new Date().getFullYear()} — Computer Science Engineering Capstone Project
          </div>
          <div className="mt-2 mt-md-0">
            <span className="badge bg-secondary me-2">Frontend Prototype</span>
            <span>Stack: React.js + Bootstrap 5 + Bootstrap Icons</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
