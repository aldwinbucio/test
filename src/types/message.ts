export interface Message {
  from: string;
  avatar: string;
  text: string;
  time: string;
}

export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  preview: string;
  messages: Message[];
}
