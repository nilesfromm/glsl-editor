import "../App.css";
import React, { useRef, useState, useEffect } from "react";
import { useStore } from "../utils/store";

import { ReactComponent as BtSettings } from "../imgs/settings.svg";
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
	const smRef = useRef();
	function MouseOver(event) {
		setShowSubMenu(true);
	}
	function MouseOut(event) {
		setShowSubMenu(false);
	}
	function MouseClick(event) {
		for (let t of event.nativeEvent.path){
			if(t.nodeName === 'DIV'){
				if(t.className === 'tb_button'){
					setShowSubMenu(!showSubMenu)
				}
				break;
			}
		}
	}
	return (
		<div 
			className="tb_submenuWrapper"
			style={{
				width: showSubMenu ? smRef.current.clientWidth + 'px' : "25px",
			}}>
			<div
				ref={smRef}
				className="tb_submenu"
				onMouseEnter={ props.interaction==='hover'? MouseOver : null }
				onMouseLeave={ props.interaction==='hover'? MouseOut : null }
				onClick={ props.interaction==='click'? MouseClick : null}
			>
				{props.children}
			</div>
		</div>
	);
}

function Uniform(props){
	return(
		<div className="tb_uniform">
			<div className="tb_uniformType">{props.type}&nbsp;</div>
			<div className="tb_uniformName">{props.name}</div>
			<div>
				({props.value.map((v,i)=>{
					return <UniformVal key={i} v={v} i={i} l={props.value.length} readonly={props.readonly} />;
				})})
			</div>
		</div>
	)
}

function UniformVal(props){
	const [value, setValue] = useState(props.v);
	const [coords, setCoords] = useState({ x: 0, y: 0 });
  	const [width, setWidth] = useState(0);
	const span = useRef();

	// const initMove = (event) => {
	// 	setCoords({ x: event.clientX, y: event.clientY })
	// 	// setDims({ width: resize.horizontal, height: resize.vertical })
	// }
	
	useEffect(() => {
		setWidth(span.current.offsetWidth);
	}, [value, width]);

	const startDrag = (event) => {
		event.preventDefault();
		const shift = event.shiftKey ? 40 : 400;
		const drag = (coords.y - event.clientY) / shift;
		setValue((Number(value) + Number(drag)).toFixed(2));
	}
	const stopDrag = () => {
		document.removeEventListener('mousemove', startDrag, false)
        document.removeEventListener('mouseup', stopDrag, false)
	}
	const click = (event) => {
		// event.preventDefault();
		setCoords({ x: event.clientX, y: event.clientY })
		document.addEventListener('mousemove', startDrag, false)
        document.addEventListener('mouseup', stopDrag, false)
	}
	const handleChange = event => {
		const result = event.target.value
			.replace(/[^0-9\.]/g, '')
			.replace(/\./, "x")
  			.replace(/\./g, "")
  			.replace(/x/, ".");
		setValue(result);
	};

	return(
		<>
			<span className="tb_uniformValTemp" ref={span}>{value}</span>
			<input type="text" value={value} style={{ width }} onChange={handleChange} className="tb_uniformVal" readOnly={props.readonly} onMouseDown={props.readonly ? null : click} />
			{props.l - props.i > 1 ? <span>,</span> : null}
		</>
	)
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
			case "settings":
				console.log("settings button click");
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
			{/* <SubMenu interaction='click'>
				<Uniform
					type="f"
					name="time"
					value={[0.22]}
					readonly={true}
				/>
				<Uniform
					type="v3"
					name="colorStart"
					value={[0.1,0.2,0.3]}
				/>
				<Uniform
					type="v3"
					name="colorStart"
					value={[0.1,0.2,0.3]}
				/>
				<Uniform
					type="v3"
					name="colorStart"
					value={[0.155,0.2,0.3]}
				/>
				<Button
					name="settings"
					current={false}
					// control={setOrbit}
				>
					<BtSettings />
				</Button>
			</SubMenu> */}
			<SubMenu interaction='hover'>
				<Button
					name="2d"
					current={useStore((state) => state.toolbar.geometry)}
					control={setGeometry}
					flat={setFlat}
					orbitRef={props.orbitRef}
				>
					<BtGeoFrag />
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
					name="torus"
					current={useStore((state) => state.toolbar.geometry)}
					control={setGeometry}
					flat={setFlat}
					orbitRef={props.orbitRef}
				>
					<BtGeoTorus />
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
					name="sphere"
					current={useStore((state) => state.toolbar.geometry)}
					control={setGeometry}
					flat={setFlat}
					orbitRef={props.orbitRef}
				>
					<BtGeoSphere />
				</Button>
				<Button
					name="cube"
					current={useStore((state) => state.toolbar.geometry)}
					control={setGeometry}
					flat={setFlat}
					orbitRef={props.orbitRef}
				>
					<BtGeoCube />
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
