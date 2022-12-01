import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { FindByQuery } from './interfaces.repository';

export abstract class BaseRepository<T> {
    private _repository: Repository<T>;

    protected constructor(repository: Repository<T>) {
        this._repository = repository;
    }

    public getRepository() {
        return this._repository;
    }

    public async create(data: T): Promise<string> {
        const response = await this._repository.insert(data);
        return response.identifiers[0].id;
    }

    public async findOneById(id: any): Promise<T> {
        return this._repository.findOne({
            where: {id}
        } as any);
    }

    public async findAll(): Promise<T[]> {
        return this._repository.find();
    }

    public async findBy(query: FindByQuery<Partial<T>>): Promise<T[]> {
        const createQuery = this._repository.createQueryBuilder();

        for(const key in query.exactMatch) {
            createQuery.andWhere(`"${key}" = :${key}`, {[`${key}`]: query.exactMatch[key]});
        }

        for(const key in query.inMatch) {
            createQuery.andWhere(`"${key}" IN(:...${key})`, {[`${key}`]: query.inMatch[key]});
        }

        for(const key in query.textSearch) {
            createQuery.andWhere(`"${key}" like :${key}`, {[`${key}`]: `${query.textSearch[key]}%`});
        }

        return await createQuery.getMany();
    }

    public async updateOneById(id: string, data: T): Promise<UpdateResult> {
        return this._repository.update(id, data);
    }

    public async deleteOneById(id: any): Promise<DeleteResult> {
        return this._repository.delete(id);
    }
}
