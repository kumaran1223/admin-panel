import { Conversation, Message } from '@/types';

export const messages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      userId: '1',
      content: 'Hi there! I\'m having an issue with my account. Can you help me?',
      timestamp: '2023-05-20T10:15:00Z',
      isUser: true
    },
    {
      id: '102',
      userId: '1',
      content: 'Of course! I\'d be happy to help. Could you please provide more details about the issue you\'re experiencing?',
      timestamp: '2023-05-20T10:17:00Z',
      isUser: false
    },
    {
      id: '103',
      userId: '1',
      content: 'I can\'t access my premium features even though I\'ve already paid for the subscription.',
      timestamp: '2023-05-20T10:20:00Z',
      isUser: true
    },
    {
      id: '104',
      userId: '1',
      content: 'I understand. Let me check your account status. Could you please confirm when you made the payment?',
      timestamp: '2023-05-20T10:22:00Z',
      isUser: false
    },
    {
      id: '105',
      userId: '1',
      content: 'I made the payment yesterday around 3 PM.',
      timestamp: '2023-05-20T10:25:00Z',
      isUser: true
    }
  ],
  '2': [
    {
      id: '201',
      userId: '2',
      content: 'Hello! I\'m interested in upgrading my plan. What options do you have?',
      timestamp: '2023-05-19T15:30:00Z',
      isUser: true
    },
    {
      id: '202',
      userId: '2',
      content: 'Hi Jane! Great to hear you\'re interested in upgrading. We have several plans available. Could you tell me more about your needs?',
      timestamp: '2023-05-19T15:32:00Z',
      isUser: false
    },
    {
      id: '203',
      userId: '2',
      content: 'I need something that allows for team collaboration and more storage.',
      timestamp: '2023-05-19T15:35:00Z',
      isUser: true
    }
  ],
  '3': [
    {
      id: '301',
      userId: '3',
      content: 'I\'m experiencing a technical issue with the API integration.',
      timestamp: '2023-05-20T08:00:00Z',
      isUser: true
    },
    {
      id: '302',
      userId: '3',
      content: 'I\'m sorry to hear that. Could you provide the error message you\'re receiving?',
      timestamp: '2023-05-20T08:05:00Z',
      isUser: false
    },
    {
      id: '303',
      userId: '3',
      content: 'Error: Authentication failed. Invalid API key.',
      timestamp: '2023-05-20T08:10:00Z',
      isUser: true
    }
  ],
  '4': [
    {
      id: '401',
      userId: '4',
      content: 'When will the new features be released?',
      timestamp: '2023-05-20T11:00:00Z',
      isUser: true
    },
    {
      id: '402',
      userId: '4',
      content: 'We\'re planning to release the new features by the end of this month. Is there a specific feature you\'re waiting for?',
      timestamp: '2023-05-20T11:05:00Z',
      isUser: false
    },
    {
      id: '403',
      userId: '4',
      content: 'Yes, I\'m particularly interested in the advanced reporting tools.',
      timestamp: '2023-05-20T11:10:00Z',
      isUser: true
    }
  ],
  '5': [
    {
      id: '501',
      userId: '5',
      content: 'How do I cancel my subscription?',
      timestamp: '2023-05-18T14:00:00Z',
      isUser: true
    },
    {
      id: '502',
      userId: '5',
      content: 'I\'m sorry to hear you want to cancel. You can do this by going to Settings > Subscription > Cancel. May I ask why you\'re considering cancellation?',
      timestamp: '2023-05-18T14:10:00Z',
      isUser: false
    },
    {
      id: '503',
      userId: '5',
      content: 'I\'m just not using the service as much as I thought I would.',
      timestamp: '2023-05-18T14:20:00Z',
      isUser: true
    }
  ],
  '6': [
    {
      id: '601',
      userId: '6',
      content: 'I have a suggestion for improving the user interface.',
      timestamp: '2023-05-20T09:30:00Z',
      isUser: true
    },
    {
      id: '602',
      userId: '6',
      content: 'We always appreciate feedback! Please share your suggestion with us.',
      timestamp: '2023-05-20T09:35:00Z',
      isUser: false
    },
    {
      id: '603',
      userId: '6',
      content: 'I think it would be helpful to have a dark mode option.',
      timestamp: '2023-05-20T09:40:00Z',
      isUser: true
    }
  ],
  '7': [
    {
      id: '701',
      userId: '7',
      content: 'Is there a mobile app available?',
      timestamp: '2023-05-19T16:30:00Z',
      isUser: true
    },
    {
      id: '702',
      userId: '7',
      content: 'Yes, we have mobile apps for both iOS and Android. You can download them from the App Store or Google Play Store.',
      timestamp: '2023-05-19T16:35:00Z',
      isUser: false
    },
    {
      id: '703',
      userId: '7',
      content: 'Great! Do they have all the same features as the web version?',
      timestamp: '2023-05-19T16:40:00Z',
      isUser: true
    }
  ],
  '8': [
    {
      id: '801',
      userId: '8',
      content: 'I\'d like to schedule a demo for my team.',
      timestamp: '2023-05-20T10:00:00Z',
      isUser: true
    },
    {
      id: '802',
      userId: '8',
      content: 'We\'d be happy to arrange a demo. Could you let me know how many people will be attending and what specific aspects you\'d like us to focus on?',
      timestamp: '2023-05-20T10:05:00Z',
      isUser: false
    }
  ]
};

export const conversations: Conversation[] = [
  {
    id: '1',
    userId: '1',
    status: 'active',
    lastMessage: 'I made the payment yesterday around 3 PM.',
    lastMessageTime: '2023-05-20T10:25:00Z',
    unreadCount: 0,
    messages: messages['1']
  },
  {
    id: '2',
    userId: '2',
    status: 'waiting',
    lastMessage: 'I need something that allows for team collaboration and more storage.',
    lastMessageTime: '2023-05-19T15:35:00Z',
    unreadCount: 1,
    messages: messages['2']
  },
  {
    id: '3',
    userId: '3',
    status: 'new',
    lastMessage: 'Error: Authentication failed. Invalid API key.',
    lastMessageTime: '2023-05-20T08:10:00Z',
    unreadCount: 2,
    messages: messages['3']
  },
  {
    id: '4',
    userId: '4',
    status: 'active',
    lastMessage: 'Yes, I\'m particularly interested in the advanced reporting tools.',
    lastMessageTime: '2023-05-20T11:10:00Z',
    unreadCount: 0,
    messages: messages['4']
  },
  {
    id: '5',
    userId: '5',
    status: 'resolved',
    lastMessage: 'I\'m just not using the service as much as I thought I would.',
    lastMessageTime: '2023-05-18T14:20:00Z',
    unreadCount: 0,
    messages: messages['5']
  },
  {
    id: '6',
    userId: '6',
    status: 'active',
    lastMessage: 'I think it would be helpful to have a dark mode option.',
    lastMessageTime: '2023-05-20T09:40:00Z',
    unreadCount: 1,
    messages: messages['6']
  },
  {
    id: '7',
    userId: '7',
    status: 'waiting',
    lastMessage: 'Great! Do they have all the same features as the web version?',
    lastMessageTime: '2023-05-19T16:40:00Z',
    unreadCount: 0,
    messages: messages['7']
  },
  {
    id: '8',
    userId: '8',
    status: 'new',
    lastMessage: 'I\'d like to schedule a demo for my team.',
    lastMessageTime: '2023-05-20T10:00:00Z',
    unreadCount: 1,
    messages: messages['8']
  }
];
