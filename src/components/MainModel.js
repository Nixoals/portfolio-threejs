import { useRef } from 'react';
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

import Stack from './Stack';
import Screen from './Screen';

export default function ModelV2(props) {
	const { nodes, materials } = useGLTF('/models/room.gltf');

	const stoolRef = useRef();

	useFrame((state, delta) => {
		//Stool Rotation
		stoolRef.current.rotation.y += delta * 0.3;
	});

	return (
		<group
			{...props}
			dispose={null}
			position={[-0.2, -0.8, -0.2]}
			scale={5}
		>
			<EffectComposer>
				<Bloom></Bloom>
			</EffectComposer>
			<Stack></Stack>
			<Screen></Screen>
			<mesh
				name="Desk"
				castShadow
				receiveShadow
				geometry={nodes.Desk.geometry}
				material={materials.desk}
				position={[0.36, 0.51, -0.3]}
			/>

			<mesh
				name="Keyboard"
				castShadow
				receiveShadow
				geometry={nodes.Keyboard.geometry}
				material={materials['Material.005']}
				position={[0.78, 0.87, -0.18]}
			/>

			<mesh
				ref={stoolRef}
				name="Stool"
				castShadow
				receiveShadow
				geometry={nodes.Stool.geometry}
				material={materials['Material.003']}
				position={[0.7, 0.6, 0.3]}
			/>

			<mesh
				name="textWebD"
				castShadow
				receiveShadow
				geometry={nodes.textWebD.geometry}
				material={nodes.textWebD.material}
				position={[0.8, 1.5, -0.79]}
			>
				<meshStandardMaterial
					emissive={[1, 0.1, 1]}
					toneMapped={false}
					color={[8, 0.5, 8]}
				></meshStandardMaterial>
			</mesh>
			<mesh
				name="TextNG"
				castShadow
				receiveShadow
				geometry={nodes.TextNG.geometry}
				material={nodes.TextNG.material}
				position={[0.81, 1.66, -0.79]}
			>
				<meshBasicMaterial
					toneMapped={false}
					color={[0.2, 1, 15]}
				></meshBasicMaterial>
			</mesh>
			<mesh
				name="keypad"
				castShadow
				receiveShadow
				geometry={nodes.keypad.geometry}
				position={[0.78, 0.874, -0.19]}
			>
				<meshBasicMaterial
					toneMapped={false}
					color={[0.5, 0.5, 0.5]}
				></meshBasicMaterial>
			</mesh>
			<mesh
				rotation-x={-Math.PI / 2}
				position-y={-0.02}
				scale={200}
			>
				<planeGeometry></planeGeometry>
				<MeshReflectorMaterial
					blur={[100, 100]}
					resolution={1024}
					mixBlur={0.1}
					mixStrength={15}
					depthScale={1}
					minDepthThreshold={0.85}
					color="#151515"
					metalness={0.6}
					roughness={1}
				></MeshReflectorMaterial>
			</mesh>
		</group>
	);
}

useGLTF.preload('/models/room.gltf');
