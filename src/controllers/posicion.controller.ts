import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Posicion} from '../models';
import {PosicionRepository} from '../repositories';

export class PosicionController {
  constructor(
    @repository(PosicionRepository)
    public posicionRepository : PosicionRepository,
  ) {}

  @post('/posicions')
  @response(200, {
    description: 'Posicion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Posicion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posicion, {
            title: 'NewPosicion',
            exclude: ['id'],
          }),
        },
      },
    })
    posicion: Omit<Posicion, 'id'>,
  ): Promise<Posicion> {
    return this.posicionRepository.create(posicion);
  }

  @get('/posicions/count')
  @response(200, {
    description: 'Posicion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Posicion) where?: Where<Posicion>,
  ): Promise<Count> {
    return this.posicionRepository.count(where);
  }

  @get('/posicions')
  @response(200, {
    description: 'Array of Posicion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Posicion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Posicion) filter?: Filter<Posicion>,
  ): Promise<Posicion[]> {
    return this.posicionRepository.find(filter);
  }

  @patch('/posicions')
  @response(200, {
    description: 'Posicion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posicion, {partial: true}),
        },
      },
    })
    posicion: Posicion,
    @param.where(Posicion) where?: Where<Posicion>,
  ): Promise<Count> {
    return this.posicionRepository.updateAll(posicion, where);
  }

  @get('/posicions/{id}')
  @response(200, {
    description: 'Posicion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Posicion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Posicion, {exclude: 'where'}) filter?: FilterExcludingWhere<Posicion>
  ): Promise<Posicion> {
    return this.posicionRepository.findById(id, filter);
  }

  @patch('/posicions/{id}')
  @response(204, {
    description: 'Posicion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posicion, {partial: true}),
        },
      },
    })
    posicion: Posicion,
  ): Promise<void> {
    await this.posicionRepository.updateById(id, posicion);
  }

  @put('/posicions/{id}')
  @response(204, {
    description: 'Posicion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() posicion: Posicion,
  ): Promise<void> {
    await this.posicionRepository.replaceById(id, posicion);
  }

  @del('/posicions/{id}')
  @response(204, {
    description: 'Posicion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.posicionRepository.deleteById(id);
  }
}
