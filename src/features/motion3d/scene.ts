/**
 * The 3D figure: a stylised mannequin built from primitives (no model file, no
 * download), a skeleton of nested joints driven by the poses in motions.ts, and
 * muscle shapes on top that glow when they are the target. Loaded on demand —
 * only pages that show the figure fetch three.js.
 */
import * as THREE from 'three';
import { MOTIONS, type Motion, type Pose } from './motions';

const rad = (d: number) => (d * Math.PI) / 180;

const BODY = 0xe9eef7;
const MUSCLE = 0xc3cee3;
const HIGHLIGHT = 0x3b82f6;
const GLOW = 0x1d4ed8;

export const MUSCLE_KEYS = [
  'chest', 'back', 'shoulders', 'biceps', 'triceps', 'abs', 'quads', 'hamstrings', 'glutes', 'calves',
] as const;
type MuscleKey = (typeof MUSCLE_KEYS)[number];

export interface FigureScene {
  setMotion(id: string, muscles: string[]): void;
  /** Freeze at a point in the rep (0 = start, 1 = end); null resumes playing. */
  setProgress(p: number | null): void;
  setViewTurn(radians: number): void;
  resize(width: number, height: number): void;
  renderOnce(): void;
  start(): void;
  stop(): void;
  dispose(): void;
}

interface Joints {
  root: THREE.Group;
  spine: THREE.Group;
  neck: THREE.Group;
  shAbd: THREE.Group[];
  shFlex: THREE.Group[];
  elbow: THREE.Group[];
  hand: THREE.Group[];
  hipAbd: THREE.Group[];
  hipFlex: THREE.Group[];
  knee: THREE.Group[];
  ankle: THREE.Group[];
  contact: THREE.Object3D[];
}

function limb(radius: number, length: number, mat: THREE.Material) {
  const geo = new THREE.CapsuleGeometry(radius, Math.max(0.001, length - 2 * radius), 6, 16);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = -length / 2;
  return mesh;
}

function blob(radius: number, scale: [number, number, number], pos: [number, number, number], mat: THREE.Material) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 20, 14), mat);
  mesh.scale.set(...scale);
  mesh.position.set(...pos);
  return mesh;
}

