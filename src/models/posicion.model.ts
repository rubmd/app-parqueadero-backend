import {belongsTo, Entity, model, property, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';
import {Auto} from './auto.model';

@model()
export class Posicion extends Entity {
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
  piso: string;

  @property({
    type: 'string',
    required: true,
  })
  id_auto: string;

  @property({
    type: 'string',
    required: true,
  })
  sitio_parqueo: string;

  @belongsTo(() => Persona)
  personaId: string;

  @hasOne(() => Auto)
  auto: Auto;

  constructor(data?: Partial<Posicion>) {
    super(data);
  }
}

export interface PosicionRelations {
  // describe navigational properties here
}

export type PosicionWithRelations = Posicion & PosicionRelations;
