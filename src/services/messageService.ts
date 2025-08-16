import type { Conversation, Message } from '../types/message';

// TODO: Replace these with actual API endpoints
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export async function fetchConversations(): Promise<Conversation[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations`);
    if (!response.ok) {
      throw new Error('Failed to fetch conversations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
}

export async function fetchMessages(conversationId: number): Promise<Message[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`);
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function sendMessage(conversationId: number, message: Message): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}
