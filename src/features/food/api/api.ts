import { FoodResponse } from '@app/features/food/food';
import { AxiosResponse } from "axios";
import {api} from "@app/api/api";
import { FoodndpointsEnum } from "../constants/food.endpoints";
export const getListFood = (): Promise<AxiosResponse<FoodResponse>> => {
    return api.get(FoodndpointsEnum.GET_LIST_FOOD);
}