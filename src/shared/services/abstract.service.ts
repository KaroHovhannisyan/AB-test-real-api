import { Model, Repository } from 'sequelize-typescript';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  IAbstractService,
  IFindOptions,
} from '../../interfaces/IAbstractService';
import {
  DestroyOptions,
  IncludeOptions,
  Transaction,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';
import { BaseException } from '../../exceptions/base.exception';
import { RecourseNotExistsException } from '../../exceptions/recourse-not-exists.exception';
import { IGetAllData } from '../../interfaces/IGetAllData';

@Injectable()
export default abstract class AbstractService<T extends Model<T>>
  implements IAbstractService<T> {
  protected constructor(private readonly repository: Repository<T>) {}

  async findAll(
    {
      where = {},
    }: IFindOptions = {},
  ): Promise<any> {
    try {
      const data = await this.repository.findAndCountAll({
        where,
      });

      return {
        data
      };
    } catch (e) {
      this.throwError('GET_ALL', e);
    }
  }

  // @ts-ignore
  async getAll(
    {
      where = {},
      order = ['createdAt'],
      attributes = null,
      offset = 0,
      limit = 1000,
      raw = false,
    }: IFindOptions = {},
    include: IncludeOptions[] = [],
  ): Promise<IGetAllData<T>> {
    try {
      const { rows, count } = await this.repository.findAndCountAll({
        where,
        order,
        attributes,
        offset,
        limit,
        include,
        raw,
      });

      return {
        data: rows,
        limit,
        offset,
        count,
      };
    } catch (e) {
      this.throwError('GET_ALL', e);
    }
  }

  async get(
    { where = {}, attributes = null }: IFindOptions = {},
    include: IncludeOptions[] = [],
  ): Promise<T> {
    try {
      return await this.repository.findOne({
        where,
        attributes,
        include,
      });
    } catch (e) {
      this.throwError('GET', e);
    }
  }

  async create(entity: object): Promise<T> {
    try {
      return await this.repository.create(entity);
    } catch (e) {
      this.throwError('CREATE', e);
    }
  }

  async update(
    whereOptions: WhereOptions,
    values: object,
    transaction?: Transaction,
  ): Promise<T> {
    try {
      const options: UpdateOptions = {
        where: whereOptions,
        returning: true,
      };

      if (transaction) {
        options.transaction = transaction;
      }
      const [updated, [instance]] = await this.repository.update(
        values,
        options,
      );

      if (!updated) {
        throw new BaseException('Sequelize update error');
      }

      return instance;
    } catch (e) {
      this.throwError('UPDATE', e);
    }
  }

  async delete({ where = {} }, transaction?: Transaction): Promise<any> {
    try {
      const options: DestroyOptions = { where };
      if (transaction) {
        options.transaction = transaction;
      }
      const result = await this.repository.destroy(options);
      if (!result) {
        throw new BadRequestException('Wrong id');
      }
    } catch (e) {
      this.throwError('DELETE', e);
    }
  }

  async findOne(findData: any): Promise<T> {
    const data = await this.repository.findOne({ where: findData });
    if (!data) {
      throw new RecourseNotExistsException('Data');
    }
    return data;
  }

  throwError(operationName, e) {
    console.error(
      `Error: CRUD service - ${this.repository.name}[${operationName}]: ${e}`,
    );
    throw new BaseException(e);
  }
}
