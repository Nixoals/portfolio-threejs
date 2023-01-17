import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Canvas
			flat
			camera={{
				fov: 45,
				near: 0.1,
				far: 2000,
				position: [-1.5, 1, 1.5],
			}}
		>
			<App />
		</Canvas>
	</React.StrictMode>
);
