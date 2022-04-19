import { CategoryDef } from "@app/features/category/category";
import { api } from "@app/api/api";
import { CategoryEndpointsEnum } from "../constants/category.enpoints";

export const getAllCategories = async (): Promise<CategoryDef[]> => {
  const result = await api.get(CategoryEndpointsEnum.GET_ALL);
  if (result.data && result.data.data.length > 0) {
    return result.data.data;
  }
  return [];
};
