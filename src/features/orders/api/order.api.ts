import { api } from '@app/api/api';
import { OrderEndpointsEnum } from '../constants/order.endpoints';
import { OrderDef } from '../orders';

export const createOrder = (data: OrderDef[]) =>
  api.post(OrderEndpointsEnum.CREATE_ORDER, { data });

export const getOrdersByUser = () =>
  api.get(OrderEndpointsEnum.GET_ORDER_BY_USER);
