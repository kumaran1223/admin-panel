import { User, Conversation, Message } from '@/types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'online',
    lastActive: '2023-05-20T10:30:00Z',
    location: 'New York, USA',
    tags: ['Premium', 'Technical']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'offline',
    lastActive: '2023-05-19T15:45:00Z',
    location: 'London, UK',
    tags: ['Free Trial', 'Marketing']
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: 'away',
    lastActive: '2023-05-20T08:15:00Z',
    location: 'Berlin, Germany',
    tags: ['Enterprise', 'Support']
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    status: 'online',
    lastActive: '2023-05-20T11:20:00Z',
    location: 'Sydney, Australia',
    tags: ['Premium', 'Billing']
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    status: 'offline',
    lastActive: '2023-05-18T14:30:00Z',
    location: 'Toronto, Canada',
    tags: ['Free', 'Technical']
  },
  {
    id: '6',
    name: 'Sarah Brown',
    email: 'sarah.brown@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    status: 'online',
    lastActive: '2023-05-20T09:45:00Z',
    location: 'Paris, France',
    tags: ['Enterprise', 'Product Feedback']
  },
  {
    id: '7',
    name: 'David Lee',
    email: 'david.lee@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    status: 'away',
    lastActive: '2023-05-19T16:50:00Z',
    location: 'Tokyo, Japan',
    tags: ['Premium', 'Technical']
  },
  {
    id: '8',
    name: 'Lisa Taylor',
    email: 'lisa.taylor@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    status: 'online',
    lastActive: '2023-05-20T10:10:00Z',
    location: 'Madrid, Spain',
    tags: ['Free Trial', 'Sales']
  }
];
