import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Canvas
			dpr={[1, 2]}
			flat
			camera={{
				fov: 45,
				near: 0.5,
				far: 1000,
				position: [-8.15, 8.19, 7.81],
			}}
		>
			<App />
		</Canvas>
	</React.StrictMode>
);
