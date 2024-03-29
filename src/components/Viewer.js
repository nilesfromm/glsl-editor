import '../App.css'
// import * as THREE from 'three'
import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useStore } from '../utils/store'
import { WaveMaterial } from './Shader'
import { DoubleSide } from 'three'
import { OrbitControls } from '@react-three/drei'
import ToolBar from './ToolBar'
import Error from './Error'
import { ErrorLog } from '../utils/error'

function Geo(props) {
	const vertFlat = useStore((state) => state.vertFlat)
	const vert = useStore((state) => state.vert)
	const frag = useStore((state) => state.frag)
	const flat = useStore((state) => state.tbFlat)
	//   const controls = useThree(state => state.controls)
	const matRef = useRef()
	// const [hovered, setHover] = useState(false);
	// const [active, setActive] = useState(false)
	// const [errors, setErrors] = useState([])
	// useFrame((state, delta) => (boxRef.current.rotation.y))
	useFrame((state, delta) => {
		matRef.current.time += delta
	})

	const gl = useThree((state) => state.gl.getContext())
	ErrorLog(gl)

	function switchGeo(param) {
		switch (param) {
			case 'cube':
				return <boxGeometry args={[3, 3, 3, 32, 32, 32]} />
			case 'sphere':
				return <sphereGeometry args={[2, 32, 32]} />
			case 'cylinder':
				return <cylinderGeometry args={[2, 2, 3, 32, 32]} />
			case 'torus':
				return <torusGeometry args={[1.5, 1, 24, 32]} />
			case 'plane':
			case '2d':
				return (
					<planeGeometry
						args={[5, 5, 32, 32]}
						doublesided={'true'}
					/>
				)
			default:
				console.log('error: unknown button click')
				break
		}
	}

	console.log('mesh render')

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
			{/* <meshStandardMaterial color={'orange'} /> */}
			<waveMaterial
				ref={matRef}
				key={WaveMaterial.key}
				args={[
					{
						vertexShader: flat ? vertFlat : vert,
						fragmentShader: frag,
					},
				]}
				colorStart={'coral'}
				colorEnd={'white'}
				side={DoubleSide}
				wireframe={false}
			/>
		</mesh>
	)
}

// const screenShot = (e) => {
// 	// const image = e.current.toDataURL();
// 	console.log('test', e);
// 	e.gl.render(e.scene, e.camera)
//   	const screenshot = e.gl.domElement.toDataURL()
// 	console.log(screenshot);
// }

function Viewer() {
	const currentGeo = useStore((state) => state.tbGeometry)
	const currentOrbit = useStore((state) => state.tbOrbit)
	const flat = useStore((state) => state.tbFlat)
	const currentGrid = useStore((state) => state.tbGrid)
	const orbitRef = useRef()
	const canvasRef = useRef()
	//onClick={() => screenShot(canvasRef)}
	// let canvasData = {
	// 	gl: null,
	// 	scene: null,
	// 	camera: null
	// }
	// let store = useStore((state) => state)

	// #canvasContainer {
	// 	position: relative;
	// 	width: calc(100% - 10px);
	// 	height: calc(100% - 20px);
	// 	top: 10px;
	// 	left: 10px;
	// 	background-color: #ffffff;
	// 	box-sizing: border-box;
	// 	border-radius: 3px;
	// 	border: solid 1px #e0e0e0;
	// 	overflow: hidden;
	// }

	console.log('render viewer')
	return (
		<div className='h-full grow'>
			<div className='flex grow h-max m-2 mr-0 overflow-hidden bg-white border rounded-sm border-gray-300'>
				{useStore((state) => state.errorLog.run) ? '' : <Error />}
				<ToolBar
					orbitRef={orbitRef}
					canvasRef={canvasRef}
					// canvasData={canvasData}
				/>
				<Canvas
					ref={canvasRef}
					camera={{ position: flat ? [0, 0, 3.5] : [0, 3, 5] }}
					dpr={window.devicePixelRatio}
					gl={{ preserveDrawingBuffer: true }}
					// onCreated={(state) => {
					// 	const {gl, scene, camera } = state;
					// 	canvasData.gl = gl;
					// 	canvasData.scene= scene;
					// 	canvasData.camera = camera;
					// }}
				>
					<Geo
						position={[0, 0, 0]}
						geo={currentGeo}
						flat={flat}
					/>
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
	)
}

export default Viewer
