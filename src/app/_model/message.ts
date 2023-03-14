export interface Message {
  id: string;
  senderId: string;
  senderUsername: string;
  senderPhotoUrl: string;
  recipientId: string;
  recipientUsername: string;
  recipientPhotoUrl?: any;
  content: string;
  dateRead?: Date;
  messageSent: Date;
}
