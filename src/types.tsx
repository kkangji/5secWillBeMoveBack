export interface MockProps {
  type: string;
  name: string;
}

export interface ItemProps extends MockProps {
  time: Date;
}

export interface State {
  fruit: ItemProps[];
  vegetable: ItemProps[];
  lists: MockProps[];
}

export enum Types {
  FRUIT = "Fruit",
  VEGETABLE = "Vegetable",
}
