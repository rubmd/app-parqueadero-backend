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
  Posicion,
  Auto,
} from '../models';
import {PosicionRepository} from '../repositories';

export class PosicionAutoController {
  constructor(
    @repository(PosicionRepository) protected posicionRepository: PosicionRepository,
  ) { }

  @get('/posicions/{id}/auto', {
    responses: {
      '200': {
        description: 'Posicion has one Auto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Auto),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Auto>,
  ): Promise<Auto> {
    return this.posicionRepository.auto(id).get(filter);
  }

  @post('/posicions/{id}/auto', {
    responses: {
      '200': {
        description: 'Posicion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Auto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Posicion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auto, {
            title: 'NewAutoInPosicion',
            exclude: ['id'],
            optional: ['posicionId']
          }),
        },
      },
    }) auto: Omit<Auto, 'id'>,
  ): Promise<Auto> {
    return this.posicionRepository.auto(id).create(auto);
  }

  @patch('/posicions/{id}/auto', {
    responses: {
      '200': {
        description: 'Posicion.Auto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auto, {partial: true}),
        },
      },
    })
    auto: Partial<Auto>,
    @param.query.object('where', getWhereSchemaFor(Auto)) where?: Where<Auto>,
  ): Promise<Count> {
    return this.posicionRepository.auto(id).patch(auto, where);
  }

  @del('/posicions/{id}/auto', {
    responses: {
      '200': {
        description: 'Posicion.Auto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Auto)) where?: Where<Auto>,
  ): Promise<Count> {
    return this.posicionRepository.auto(id).delete(where);
  }
}
