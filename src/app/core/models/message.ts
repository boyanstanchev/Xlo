export interface Message {
  adId: string,
  adTitle: string,
  message: string,
  receiverId?: string,
  senderId?: string,
  senderName?: string,
  receiverName?: string
}
