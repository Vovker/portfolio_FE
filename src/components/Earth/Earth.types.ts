import { Group, PerspectiveCamera, Texture, WebGLRenderer } from 'three';

interface IEarth {
  options: IEarthOptions;
  ref: HTMLElement;
  mainGroup: Group;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}
interface IEarthOptions {
  data: {
    L: number;
    N: number;
    name: string;
  }[];
  textures: Record<string, Texture>;
  earth: {
    radius: number;
    isRotation: boolean;
    quality: number;
    backgroundParticlesRadius: number;
  };
  satellite: {
    show: boolean;
    rotateSpeed: number;
    size: number;
    number: number;
  };
  flyLine: {
    color: number; // 飞线的颜色
    speed: number; // 飞机拖尾线速度
    flyLineColor: number; // 飞行线的颜色
  };
  baseCamera: {
    x: number;
    y: number;
    z: number;
    cameraPos: number;
  };
}

export type { IEarth, IEarthOptions };
