import { create } from "zustand";
import mock from "./mock.json";
import { State, MockProps, ItemProps } from "./types";

const initialState: State = {
  fruit: [],
  vegetable: [],
  lists: mock,
};

interface Store {
  removeItem: (item: MockProps) => void;
  removeFruit: (item: MockProps) => void;
  removeVegetable: (item: MockProps) => void;
  addItem: (item: ItemProps) => void;
  addFruit: (item: ItemProps) => void;
  addVegetable: (item: ItemProps) => void;
}

const useStore = create<State & Store>((set) => ({
  ...initialState,
  removeItem: (item: MockProps) =>
    set((state) => ({
      lists: state.lists.filter((e) => e.name !== item.name),
    })),
  removeFruit: (item) =>
    set((state) => ({
      ...state,
      fruit: state.fruit.filter((e) => e.name !== item.name),
    })),
  removeVegetable: (item) =>
    set((state) => ({
      ...state,
      vegetable: state.vegetable.filter((e) => e.name !== item.name),
    })),
  addItem: (item) =>
    set((state) => ({
      ...state,
      lists: [...state.lists, item],
    })),
  addFruit: (item) =>
    set((state) => ({
      ...state,
      fruit: [...state.fruit, item],
    })),
  addVegetable: (item) =>
    set((state) => ({
      ...state,
      vegetable: [...state.vegetable, item],
    })),
}));

export default useStore;
