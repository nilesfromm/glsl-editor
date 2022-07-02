import create from "zustand"

// String.prototype.dedent = function() {
    
//     return this.split('\n').map(line => line.replace(/^ +/gm, '')).join('\n');
    
    
// }

const detent = (_string)=>{

	const regex = new RegExp(`^[ \\t]{4}`, 'gm');
    
	return _string.split('\n').map(line => line.replace(regex, '')).join('\n');
}

export const useStore = create(set => ({

    //---------------------------------------------------------------------------------------------------
    //Tool Bar Data
    toolbar: {
        geometry:   "cube",
        flat:       false,  
        grid:       true,
        orbit:      true,
    },

    setGeometry: (v)=>{
        set(state=>state.toolbar.geometry = v);
        console.log("set tb geometry to:", v);
    },

    setFlat: (v)=>{
        set(state=>state.toolbar.flat = v);
        console.log("set tb flat to:", v);
    },

    setGrid: (v)=>{
        set(state=>state.toolbar.grid = v);
        console.log("set tb grid to:", v);
    },

    setOrbit: (v)=>{
        set(state=>state.toolbar.orbit = v);
        console.log("set tb orbit to:", v);
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
    
    vert:
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

    frag: 
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
        // console.log(JSON.stringify(v));
    },

    setVert: (v)=>{
        set(state=>state.vert = v);
        set(state=>state.errorLog.run = true);
        // console.log(JSON.stringify(v));
    },

    setFrag: (v)=>{
        set(state=>state.frag = v);
        set(state=>state.errorLog.run = true);
        // console.log(JSON.stringify(v));
    },

}))