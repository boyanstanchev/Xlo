export interface Ad {
  id? : string,
  title: string,
  condition: string,
  category?: string,
  subCategory?: string,
  featured?: boolean,
  model?: string,
  price: number,
  imageUrl: string,
  creator: string,
  isCreator?: boolean
}
