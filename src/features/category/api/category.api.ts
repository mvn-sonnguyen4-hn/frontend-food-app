import { api } from '@app/api/api';
import { CategoryEndpointsEnum } from '../constants/category.enpoints';

export const getAllCategories = async () => {
  return api.get(CategoryEndpointsEnum.GET_ALL);
};
