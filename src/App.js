import './App.css';
import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import MainModel from './components/MainModel';
import InternalError from './components/InternalError';
// import { Perf } from 'r3f-perf';

function App() {
	const [glitchButton, setGlitchButton] = useState(false);
	const [internalError, setInternalError] = useState(false);
	useEffect(() => {
		if (glitchButton) {
			setTimeout(() => {
				setInternalError(true);
			}, 12000);
		}
	}, [glitchButton]);
	return (
		<>
			{internalError ? (
				<>
					<InternalError
						setInternalError={setInternalError}
						setGlitchButton={setGlitchButton}
					></InternalError>
				</>
			) : (
				<>
					<Canvas
						dpr={[1, 2]}
						flat
						camera={{
							fov: 45,
							near: 0.5,
							far: 1000,
							position: [-6.15, 8.19, 9.81],
						}}
					>
						{/* <Perf position="top-left"></Perf> */}
						<color
							args={['#101919']}
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
							zoomSpeed={0.4}
							maxDistance={50}
							target={[3.5, 4.5, -3]}
							maxPolarAngle={1.65}
							minAzimuthAngle={-1.5}
							maxAzimuthAngle={1.5}
							enablePan={false}
							rotateSpeed={0.8}
						/>
						<MainModel
							glitchButton={glitchButton}
							setGlitchButton={setGlitchButton}
						></MainModel>
					</Canvas>
				</>
			)}
		</>
	);
}

export default App;
