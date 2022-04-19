import { FoodDef } from '../../food/types/food.type';

export type OrderDef = {
  food: FoodDef | null;
  amount: number | null;
  note?: string;
};

export type InitialStateDef = {
  listOrder: OrderDef[];
};
