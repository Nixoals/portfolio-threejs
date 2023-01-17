import './App.css';
import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import MainModel from './components/MainModel';
import { Perf } from 'r3f-perf';

function App() {
	return (
		<>
			<Perf position="top-left"></Perf>
			<color
				args={['black']}
				attach={'background'}
			></color>
			<Environment preset="sunset">
				<Lightformer
					position={[-5, 0, 0]}
					scale={10}
					color={[1, 0, 0]}
				/>
			</Environment>
			<OrbitControls
				makeDefault
				target={[0.55, 0.3, -0.6]}
				maxPolarAngle={1.65}
				minAzimuthAngle={-1.5}
				maxAzimuthAngle={1.5}
				enablePan={false}
			/>
			<MainModel></MainModel>
		</>
	);
}

export default App;
