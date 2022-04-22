import { enumOrder } from '../orders';

export const ButtonsOrder = [
  {
    type: enumOrder.COMPLETED,
    background: '#456465',
    color: '#50D1AA'
  },
  {
    type: enumOrder.CANCELLED,
    background: '#4D1A23',
    color: '#9D0505'
  },
  {
    type: enumOrder.ORDERED,
    background: '#30405C',
    color: '#65B0F6'
  },
  {
    type: enumOrder.PENDING,
    background: '#4C3B39',
    color: '#FFB572'
  },
  {
    type: enumOrder.PREPARING,
    background: '#363455',
    color: '#9290FE'
  }
];
