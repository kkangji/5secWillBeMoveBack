import Button from "./Button";
import { ItemProps } from "../types";

interface TaskByTypesProps {
  title: string;
  data: ItemProps[];
}

const TaskByTypes: React.FC<TaskByTypesProps> = ({ title, data }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="border border-gray-200 my-1 w-[300px] h-[700px]">
        <p className="rounded-sm border border-gray-200 bg-gray-200 font-semibold px-3 py-2">
          {title}
        </p>
        {data.map((e, index) => {
          return (
            <div key={`${e.name}-${index}`} className="m-2">
              <Button>{e.name}</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskByTypes;
