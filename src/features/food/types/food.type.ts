export type FoodDef = {
  name: string;
  price: number;
  url_img: string;
  avaiable: number;
};
export type FoodResponse = {
  data: [
    {
      name: string;
      price: number;
      url_img: string;
      avaiable: number;
    }
  ];
};
