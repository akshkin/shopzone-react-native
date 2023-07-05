export type ProductType = {
  _id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity?: number | undefined;
  description?: string | undefined;
  rating: {
    rate: number;
    count: number;
  };
};
