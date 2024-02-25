import { IEarthOptions } from './Earth.types.ts';
import {
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer
} from 'three';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import earthMapImg from '../../assets/earth/earth.jpg';
import SpherePoint from './SpherePoint/SpherePoint.ts';

class Earth3D {
  public options: IEarthOptions;
  public ref: HTMLElement;
  protected mainGroup: Group;
  protected camera: PerspectiveCamera;
  protected renderer: WebGLRenderer;
  protected controls: OrbitControls;
  constructor(options: IEarthOptions, ref: HTMLElement) {
    this.options = options;
    this.ref = ref;
    this.mainGroup = new Group();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new WebGLRenderer();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxDistance = 4;

    this.mainGroup.rotation.y = options.baseCamera.y;
    this.mainGroup.rotation.x = options.baseCamera.x;
    this.mainGroup.rotation.z = options.baseCamera.z;
    this.camera.position.z = options.baseCamera.cameraPos;

    this.renderMainSphere();
    this.renderPoints();
    const animate = () => {
      requestAnimationFrame(animate);
      this.mainGroup.rotation.x += 0.0;
      this.mainGroup.rotation.y += 0.0005;
      this.mainGroup.rotation.z += 0.0;
      this.controls.update();

      const scene = new Scene();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      scene.add(this.mainGroup);
      this.renderer.render(scene, this.camera);
    };

    if (!ref.hasChildNodes()) {
      ref.appendChild(this.renderer.domElement);
    }

    animate();
  }

  private renderMainSphere() {
    const geometry = new SphereGeometry(this.options.earth.radius, 100, 100);
    const textureLoader = new TextureLoader();
    const earthTexture = textureLoader.load(earthMapImg);
    const material = new MeshBasicMaterial({ map: earthTexture });
    const sphere = new Mesh(geometry, material);
    const sphereBorder = new SphereGeometry(this.options.earth.backgroundParticlesRadius, 100, 100);
    const pointMaterial = new PointsMaterial({
      color: 0x81ffff,
      transparent: true,
      sizeAttenuation: true,
      opacity: 0.1,
      vertexColors: false,
      size: 0.01
    });
    const points = new Points(sphereBorder, pointMaterial);
    this.mainGroup.add(sphere);
    this.mainGroup.add(points);
  }

  private renderPoints() {
    this.options.data.forEach((point) => {
      const renderedPoint = new SpherePoint(point);
      renderedPoint.addToGroup(this.mainGroup);
    });
  }
}

export default Earth3D;
