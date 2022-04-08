import Menu from "@app/components/layouts/Menu/Menu";
import { FoodDef, getListFood } from "@app/features/food/food";
import Food from "@app/features/food/screens/Food/Food";
import { useEffect, useState } from "react";
const Home = () => {
  const [listFood, setListFood] = useState<FoodDef[]>([]);
  useEffect(() => {
    getListFood().then((res) => {
      setListFood([...res.data.data]);
    });
  }, []);

  const showListFood = () => {
    if (listFood.length) {
      const result = listFood.map((f, index) => {
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
  return (
    <div className="bg-dark min-h-[100vh] text-white pl-14 pt-8">
      <p className="text-3xl">Jaegar Resto</p>
      <p className="mb-6 mt-1">Tuesday, 2 Feb 2021</p>
      <Menu />
      <p className="mb-14 mt-6 text-xl font-bold">Choose Dishes</p>
      <div className="flex gap-10 flex-wrap">{showListFood()}</div>
    </div>
  );
};

export default Home;
