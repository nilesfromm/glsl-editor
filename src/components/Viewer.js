import '../App.css';
import * as THREE from 'three'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useStore } from '../utils/store'
import { WaveMaterial } from './Shader';
import glsl from 'glslify'

function Box(props) {
    // This reference will give us direct access to the THREE.Mesh object
    const boxRef = useRef()
    const matRef = useRef()
    // const store = useStore();
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useFrame((state, delta) => (boxRef.current.rotation.y += 0.005))
    useFrame((state, delta) => (matRef.current.time += delta))

    return (
      <mesh
        {...props}
        ref={boxRef}
        // scale={active ? 1.5 : 1}
        // onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        >
        <boxGeometry args={[2, 2, 2]} />
        {/* <sphereGeometry args={[2, 16, 16]} /> */}
        {/* <cylinderGeometry args={[2, 2, 3, 10]} /> */}
        {/* <planeGeometry args={[5, 5, 16, 16]} /> */}
        <waveMaterial 
          ref={matRef} 
          key={WaveMaterial.key} 
          args={[{
            vertexShader: useStore(state => state.vert),
            fragmentShader: useStore(state => state.frag),
          }]}
          // vertexShader={useStore(state => state.vert)} 
          // colorStart={useStore(state => state.frag)} 
          colorStart={hovered ? 'lightblue' : 'coral'} 
          colorEnd={hovered ? 'white' : 'white'} 
        />
      </mesh>
    )
  }

function Viewer() {
  return (
    <div id="viewPanel">
        <div id="canvasContainer">
            <Canvas dpr={window.devicePixelRatio}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[0, 0, 0]} rotation={[Math.PI/8, 0, 0]}/>
            </Canvas>
        </div>
    </div>
  );
}

export default Viewer;
