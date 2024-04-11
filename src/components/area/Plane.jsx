import React, {useRef} from 'react';
import { useGLTF } from '@react-three/drei'
// import { Sky } from '@react-three/drei';
import { usePlane } from '@react-three/cannon';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import Exhibition from '../../assets/exhibition/proj_meta.glb'; // dynamic import 

const Plane = (props) => {

    // const BounceExhibition = useLoader(GLTFLoader, './assets/TeamObject/03_omz.glb')
    
    //usePlane으로 평면을 구성하고 ref를 통해 접근함
    const [ref] = usePlane(() => ({        
        rotation: [-Math.PI / 2, 0, 0], // 평면의 기울기 rotation 값을 수정해 기울기를 조절하자
        position: [0, 0, 0], // 평면의 위치값
    }));

    return(
        <>
            {/* <primitive object={BounceExhibition.scene} position={[0,300,0]} children-0-castShadow/> */}
            {/* <mesh ref={ref}> 
                <boxGeometry attach="geometry" args={[10, 10]} /> 
                <meshStandardMaterial attach="material" color="#fff" />
            </mesh> */}
            {/* mesh는 3D 화면을 구성하는 물체이며 ref를 통해 cannon을 통해 구성한 평면의 물리적인 속성을 적용한다.
            물체(mesh)는 부피(Geometry)와 질감(Material)의 정보로 구성된다. */}
        </>

    )
};

export default Plane;