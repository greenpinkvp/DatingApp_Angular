export interface Message {
  id: string;
  senderId: string;
  senderUserName: string;
  senderPhotoUrl: string;
  recipientId: string;
  recipientUserName: string;
  recipientPhotoUrl?: any;
  content: string;
  dateRead?: Date;
  messageSent: Date;
}
