import create from "zustand"

const detent = (_string)=>{
	const regex = new RegExp(`^[ \\t]{4}`, 'gm');
	return _string.split('\n').map(line => line.replace(regex, '')).join('\n');
}

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create(set => ({

    //---------------------------------------------------------------------------------------------------
    //Resize UI(%)
    resize: {
        horizontal: getLocalStorage("resizeHorizontal") || 66,
        vertical:   getLocalStorage("resizeVertical")   || 50,
    },

    setHorizontal: (v)=>{
        set((state) => {
            setLocalStorage("resizeHorizontal", v);
            state.resize.horizontal = v;
        })
    },

    setVertical: (v)=>{
        set((state) => {
            setLocalStorage("resizeVertical", v);
            state.resize.vertical = v;
        })
    },

    //---------------------------------------------------------------------------------------------------
    //Tool Bar Data
    toolbar: {
        geometry:   getLocalStorage("tbGeometry") || "cube",
        flat:       getLocalStorage("tbFlat") || false,  
        grid:       Object.keys(window.localStorage).includes("tbGrid") ? getLocalStorage("tbGrid") : true,
        orbit:      Object.keys(window.localStorage).includes("tbOrbit") ? getLocalStorage("tbOrbit") : true,
    },

    setGeometry: (v)=>{
        set((state) => {
            setLocalStorage("tbGeometry", v);
            state.toolbar.geometry = v;
        });
    },

    setFlat: (v)=>{
        set((state) => {
            setLocalStorage("tbFlat", v);
            state.toolbar.flat = v;
        });
    },

    setGrid: (v)=>{
        set((state) => {
            setLocalStorage("tbGrid", v);
            state.toolbar.grid = v;
        });
    },

    setOrbit: (v)=>{
        set((state) => {
            setLocalStorage("tbOrbit", v);
            state.toolbar.orbit = v;
        });
    },

    //---------------------------------------------------------------------------------------------------
    //Error Log Data
    errorLog: {
        run:        true,
        shader:     "VERTEX",
        error:      "test",
    },

    setError: (v)=>{
        set(state=>state.errorLog = v);
    },

    //---------------------------------------------------------------------------------------------------
    //Shader Data
    vertFlat:
    detent(
    `precision mediump float;
    precision mediump int;

    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
        vUv = uv;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`),         
    
    vert: getLocalStorage("vert") ||
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
    }`),

    frag: getLocalStorage("frag") ||
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
    }`),

    setVertFlat: (v)=>{
        set(state=>state.vertFlat = v);
        set(state=>state.errorLog.run = true);
    },

    setVert: (v)=>{
        set((state) => {
            setLocalStorage("vert", v);
            state.vert = v;
        });
        set(state=>state.errorLog.run = true);
    },

    setFrag: (v)=>{
        set((state) => {
            setLocalStorage("frag", v);
            state.frag = v;
        });
        set(state=>state.errorLog.run = true);
    },

}))