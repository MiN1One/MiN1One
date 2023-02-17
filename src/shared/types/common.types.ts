import { Dispatch, SetStateAction } from "react";

export type StateSetter<T> = Dispatch<SetStateAction<T>>;

export interface IItem {
  label: string;
  value: string;
}
