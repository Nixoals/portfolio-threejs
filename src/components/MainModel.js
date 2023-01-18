import { useRef } from 'react';
import { Text, MeshReflectorMaterial, useGLTF, useMatcapTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Bloom, EffectComposer, Glitch, Pixelation } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';
import { Physics, RigidBody } from '@react-three/rapier';

import Stack from './Stack';
import Screen from './Screen';
import Button from './Button';

export default function ModelV2({ glitchButton, setGlitchButton }) {
	const { nodes, materials } = useGLTF('/models/room.gltf');
	const [material] = useMatcapTexture('9B9994_E1E0DB_474643_544C4C', 1024);
	const stoolRef = useRef();
	const pixelEffect = useRef();
	const [faillureAlert, setFaillureAlert] = useState();

	useFrame((state, delta) => {
		//Stool Rotation
		if (!glitchButton) {
			stoolRef.current.rotation.y += delta * 0.3;
		}
	});
	// eslint-disable-next-line
	let value = 0;
	useFrame((state, delta) => {
		if (glitchButton) {
			value += delta * 0.8;

			pixelEffect.current.setGranularity(value);
		}
	});
	useEffect(() => {
		if (glitchButton) {
			setTimeout(() => {
				setGlitchButton(false);
				// eslint-disable-next-line
				value = 0;
			}, 12000);
		}
	}, [glitchButton]);

	useEffect(() => {
		if (glitchButton) {
			setTimeout(() => {
				setFaillureAlert(true);
			}, 2000);
		}
	}, [glitchButton]);

	return (
		<group
			dispose={null}
			position={[-0.2, -0.8, -0.2]}
			scale={5}
		>
			<EffectComposer>
				<Bloom></Bloom>
				{glitchButton && (
					<>
						<Glitch
							delay={[0.5, 4]} // min and max glitch delay
							duration={[0.3, 0.6]} // min and max glitch duration
							strength={[0.3, 0.7]} // min and max glitch strength
							mode={GlitchMode.SPORADIC} // glitch mode
							active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
							ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
						></Glitch>
						{/* <Noise></Noise> */}
						<Pixelation
							ref={pixelEffect}
							granularity={0}
						></Pixelation>
					</>
				)}
			</EffectComposer>
			<Physics gravity={[-0.9, -18, 0]}>
				<Stack
					glitchButton={glitchButton}
					setGlitchButton={setGlitchButton}
				></Stack>
				{glitchButton ? (
					<>
						<RigidBody>
							<Screen animation={false}></Screen>
						</RigidBody>
					</>
				) : (
					<>
						<Screen animation={true}></Screen>
					</>
				)}

				<RigidBody
					type="fixed"
					colliders="hull"
				>
					<mesh
						name="Desk"
						castShadow
						receiveShadow
						geometry={nodes.Desk.geometry}
						material={materials.desk}
						position={[0.36, 0.51, -0.3]}
					>
						<meshMatcapMaterial matcap={material}></meshMatcapMaterial>
					</mesh>
				</RigidBody>
				<RigidBody type="fixed">
					<mesh
						name="Keyboard"
						castShadow
						receiveShadow
						geometry={nodes.Keyboard.geometry}
						material={materials['Material.005']}
						position={[0.78, 0.87, -0.18]}
					/>
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
				</RigidBody>
				{glitchButton ? (
					<>
						<RigidBody type="hull">
							<mesh
								ref={stoolRef}
								name="Stool"
								castShadow
								receiveShadow
								geometry={nodes.Stool.geometry}
								position={[0.7, 0.6, 0.3]}
							>
								<meshBasicMaterial color={[0.4, 0.4, 0.4]}></meshBasicMaterial>
							</mesh>
						</RigidBody>
					</>
				) : (
					<>
						<mesh
							ref={stoolRef}
							name="Stool"
							castShadow
							receiveShadow
							geometry={nodes.Stool.geometry}
							material={materials['Material.003']}
							position={[0.7, 0.6, 0.3]}
						/>
					</>
				)}
				{glitchButton ? (
					<>
						<RigidBody>
							<mesh
								geometry={nodes.textWebD.geometry}
								position={[0.8, 1.5, -0.79]}
							>
								<meshBasicMaterial
									toneMapped={false}
									color={[1, 0.5, 1]}
								></meshBasicMaterial>
							</mesh>
							<mesh></mesh>
						</RigidBody>
						<RigidBody>
							<mesh
								geometry={nodes.TextNG.geometry}
								position={[0.81, 1.66, -0.79]}
							>
								<meshBasicMaterial
									toneMapped={false}
									color={[0.2, 1, 6]}
								></meshBasicMaterial>
							</mesh>
							<mesh></mesh>
						</RigidBody>
					</>
				) : (
					<>
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
					</>
				)}
				<RigidBody type="fixed">
					<mesh
						scale={[10, 0.3, 10]}
						position-y={-0.176}
					>
						<boxGeometry></boxGeometry>
						<meshBasicMaterial wireframe></meshBasicMaterial>
					</mesh>
				</RigidBody>
			</Physics>
			<Button
				glitchButton={glitchButton}
				setGlitchButton={setGlitchButton}
			></Button>
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
			{faillureAlert && (
				<Text
					position={[0.75, 1.7, -1]}
					scale={0.2}
					maxWidth={10}
					textAlign="center"
					color={'red'}
				>
					KERNEL PANIC
				</Text>
			)}
		</group>
	);
}

useGLTF.preload('/models/room.gltf');
