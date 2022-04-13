export type FoodDef = {
  name: string;
  price: number;
  url_img: string;
  avaiable: number;
};
export type FoodResponse = {
  data: FoodDef[];
  limit: number;
  page: number;
  totalPage: number;
};
