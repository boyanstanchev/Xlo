export interface Ad {
  id? : string,
  title: string,
  condition: string,
  category?: string,
  categoryName?: string,
  subCategory?: string,
  subCategoryName?: string,
  featured?: boolean,
  description?: string,
  price: number,
  imageUrl: string,
  creator: string,
  creatorUserName?: string,
  isCreator?: boolean
}
