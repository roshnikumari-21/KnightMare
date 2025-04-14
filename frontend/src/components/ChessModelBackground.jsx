import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils.js';

export default function ChessModelBackground() {
    const { scene } = useGLTF('/chess/scene.gltf');
    const meshRef = useRef(null);

    // Add rotation animation
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2; // Adjust rotation speed here
        }
    });

    return (
        <>
            <PerspectiveCamera 
                makeDefault 
                position={[0, 0, 12]} 
                fov={45} 
                near={0.1} 
                far={1000} 
            />
            <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                enableRotate={false}
                maxPolarAngle={degToRad(90)}
                minPolarAngle={degToRad(90)}
            />
            
            {/* Visual Helpers */}
            <axesHelper args={[5]} />
            <gridHelper args={[20, 20]} position={[0, -2, 0]} />
            
            {/* Light Markers */}
            <mesh position={[0, 5, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="yellow" />
            </mesh>
            <mesh position={[5, 2, 5]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="blue" />
            </mesh>
            <mesh position={[-5, 3, -10]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="red" />
            </mesh>
            
            {/* Ambient light for overall scene illumination */}
            <ambientLight intensity={0.3} />
            
            {/* Main spotlight from above */}
            <spotLight
                position={[0, 5, 0]}
                angle={0.5}
                penumbra={0.5}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            
            {/* Side fill light */}
            <directionalLight
                position={[5, 2, 5]}
                intensity={0.8}
                castShadow
            />
            
            {/* Back light for rim lighting */}
            <pointLight
                position={[-5, 3, -10]}
                intensity={300}
                color="#ffffff"
            />

            <mesh ref={meshRef} receiveShadow castShadow>
                <primitive 
                    object={scene} 
                    position={[0, -2, 0]} 
                    scale={3.5}
                    rotation={[0, degToRad(45), 0]}
                />
            </mesh>
        </>
    );
}