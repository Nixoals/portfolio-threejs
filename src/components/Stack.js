import { Text, Float, useGLTF, meshBounds } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { RigidBody } from '@react-three/rapier';

export default function STack({ glitchButton, setGlitchButton }) {
	const { nodes, materials } = useGLTF('/models/room.gltf');
	const reactStackRef = useRef();
	const threejsStackRef = useRef();

	const [animNode, setAnimNode] = useState(false);
	const [animReact, setAnimReact] = useState(false);
	const [animThree, setAnimThree] = useState(false);
	const [animMongo, setAnimMongo] = useState(false);

	useFrame((state, delta) => {
		if (!glitchButton) {
			//stackThreeJSRotation
			threejsStackRef.current.rotation.y += delta;
			threejsStackRef.current.rotation.z += delta;
			//stackReactRotation
			reactStackRef.current.rotation.y += delta * 2;
			reactStackRef.current.rotation.z += delta * 2;
		}
	});

	const reactAnim = useSpring({ scale: animReact ? 1.7 : 1, rotationY: animReact ? 15 : 0 });
	const nodeAnim = useSpring({ scale: animNode ? 1.7 : 1, rotationY: animNode ? 18.8 : 0, positionNodeText: animNode ? -0.42 : -0.48 });
	const threeAnim = useSpring({ scale: animThree ? 1.7 : 1, rotationY: animThree ? 15 : 0 });
	const mongoAnim = useSpring({ scale: animMongo ? 1.7 : 1, rotationY: animMongo ? 15 : 0 });

	const handleAnimDuration = () => {
		setTimeout(() => {
			setAnimNode(false);
			setAnimMongo(false);
			setAnimReact(false);
			setAnimThree(false);
		}, 1500);
	};

	return (
		<>
			<RigidBody colliders="trimesh">
				<mesh
					name="supportStack"
					castShadow
					receiveShadow
					geometry={nodes.supportStack.geometry}
					material={materials.supportStack}
					position={[0.73, 0.87, -0.42]}
				></mesh>
			</RigidBody>
			{/* ThreeJS */}

			{glitchButton ? (
				<>
					<RigidBody colliders="hull">
						<mesh
							geometry={nodes.ThreejsStack.geometry}
							position={[1.61, 1.02, -0.35]}
						>
							<meshBasicMaterial
								toneMapped={false}
								color={[0.8, 0.8, 0.8]}
							></meshBasicMaterial>
						</mesh>
					</RigidBody>
				</>
			) : (
				<Float
					speed={5}
					rotationIntensity={0.1}
					floatIntensity={2}
					floatingRange={[0, 0.03]}
				>
					<animated.mesh
						ref={threejsStackRef}
						name="ThreejsStack"
						castShadow
						receiveShadow
						geometry={nodes.ThreejsStack.geometry}
						position={[1.61, 1.02, -0.35]}
						scale={threeAnim.scale}
						rotation-y={threeAnim.rotationY}
						onPointerEnter={() => {
							document.body.style.cursor = 'pointer';
							if (!animNode && !animMongo && !animReact && !animThree) {
								handleAnimDuration(setAnimThree);
								setAnimThree(true);
							}
						}}
						onPointerLeave={() => {
							document.body.style.cursor = 'default';
						}}
					>
						<meshBasicMaterial
							color={[1, 1, 1]}
							toneMapped={false}
						></meshBasicMaterial>
					</animated.mesh>
					{animThree && (
						<Text
							scale={0.1}
							position={[1.61, 1.25, -0.35]}
						>
							Three.js
						</Text>
					)}
				</Float>
			)}

			{glitchButton ? (
				<>
					<RigidBody colliders="hull">
						<mesh
							geometry={nodes.ReactStack.geometry}
							position={[-0.14, 1.02, -0.34]}
						>
							<meshBasicMaterial
								toneMapped={false}
								color={[0.8, 0.8, 0.8]}
							></meshBasicMaterial>
						</mesh>
					</RigidBody>
				</>
			) : (
				<Float
					speed={5}
					rotationIntensity={0.1}
					floatIntensity={2}
					floatingRange={[0, 0.03]}
				>
					<animated.mesh
						raycast={meshBounds}
						ref={reactStackRef}
						name="ReactStack"
						castShadow
						receiveShadow
						geometry={nodes.ReactStack.geometry}
						position={[-0.14, 1.02, -0.34]}
						scale={reactAnim.scale}
						rotation-y={reactAnim.rotationY}
						onPointerEnter={() => {
							document.body.style.cursor = 'pointer';
							if (!animNode && !animMongo && !animReact && !animThree) {
								handleAnimDuration(setAnimReact);
								setAnimReact(true);
							}
						}}
						onPointerLeave={() => {
							document.body.style.cursor = 'default';
						}}
					>
						<meshBasicMaterial
							toneMapped={false}
							color={[0.4, 1, 5]}
						></meshBasicMaterial>
					</animated.mesh>
					{animReact && (
						<Text
							scale={0.1}
							position={[-0.14, 1.25, -0.34]}
						>
							React
						</Text>
					)}
				</Float>
			)}

			{glitchButton ? (
				<>
					<RigidBody colliders="hull">
						<mesh
							geometry={nodes.NodeTextStack.geometry}
							position={[0.07, 1.05, -0.48]}
						>
							<meshBasicMaterial
								toneMapped={false}
								color={[0.8, 0.8, 0.8]}
							></meshBasicMaterial>
						</mesh>
					</RigidBody>
					<RigidBody type="hull">
						<mesh
							geometry={nodes.NodeBaseStack.geometry}
							position={[0.06, 1.06, -0.5]}
						>
							<meshBasicMaterial
								toneMapped={false}
								color={[0.8, 0.8, 0.8]}
							></meshBasicMaterial>
						</mesh>
					</RigidBody>
				</>
			) : (
				<>
					<Float
						speed={5}
						rotationIntensity={0.1}
						floatIntensity={2}
						floatingRange={[0, 0.03]}
					>
						<animated.mesh
							name="NodeTextStack"
							castShadow
							receiveShadow
							geometry={nodes.NodeTextStack.geometry}
							position-x={0.07}
							position-y={1.05}
							position-z={nodeAnim.positionNodeText}
							scale={nodeAnim.scale}
							rotation-y={nodeAnim.rotationY}
							onPointerEnter={() => {
								document.body.style.cursor = 'pointer';
								if (!animNode && !animMongo && !animReact && !animThree) {
									handleAnimDuration(setAnimNode);
									setAnimNode(true);
								}
							}}
							onPointerLeave={() => {
								document.body.style.cursor = 'default';
							}}
						>
							<meshBasicMaterial
								toneMapped={false}
								color={[0.9, 0.9, 0.9]}
							></meshBasicMaterial>
						</animated.mesh>
						<animated.mesh
							name="NodeBaseStack"
							castShadow
							receiveShadow
							geometry={nodes.NodeBaseStack.geometry}
							position={[0.06, 1.06, -0.5]}
							scale={nodeAnim.scale}
							rotation-y={nodeAnim.rotationY}
							onPointerEnter={() => {
								document.body.style.cursor = 'pointer';
								if (!animNode && !animMongo && !animReact && !animThree) {
									handleAnimDuration(setAnimNode);
									setAnimNode(true);
								}
							}}
							onPointerLeave={() => {
								document.body.style.cursor = 'default';
							}}
						>
							<meshBasicMaterial
								toneMapped={false}
								color={[0.2, 1.6, 0.2]}
							></meshBasicMaterial>
						</animated.mesh>
						{animNode && (
							<Text
								scale={0.1}
								position={[0.06, 1.36, -0.5]}
								color={[0.2, 1.6, 0.2]}
							>
								Node.js
							</Text>
						)}
					</Float>
				</>
			)}
			{glitchButton ? (
				<>
					<RigidBody type="hull">
						<mesh
							geometry={nodes.MongoDBStatck.geometry}
							position={[1.36, 1.05, -0.49]}
						>
							<meshBasicMaterial
								toneMapped={false}
								color={[0.8, 0.8, 0.8]}
							></meshBasicMaterial>
						</mesh>
					</RigidBody>
				</>
			) : (
				<>
					<Float
						speed={5}
						rotationIntensity={0.1}
						floatIntensity={2}
						floatingRange={[0, 0.03]}
					>
						<animated.mesh
							name="MongoDBStatck"
							castShadow
							receiveShadow
							geometry={nodes.MongoDBStatck.geometry}
							position={[1.35, 1.05, -0.49]}
							scale={mongoAnim.scale}
							rotation-y={mongoAnim.rotationY}
							onPointerEnter={() => {
								document.body.style.cursor = 'pointer';
								if (!animNode && !animMongo && !animReact && !animThree) {
									handleAnimDuration(setAnimMongo);
									setAnimMongo(true);
								}
							}}
							onPointerLeave={() => {
								document.body.style.cursor = 'default';
							}}
						>
							<meshBasicMaterial
								toneMapped={false}
								color={[0.2, 1.2, 0.2]}
							></meshBasicMaterial>
						</animated.mesh>
						{animMongo && (
							<Text
								scale={0.1}
								position={[1.35, 1.35, -0.49]}
							>
								MongoDB
							</Text>
						)}
					</Float>
				</>
			)}
		</>
	);
}
