import { AUTH_ROUTES } from '@app/features/auth/auth';
import { HOME_ROUTES } from '@app/features/home/home';
import { ORDER_ROUTES } from '@app/features/orders/routes/order.routes';
import { SETTING_ROUTES } from '@app/features/settings/settings';

export const PUBLIC_LIST = [...AUTH_ROUTES];
export const PRIVATE_LIST = [
  ...HOME_ROUTES,
  ...SETTING_ROUTES,
  ...ORDER_ROUTES
];
