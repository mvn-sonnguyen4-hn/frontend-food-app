import { CategoryDef } from "@app/features/category/category";
import { CategoryEndpointsEnum } from "./../constants/category.enpoints";
import { api } from "@app/api/api";
export const getAllCategories = async (): Promise<CategoryDef[]> => {
  const result = await api.get(CategoryEndpointsEnum.GET_ALL);
  if (result.data && result.data.data.length > 0) {
    return result.data.data;
  } else {
    return [];
  }
};
