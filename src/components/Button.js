import { useGLTF } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useState, useEffect } from 'react';

import { useSpring, animated } from '@react-spring/three';

export default function Model({ glitchButton, setGlitchButton }) {
	const { nodes, materials } = useGLTF('/models/button.gltf');
	const [capotClicked, setCapoClicked] = useState(false);
	const [buttonClicked, setButtonClicked] = useState(false);
	const { capotMove } = useSpring({ capotMove: capotClicked ? -Math.PI / 2 : 0 });
	const { buttonMove } = useSpring({ buttonMove: buttonClicked ? 0.88 : 0.89 });

	useEffect(() => {
		if (buttonClicked) {
			setTimeout(() => {
				setGlitchButton(true);
			}, 2000);
		}
		// eslint-disable-next-line
	}, [buttonClicked]);
	return (
		<group dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.ButtonBase.geometry}
				material={materials.ButtonYellow}
				position={[1.45, 0.86, -0.14]}
			/>
			{/* Capot */}
			<animated.mesh
				castShadow
				receiveShadow
				geometry={nodes.ButtonCapot.geometry}
				material={nodes.ButtonCapot.material}
				position={[1.45, 0.87, -0.17]}
				rotation-x={capotMove}
				onClick={(event) => {
					event.stopPropagation();
					console.log('clicked');
					setCapoClicked(!capotClicked);
				}}
				onPointerEnter={() => {
					document.body.style.cursor = 'pointer';
				}}
				onPointerLeave={() => {
					document.body.style.cursor = 'default';
				}}
			>
				<MeshTransmissionMaterial
					transmission={0.7}
					thickness={0.01}
					distortion={0.2}
				></MeshTransmissionMaterial>
			</animated.mesh>
			{/* buttonPressed */}
			<animated.mesh
				castShadow
				receiveShadow
				geometry={nodes.ButtonPush.geometry}
				material={materials.ButtonPush}
				// position={[1.45, 0.89, -0.14]}
				position-x={1.45}
				position-y={buttonMove}
				position-z={-0.14}
				onClick={(event) => {
					event.stopPropagation();
					setButtonClicked(true);
				}}
				onPointerEnter={() => {
					document.body.style.cursor = 'pointer';
				}}
				onPointerLeave={() => {
					document.body.style.cursor = 'default';
				}}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.ButtonGray.geometry}
				material={materials.ButtonGray}
				position={[1.45, 0.87, -0.14]}
			/>
		</group>
	);
}

useGLTF.preload('/models/button.gltf');
