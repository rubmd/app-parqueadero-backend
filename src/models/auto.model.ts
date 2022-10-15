import {Entity, model, property} from '@loopback/repository';

@model()
export class Auto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
  })
  posicionId?: string;

  constructor(data?: Partial<Auto>) {
    super(data);
  }
}

export interface AutoRelations {
  // describe navigational properties here
}

export type AutoWithRelations = Auto & AutoRelations;
