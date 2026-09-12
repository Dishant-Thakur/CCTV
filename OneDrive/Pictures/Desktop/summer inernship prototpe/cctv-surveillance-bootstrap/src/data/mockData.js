// Realistic Mock Data for College CCTV Surveillance Project (React + Bootstrap)

export const INITIAL_USERS = [
  { id: 1, name: 'Campus Security Guard', email: 'guard@campus.edu', role: 'client', department: 'Campus Security & Patrol' },
  { id: 2, name: 'System Administrator', email: 'admin@campus.edu', role: 'admin', department: 'IT & Safety Department' },
  { id: 3, name: 'Gate 1 Operator', email: 'operator1@campus.edu', role: 'client', department: 'Main Gate Control' }
];

export const INITIAL_CAMERAS = [
  {
    id: 'CAM-01',
    name: 'Main Gate 1 - Vehicle Entry',
    location: 'North Campus Entrance',
    ip: '192.168.1.101',
    status: 'online',
    resolution: '1080p (30fps)',
    type: 'Outdoor Bullet',
    scene: 'gate',
    aiDetections: ['Vehicle Detected (98%)', 'Driver Motion']
  },
  {
    id: 'CAM-02',
    name: 'Central Library - Main Corridor',
    location: 'Academic Block A, Ground Floor',
    ip: '192.168.1.102',
    status: 'online',
    resolution: '1080p (25fps)',
    type: 'Indoor Dome',
    scene: 'hallway',
    aiDetections: ['Person Walking (94%)', 'Backpack Detected']
  },
  {
    id: 'CAM-03',
    name: 'West Student Parking Lot',
    location: 'Zone B Parking Deck',
    ip: '192.168.1.103',
    status: 'online',
    resolution: '1080p (30fps)',
    type: 'Outdoor PTZ',
    scene: 'parking',
    aiDetections: ['Car Parked', 'Motion in Row 4']
  },
  {
    id: 'CAM-04',
    name: 'Science & Computer Lab Quad',
    location: 'Engineering Building Courtyard',
    ip: '192.168.1.104',
    status: 'online',
    resolution: '1080p (25fps)',
    type: 'Outdoor Bullet',
    scene: 'quad',
    aiDetections: ['3 Students Detected (91%)']
  },
  {
    id: 'CAM-05',
    name: 'Cafeteria & Dining Hall',
    location: 'Student Activity Center',
    ip: '192.168.1.105',
    status: 'online',
    resolution: '720p (25fps)',
    type: 'Indoor Dome',
    scene: 'dining',
    aiDetections: ['Crowd Normal (42%)']
  },
  {
    id: 'CAM-06',
    name: 'East Boundary Fence Line',
    location: 'Perimeter Sector 3',
    ip: '192.168.1.106',
    status: 'offline',
    resolution: '1080p (0fps)',
    type: 'Infrared Night-Vision',
    scene: 'offline',
    aiDetections: []
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'ACT-101',
    time: '11:42 PM',
    timeAgo: '3 mins ago',
    camera: 'Main Gate 1 - Vehicle Entry',
    cameraId: 'CAM-01',
    event: 'Vehicle Entered Without Badge Scan',
    type: 'Vehicle Alert',
    severity: 'High',
    confidence: '95%',
    status: 'Pending',
    details: 'Silver sedan passed barrier gate after hours. License plate flagged for security review.'
  },
  {
    id: 'ACT-102',
    time: '11:35 PM',
    timeAgo: '10 mins ago',
    camera: 'Central Library - Main Corridor',
    cameraId: 'CAM-02',
    event: 'Unattended Object Detected',
    type: 'Object Detection',
    severity: 'High',
    confidence: '91%',
    status: 'Pending',
    details: 'Black backpack stationary near stairs for more than 15 minutes with no owner detected.'
  },
  {
    id: 'ACT-103',
    time: '11:15 PM',
    timeAgo: '30 mins ago',
    camera: 'West Student Parking Lot',
    cameraId: 'CAM-03',
    event: 'Suspicious Loitering Motion',
    type: 'Motion / Loitering',
    severity: 'Medium',
    confidence: '88%',
    status: 'Acknowledged',
    details: 'Person detected lingering around parked vehicles for over 3 minutes.'
  },
  {
    id: 'ACT-104',
    time: '10:48 PM',
    timeAgo: '1 hr ago',
    camera: 'Science & Computer Lab Quad',
    cameraId: 'CAM-04',
    event: 'After-Hours Foot Traffic',
    type: 'Person Motion',
    severity: 'Low',
    confidence: '93%',
    status: 'Resolved',
    details: 'Two students detected walking toward lab entrance. Verified as authorized lab staff.'
  },
  {
    id: 'ACT-105',
    time: '09:20 PM',
    timeAgo: '2.5 hrs ago',
    camera: 'East Boundary Fence Line',
    cameraId: 'CAM-06',
    event: 'Camera Connection Lost',
    type: 'System Health',
    severity: 'High',
    confidence: '100%',
    status: 'Acknowledged',
    details: 'Network ping timeout on 192.168.1.106. Guard dispatched to check PoE switch port.'
  }
];

export const AI_RULE_SETTINGS = [
  { id: 1, name: 'Motion Detection Trigger', description: 'Trigger alert when significant movement is detected in night hours', enabled: true },
  { id: 2, name: 'Human / Person Detection', description: 'Detect humans walking in restricted or after-hours zones', enabled: true },
  { id: 3, name: 'Unattended Bag / Object Alert', description: 'Trigger alert if an object is left stationary for over 10 minutes', enabled: true },
  { id: 4, name: 'Vehicle License Plate Recognition', description: 'Catalog incoming vehicles and flag unregistered plates', enabled: true },
  { id: 5, name: 'Perimeter Fence Crossing / Tripwire', description: 'Immediate buzzer alert if someone breaches virtual boundary line', enabled: false }
];
