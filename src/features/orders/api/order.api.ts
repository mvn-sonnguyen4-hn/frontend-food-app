import { api } from '@app/api/api';
import { OrderDef } from '../orders';

export const createOrder = (data: OrderDef[]) =>
  api.post('/order/create', { data });
