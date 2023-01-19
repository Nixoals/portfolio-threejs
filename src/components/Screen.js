import { Html, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useState, useRef } from 'react';
import gsap from 'gsap';

import * as THREE from 'three';

export default function Screen({ animation }) {
	const screenRef = useRef();
	const { camera } = useThree();
	const { nodes } = useGLTF('/models/room.gltf');
	const vec = new THREE.Vector3();

	const [enter, setIsEnter] = useState(false);

	useFrame((state, delta) => {
		if (enter) {
			state.camera.position.lerp(vec.set(3.5, 5, 1.2), delta * 2);
		}
	});

	const handleLeave = () => {
		camera.updateProjectionMatrix();
		camera.updateMatrix();
		const cameraPosition = camera.position;
		const x = cameraPosition.x;
		const y = cameraPosition.y;
		const z = cameraPosition.z;
		if (enter) {
			const tl = gsap.timeline();
			tl.fromTo(
				camera.position.set(),
				{
					x: x,
					y: y,
					z: z,
				},
				{
					x: -7.15,
					y: 7.19,
					z: 7.81,
					duration: 0.9,
				}
			);
		}
		setIsEnter(false);
		camera.updateProjectionMatrix();
		camera.updateMatrix();
	};

	return (
		<>
			<mesh
				ref={screenRef}
				name="Screen"
				castShadow
				receiveShadow
				geometry={nodes.Screen.geometry}
				position={[0.76, 1.11, -0.48]}
				onPointerEnter={() => {
					if (!enter) {
						if (animation) {
							setIsEnter(true);
						}
					} else {
						handleLeave();
					}
				}}
				onPointerLeave={(event) => {
					console.log(event);
				}}
				onPointerMissed={handleLeave}
			>
				<Html
					transform
					className="screen"
					distanceFactor={0.18}
					position={[0, 0, 0]}
					scale={1}
				>
					{animation && (
						<iframe
							src="https://nicolas-godeau-dev.netlify.app/"
							title="portfolio"
						></iframe>
					)}
				</Html>
				<meshStandardMaterial
					toneMapped={false}
					color={animation ? [2, 2, 2] : [0.1, 0.1, 0.1]}
				></meshStandardMaterial>
			</mesh>
		</>
	);
}
