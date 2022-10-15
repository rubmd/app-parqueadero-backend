import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Posicion} from '../models';
import {PosicionRepository} from './posicion.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly posicions: HasManyRepositoryFactory<Posicion, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PosicionRepository') protected posicionRepositoryGetter: Getter<PosicionRepository>,
  ) {
    super(Persona, dataSource);
    this.posicions = this.createHasManyRepositoryFactoryFor('posicions', posicionRepositoryGetter,);
    this.registerInclusionResolver('posicions', this.posicions.inclusionResolver);
  }
}
