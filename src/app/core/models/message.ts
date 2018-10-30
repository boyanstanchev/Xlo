export interface Message {
  message: string,
  senderName: string,
  isSender?: boolean
  date: number
  read: boolean
  conversationId?: string
}
