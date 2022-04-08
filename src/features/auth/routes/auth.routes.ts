import BlankLayout from '@app/components/layouts/BlankLayout/BlackLayout';
import { AuthPathsEnum } from '@app/features/auth/constants/auth.paths';
import {RouteItemDef} from '@app/types/routes.types'
import LoginScreen from '../screens/LoginScreen/LoginScreen';
const LOGIN_SCREEN: RouteItemDef = {
    id: "login",
    path: AuthPathsEnum.LOGIN,
    component: LoginScreen,
    navigationTitle: "auth.loginTitle",
    layout: BlankLayout,
  };
  
  export const AUTH_ROUTES = [LOGIN_SCREEN];
  