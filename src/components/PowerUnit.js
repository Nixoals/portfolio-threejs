import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export default function Model({ glitchButton }) {
	const { nodes, materials } = useGLTF('/models/powerUnit.gltf');
	return (
		<>
			<group dispose={null}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.powerUnit.geometry}
					material={materials.powerUnit}
					position={[6.44, 0.57, -5.31]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.converter.geometry}
					material={materials.converter}
					position={[1.85, 0.07, -1.41]}
				/>

				<mesh
					castShadow
					receiveShadow
					geometry={nodes.powerUnitLight.geometry}
					material={nodes.powerUnitLight.material}
					position={[6.23, 0.47, -5.14]}
				>
					<meshBasicMaterial
						toneMapped={false}
						color={glitchButton ? [5, 0.5, 0.5] : [0.4, 1, 5]}
					></meshBasicMaterial>
				</mesh>
				<RigidBody
					type="fixed"
					colliders="trimesh"
				>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.cables.geometry}
						material={materials.Cables}
						position={[0.99, 0.48, -0.77]}
					/>
				</RigidBody>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.bigCable.geometry}
					material={materials.bigCables}
					position={[4.16, 0.07, -3.68]}
				/>
			</group>

			<mesh
				castShadow
				receiveShadow
				geometry={nodes.cablesSplit.geometry}
				material={materials.Cables}
				position={[0.99, 0.48, -0.77]}
			/>
		</>
	);
}

useGLTF.preload('/powerUnit.gltf');
