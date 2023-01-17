import { Html, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useState, useRef } from 'react';
import gsap from 'gsap';

export default function Screen() {
	const screenRef = useRef();
	const { camera } = useThree();
	const { nodes, materials } = useGLTF('/models/room.gltf');

	const [enter, setIsEnter] = useState(false);
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
		<>
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
		</>
	);
}
