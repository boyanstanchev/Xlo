export interface Message {
  conversationId: string,
  message: string,
  senderName: string,
  date: Date | number, //TODO
  read: boolean
}
