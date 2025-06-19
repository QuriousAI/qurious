import { Paper } from "../types/paper";

export type GetRelevantPapersReturnTypeDataFound = {
  total: number;
  offset: number;
  next: number;
  data: Paper[];
};

export type GetRelevantPapersReturnTypeDataNotFound = {
  total: 0;
  offset: 0;
  next?: never;
  data?: never;
};

export type GetRelevantPapersReturnType =
  | GetRelevantPapersReturnTypeDataFound
  | GetRelevantPapersReturnTypeDataNotFound;
