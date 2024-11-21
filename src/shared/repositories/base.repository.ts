import { Model } from 'mongoose';

export class BaseRepository<T> {
  protected repository: Model<T>;
  protected populate: string[];

  constructor(repository: Model<T>, populate: string[] = []) {
    this.repository = repository;
    this.populate = populate;
  }

  async create(payload: Partial<T>): Promise<T> {
    return await this.repository.create(payload);
  }

  async find(query?: any): Promise<T[]> {
    const { offset, limit, order, ...filter } = query;
    // TODO
    console.log(offset, limit, order);

    return await this.repository.find(filter).populate(this.populate);
  }

  async findOne(query: Record<string, unknown>): Promise<T> {
    return await this.repository.findOne(query).populate(this.populate);
  }

  async updateOne(
    query: Record<string, unknown>,
    payload: Partial<T>,
    projection?,
  ): Promise<unknown> {
    return await this.repository.updateOne(query, payload, projection);
  }

  async deleteOne(query?: Record<string, unknown>): Promise<unknown> {
    return await this.repository.deleteOne(query);
  }
}
