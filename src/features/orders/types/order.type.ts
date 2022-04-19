import { FoodDef } from '../../food/types/food.type';

export type OrderDef = {
  food: FoodDef | null;
  amount: number | null;
  note?: string;
  status?: enumOrder;
};

export type InitialStateDef = {
  listOrder: OrderDef[];
};

export enum enumOrder {
  PREPARING = 'Preparing',
  ORDER = 'Ordered',
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled'
}
