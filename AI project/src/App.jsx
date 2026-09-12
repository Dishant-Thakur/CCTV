import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CameraCard from './components/CameraCard';
import { INITIAL_USERS, INITIAL_CAMERAS, INITIAL_ACTIVITIES, AI_RULE_SETTINGS } from './data/mockData';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]); // Default: Client (Security Guard)
  const [currentView, setCurrentView] = useState('dashboard');

  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [aiRules, setAiRules] = useState(AI_RULE_SETTINGS);

  const DEMO_EVENTS = [
    {
      event: 'Motion Detected Near Science Lab Exit',
      type: 'Motion Detection',
      severity: 'Medium',
      confidence: '92%',
      details: 'Infrared sensor triggered movement after building closure.'
    },
    {
      event: 'Unattended School Bag Flagged',
      type: 'Object Detection',
      severity: 'High',
      confidence: '96%',
      details: 'Object left unattended near library stairs for over 10 minutes.'
    },
    {
      event: 'Unauthorized Vehicle Without Pass',
      type: 'Vehicle Detection',
      severity: 'High',
      confidence: '94%',
      details: 'Vehicle passed main gate boom barrier without registered RFID.'
    },
    {
      event: 'Student Crowd / Loitering in Parking',
      type: 'Crowd Detection',
      severity: 'Low',
      confidence: '87%',
      details: 'Group of 4 or more individuals stationary in parking bay after hours.'
    },
    {
      event: 'Boundary Tripwire Breach Alert',
      type: 'Perimeter Tripwire',
      severity: 'High',
      confidence: '98%',
      details: 'Virtual perimeter line crossed near East fence area.'
    }
  ];

  // Simulate new trigger event
  const handleSimulateTrigger = (forcedCamId = null) => {
    const randomEvent = DEMO_EVENTS[Math.floor(Math.random() * DEMO_EVENTS.length)];
    const cam = forcedCamId 
      ? cameras.find(c => c.id === forcedCamId) || cameras[0]
      : cameras[Math.floor(Math.random() * cameras.length)];

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const created = {
      id: `EVT-${Date.now().toString().slice(-3)}`,
      time: timeStr,
      camera: cam ? cam.name : 'Main Gate 1',
      cameraId: cam ? cam.id : 'CAM-01',
      event: randomEvent.event,
      type: randomEvent.type,
      severity: randomEvent.severity,
      confidence: randomEvent.confidence,
      status: 'Pending',
      details: randomEvent.details
    };

    setActivities(prev => [created, ...prev]);
    return created;
  };

  // Acknowledge / Resolve Activity
  const handleAcknowledge = (actId) => {
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

  // Switch role button
  const handleSwitchRole = () => {
    if (currentUser.role === 'client') {
      const admin = users.find(u => u.role === 'admin') || {
        id: 2,
        name: 'System Administrator',
        email: 'admin@campus.edu',
        role: 'admin',
        department: 'IT & Safety Department'
      };
      setCurrentUser(admin);
    } else {
      const client = users.find(u => u.role === 'client') || {
        id: 1,
        name: 'Campus Security Guard',
        email: 'guard@campus.edu',
        role: 'client',
        department: 'Campus Security Patrol'
      };
      setCurrentUser(client);
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
          setCurrentView('dashboard');
        }} 
      />
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={() => setIsAuthenticated(false)}
        onSwitchRole={handleSwitchRole}
        activities={activities}
      />

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
              onAcknowledgeActivity={handleAcknowledge}
              onSimulateTrigger={handleSimulateTrigger}
            />
          )
        )}

        {/* VIEW 2: LIVE CAMERAS */}
        {currentView === 'cameras' && (
          <div className="container-fluid px-4 py-3">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <div>
                <h4 className="fw-bold mb-1">Live Campus CCTV Feeds</h4>
                <small className="text-muted">Multi-channel video stream wall.</small>
              </div>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => handleSimulateTrigger()}
              >
                <i className="bi bi-lightning-fill me-1"></i> Trigger Test Alert
              </button>
            </div>

            <div className="row g-3">
              {cameras.map(cam => (
                <div key={cam.id} className="col-12 col-md-6 col-lg-4">
                  <CameraCard 
                    camera={cam} 
                    onTriggerAlert={(camId) => handleSimulateTrigger(camId)} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: TRIGGERED ACTIVITIES TABLE */}
        {currentView === 'activities' && (
          <div className="container-fluid px-4 py-3">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <div>
                <h4 className="fw-bold mb-1">All Triggered AI Activities</h4>
                <small className="text-muted">Recorded audit trail of all detected security events.</small>
              </div>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => handleSimulateTrigger()}
              >
                <i className="bi bi-lightning-fill me-1"></i> Simulate New Trigger
              </button>
            </div>

            <div className="card shadow-sm border">
              <div className="card-header bg-white py-3">
                <h6 className="fw-bold mb-0">Detection Logs ({activities.length} Events)</h6>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle mb-0">
                  <thead className="table-light small">
                    <tr>
                      <th>Status</th>
                      <th>Time</th>
                      <th>Camera Location</th>
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
                          {act.status === 'Pending' && <span className="badge bg-danger">Pending</span>}
                          {act.status === 'Acknowledged' && <span className="badge bg-warning text-dark">Acknowledged</span>}
                          {act.status === 'Resolved' && <span className="badge bg-success">Resolved</span>}
                        </td>
                        <td className="small text-muted">{act.time}</td>
                        <td className="fw-bold small">{act.camera}</td>
                        <td>
                          <div className="fw-bold small">{act.event}</div>
                          <small className="text-muted">{act.details}</small>
                        </td>
                        <td><span className="badge bg-light text-dark border">{act.type}</span></td>
                        <td className="small fw-bold text-primary">{act.confidence}</td>
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
                              act.status === 'Pending' ? 'btn-warning text-dark fw-semibold' :
                              act.status === 'Acknowledged' ? 'btn-success fw-semibold' : 'btn-outline-secondary'
                            }`}
                            onClick={() => handleAcknowledge(act.id)}
                            disabled={act.status === 'Resolved'}
                          >
                            {act.status === 'Pending' ? 'Acknowledge' : act.status === 'Acknowledged' ? 'Mark Resolved' : 'Done'}
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

        {/* Admin Shortcut views */}
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
            <strong>Smart CCTV Surveillance & AI Detection System</strong> &copy; {new Date().getFullYear()} &bull; Final Year Project
          </div>
          <div>
            <span>Frontend: React.js + Bootstrap 5</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
