import "../App.css";
// import * as THREE from 'three'
import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useStore } from "../utils/store";
import { WaveMaterial } from "./Shader";
import { DoubleSide } from "three";
import { OrbitControls } from "@react-three/drei";
import ToolBar from "./ToolBar";
import Error from "./Error";
import { ErrorLog } from "../utils/error";

function Geo(props) {
	// This reference will give us direct access to the THREE.Mesh object
	// const boxRef = useRef()
  const { vertFlat, vert, frag } = useStore()
  const flat = useStore((state) => state.toolbar.flat);
  const controls = useThree(state => state.controls)
	const matRef = useRef();
	const [hovered, setHover] = useState(false);
	// const [active, setActive] = useState(false)
	// const [errors, setErrors] = useState([])
	// useFrame((state, delta) => (boxRef.current.rotation.y))
	useFrame((state, delta) => {
		matRef.current.time += delta;
	});

	const gl = useThree((state) => state.gl.getContext());
	ErrorLog(gl);

	function switchGeo(param) {
		switch (param) {
			case "cube":
				return <boxGeometry args={[3, 3, 3]} />;
			case "sphere":
				return <sphereGeometry args={[2, 32, 32]} />;
			case "cylinder":
				return <cylinderGeometry args={[2, 2, 3, 32]} />;
			case "plane":
			case "2d":
				return <planeGeometry args={[5, 5, 16, 16]} doublesided={"true"} />;
			default:
				console.log("error: unknown button click");
				break;
		}
	}

	return (
		<mesh
			{...props}
			// ref={boxRef}
			// scale={active ? 1.5 : 1}
			// onClick={(event) => setActive(!active)}
			// onPointerOver={(event) => setHover(true)}
			// onPointerOut={(event) => setHover(false)}
		>
			{switchGeo(props.geo)}
			{/* <boxGeometry args={[2, 2, 2]} /> */}
			{/* <sphereGeometry args={[2, 16, 16]} /> */}
			{/* <cylinderGeometry args={[2, 2, 3, 10]} /> */}
			{/* <planeGeometry args={[5, 5, 16, 16]} doublesided={"true"}/> */}
			<waveMaterial
				ref={matRef}
				key={WaveMaterial.key}
				args={[
					{
						vertexShader: flat ? vertFlat : vert,
						fragmentShader: frag,
					},
				]}
				colorStart={"coral"}
				colorEnd={"white"}
				side={DoubleSide}
				wireframe={false}
			/>
		</mesh>
	);
}

function Viewer() {
	const currentGeo = useStore((state) => state.toolbar.geometry);
	const currentOrbit = useStore((state) => state.toolbar.orbit);
	const flat = useStore((state) => state.toolbar.flat);
	const currentGrid = useStore((state) => state.toolbar.grid);
  const orbitRef = useRef();
	return (
		<div id="viewPanel">
			<div id="canvasContainer">
				{useStore((state) => state.errorLog.run) ? "" : <Error />}
				<ToolBar 
          orbitRef={orbitRef}
        />
				<Canvas
					camera={{
						position: [0, 3, 5],
					}}
					dpr={window.devicePixelRatio}
				>
					<Geo position={[0, 0, 0]} geo={currentGeo} flat={flat}/>
					<gridHelper
						args={[10, 10, `gray`, `gray`]}
						visible={flat ? false : currentGrid}
					/>
					<OrbitControls
            ref={orbitRef}
						enablePan={false}
						enableZoom={flat ? false : currentOrbit}
						enableRotate={flat ? false : currentOrbit}
            makeDefault
					/>
				</Canvas>
			</div>
		</div>
	);
}

export default Viewer;
