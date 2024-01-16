/* eslint-disable no-unused-vars */
import React from 'react'
import * as THREE from 'three'
import { Physics } from '@react-three/cannon';
import { Canvas, useThree} from '@react-three/fiber';
import { Sky, OrbitControls} from '@react-three/drei';

import Controls from './components/Controls.jsx';
import Plane from './components/area/Plane.jsx';
import Exhibition from './components/area/Exhibition.jsx';
import { FPV } from "./components/FPV";


function App() {
    
    return (
        <>
            <Canvas>
                <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
                <ambientLight intensity={0.5} />
                {/* <OrbitControls /> */}
                <FPV />
                <Physics>
                    {/* 물리적인 영향을 받는 부분은 Physics 내부에 */}
                    <Controls />
                    <Exhibition />
                    <Plane />
                </Physics>
            </Canvas>
            
        </>
    );
}
export default App;
