import { Text, Float } from '@react-three/drei';

import { animated } from '@react-spring/three';
import { RigidBody } from '@react-three/rapier';

export default function StackDetails({ anim, color, physicsType, refStack, geometry, material, position, setter, SpringAnim, animNode, animMongo, animReact, animThree, setAnimMongo, setAnimNode, setAnimReact, setAnimThree, text }) {
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
			{physicsType ? (
				<>
					<RigidBody colliders="hull">
						<mesh
							geometry={geometry}
							position={position}
						>
							<meshBasicMaterial color={'black'}></meshBasicMaterial>
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
							ref={refStack}
							name="ThreejsStack"
							castShadow
							receiveShadow
							geometry={geometry}
							material={material}
							position={position}
							scale={SpringAnim.scale}
							rotation-y={SpringAnim.rotationY}
							onPointerEnter={() => {
								document.body.style.cursor = 'pointer';
								if (!animNode && !animMongo && !animReact && !animThree) {
									handleAnimDuration(setter);
									setter(true);
								}
							}}
							onPointerLeave={() => {
								document.body.style.cursor = 'default';
							}}
						>
							<meshBasicMaterial
								toneMapped={false}
								color={color ? color : null}
							></meshBasicMaterial>
						</animated.mesh>
						{anim && (
							<Text
								scale={0.1}
								position-x={position[0]}
								position-y={position[1] + 0.2}
								position-z={position[2]}
							>
								{text}
							</Text>
						)}
					</Float>
				</>
			)}
		</>
	);
}
