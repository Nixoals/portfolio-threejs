import { useRef, useState } from 'react';
import { MeshReflectorMaterial, Html, Float, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import gsap from 'gsap';

export default function ModelV2(props) {
	const { nodes, materials } = useGLTF('/models/room.gltf');
	const reactStackRef = useRef();
	const threejsStackRef = useRef();
	const stoolRef = useRef();
	const screenRef = useRef();
	const { camera } = useThree();
	const [enter, setIsEnter] = useState(false);

	useFrame((state, delta) => {
		//stackThreeJSRotation
		threejsStackRef.current.rotation.y += delta;
		threejsStackRef.current.rotation.z += delta;
		//stackReactRotation
		reactStackRef.current.rotation.y += delta * 2;
		reactStackRef.current.rotation.z += delta * 2;

		//Stool Rotation
		stoolRef.current.rotation.y += delta * 0.3;
	});

	const handleEnter = () => {
		const cameraPosition = camera.position;
		const x = cameraPosition.x;
		const y = cameraPosition.y;
		const z = cameraPosition.z;

		const tl = gsap.timeline();
		tl.fromTo(
			camera.position.set(),
			{
				x: x,
				y: y,
				z: z,
			},
			{
				x: 0.5,
				y: 0.3,
				z: 0,
				duration: 0.8,
			}
		);
	};

	const handleLeave = () => {
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
					x: -1.5,
					y: 1,
					z: 1.5,
					duration: 0.8,
				}
			);
		}
		setIsEnter(false);
	};

	return (
		<group
			{...props}
			dispose={null}
			position={[-0.2, -0.8, -0.2]}
		>
			<EffectComposer>
				<Bloom></Bloom>
			</EffectComposer>
			<Float
				speed={5} // Animation speed, defaults to 1
				rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
				floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0, 0.03]}
			>
				<mesh
					ref={threejsStackRef}
					name="ThreejsStack"
					castShadow
					receiveShadow
					geometry={nodes.ThreejsStack.geometry}
					material={materials.screen}
					position={[1.61, 1.02, -0.35]}
				>
					<meshBasicMaterial></meshBasicMaterial>
				</mesh>
			</Float>
			<mesh
				name="Desk"
				castShadow
				receiveShadow
				geometry={nodes.Desk.geometry}
				material={materials.desk}
				position={[0.36, 0.51, -0.3]}
			/>
			<Float
				speed={5} // Animation speed, defaults to 1
				rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
				floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0, 0.03]}
			>
				<mesh
					name="NodeTextStack"
					castShadow
					receiveShadow
					geometry={nodes.NodeTextStack.geometry}
					material={materials['Material.002']}
					position={[0.07, 1.05, -0.48]}
				>
					<meshBasicMaterial
						toneMapped={false}
						color={[0.9, 0.9, 0.9]}
					></meshBasicMaterial>
				</mesh>
				<mesh
					name="NodeBaseStack"
					castShadow
					receiveShadow
					geometry={nodes.NodeBaseStack.geometry}
					material={materials.Nodegreen}
					position={[0.06, 1.06, -0.5]}
				>
					<meshBasicMaterial
						toneMapped={false}
						color={[0.2, 1.6, 0.2]}
					></meshBasicMaterial>
				</mesh>
			</Float>
			<mesh
				name="Keyboard"
				castShadow
				receiveShadow
				geometry={nodes.Keyboard.geometry}
				material={materials['Material.005']}
				position={[0.78, 0.87, -0.18]}
			/>
			<Float
				speed={5} // Animation speed, defaults to 1
				rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
				floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0, 0.03]}
			>
				<mesh
					name="MongoDBStatck"
					castShadow
					receiveShadow
					geometry={nodes.MongoDBStatck.geometry}
					material={materials.mongoDB}
					position={[1.35, 1.05, -0.49]}
				>
					<meshBasicMaterial
						toneMapped={false}
						color={[0.2, 1.2, 0.2]}
					></meshBasicMaterial>
				</mesh>
			</Float>
			<mesh
				name="supportStack"
				castShadow
				receiveShadow
				geometry={nodes.supportStack.geometry}
				material={materials.supportStack}
				position={[0.73, 0.87, -0.42]}
			/>
			<mesh
				ref={screenRef}
				name="Screen"
				castShadow
				receiveShadow
				geometry={nodes.Screen.geometry}
				material={nodes.Screen.material}
				position={[0.76, 1.11, -0.49]}
				onPointerEnter={() => {
					setIsEnter(true);
					handleEnter();
				}}
				onPointerMissed={handleLeave}
			>
				<Html
					// occlude="raycast"
					onOcclude={(visible) => console.log(visible)}
					transform
					className="screen"
					distanceFactor={1.8}
					position={[0, 0, 0]}
					// rotation-y={Math.PI / 2}
					scale={0.1}
				>
					<iframe
						src="https://nicolas-godeau-dev.netlify.app/"
						title="portfolio"
					></iframe>
				</Html>
				<meshStandardMaterial
					toneMapped={false}
					color={[2, 2, 2]}
				></meshStandardMaterial>
			</mesh>
			<mesh
				ref={stoolRef}
				name="Stool"
				castShadow
				receiveShadow
				geometry={nodes.Stool.geometry}
				material={materials['Material.003']}
				position={[0.7, 0.6, 0.3]}
			/>
			<Float
				speed={5} // Animation speed, defaults to 1
				rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
				floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0, 0.03]}
			>
				<mesh
					ref={reactStackRef}
					name="ReactStack"
					castShadow
					receiveShadow
					geometry={nodes.ReactStack.geometry}
					material={materials.react}
					position={[-0.14, 1.02, -0.34]}
				>
					<meshBasicMaterial
						toneMapped={false}
						color={[0.4, 1, 5]}
					></meshBasicMaterial>
				</mesh>
			</Float>
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

useGLTF.preload('/toonPortfolioV2.1.gltf');
