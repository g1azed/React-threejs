import { useBox } from "@react-three/cannon";
// import * as textures from "../images/textures"; 

export const Cube = ({ position, texture }) => {
    const [ref] = useBox(() => ({
        type: "Static",
        position,
    }));

    // const activeTexture = textures[texture + "Texture"];

    return (
        <mesh ref={ref}>
        <boxBufferGeometry attach="geometry" />
        {/* <meshStandardMaterial map={activeTexture} attach="material" /> */}
        <meshStandardMaterial attach="material" />
        </mesh>
    );
};