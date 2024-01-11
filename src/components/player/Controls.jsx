import { React, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
// import { useKeyboard } from "../../hooks/useKeyboard"; // + 만들어 둔 hook을 추가하자
// const JUMP_FORCE = 4; // + Player JUMP 발생시 적용할 힘의 값

export default function Controls() {

    const camera = useThree({ 
        //  useThree는 기본 렌더러, 장면, 카메라 등의 상태 모델에 액세스를 지원하는 hook
        // fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] 
    });
    const [ref, api] = useSphere(() => ({
        // 모양을 pick
        mass: 1, // 질량
        type: "Dynamic", // 사용자 input에 따라 조작 가능한 요소를 지정
        // Dynamic : 0이 아닌 질량을 가진채로 다른 요소들과 충돌 O, 유저에 의해 움직여짐
        position: [0, 1, 0],
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
    })

        
    // + 가져온 actions hook에서 jump의 값이 true인 경우(key down이 발생한 경우) 실행
    // if (actions.jump) {
    //     // Player의 속도값 중 y축의 값 즉, 높이를 JUMP_FORCE = 4 만큼 적용시킨다.
    //     api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    // }

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
