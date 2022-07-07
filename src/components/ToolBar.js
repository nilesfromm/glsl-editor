import "../App.css";
import React, { useRef, useState } from "react";
import { useStore } from "../utils/store";

import { ReactComponent as BtGeoCube } from "../imgs/cube.svg";
import { ReactComponent as BtGeoPlane } from "../imgs/plane.svg";
import { ReactComponent as BtGeoSphere } from "../imgs/sphere.svg";
import { ReactComponent as BtGeoCylinder } from "../imgs/cylinder.svg";
import { ReactComponent as BtGeoTorus } from "../imgs/torus.svg";
import { ReactComponent as BtGeoFrag } from "../imgs/frag.svg";

import { ReactComponent as BtGrid } from "../imgs/grid.svg";
import { ReactComponent as BtDownload } from "../imgs/download.svg";
import { ReactComponent as BtUpload } from "../imgs/upload.svg";
import { ReactComponent as BtOrbit } from "../imgs/orbit.svg";
import { ReactComponent as BtScreenShot } from "../imgs/screenShot.svg";

function SubMenu(props) {
	const [showSubMenu, setShowSubMenu] = useState(false);
	function MouseOver(event) {
		setShowSubMenu(true);
	}
	function MouseOut(event) {
		setShowSubMenu(false);
	}
	const openWidth =
		props.children.length * 25 + (props.children.length - 1) * 5;
	return (
		<div
			className="tb_submenu"
			onMouseEnter={MouseOver}
			onMouseLeave={MouseOut}
			onClick={() => setShowSubMenu(true)}
			style={{
				width: showSubMenu ? openWidth + "px" : "25px",
			}}
		>
			{props.children}
		</div>
	);
}

function Button(props) {
	const [showSubMenu, setShowSubMenu] = useState(false);
	// const [active, setActive] = useState(false)

	function ClickButton(param) {
		switch (param) {
			case "cube":
			case "sphere":
			case "cylinder":
			case "torus":
			case "plane":
				props.control(param);
				props.flat(false);
				props.orbitRef.current.position0.set(0,3,5);
				props.orbitRef.current.reset();
				console.log(param, "button clicked");
				break;
			case "2d":
				props.control(param);
				props.flat(true);
				props.orbitRef.current.position0.set(0,0,3.5);
				props.orbitRef.current.reset();
				console.log(param, "button clicked");
				break;
			case "grid":
				props.control(!props.current);
				console.log(" -> grid is", !props.current);
				break;
			case "orbit":
				props.control(!props.current);
				console.log(" -> orbit is", !props.current);
				break;
			case "screenShot":

				//	!!! this works on first load, but after error and render restarts it can't reach
				//		canvas data, current code works but needs 'gl={{ preserveDrawingBuffer: true }}' 
				//		in canvas, which might be bad for performance???
				// const c = props.canvasData;
				// c.gl.render(c.scene, c.camera);
				// const screenShot = c.gl.domElement.toDataURL()
				// props.children.ref.current.href = screenShot;

				const image = props.canvasRef.current.toDataURL();
				props.children.ref.current.href = image;

				console.log("screenShot button click");
				break;
			case "download":
				console.log("download button click");
				break;
			case "upload":
				console.log("upload button click");
				break;
			default:
				console.log("error: unknown button click");
				break;
		}
	}

	return (
		<div
			className="tb_button"
			onClick={() => {
				ClickButton(props.name);
			}}
			name={props.name}
			style={{
				backgroundColor: props.current === true ? "#f4f4f4" : "",
			}}
			id={props.name}
		>
			{props.children}
		</div>
	);
}

function ToolBar(props) {
	const { setGeometry, setFlat, setGrid, setOrbit } = useStore();
	const downloadRef = useRef();
	// let grid = useStore(state => state.toolbar.grid);

	return (
		<div id="tb_wrapper">
			<SubMenu>
				<Button
					name="cube"
					current={useStore((state) => state.toolbar.geometry)}
					control={setGeometry}
					flat={setFlat}
					orbitRef={props.orbitRef}
				>
					<BtGeoCube />
				</Button>
				<Button
					name="sphere"
					current={useStore((state) => state.toolbar.geometry)}
					control={setGeometry}
					flat={setFlat}
					orbitRef={props.orbitRef}
				>
					<BtGeoSphere />
				</Button>
				<Button
					name="cylinder"
					current={useStore((state) => state.toolbar.geometry)}
					control={setGeometry}
					flat={setFlat}
					orbitRef={props.orbitRef}
				>
					<BtGeoCylinder />
				</Button>
				<Button
					name="torus"
					current={useStore((state) => state.toolbar.geometry)}
					control={setGeometry}
					flat={setFlat}
					orbitRef={props.orbitRef}
				>
					<BtGeoTorus />
				</Button>
				<Button
					name="plane"
					current={useStore((state) => state.toolbar.geometry)}
					control={setGeometry}
					flat={setFlat}
					orbitRef={props.orbitRef}
				>
					<BtGeoPlane />
				</Button>
				<Button
					name="2d"
					current={useStore((state) => state.toolbar.geometry)}
					control={setGeometry}
					flat={setFlat}
					orbitRef={props.orbitRef}
				>
					<BtGeoFrag />
				</Button>
			</SubMenu>
			<Button
				name="orbit"
				current={useStore((state) => state.toolbar.orbit)}
				control={setOrbit}
			>
				<BtOrbit />
			</Button>
			<Button
				name="grid"
				current={useStore((state) => state.toolbar.grid)}
				control={setGrid}
			>
				<BtGrid />
			</Button>
			<Button
				name="screenShot"
				canvasRef={props.canvasRef}
				// canvasData={props.canvasData}
			>
				<a 
					href="download"
					ref={downloadRef}
					download="shaderScreenshot.png"
				>
					<BtScreenShot />
				</a>
			</Button>
			{/* <Button 
				name="download"
			>	
				<BtDownload />
			</Button>
			<Button name="upload">
				<BtUpload />
			</Button> */}
		</div>
	);
}

export default ToolBar;
