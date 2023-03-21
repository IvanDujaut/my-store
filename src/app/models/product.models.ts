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
  // va a tener un atributo mas que no va
  // a ser calculado desde el backend sino desde
  // el frontend y va a ser opcional.
  taxes?: number;
}

export interface CreateProductDTO
  extends Omit<Product_Response, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {

}
