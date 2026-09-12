// Student Project Mock Data (Smart CCTV Surveillance System)

export const INITIAL_USERS = [
  { id: 1, name: 'Campus Security Guard', email: 'guard@campus.edu', role: 'client', department: 'Campus Security Patrol' },
  { id: 2, name: 'System Administrator', email: 'admin@campus.edu', role: 'admin', department: 'IT & Safety Department' },
  { id: 3, name: 'Main Gate Incharge', email: 'gate@campus.edu', role: 'client', department: 'Main Gate Control' }
];

export const INITIAL_CAMERAS = [
  {
    id: 'CAM-01',
    name: 'Main Gate 1 - Vehicle Entry',
    location: 'North Campus Entrance',
    ip: '192.168.1.101',
    status: 'online',
    resolution: '1080p Full HD',
    type: 'Bullet Camera',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&auto=format&fit=crop&q=60',
    latestDetection: 'Vehicle Detected (96%)'
  },
  {
    id: 'CAM-02',
    name: 'Central Library - Main Corridor',
    location: 'Academic Block A, Ground Floor',
    ip: '192.168.1.102',
    status: 'online',
    resolution: '1080p Full HD',
    type: 'Dome Camera',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=60',
    latestDetection: 'Unattended Object / Bag (91%)'
  },
  {
    id: 'CAM-03',
    name: 'West Student Parking Lot',
    location: 'Parking Sector B',
    ip: '192.168.1.103',
    status: 'online',
    resolution: '1080p Full HD',
    type: 'PTZ Outdoor',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&auto=format&fit=crop&q=60',
    latestDetection: 'Motion Detected (Row 3)'
  },
  {
    id: 'CAM-04',
    name: 'Engineering Lab Quad',
    location: 'Science & Tech Courtyard',
    ip: '192.168.1.104',
    status: 'online',
    resolution: '720p HD',
    type: 'Bullet Camera',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60',
    latestDetection: 'Person Walking (89%)'
  },
  {
    id: 'CAM-05',
    name: 'Student Cafeteria',
    location: 'Campus Dining Block',
    ip: '192.168.1.105',
    status: 'online',
    resolution: '1080p Full HD',
    type: 'Dome Camera',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60',
    latestDetection: 'Normal Movement'
  },
  {
    id: 'CAM-06',
    name: 'Perimeter Sports Boundary',
    location: 'East Boundary Wall',
    ip: '192.168.1.106',
    status: 'offline',
    resolution: '1080p Full HD',
    type: 'Night-Vision Bullet',
    image: 'https://images.unsplash.com/photo-1508873696983-2df57036476b?w=600&auto=format&fit=crop&q=60',
    latestDetection: 'No Signal'
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'EVT-101',
    time: '11:45 PM',
    camera: 'Main Gate 1 - Vehicle Entry',
    cameraId: 'CAM-01',
    event: 'Unauthorized Vehicle Entered Without RFID',
    type: 'Vehicle Detection',
    severity: 'High',
    confidence: '95%',
    status: 'Pending',
    details: 'Car passed through gate after hours. License plate flagged by AI.'
  },
  {
    id: 'EVT-102',
    time: '11:32 PM',
    camera: 'Central Library - Main Corridor',
    cameraId: 'CAM-02',
    event: 'Unattended Bag Detected on Staircase',
    type: 'Object Detection',
    severity: 'High',
    confidence: '91%',
    status: 'Pending',
    details: 'Black backpack stationary for more than 15 minutes with no owner.'
  },
  {
    id: 'EVT-103',
    time: '11:15 PM',
    camera: 'West Student Parking Lot',
    cameraId: 'CAM-03',
    event: 'Suspicious Loitering Near Vehicles',
    type: 'Motion / Loitering',
    severity: 'Medium',
    confidence: '88%',
    status: 'Acknowledged',
    details: 'Individual lingering around vehicles in parking lot for over 3 minutes.'
  },
  {
    id: 'EVT-104',
    time: '10:50 PM',
    camera: 'Engineering Lab Quad',
    cameraId: 'CAM-04',
    event: 'After-Hours Foot Movement',
    type: 'Human Detection',
    severity: 'Low',
    confidence: '93%',
    status: 'Resolved',
    details: 'Students detected walking towards computer lab. Verified as authorized lab scholars.'
  },
  {
    id: 'EVT-105',
    time: '09:15 PM',
    camera: 'Perimeter Sports Boundary',
    cameraId: 'CAM-06',
    event: 'Camera Feed Disconnected',
    type: 'System Health',
    severity: 'High',
    confidence: '100%',
    status: 'Acknowledged',
    details: 'Network ping timeout on 192.168.1.106. Guard dispatched to check Ethernet switch.'
  }
];

export const AI_RULE_SETTINGS = [
  { id: 1, name: 'Motion Detection Trigger', description: 'Triggers alert when movement is detected during night curfew hours', enabled: true },
  { id: 2, name: 'Human / Person Detection', description: 'Detects humans walking in restricted campus zones', enabled: true },
  { id: 3, name: 'Unattended Bag / Object Detection', description: 'Detects bags or packages left stationary for over 10 minutes', enabled: true },
  { id: 4, name: 'Vehicle Number Plate Recognition', description: 'Reads incoming vehicle plates and flags unauthorized entries', enabled: true },
  { id: 5, name: 'Perimeter Boundary Tripwire', description: 'Triggers alarm when anyone crosses virtual campus boundary fence', enabled: false }
];
