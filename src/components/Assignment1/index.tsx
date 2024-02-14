import Task from "../Task";
import Category from "../Category";

export default function Assignment1() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 text-center py-12 px-0 xl:px-48">
      <Task />
      <Category />
    </div>
  );
}
