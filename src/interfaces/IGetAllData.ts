export interface IGetAllData<T> {
  data: T[];
  limit: number;
  offset: number;
  count: number;
}
