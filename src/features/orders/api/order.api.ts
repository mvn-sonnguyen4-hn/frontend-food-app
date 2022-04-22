import { OrderUpdateDef } from './../types/order.type';
import { api } from '@app/api/api';
import { OrderEndpointsEnum } from '../constants/order.endpoints';
import { OrderDef } from '../orders';

export const createOrder = (data: OrderDef[]) =>
  api.post(OrderEndpointsEnum.CREATE_ORDER, { listFood: data });

export const getOrdersByUser = (page = 1) =>
  api.get(OrderEndpointsEnum.GET_ORDER_BY_USER, {
    params: {
      page
    }
  });

export const updateOrder = (data: OrderUpdateDef) => {
  return api.put(OrderEndpointsEnum.UPDATE_ORDER, data);
};

export const deleteOrders = (data: string[]) => {
  return api.post(OrderEndpointsEnum.DELETE_ORDER, {
    id_orders: data
  });
};
