import { overridableComponent, defineComponent, Type } from '@latticexyz/recs';
import {
  defineCoordComponent,
  defineBoolComponent,
} from '@latticexyz/std-client';
import { world } from './world';

export const contractComponents = {
  MapConfig: defineComponent(
    world,
    {
      width: Type.Number,
      height: Type.Number,
      terrain: Type.String,
    },
    {
      id: 'MapConfig',
      metadata: { contractId: 'component.MapConfig' },
    }
  ),
  Obstruction: defineBoolComponent(world, {
    metadata: {
      contractId: 'component.Obstruction',
    },
  }),
  Movable: defineBoolComponent(world, {
    metadata: {
      contractId: 'component.Movable',
    },
  }),
  Player: overridableComponent(
    defineBoolComponent(world, {
      metadata: {
        contractId: 'component.Player',
      },
    })
  ),
  Position: overridableComponent(
    defineCoordComponent(world, {
      metadata: {
        contractId: 'component.Position',
      },
    })
  ),
};
