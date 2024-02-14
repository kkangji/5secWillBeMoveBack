import { useEffect } from "react";
import useStore from "../useStore";
import { ItemProps, Types } from "../types";
import TaskByTypes from "./TaskByTypes";

const Category = () => {
  const { addItem, fruit, removeFruit, vegetable, removeVegetable } =
    useStore();

  const onMoveBack = (item: ItemProps[]) => {
    item.map((e: ItemProps) => {
      const datetime = new Date();
      const secondsNow = datetime.getSeconds();
      const itemSeconds = new Date(e.time).getSeconds();
      if (itemSeconds < secondsNow || itemSeconds === secondsNow) {
        if (e.type === Types.FRUIT) {
          removeFruit(e);
          addItem(e);
        }
        if (e.type === Types.VEGETABLE) {
          removeVegetable(e);
          addItem(e);
        }
      }
      return;
    });
  };

  useEffect(() => {
    const array = [...fruit, ...vegetable];
    const interval = setInterval(() => {
      if (array.length > 0) onMoveBack(array);
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vegetable, fruit]);

  return (
    <>
      <TaskByTypes title={Types.FRUIT} data={fruit} />
      <TaskByTypes title={Types.VEGETABLE} data={vegetable} />
    </>
  );
};

export default Category;
