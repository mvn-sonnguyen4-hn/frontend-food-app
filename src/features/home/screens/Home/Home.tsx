import LoadingSpinner from "@app/components/atoms/LoadingSpinner/LoadingSpinner";
import Menu from "@app/components/layouts/Menu/Menu";
import {
  FoodResponse,
  getFoodByPaginationAndCategoryType,
  getListFood,
} from "@app/features/food/food";
import Food from "@app/features/food/screens/Food/Food";
import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listFood, setListFood] = useState<FoodResponse>({
    data: [],
    totalPage: 0,
    page: 0,
    limit: 0,
  });
  useEffect(() => {
    setIsLoading(true);
    getListFood()
      .then((res) => {
        setListFood({
          data: res.data.data,
          totalPage: res.data.totalPage,
          page: res.data.page,
          limit: res.data.limit,
        });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const showListFood = () => {
    if (listFood.data.length > 0) {
      const result = listFood.data.map((f, index) => {
        return (
          <Food
            key={index}
            name={f.name}
            price={f.price}
            avaiable={f.avaiable}
            url_img={f.url_img}
          />
        );
      });
      return result;
    } else {
      return;
    }
  };
  const [searchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() => {
    setIsLoading(true);
    setListFood({
      data: [],
      totalPage: 0,
      page: 0,
      limit: 0,
    });
    const page = searchParams.get("page") || 1;
    const type = searchParams.get("type") || "";
    getFoodByPaginationAndCategoryType(Number(page), type)
      .then((res) => {
        setIsLoading(false);
        setListFood(res.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [location]);
  return (
    <div className="bg-dark min-h-[100vh] text-white pt-8 px-14">
      <p className="text-3xl">Jaegar Resto</p>
      <p className="mb-6 mt-1">Tuesday, 2 Feb 2021</p>
      <p className="mb-4 mt-6 text-xl font-bold">Choose Dishes</p>
      <Menu />
      {isLoading && (
        <div className="flex justify-center">
          {" "}
          <LoadingSpinner size={40} primaryColor />
        </div>
      )}
      <div className="grid grid-cols-192 place-content-between gap-10">
        {showListFood()}
      </div>
    </div>
  );
};

export default Home;
