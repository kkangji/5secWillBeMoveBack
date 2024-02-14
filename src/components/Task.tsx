import Button from "./Button";
import useStore from "../useStore";
import { MockProps, ItemProps, Types } from "../types";

const Task = () => {
  const { lists, removeItem, addFruit, addVegetable } = useStore();

  const onMove = (item: MockProps) => {
    const datetime = new Date();
    const for5Sec = new Date(datetime.getTime() + 5000);
    const newItem: ItemProps = { ...item, time: for5Sec };
    if (item.type === Types.FRUIT) addFruit(newItem);
    if (item.type === Types.VEGETABLE) addVegetable(newItem);
    removeItem(item);
  };

  return (
    <div className="flex flex-col items-center">
      {lists.map((item, index) => (
        <div
          key={`${index}-${item.name}`}
          className="my-1 w-[300px] md:w-[250px]"
        >
          <Button onClick={() => onMove(item)}>{item.name}</Button>
        </div>
      ))}
    </div>
  );
};

export default Task;
