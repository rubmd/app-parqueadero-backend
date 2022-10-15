import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  Posicion,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaPosicionController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/posicions', {
    responses: {
      '200': {
        description: 'Array of Persona has many Posicion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Posicion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Posicion>,
  ): Promise<Posicion[]> {
    return this.personaRepository.posicions(id).find(filter);
  }

  @post('/personas/{id}/posicions', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Posicion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posicion, {
            title: 'NewPosicionInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) posicion: Omit<Posicion, 'id'>,
  ): Promise<Posicion> {
    return this.personaRepository.posicions(id).create(posicion);
  }

  @patch('/personas/{id}/posicions', {
    responses: {
      '200': {
        description: 'Persona.Posicion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posicion, {partial: true}),
        },
      },
    })
    posicion: Partial<Posicion>,
    @param.query.object('where', getWhereSchemaFor(Posicion)) where?: Where<Posicion>,
  ): Promise<Count> {
    return this.personaRepository.posicions(id).patch(posicion, where);
  }

  @del('/personas/{id}/posicions', {
    responses: {
      '200': {
        description: 'Persona.Posicion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Posicion)) where?: Where<Posicion>,
  ): Promise<Count> {
    return this.personaRepository.posicions(id).delete(where);
  }
}
