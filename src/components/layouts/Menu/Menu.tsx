import styles from "./Menu.module.scss";
import cx from "classnames";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { CategoryDef } from "@app/features/category/category";
import { getAllCategories } from "@app/features/category/api/category.api";
const Menu = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const param = searchParams.get("type");
  const location = useLocation();
  const [listCategories, setListCategories] = useState<CategoryDef[]>([]);
  const changeCategory = (type: string) => {
    navigate(`${location.pathname}?type=${type}`);
  };
  useEffect(() => {
    getAllCategories().then((res) => {
      setListCategories(res);
    });
  }, []);

  const showMenu = () => {
    return (
      <>
        <ul className="flex gap-8 text-white text-sm">
          {listCategories.map((e, index) => (
            <li
              key={e.name}
              className={cx(
                styles.menuItem,
                e.name === param || (index === 0 && !param) ? styles.active : ""
              )}
              onClick={() => changeCategory(e.name)}
            >
              {e.name}
            </li>
          ))}
        </ul>
        <div className="h-[1px] w-full bg-[#393C49] mt-3 mb-10"></div>
      </>
    );
  };
  return <div>{showMenu()}</div>;
};

export default React.memo(Menu);
