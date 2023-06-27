import { create } from 'zustand'
import { produce } from 'immer'

const detent = (_string) => {
	const regex = new RegExp(`^[ \\t]{4}`, 'gm')
	return _string
		.split('\n')
		.map((line) => line.replace(regex, ''))
		.join('\n')
}

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export const useStore = create((set) => ({
	//test

	bgC: true,
	setBgC: (v) => set({ bgC: v }),
	//---------------------------------------------------------------------------------------------------
	//Resize UI(%)

	resizeHorizontal: getLocalStorage('resizeHorizontal') || 66,
	resizeVertical: getLocalStorage('resizeVertical') || 50,

	setHorizontal: (v) => {
		setLocalStorage('resizeHorizontal', v)
		set({ resizeHorizontal: v })
	},

	setVertical: (v) => {
		setLocalStorage('resizeVertical', v)
		set({ resizeVertical: v })
	},

	// //---------------------------------------------------------------------------------------------------
	// //Tool Bar Data
	tbGeometry: getLocalStorage('tbGeometry') || 'cube',
	tbFlat: getLocalStorage('tbFlat') || false,
	tbGrid: Object.keys(window.localStorage).includes('tbGrid') ? getLocalStorage('tbGrid') : true,
	tbOrbit: Object.keys(window.localStorage).includes('tbOrbit') ? getLocalStorage('tbOrbit') : true,

	setGeometry: (v) => {
		setLocalStorage('tbGeometry', v)
		set({ tbGeometry: v })
		// set(produce((state) => {
		//     state.toolbar.geometry = v;
		// }));
	},

	setFlat: (v) => {
		setLocalStorage('tbFlat', v)
		set({ tbFlat: v })
		// set(produce((state) => {
		//     state.toolbar.flat = v;
		// }));
	},

	setGrid: (v) => {
		setLocalStorage('tbGrid', v)
		set({ tbGrid: v })
		// set(produce((state) => {
		//     state.toolbar.grid = v;
		// }));
	},

	setOrbit: (v) => {
		setLocalStorage('tbOrbit', v)
		set({ tbOrbit: v })
		// set(produce((state) => {
		//     state.toolbar.orbit = v;
		// }));
	},

	// //---------------------------------------------------------------------------------------------------
	// //Error Log Data

	errorLog: {
		run: true,
		shader: 'VERTEX',
		error: 'test',
	},

	setError: (v) => {
		console.log(v)
		set({ errorLog: v })
	},

	//---------------------------------------------------------------------------------------------------
	//Shader Data
	vertFlat: detent(
		`precision mediump float;
    precision mediump int;

    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
        vUv = uv;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`
	),

	vert:
		getLocalStorage('vert') ||
		detent(
			`precision mediump float;
    precision mediump int;

    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float time;
    
    void main() {
      vUv = uv;
      vNormal = normal;
      float time = time * 2.;
    
      float theta;
      float c;
      float s;
    
      // Twist Y
      theta = sin((time * 0.2) + (position.y * 0.5)) * 0.8;
      c = cos( theta );
      s = sin( theta );
      mat3 twistY = mat3(
        c, 0, s,
        0, 1, 0,
        -s, 0, c
      );
    
      mat3 rot = twistY;
    
      vec3 pos = vec3( position ) * rot;
      vNormal = vNormal * rot;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
    }`
		),

	frag:
		getLocalStorage('frag') ||
		detent(
			`precision mediump float;
    uniform float time;
    uniform vec3 colorStart;
    uniform vec3 colorEnd;
    varying vec2 vUv;
    void main() {
        vec2 displacedUv = vUv;
        float strength = displacedUv.x * 10.0;
        float strength2 = (sin((time * 2.0)) * 0.75);
        float outerGlow = distance(vUv, vec2(0.5)) * strength2 + 0.5;
        strength += outerGlow;
        strength += step(-0.2, strength) * 0.6;
        // strength = clamp(strength, 0.0, 1.0);
        vec3 color = mix(colorStart, colorEnd, outerGlow);
        gl_FragColor = vec4(color, 1.0);
    }`
		),

	setVertFlat: (v) => {
		set({ vertFlat: v })
		set(
			produce((state) => {
				state.errorLog.run = true
			})
		)
	},

	setVert: (v) => {
		console.log('set vert')
		setLocalStorage('vert', v)
		set({ vert: v })
		set(
			produce((state) => {
				state.errorLog.run = true
			})
		)
	},

	setFrag: (v) => {
		console.log('set frag')
		setLocalStorage('frag', v)
		set({ frag: v })
		set(
			produce((state) => {
				state.errorLog.run = true
			})
		)
	},
}))
