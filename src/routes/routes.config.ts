import { AUTH_ROUTES } from "@app/features/auth/auth";
import { HOME_ROUTES } from "@app/features/home/home";
import { SETTING_ROUTES } from "@app/features/settings/settings";

export const PUBLIC_LIST = [...AUTH_ROUTES,...HOME_ROUTES,...SETTING_ROUTES];
export const PRIVATE_LIST = [];
