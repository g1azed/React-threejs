import { React, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { useKeyboard } from "../hooks/useKeyboard"; // + 만들어 둔 hook을 추가하자

const JUMP_FORCE = 4; // + Player JUMP 발생시 적용할 힘의 값
const SPEED = 4; // + 이동 SPEED를 위해 추가

export default function Controls() {

    const actions = useKeyboard();
    const { moveBackward, moveForward, moveLeft, moveRight, jump } =
    useKeyboard(); // + 기존에 actions로 통칭되던 요소를 개별요소를 직접 다 가져오도록 변경
    
    const {camera} = useThree( 
        //  useThree는 기본 렌더러, 장면, 카메라 등의 상태 모델에 액세스를 지원하는 hook
        // fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] 
    );
    // console.log(camera.camera);
    const [ref, api] = useSphere(() => ({
        // 모양을 pick
        mass: 1, // 질량
        type: "Dynamic", // 사용자 input에 따라 조작 가능한 요소를 지정
        // Dynamic : 0이 아닌 질량을 가진채로 다른 요소들과 충돌 O, 유저에 의해 움직여짐
        position: [0, 60, 0],
        // position 높이에 해당되는 두번째 인자를 1로 변경
    }))

    // + 추후에 Player에 대한 Event 처리를 위해 아래에 코드를 추가
    const vel = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (vel.current = v));
    }, [api.velocity]);
    // velocity = 컨트롤에 대한 조작 시 속도를 처리하기 위한 상태값

    const pos = useRef([0,0,0]); // 좌표 계산을 위함
    useEffect(() => {
        // Body API를 사용해 속성을 구독? 하여 각 프레임에 대한 업데이트를 받음
        api.position.subscribe((p) => (pos.current = p));
    }, [api.position]);
    // => 컨트롤러의 위치값을 pos 에 지속적으로 업데이트.

    useFrame(() => {
        // 위치, 속도, 회전, 힘 및 자극 을 적용할 수 있는 api
        camera.position.copy(
            new Vector3(pos.current[0], pos.current[1], pos.current[2])
        )
        // => 컨트롤러의 위치값이 변화했을때 우리의 시점을 Player에 위치값과 일치시켜 시야가 컨트롤러와 일치하도록


        // + 가져온 actions hook에서 jump의 값이 true인 경우(key down이 발생한 경우) 실행
        if (actions.jump) {
            // Player의 속도값 중 y축의 값 즉, 높이를 JUMP_FORCE = 4 만큼 적용시킨다.
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
        }
        // console.log({actions});
        
        const direction = new Vector3();
        
        // z(정면)축 기준으로 이동 계산
        // 만약 앞+뒤가 동시에 눌리면 -를 통해 값을 0으로 만들어 이동하지 않음
        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        );
    
        // x축 기준 이동 계산
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        );
    
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);
            // 이동 속도를 반영
            api.velocity.set(direction.x, vel.current[1], direction.z);
            // 여기까지 추가!
            
            // 아래 if 조건에서 기존에 actions.jump를 그냥 jump로 대체
            if (jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
            }
        });

    return (
        <mesh ref={ref}>
            {/*
                *들어갈수있는 참조
                geometry={ .. }
                material={ .. } 등
            */}
        </mesh>
        // 실체 물체가 필요하므로 mesh를 사용하고 컨트롤러의 물리적인 상태를 Ref로 연결
    )
}