export function createFigureScene(canvas: HTMLCanvasElement, options: { preserve?: boolean } = {}): FigureScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: options.preserve ?? false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xd5deee, 2.3));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(2.5, 4, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xcfe0ff, 1.0);
  rim.position.set(-3, 2, -2);
  scene.add(rim);

  // Floor disc
  const floorMat = new THREE.MeshBasicMaterial({ color: 0xdbe5f4, transparent: true, opacity: 0.85 });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(1.05, 64), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.002;
  scene.add(floor);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.25 });
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.0, 1.05, 64), ringMat);
  ring.rotation.x = -Math.PI / 2;
  scene.add(ring);

  const bodyMat = new THREE.MeshStandardMaterial({ color: BODY, roughness: 0.55, metalness: 0.02 });
  const propMat = new THREE.MeshStandardMaterial({ color: 0x4b5563, roughness: 0.5, metalness: 0.4 });
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x8aa0c4, roughness: 0.7 });

  const muscleMats = {} as Record<MuscleKey, THREE.MeshStandardMaterial>;
  const muscleMeshes = {} as Record<MuscleKey, THREE.Mesh[]>;
  for (const k of MUSCLE_KEYS) {
    muscleMats[k] = new THREE.MeshStandardMaterial({ color: MUSCLE, roughness: 0.5, emissive: 0x000000 });
    muscleMeshes[k] = [];
  }
  const addMuscle = (k: MuscleKey, parent: THREE.Object3D, mesh: THREE.Mesh) => {
    mesh.material = muscleMats[k];
    parent.add(mesh);
    muscleMeshes[k].push(mesh);
  };

  /* ---------------------------------------------------------------- rig -- */
  const J: Joints = {
    root: new THREE.Group(), spine: new THREE.Group(), neck: new THREE.Group(),
    shAbd: [], shFlex: [], elbow: [], hand: [], hipAbd: [], hipFlex: [], knee: [], ankle: [], contact: [],
  };
  scene.add(J.root);

  const pelvis = blob(0.13, [1.3, 0.78, 0.95], [0, 0, 0], bodyMat);
  J.root.add(pelvis);

  J.spine.position.set(0, 0.05, 0);
  J.root.add(J.spine);
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.125, 0.2, 6, 18), bodyMat);
  torso.scale.set(1.2, 1, 0.78);
  torso.position.set(0, 0.26, 0);
  J.spine.add(torso);

  J.neck.position.set(0, 0.5, 0);
  J.spine.add(J.neck);
  const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.09, 12), bodyMat);
  neckMesh.position.y = 0.04;
  J.neck.add(neckMesh);
  const head = blob(0.1, [0.95, 1.12, 1.0], [0, 0.17, 0], bodyMat);
  J.neck.add(head);
  const nose = blob(0.018, [1, 1, 1], [0, 0.16, 0.098], bodyMat);
  J.neck.add(nose);

  for (const s of [1, -1]) {
    // arm
    const abd = new THREE.Group();
    abd.position.set(s * 0.2, 0.46, 0);
    J.spine.add(abd);
    const flex = new THREE.Group();
    abd.add(flex);
    const upper = limb(0.048, 0.28, bodyMat);
    flex.add(upper);
    const elbow = new THREE.Group();
    elbow.position.y = -0.28;
    flex.add(elbow);
    const fore = limb(0.04, 0.26, bodyMat);
    elbow.add(fore);
    const hand = new THREE.Group();
    hand.position.y = -0.27;
    elbow.add(hand);
    const palm = blob(0.043, [1, 1.15, 0.85], [0, -0.02, 0], bodyMat);
    hand.add(palm);
    J.shAbd.push(abd); J.shFlex.push(flex); J.elbow.push(elbow); J.hand.push(hand);
    J.contact.push(palm, fore);

    // muscles on the arm
    addMuscle('biceps', flex, blob(0.04, [1, 2.5, 0.95], [0, -0.13, 0.034], bodyMat));
    addMuscle('triceps', flex, blob(0.04, [1, 2.4, 0.95], [0, -0.13, -0.034], bodyMat));
    // deltoid
    addMuscle('shoulders', abd, blob(0.062, [1, 1, 1], [s * 0.02, 0.0, 0], bodyMat));

    // leg
    const hAbd = new THREE.Group();
    hAbd.position.set(s * 0.1, -0.02, 0);
    J.root.add(hAbd);
    const hFlex = new THREE.Group();
    hAbd.add(hFlex);
    const thigh = limb(0.072, 0.43, bodyMat);
    hFlex.add(thigh);
    const knee = new THREE.Group();
    knee.position.y = -0.43;
    hFlex.add(knee);
    const shin = limb(0.056, 0.42, bodyMat);
    knee.add(shin);
    const ankle = new THREE.Group();
    ankle.position.y = -0.42;
    knee.add(ankle);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.05, 0.23), bodyMat);
    foot.position.set(0, -0.03, 0.055);
    ankle.add(foot);
    J.hipAbd.push(hAbd); J.hipFlex.push(hFlex); J.knee.push(knee); J.ankle.push(ankle);
    J.contact.push(foot, shin, thigh);

    addMuscle('quads', hFlex, blob(0.056, [1.05, 3.4, 1.05], [0, -0.2, 0.034], bodyMat));
    addMuscle('hamstrings', hFlex, blob(0.056, [1.05, 3.4, 1.05], [0, -0.2, -0.034], bodyMat));
    addMuscle('calves', knee, blob(0.046, [1.05, 3.0, 1.1], [0, -0.17, -0.036], bodyMat));
    addMuscle('glutes', J.root, blob(0.085, [1, 1, 1], [s * 0.085, -0.01, -0.09], bodyMat));

    // torso muscles
    addMuscle('chest', J.spine, blob(0.085, [1, 0.85, 0.6], [s * 0.088, 0.36, 0.085], bodyMat));
    addMuscle('back', J.spine, blob(0.092, [1, 1.7, 0.55], [s * 0.1, 0.29, -0.085], bodyMat));
    for (let i = 0; i < 3; i++) {
      addMuscle('abs', J.spine, blob(0.043, [1, 0.95, 0.6], [s * 0.046, 0.09 + i * 0.078, 0.108], bodyMat));
    }
  }
  addMuscle('back', J.spine, blob(0.09, [1.7, 0.6, 0.6], [0, 0.47, -0.08], bodyMat));

  /* -------------------------------------------------------------- props -- */
  const props = new THREE.Group();
  scene.add(props);
  const dumbbells: THREE.Group[] = [];
  const bar = new THREE.Group();
  {
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.25, 12), propMat);
    shaft.rotation.z = Math.PI / 2;
    bar.add(shaft);
    for (const x of [-0.5, 0.5]) {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.035, 24), propMat);
      plate.rotation.z = Math.PI / 2;
      plate.position.x = x;
      bar.add(plate);
    }
  }
  for (let i = 0; i < 2; i++) {
    const g = new THREE.Group();
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.14, 10), propMat);
    handle.rotation.z = Math.PI / 2;
    g.add(handle);
    for (const x of [-0.075, 0.075]) {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.03, 18), propMat);
      plate.rotation.z = Math.PI / 2;
      plate.position.x = x;
      g.add(plate);
    }
    dumbbells.push(g);
  }
  const bench = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.1, 1.0), woodMat);
  const seat = new THREE.Group();
  {
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 0.4), woodMat);
    top.position.y = 0.4;
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.36, 0.08), propMat);
    post.position.y = 0.2;
    seat.add(top, post);
  }
  const dipbars = new THREE.Group();
  for (const s of [1, -1]) {
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.7, 12), propMat);
    rail.rotation.x = Math.PI / 2;
    rail.position.set(s * 0.22, 1.1, 0);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.1, 10), propMat);
    post.position.set(s * 0.22, 0.55, -0.3);
    const post2 = post.clone();
    post2.position.z = 0.3;
    dipbars.add(rail, post, post2);
  }
  const pullbar = new THREE.Group();
  {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.1, 12), propMat);
    b.rotation.z = Math.PI / 2;
    pullbar.add(b);
    for (const x of [-0.55, 0.55]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.2, 10), propMat);
      post.position.set(x, -1.1, 0);
      pullbar.add(post);
    }
  }

  /* -------------------------------------------------------------- state -- */
  let motion: Motion = MOTIONS.squat;
  let highlighted = new Set<string>();
  /** Muscles on the back of the body are viewed from behind, or they are hidden. */
  let rearView = false;
  let frozen: number | null = null;
  let viewTurn = 0;
  let raf = 0;
  let running = false;
  let startTime = performance.now();
  let width = 300;
  let height = 300;
  let camTarget = new THREE.Vector3(0, 0.9, 0);
  let camDist = 4;

  const tmpBox = new THREE.Box3();
  const tmpV = new THREE.Vector3();
  const tmpV2 = new THREE.Vector3();

  const val = (p: Pose, k: keyof Pose) => p[k] ?? 0;
  const side = (p: Pose, base: 'sh' | 'el' | 'hip' | 'kn', i: number) =>
    (i === 0 ? p[`${base}A` as keyof Pose] : p[`${base}B` as keyof Pose]) ?? p[base] ?? 0;

  function applyPose(p: Pose) {
    J.root.rotation.set(rad(val(p, 'pitch')), 0, 0);
    J.spine.rotation.set(rad(val(p, 'spine')), rad(val(p, 'twist')), 0);
    J.neck.rotation.x = rad(val(p, 'neck'));
    for (let i = 0; i < 2; i++) {
      const s = i === 0 ? 1 : -1;
      J.shAbd[i].rotation.z = s * rad(val(p, 'abd'));
      J.shFlex[i].rotation.x = -rad(side(p, 'sh', i));
      J.elbow[i].rotation.x = -rad(side(p, 'el', i));
      J.hipAbd[i].rotation.z = s * rad(5);
      J.hipFlex[i].rotation.x = -rad(side(p, 'hip', i));
      J.knee[i].rotation.x = rad(side(p, 'kn', i));
      J.ankle[i].rotation.x = rad(val(p, 'ankle'));
    }
    if (p.y !== undefined) {
      J.root.position.set(0, p.y, 0);
      J.root.updateMatrixWorld(true);
    } else {
      J.root.position.set(0, 1, 0);
      J.root.updateMatrixWorld(true);
      let min = Infinity;
      for (const o of J.contact) {
        tmpBox.setFromObject(o);
        min = Math.min(min, tmpBox.min.y);
      }
      J.root.position.y -= min;
      J.root.updateMatrixWorld(true);
    }
  }

  function lerpPose(a: Pose, b: Pose, t: number): Pose {
    const out: Pose = {};
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]) as Set<keyof Pose>;
    for (const k of keys) {
      const av = a[k];
      const bv = b[k];
      if (k === 'y') {
        out.y = (av ?? bv ?? 0) + ((bv ?? av ?? 0) - (av ?? bv ?? 0)) * t;
        continue;
      }
      // For a side-specific key missing from one pose, fall back to the shared value.
      const base = (k as string).replace(/[AB]$/, '') as keyof Pose;
      const fa = av ?? (a[base] as number | undefined) ?? 0;
      const fb = bv ?? (b[base] as number | undefined) ?? 0;
      out[k] = fa + (fb - fa) * t;
    }
    return out;
  }

  function runPose(phase: number): Pose {
    const s = Math.sin(phase);
    const kneeA = 18 + 78 * Math.max(0, Math.sin(phase + 1.3));
    const kneeB = 18 + 78 * Math.max(0, Math.sin(phase + 1.3 + Math.PI));
    return {
      pitch: 9,
      hipA: 8 + 36 * s,
      hipB: 8 - 36 * s,
      knA: kneeA,
      knB: kneeB,
      shA: -34 * s,
      shB: 34 * s,
      el: 92,
      neck: -6,
    };
  }

  function placeProps(m: Motion) {
    props.clear();
    if (m.prop === 'bar') props.add(bar);
    if (m.prop === 'db') dumbbells.forEach((d) => props.add(d));
    if (m.prop === 'bench') {
      bench.position.set(0, 0.45 - 0.05 - 0.03, -0.22);
      props.add(bench);
    }
    if (m.prop === 'seat') {
      seat.position.set(0, 0.06, -0.02);
      props.add(seat);
    }
    if (m.prop === 'dipbars') props.add(dipbars);
    if (m.prop === 'pullbar') {
      pullbar.position.set(0, 2.06, 0.08);
      props.add(pullbar);
    }
  }

  function updateProps() {
    if (!props.children.length) return;
    J.hand[0].getWorldPosition(tmpV);
    J.hand[1].getWorldPosition(tmpV2);
    if (motion.prop === 'bar') {
      bar.position.copy(tmpV).add(tmpV2).multiplyScalar(0.5);
    }
    if (motion.prop === 'db') {
      dumbbells[0].position.copy(tmpV);
      dumbbells[1].position.copy(tmpV2);
    }
  }

  function poseAt(t: number): Pose {
    if (motion.cycle === 'run') return runPose((t / (motion.period ?? 1)) * Math.PI * 2);
    const p = frozen ?? 0.5 - 0.5 * Math.cos((t / (motion.period ?? 3)) * Math.PI * 2);
    return lerpPose(motion.a, motion.b, p);
  }

  function frame(t: number) {
    const pose = poseAt(t);
    applyPose(pose);
    if (motion.cycle === 'run') J.root.position.y += 0.05 * Math.max(0, Math.sin((t / (motion.period ?? 1)) * Math.PI * 4));
    updateProps();
    J.root.updateMatrixWorld(true);

    const pulse = 0.45 + 0.35 * Math.sin(t * 3.2);
    for (const k of MUSCLE_KEYS) {
      const on = highlighted.has(k);
      const mat = muscleMats[k];
      mat.color.setHex(on ? HIGHLIGHT : MUSCLE);
      mat.emissive.setHex(on ? GLOW : 0x000000);
      mat.emissiveIntensity = on ? pulse : 0;
    }

    const yaw = rad(rearView ? 180 - motion.yaw * 0.55 : motion.yaw) + viewTurn + (frozen === null ? Math.sin(t * 0.35) * 0.12 : 0);
    camera.position.set(
      camTarget.x + Math.sin(yaw) * camDist,
      camTarget.y + camDist * 0.22,
      camTarget.z + Math.cos(yaw) * camDist,
    );
    camera.lookAt(camTarget);
    renderer.render(scene, camera);
  }

  /** Fit the camera to everything the figure and props can reach in this motion. */
  function fitCamera() {
    const box = new THREE.Box3();
    const samples = motion.cycle === 'run' ? [0, 0.25, 0.5, 0.75].map((f) => runPose(f * Math.PI * 2)) : [motion.a, motion.b, lerpPose(motion.a, motion.b, 0.5)];
    for (const p of samples) {
      applyPose(p);
      updateProps();
      J.root.updateMatrixWorld(true);
      box.union(tmpBox.setFromObject(J.root));
      if (props.children.length) box.union(new THREE.Box3().setFromObject(props));
    }
    box.expandByPoint(new THREE.Vector3(-0.95, 0, -0.95));
    box.expandByPoint(new THREE.Vector3(0.95, 0, 0.95));
    const size = box.getSize(new THREE.Vector3());
    box.getCenter(camTarget);
    const radius = Math.max(0.9, size.length() / 2);
    const vFov = rad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
    camDist = (radius / Math.sin(Math.min(vFov, hFov) / 2)) * 0.8;
  }

  const api: FigureScene = {
    setMotion(id, muscles) {
      motion = MOTIONS[id] ?? MOTIONS.squat;
      highlighted = new Set(muscles);
      const rear = muscles.filter((m) => ['back', 'triceps', 'hamstrings', 'glutes', 'calves'].includes(m)).length;
      rearView = rear > muscles.length - rear;
      placeProps(motion);
      fitCamera();
      startTime = performance.now();
      if (!running) frame(0);
    },
    setProgress(p) {
      frozen = p;
      if (!running) frame(0);
    },
    setViewTurn(r) {
      viewTurn = r;
      if (!running) frame((performance.now() - startTime) / 1000);
    },
    resize(w, h) {
      width = Math.max(1, w);
      height = Math.max(1, h);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      fitCamera();
      if (!running) frame((performance.now() - startTime) / 1000);
    },
    renderOnce() {
      frame(frozen === null ? (performance.now() - startTime) / 1000 : 0);
    },
    start() {
      if (running) return;
      running = true;
      const loop = () => {
        if (!running) return;
        frame((performance.now() - startTime) / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    dispose() {
      api.stop();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      [bodyMat, propMat, woodMat, floorMat, ringMat, ...Object.values(muscleMats)].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
  return api;
}
