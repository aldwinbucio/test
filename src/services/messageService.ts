import type { Conversation, Message } from '../types/message';

// Simulated API data
// No dummy data, just empty arrays and stubs for backend integration

export async function fetchConversations(): Promise<Conversation[]> {
  // TODO: Replace with real API call
  return [];
}

export async function fetchMessages(conversationId: number): Promise<Message[]> {
  // TODO: Replace with real API call
  return [];
}

export async function sendMessage(conversationId: number, message: Message): Promise<void> {
  // TODO: Replace with real API call
  return;
}
