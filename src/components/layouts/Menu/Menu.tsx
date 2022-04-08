import styles from "./Menu.module.scss";
import cx from "classnames";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
const Menu = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const param = searchParams.get("type");
  const location = useLocation();
  const list = [
    {
      name: "Hot Dishes",
      value: 1,
    },
    {
      name: "Hot Dishes",
      value: 2,
    },
    {
      name: "Soup",
      value: 3,
    },
    {
      name: "Grill",
      value: 4,
    },
  ];
  const changeCategory = (type: Number) => {
    navigate(`${location.pathname}?type=${type}`);
  };
  const showMenu = () => {
    return (
      <>
        <ul className="flex gap-8 text-white text-sm">
          {list.map((e) => (
            <li
              key={e.value}
              className={cx(
                styles.menuItem,
                e.value === Number(param) || (e.value === 1 && !param)
                  ? styles.active
                  : ""
              )}
              onClick={() => changeCategory(e.value)}
            >
              {e.name}
            </li>
          ))}
        </ul>
        <div className="h-[1px] w-full bg-[#393C49] mt-3"></div>
      </>
    );
  };
  return <div>{showMenu()}</div>;
};

export default Menu;
