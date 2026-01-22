// Mock Data for CampusPulse

export const USERS = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    department: 'Computer Science',
    year: 'Junior',
    skills: ['React', 'Node.js', 'UI/UX'],
    bio: 'Passionate about building innovative solutions',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@university.edu',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    department: 'Administration',
    year: 'Staff',
  },
  {
    id: '3',
    name: 'Michael Park',
    email: 'michael.park@university.edu',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    department: 'Design',
    year: 'Senior',
    skills: ['Figma', 'UI/UX', 'Motion Design'],
    bio: 'Creative designer looking for team opportunities',
  },
]

export const EVENTS = [
  {
    id: '1',
    title: 'Hackathon 2024',
    description: 'Annual university hackathon with amazing prizes',
    date: '2024-03-15',
    time: '09:00',
    location: 'Main Auditorium',
    type: 'global',
    category: 'Technical',
    registered: 245,
    maxCapacity: 300,
    image: 'https://images.unsplash.com/photo-1504384308090-c54be3852f33?w=400',
    organizer: 'CS Department',
  },
  {
    id: '2',
    title: 'Career Fair',
    description: 'Meet top recruiters from leading tech companies',
    date: '2024-03-20',
    time: '10:00',
    location: 'Student Center',
    type: 'global',
    category: 'Professional',
    registered: 520,
    maxCapacity: 600,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    organizer: 'Career Services',
  },
  {
    id: '3',
    title: 'Code Workshop: React Advanced',
    description: 'Deep dive into React hooks and performance',
    date: '2024-03-18',
    time: '14:00',
    location: 'Lab 201',
    type: 'campus',
    category: 'Workshop',
    registered: 45,
    maxCapacity: 50,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
    organizer: 'Web Dev Club',
  },
  {
    id: '4',
    title: 'Design Sprint',
    description: '48-hour design challenge',
    date: '2024-03-22',
    time: '18:00',
    location: 'Innovation Hub',
    type: 'campus',
    category: 'Design',
    registered: 32,
    maxCapacity: 40,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    organizer: 'Design Society',
  },
  {
    id: '5',
    title: 'AI/ML Symposium',
    description: 'Latest advances in Artificial Intelligence',
    date: '2024-03-25',
    time: '09:00',
    location: 'Conference Hall A',
    type: 'global',
    category: 'Technical',
    registered: 180,
    maxCapacity: 250,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
    organizer: 'AI Research Lab',
  },
  {
    id: '6',
    title: 'Startup Pitch Night',
    description: 'Student startup presentations and networking',
    date: '2024-03-28',
    time: '17:00',
    location: 'Entrepreneurship Center',
    type: 'campus',
    category: 'Business',
    registered: 89,
    maxCapacity: 100,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
    organizer: 'Startup Club',
  },
]

export const RECRUITMENT_POSTS = [
  {
    id: '1',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      department: 'Computer Science',
    },
    title: 'Building a Campus Navigation App',
    description: 'Looking for motivated students to build an AR navigation app for our campus. This will be submitted to the Google Solution Challenge!',
    openRoles: [
      { name: 'UI/UX Designer', color: 'bg-purple-500' },
      { name: 'Mobile Developer', color: 'bg-blue-500' },
      { name: 'Backend Engineer', color: 'bg-green-500' },
    ],
    teamSize: '4/6',
    postedAt: '2024-03-10T10:30:00Z',
    isGlobal: true,
  },
  {
    id: '2',
    author: {
      name: 'David Kim',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      department: 'Business',
    },
    title: 'Sustainable Campus Initiative',
    description: 'Creating a platform to track and improve campus sustainability. Need developers and designers passionate about environmental causes.',
    openRoles: [
      { name: 'Frontend Dev', color: 'bg-indigo-500' },
      { name: 'Data Analyst', color: 'bg-orange-500' },
    ],
    teamSize: '3/5',
    postedAt: '2024-03-11T14:20:00Z',
    isGlobal: false,
  },
  {
    id: '3',
    author: {
      name: 'Lisa Thompson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      department: 'Design',
    },
    title: 'Student Mental Health App',
    description: 'Building an app to support student mental health. Seeking creative minds to design engaging and supportive user experiences.',
    openRoles: [
      { name: 'UI/UX Designer', color: 'bg-purple-500' },
      { name: 'Product Manager', color: 'bg-pink-500' },
      { name: 'Mobile Developer', color: 'bg-blue-500' },
    ],
    teamSize: '2/5',
    postedAt: '2024-03-12T09:15:00Z',
    isGlobal: true,
  },
  {
    id: '4',
    author: {
      name: 'James Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      department: 'Engineering',
    },
    title: 'Smart Campus IoT Project',
    description: 'Working on sensor networks for smart building management. Great opportunity for embedded systems enthusiasts!',
    openRoles: [
      { name: 'IoT Engineer', color: 'bg-cyan-500' },
      { name: 'Backend Engineer', color: 'bg-green-500' },
    ],
    teamSize: '5/6',
    postedAt: '2024-03-12T16:45:00Z',
    isGlobal: false,
  },
]

