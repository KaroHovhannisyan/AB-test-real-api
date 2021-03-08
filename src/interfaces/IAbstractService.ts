import { WhereOptions, FindAttributeOptions, IncludeOptions } from 'sequelize';

export interface IAbstractService<T> {
  getAll(options?: IFindOptions, include?: IncludeOptions[]): Promise<T[]>;
  get(options?: IFindOptions, include?: IncludeOptions[]): Promise<T>;
  update(whereOptions: Record<string, any>, values: object): Promise<T>;
  create(entity: T, where?: WhereOptions): Promise<T>;
  delete(options?: IFindOptions): Promise<void>;
}

export interface IFindOptions {
  where?: WhereOptions;
  order?: string[];
  attributes?: FindAttributeOptions;
  raw?: boolean;
  offset?: number;
  limit?: number;
}
