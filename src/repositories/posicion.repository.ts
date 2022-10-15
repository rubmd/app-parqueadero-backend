import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Posicion, PosicionRelations, Persona, Auto} from '../models';
import {PersonaRepository} from './persona.repository';
import {AutoRepository} from './auto.repository';

export class PosicionRepository extends DefaultCrudRepository<
  Posicion,
  typeof Posicion.prototype.id,
  PosicionRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Posicion.prototype.id>;

  public readonly auto: HasOneRepositoryFactory<Auto, typeof Posicion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('AutoRepository') protected autoRepositoryGetter: Getter<AutoRepository>,
  ) {
    super(Posicion, dataSource);
    this.auto = this.createHasOneRepositoryFactoryFor('auto', autoRepositoryGetter);
    this.registerInclusionResolver('auto', this.auto.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
