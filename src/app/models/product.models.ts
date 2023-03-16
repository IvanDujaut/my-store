export interface Category_Response {
  id: string;
  name: string;
}


export interface Product_Response {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category_Response;
  images: string[];
}
