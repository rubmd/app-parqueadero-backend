import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Auto, AutoRelations} from '../models';

export class AutoRepository extends DefaultCrudRepository<
  Auto,
  typeof Auto.prototype.id,
  AutoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Auto, dataSource);
  }
}
