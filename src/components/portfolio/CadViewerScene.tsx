import * as React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { CadViewMode } from "./CadViewer";

type MaterialSnapshot = {
  wireframe: boolean;
  transparent: boolean;
  opacity: number;
};

function applyMode(material: THREE.Material, mode: CadViewMode) {
  const store = material.userData as { __cadOriginal?: MaterialSnapshot };
  if (!store.__cadOriginal) {
    store.__cadOriginal = {
      wireframe: (material as THREE.MeshStandardMaterial).wireframe ?? false,
      transparent: material.transparent,
      opacity: material.opacity,
    };
  }
  const original = store.__cadOriginal;

  if (mode === "wireframe") {
    (material as THREE.MeshStandardMaterial).wireframe = true;
    material.transparent = false;
    material.opacity = 1;
  } else if (mode === "transparent") {
    (material as THREE.MeshStandardMaterial).wireframe = false;
    material.transparent = true;
    material.opacity = 0.35;
    material.depthWrite = false;
  } else {
    (material as THREE.MeshStandardMaterial).wireframe = original.wireframe;
    material.transparent = original.transparent;
    material.opacity = original.opacity;
    material.depthWrite = true;
  }
  material.needsUpdate = true;
}

function Model({
  src,
  mode,
  modelRotation,
  onLoaded,
}: {
  src: string;
  mode: CadViewMode;
  modelRotation?: [number, number, number] | undefined;
  onLoaded: () => void;
}) {
  const { scene } = useGLTF(src);

  // Normalise scale so any CAD export fits the frame nicely.
  const normalized = React.useMemo(() => {
    const object = scene;
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { object, scale: 2.4 / maxDim };
  }, [scene]);

  React.useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => applyMode(material, mode));
    });
  }, [scene, mode]);

  React.useEffect(() => {
    onLoaded();
  }, [onLoaded, scene]);

  return (
    <Center>
      {React.createElement("group", { rotation: modelRotation ?? [0, 0, 0] },
        React.createElement("primitive", { object: normalized.object, scale: normalized.scale }),
      )}
    </Center>
  );
}

class SceneErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  override state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  override componentDidCatch() {
    this.props.onError();
  }
  override render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default function CadViewerScene({
  src,
  mode,
  resetSignal,
  fallback,
  daylight = false,
  modelRotation,
  onLoaded,
  onError,
}: {
  src: string;
  mode: CadViewMode;
  resetSignal: number;
  daylight?: boolean;
  modelRotation?: [number, number, number] | undefined;
  fallback: React.ReactNode;
  onLoaded: () => void;
  onError: () => void;
}) {
  const controlsRef = React.useRef<OrbitControlsImpl | null>(null);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    controlsRef.current?.reset();
  }, [resetSignal]);

  const [interacting, setInteracting] = React.useState(false);

  return (
    <SceneErrorBoundary fallback={fallback} onError={onError}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [2.6, 1.8, 3], fov: 45 }}
        shadows
        style={{ background: "transparent" }}
        onPointerDown={() => setInteracting(true)}
        onPointerUp={() => setInteracting(false)}
        onPointerLeave={() => setInteracting(false)}
      >
        {daylight ? (
          <>
            <color attach="background" args={["#e8eef4"]} />
            <fog attach="fog" args={["#e8eef4", 18, 60]} />
            <hemisphereLight args={["#ffffff", "#cfd8e0", 1.4]} />
            <ambientLight intensity={0.7} />
            <directionalLight position={[6, 10, 6]} intensity={2.4} color="#fff4e0" castShadow />
            <directionalLight position={[-8, 4, -6]} intensity={0.8} color="#dbe8ff" />
            <Environment resolution={256}>
              <Lightformer intensity={5} color="#ffffff" position={[0, 6, 0]} scale={[14, 14, 1]} />
              <Lightformer
                intensity={3}
                color="#f5f9ff"
                position={[-6, 2, -2]}
                rotation-y={Math.PI / 2}
                scale={[24, 4, 1]}
              />
              <Lightformer
                intensity={2.5}
                color="#fff2df"
                position={[6, 2, 2]}
                rotation-y={-Math.PI / 2}
                scale={[24, 4, 1]}
              />
            </Environment>
          </>
        ) : (
          <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[6, 8, 4]} intensity={1.2} castShadow />
            <Environment resolution={256}>
              <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
              <Lightformer
                intensity={1}
                color="#8bb"
                position={[-5, 1, -1]}
                rotation-y={Math.PI / 2}
                scale={[20, 1, 1]}
              />
            </Environment>
          </>
        )}
        <React.Suspense fallback={null}>
          <Model src={src} mode={mode} modelRotation={modelRotation} onLoaded={onLoaded} />
        </React.Suspense>
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.08}
          autoRotate={!reduceMotion && !interacting}
          autoRotateSpeed={0.8}
          minDistance={1.2}
          maxDistance={12}
        />
      </Canvas>
    </SceneErrorBoundary>
  );
}
