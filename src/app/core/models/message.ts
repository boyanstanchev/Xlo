export interface Message {
  conversationId: string,
  message: string,
  senderName: string,
  isSender?: boolean
  date: number
  read: boolean
}
