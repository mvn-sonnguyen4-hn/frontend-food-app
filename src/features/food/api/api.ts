import { FoodResponse } from "@app/features/food/food";
import { AxiosResponse } from "axios";
import { api } from "@app/api/api";
import { FoodndpointsEnum } from "../constants/food.endpoints";

export const getListFood = (): Promise<AxiosResponse<FoodResponse>> =>
  api.get<FoodResponse>(FoodndpointsEnum.GET_LIST_FOOD);

export const getFoodByPaginationAndCategoryType = (
  page: number,
  type: string
): Promise<AxiosResponse<FoodResponse>> =>
  api.get<FoodResponse>(FoodndpointsEnum.GET_LIST_FOOD, {
    params: {
      page,
      type,
    },
  });
