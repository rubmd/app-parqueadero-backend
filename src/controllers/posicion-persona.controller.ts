import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Posicion,
  Persona,
} from '../models';
import {PosicionRepository} from '../repositories';

export class PosicionPersonaController {
  constructor(
    @repository(PosicionRepository)
    public posicionRepository: PosicionRepository,
  ) { }

  @get('/posicions/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Posicion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Posicion.prototype.id,
  ): Promise<Persona> {
    return this.posicionRepository.persona(id);
  }
}
