import { IPointMeshOptions, ISpherePoint } from './SpherePoint.types';
import {
  BufferGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry, Sprite, SpriteMaterial,
  TextureLoader,
  Vector3
} from 'three';
import lightColumn from '../../../assets/earth/light_column.png';
import ReactDOM from 'react-dom/client';
import SpherePointLabel from './SpherePointLabel/SpherePointLabel.tsx';
import html2canvas from 'html2canvas';

class SpherePoint {
  protected L: number;
  protected N: number;
  protected name: string;
  protected R: number;
  private readonly pointGroup: Group;
  private textureLoader: TextureLoader;
  private readonly vector: Vector3;

  constructor({ L, N, name, R }: ISpherePoint) {
    this.L = L;
    this.N = N;
    this.name = name;
    this.R = R * 10;
    this.vector = this.calcVector(R, L, N);
    this.pointGroup = new Group();
    this.textureLoader = new TextureLoader();

    const mesh = this.createPointMesh({
      material: new MeshBasicMaterial({
        color: 0xffffff,
        map: this.textureLoader.load(lightColumn),
        transparent: true,
        depthWrite: false
      })
    });
    this.pointGroup.add(mesh);
    this.createLightPillar();
    this.renderComponentLabel().then((data) => this.pointGroup.add(data));
    console.log(this.pointGroup)
  }
  private createPointMesh(options: Pick<IPointMeshOptions, 'material'>) {
    const geometry = new BufferGeometry();
    const mesh = new Mesh(geometry, options.material);

    const coord = this.calcVector(this.R * 1.001, this.L, this.N);
    const size = this.R + 0.05;
    mesh.scale.set(size, size, size);

    mesh.position.set(coord.x, coord.y, coord.z);
    const coordVec3 = coord.normalize();
    const meshNormal = new Vector3(0, 0, 1);
    mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);
    return mesh;
  }
  private createLightPillar() {
    const height = this.R * 0.12;
    const geometry = new PlaneGeometry(this.R * 0.03, height);
    geometry.rotateX(Math.PI / 2);
    geometry.translate(0, 0, height / 2);
    const material = new MeshBasicMaterial({
      map: this.textureLoader.load(lightColumn),
      color: 0xffffff,
      transparent: true,
      side: DoubleSide,
      depthWrite: false
    });
    const mesh = new Mesh(geometry, material);

    this.pointGroup.add(mesh, mesh.clone().rotateZ(Math.PI / 2));

    const SphereCoord = this.calcVector(this.R, this.L, this.N);
    const coordVec3 = new Vector3(SphereCoord.x, SphereCoord.y, SphereCoord.z).normalize();
    const meshNormal = new Vector3(0, 0, 1);
    this.pointGroup.quaternion.setFromUnitVectors(meshNormal, coordVec3);
    return this.pointGroup;
  }
  private async renderComponentLabel(): Promise<Object3D> {
    const container = document.createElement('div');
    ReactDOM.createRoot(container).render(<SpherePointLabel/>)
    console.log(container)
    const opts = {
      backgroundColor: '#FFFFFF',
      scale: 6,
      dpi: window.devicePixelRatio
    };

    document.body.appendChild(container);
    console.log(container)
    const canvas = await html2canvas(container, opts);
    console.log(canvas)
    const dataURL = canvas.toDataURL("image/png");
    console.log(dataURL)
    const map = new TextureLoader().load(dataURL);
    const material = new SpriteMaterial({
      map: map,
      transparent: true,
    });
    console.log(dataURL)
    const sprite = new Sprite(material);
    console.log(sprite)
    const len = 5 + (this.name.length - 2) * 2;
    sprite.scale.set(len, 3, 1);
    sprite.position.set(this.vector.x * 1.1, this.vector.y *1.1, this.vector.z * 1.1);
    return sprite
  }

  public calcVector = (R: number, longitude: number, latitude: number): Vector3 => {
    let lon = (longitude * Math.PI) / 180;
    const lat = (latitude * Math.PI) / 180;
    lon = -lon;

    // calc xyz cords from lat and lon cords
    const x = R * Math.cos(lat) * Math.cos(lon);
    const y = R * Math.sin(lat);
    const z = R * Math.cos(lat) * Math.sin(lon);
    return new Vector3(x, y, z);
  };

  public addToGroup(group: Group) {
    group.add(this.pointGroup);
  }
}

export default SpherePoint;
