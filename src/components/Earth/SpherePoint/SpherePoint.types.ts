// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { MeshBasicMaterialParameters } from 'three/src/materials/MeshBasicMaterial';

interface ISpherePoint {
  name: string;
  N: number;
  L: number;
  R: number;
}

interface IPointMeshOptions {
  radius: number;
  material: MeshBasicMaterialParameters;
}

export type { ISpherePoint, IPointMeshOptions };
