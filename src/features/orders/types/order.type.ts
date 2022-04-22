import { UserDef } from './../../auth/types/auth.types';
import { FoodDef } from '../../food/types/food.type';

export type OrderDef = {
  food: FoodDef | null;
  amount: number | null;
  note?: string;
};

export type InitialStateDef = {
  _id: string;
  listOrder: OrderDef[];
  status: string;
  createAt: string;
  username: string;
  error: boolean;
};

export enum enumOrder {
  PREPARING = 'Preparing',
  ORDERED = 'Ordered',
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled'
}

export type OrderDetailDef = {
  _id: string;
  createdAt: string;
  foods: OrderDef[];
  status: enumOrder;
  user: UserDef;
  isChecked?: boolean;
};

export type OrderUpdateDef = {
  _id: string;
  status: string;
  listFood: OrderUpdateFoodsDef[];
};
export type OrderUpdateFoodsDef = {
  food: string;
  amount?: number;
  note?: string;
};
