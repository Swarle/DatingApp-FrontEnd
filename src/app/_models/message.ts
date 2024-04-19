export interface Message{
  id: number
  senderId: number
  senderPhotoUrl: string
  senderUsername: string
  recipientId: number
  recipientPhotoUrl: string
  recipientUsername: string
  content: string
  dateRead: string
  messageSent: string
}
