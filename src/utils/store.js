import create from "zustand"

export const useStore = create(set => ({
    vert:                     
    [
        "precision mediump float;",
        "precision mediump int;",
        "",
        "varying vec2 vUv;",
        "varying vec3 vPosition;",
        "varying vec3 vNormal;",
        "uniform float time;",
        "",
        "void main() {",
        "  vUv = uv;",
        "  vNormal = normal;",
        "  float time = time * 10.;",
        "",
        "  float theta;",
        "  float c;",
        "  float s;",
        "",
        "  // Twist X",
        "  theta = 1.5 + sin((time * 1.2) + (position.x * 0.3)) * 2.;",
        "  c = cos( theta );",
        "  s = sin( theta );",
        "  mat3 twistX = mat3(",
        "    1, 0, 0,",
        "    0, c, -s,",
        "    0, s, c",
        "  );",
        "",
        "  // Twist Y",
        "  theta = sin((time * 0.2) + (position.y * 0.5)) * 0.8;",
        "  c = cos( theta );",
        "  s = sin( theta );",
        "  mat3 twistY = mat3(",
        "    c, 0, s,",
        "    0, 1, 0,",
        "    -s, 0, c",
        "  );",
        "",
        "",
        "  // Twist Z",
        "  theta = position.y / position.z;",
        "  c = cos( theta );",
        "  s = sin( theta );",
        "  mat3 twistZ = mat3(",
        "    c, -s, 0,",
        "    s, c, 0,",
        "    0, 0, 1",
        "  );",
        "",
        "  mat3 rot = twistY;",
        "",
        "  vec3 pos = vec3( position ) * rot;",
        "  vNormal = vNormal * rot;",
        "  ",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);",
        "}"
    ].join("\n"),

    // frag: `lightblue`,

    frag: 
    [
        "precision mediump float;",
        "uniform float time;",
        "uniform vec3 colorStart;",
        "uniform vec3 colorEnd;",
        "varying vec2 vUv;",
        "void main() {",
        "    vec2 displacedUv = vUv;",
        "    float strength = displacedUv.x * 10.0;",
        "    float strength2 = (sin((time * 2.0)) * 0.75);",
        "    float outerGlow = distance(vUv, vec2(0.5)) * strength2 + 0.5;",
        "    strength += outerGlow;",
        "    strength += step(-0.2, strength) * 0.6;",
        "    // strength = clamp(strength, 0.0, 1.0);",
        "    vec3 color = mix(colorStart, colorEnd, outerGlow);",
        "    gl_FragColor = vec4(color, 1.0);",
        "}"
    ].join("\n"),

    vertOld:                     
        [
            "varying vec2 vUv;",
            "",
            "void main() {",
            "    vec4 modelPosition = modelMatrix * vec4(position, 1.0);",
            "    vec4 viewPosition = viewMatrix * modelPosition;",
            "    vec4 projectionPosition = projectionMatrix * viewPosition;",
            "    gl_Position = projectionPosition;",
            "    vUv = uv;",
            "}"
        ].join("\n"),
    fragOld: 
        [
            // "glsl`",
            "#pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) ",
            "",
            "uniform float time;",
            "uniform vec3 colorStart;",
            "uniform vec3 colorEnd;",
            "varying vec2 vUv;",
            "void main() {",
            "    vec2 displacedUv = vUv + cnoise3(vec3(vUv * 10.0, time * 0.1));",
            "    float strength = cnoise3(vec3(displacedUv * 10.0, time * 0.2));",
            "    float outerGlow = distance(vUv, vec2(0.5)) * 2.0 - 0.5;",
            "    strength += outerGlow;",
            "    strength += step(-0.2, strength) * 0.6;",
            "    strength = clamp(strength, 0.0, 1.0);",
            "    vec3 color = mix(colorStart, colorEnd, strength);",
            "    gl_FragColor = vec4(color, 1.0);",
            "}",
            // "`"
        ].join("\n"),

    setVert: (v)=>{
        set(state=>state.vert = v);
        console.log(JSON.stringify(v));
    },
    // setVert: (v)=>
    //     set((state)=>({
    //     ...state.vert = v
    //     })),

    setFrag: (v)=>
        set((state)=>({
        ...state.frag = v
        })),
}))


// const useStore = create(set => ({
//     vert: `
//     varying vec2 vUv;
    
//     void main() {
//         vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//         vec4 viewPosition = viewMatrix * modelPosition;
//         vec4 projectionPosition = projectionMatrix * viewPosition;
//         gl_Position = projectionPosition;
//         vUv = uv;
//     }`,

//     frag: `
//     #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
    
//     uniform float time;
//     uniform vec3 colorStart;
//     uniform vec3 colorEnd;
//     varying vec2 vUv;
//     void main() {
//       vec2 displacedUv = vUv + cnoise3(vec3(vUv * 10.0, time * 0.1));
//       float strength = cnoise3(vec3(displacedUv * 10.0, time * 0.2));
//       float outerGlow = distance(vUv, vec2(0.5)) * 2.0 - 0.5;
//       strength += outerGlow;
//       strength += step(-0.2, strength) * 0.6;
//       strength = clamp(strength, 0.0, 1.0);
//       vec3 color = mix(colorStart, colorEnd, strength);
//       gl_FragColor = vec4(color, 1.0);
//     }`,
// }))