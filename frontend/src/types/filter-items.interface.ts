export interface IFilterItems {
  id: string;
  htmlFor: string;
  items: {
    id: number;
    name: string;
  }[];
  label: string;
}