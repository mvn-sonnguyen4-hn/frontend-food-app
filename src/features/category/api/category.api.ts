import { api } from '@app/api/api';
import { CategoryEndpointsEnum } from '../constants/category.enpoints';

export const getAllCategories = async () => {
  return api.get(CategoryEndpointsEnum.GET_ALL);
};

export const addCategory = async (name: string) => {
  return api.post(CategoryEndpointsEnum.ADD, {
    name
  });
};
