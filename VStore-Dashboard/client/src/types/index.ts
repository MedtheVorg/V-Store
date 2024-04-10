export type Store = {
  _id: string;
  name: string;
  userId: string;
};

export type Billboard = {
  _id: string;
  label: string;
  imageUrl: string;
  storeId: string;
  createdAt: string;
};

export type Category = {
  _id: string;
  name: string;
  billboardId: Billboard | string;
  storeId: string;
  createdAt: string;
};
export type Size = {
  _id: string;
  name: string;
  value: string;
  storeId: string;
  createdAt: string;
};
export type Color = {
  _id: string;
  name: string;
  value: string;
  storeId: string;
  createdAt: string;
};

export type Image = {
  url: string;
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  images: Image[];
  category: Category;
  size: Size;
  color: Color;
  storeId: string;
  createdAt: string;
};

export type OrderItem = Product;
export type Order = {
  _id: string;
  isPaid: boolean;
  phone: string;
  address: string;
  orderItems: OrderItem[];
  storeId: string;
  createdAt: string;
};

export type User = {
  _id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
