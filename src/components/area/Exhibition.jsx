import {React, useState, useRef} from 'react'
import { Canvas, Camera, useFrame, useLoader } from "@react-three/fiber";
import { Color } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'
import TestGltf from '../../assets/exhibition_sgvu.glb'
import TestGltf2 from '../../assets/TeamObject/01_Bounce130.glb'
import { Physics, useBox } from '@react-three/cannon';

function ExhibitionModel(props){
    // const {nodes} = useGLTF(TestGltf);
    // const [ref, api] = useTrimesh(
    //     () => ({
    //         args : [
    //             nodes.Suzanne.geometry.attributes.position.array,
    //             nodes.Suzanne.geometry.index.array,
    //         ],
    //         mass: 1,
    //         ...props,
    //     }),
    //     useRef()
    // )

    // return (
    //     <group 
    //         ref={ref}
    //         {...props}
    //         dispose={null}
    //         onPointerDown={() => api.velocity.set(0,5,0)}
    //     >
    //         <mesh />
    //     </group>
    // )
}

export default function Exhibition(props) {
    const gltf = useLoader(GLTFLoader, TestGltf )
    var white = new Color(0xffffff);

    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    const [ref, api] = useBox(() => ({mass:1}))
    // handle 3d model
    // useFrame((state, delta, frame) => {
    // const mesh = gltf.scene.children[0];
    //     mesh.rotation.y = mesh.rotation.z += 0.01;
    //     mesh.rotation.x = state.clock.getElapsedTime();
    // });
    
    return (
        <>
            {/* <mesh geometry={ gltf.scene } >
                <meshBasicMaterial color="#ffffff" />
            </mesh> */}
            <Physics>
                <ambientLight intensity={0.5} />
                <primitive
                    object={gltf.scene}
                    scale={1}
                    color="#ffffff"
                    onPointerOver={(e) => setHover(true)}
                    onPointerOut={(e) => setHover(false)}
                    ref={ref}

                    // onClick={(e) =>
                    // window.open("https://sketchfab.com/anthonyjamesgirdler")
                    // } 
                />
            </Physics>

        </>
    )
}
