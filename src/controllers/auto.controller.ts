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
import {Auto} from '../models';
import {AutoRepository} from '../repositories';

export class AutoController {
  constructor(
    @repository(AutoRepository)
    public autoRepository : AutoRepository,
  ) {}

  @post('/autos')
  @response(200, {
    description: 'Auto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Auto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auto, {
            title: 'NewAuto',
            exclude: ['id'],
          }),
        },
      },
    })
    auto: Omit<Auto, 'id'>,
  ): Promise<Auto> {
    return this.autoRepository.create(auto);
  }

  @get('/autos/count')
  @response(200, {
    description: 'Auto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Auto) where?: Where<Auto>,
  ): Promise<Count> {
    return this.autoRepository.count(where);
  }

  @get('/autos')
  @response(200, {
    description: 'Array of Auto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Auto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Auto) filter?: Filter<Auto>,
  ): Promise<Auto[]> {
    return this.autoRepository.find(filter);
  }

  @patch('/autos')
  @response(200, {
    description: 'Auto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auto, {partial: true}),
        },
      },
    })
    auto: Auto,
    @param.where(Auto) where?: Where<Auto>,
  ): Promise<Count> {
    return this.autoRepository.updateAll(auto, where);
  }

  @get('/autos/{id}')
  @response(200, {
    description: 'Auto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Auto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Auto, {exclude: 'where'}) filter?: FilterExcludingWhere<Auto>
  ): Promise<Auto> {
    return this.autoRepository.findById(id, filter);
  }

  @patch('/autos/{id}')
  @response(204, {
    description: 'Auto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auto, {partial: true}),
        },
      },
    })
    auto: Auto,
  ): Promise<void> {
    await this.autoRepository.updateById(id, auto);
  }

  @put('/autos/{id}')
  @response(204, {
    description: 'Auto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() auto: Auto,
  ): Promise<void> {
    await this.autoRepository.replaceById(id, auto);
  }

  @del('/autos/{id}')
  @response(204, {
    description: 'Auto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.autoRepository.deleteById(id);
  }
}