export const CERTIFICATIONS = [
  {
    id: '1',
    name: 'React Developer Professional',
    issuer: 'Meta',
    date: '2024-01-15',
    credentialId: 'Meta-React-2024-001',
    type: 'global',
  },
  {
    id: '2',
    name: 'Google UX Design Certificate',
    issuer: 'Google',
    date: '2023-11-20',
    credentialId: 'Google-UX-2023-156',
    type: 'global',
  },
  {
    id: '3',
    name: 'Advanced Python Programming',
    issuer: 'University',
    date: '2023-10-05',
    credentialId: 'CS-Cert-2023-089',
    type: 'campus',
  },
  {
    id: '4',
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon',
    date: '2024-02-01',
    credentialId: 'AWS-CP-2024-234',
    type: 'global',
  },
]

export const LIVE_CHECKINS = [
  { id: '1', name: 'Alex J.', event: 'Hackathon 2024', time: new Date(Date.now() - 30000), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { id: '2', name: 'Maria S.', event: 'Career Fair', time: new Date(Date.now() - 60000), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
  { id: '3', name: 'John D.', event: 'Hackathon 2024', time: new Date(Date.now() - 120000), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: '4', name: 'Sophie L.', event: 'Code Workshop', time: new Date(Date.now() - 180000), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie' },
  { id: '5', name: 'Ryan K.', event: 'Career Fair', time: new Date(Date.now() - 240000), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan' },
  { id: '6', name: 'Olivia M.', event: 'Hackathon 2024', time: new Date(Date.now() - 300000), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia' },
  { id: '7', name: 'Daniel P.', event: 'Design Sprint', time: new Date(Date.now() - 360000), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel' },
  { id: '8', name: 'Emily R.', event: 'Career Fair', time: new Date(Date.now() - 420000), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
]

export const ANALYTICS_DATA = [
  { department: 'CS', attendance: 450, engagement: 85 },
  { department: 'Design', attendance: 180, engagement: 92 },
  { department: 'Business', attendance: 320, engagement: 78 },
  { department: 'Engineering', attendance: 280, engagement: 88 },
  { department: 'Arts', attendance: 150, engagement: 75 },
  { department: 'Sciences', attendance: 220, engagement: 82 },
]

export const KPIS = [
  { 
    id: '1', 
    label: 'Active Events', 
    value: 24, 
    change: 12, 
    trend: 'up',
    icon: 'Calendar' 
  },
  { 
    id: '2', 
    label: 'Total Attendance', 
    value: '3,847', 
    change: 8.2, 
    trend: 'up',
    icon: 'Users' 
  },
  { 
    id: '3', 
    label: 'Engagement Rate', 
    value: '94.2%', 
    change: 2.1, 
    trend: 'up',
    icon: 'TrendingUp' 
  },
]

export const SIDEBAR_ITEMS = {
  admin: [
    { icon: 'LayoutDashboard', label: 'Dashboard', href: '/admin' },
    { icon: 'QrCode', label: 'Smart Attendance', href: '/admin/attendance' },
    { icon: 'Radio', label: 'Live Feed', href: '/admin/feed' },
    { icon: 'BarChart3', label: 'Analytics', href: '/admin/analytics' },
    { icon: 'MessageSquare', label: 'AI Assistant', href: '/admin/chatbot' },
    { icon: 'Users', label: 'Manage Users', href: '/admin/users' },
    { icon: 'Settings', label: 'Settings', href: '/admin/settings' },
  ],
  student: [
    { icon: 'Compass', label: 'Discover', href: '/student' },
    { icon: 'Users', label: 'Team Match', href: '/student/teams' },
    { icon: 'Calendar', label: 'My Events', href: '/student/events' },
    { icon: 'Award', label: 'Certifications', href: '/student/certs' },
    { icon: 'User', label: 'Portfolio', href: '/student/profile' },
  ],
}

