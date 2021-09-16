import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import guid from 'short-uuid'
// import glsl from 'glslify'
// var glsl = require('glslify')
// import { useStore } from '../utils/store'
import glsl from 'babel-plugin-glsl/macro'

// const glsl = require('glslify')

const vertTestO = [
    "varying vec2 vUv;",
    "",
    "void main() {",
    "    vec4 modelPosition = modelMatrix * vec4(position, 1.0);",
    "    vec4 viewPosition = viewMatrix * modelPosition;",
    "    vec4 projectionPosition = projectionMatrix * viewPosition;",
    "    gl_Position = projectionPosition;",
    "    vUv = uv;",
    "}"
].join("\n")

const fragTestO = [
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
].join("\n")

const vertTest = `
    varying vec2 vUv;
    
    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
    }`

const fragTest = `
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 

uniform float time;
uniform vec3 colorStart;
uniform vec3 colorEnd;
varying vec2 vUv;
void main() {
  vec2 displacedUv = vUv + cnoise3(vec3(vUv * 10.0, time * 0.1));
  float strength = cnoise3(vec3(displacedUv * 10.0, time * 0.2));
  float outerGlow = distance(vUv, vec2(0.5)) * 2.0 - 0.5;
  strength += outerGlow;
  strength += step(-0.2, strength) * 0.6;
  strength = clamp(strength, 0.0, 1.0);
  vec3 color = mix(colorStart, colorEnd, strength);
  gl_FragColor = vec4(color, 1.0);
}`

// This shader is from Bruno Simons Threejs-Journey: https://threejs-journey.xyz
class WaveMaterial extends THREE.ShaderMaterial {
  constructor(props) {
    super({
      uniforms: {
        time: { value: 0 },
        colorStart: { value: new THREE.Color('hotpink') },
        colorEnd: { value: new THREE.Color('white') },
        g_speed: { value: 5.0 },
        g_x_freq: { value: 1.6 },
        g_x_amp: { value: 1.2 },
        g_x_off: { value: 0.0 },
        g_y_freq: { value: 0.0 },
        g_y_amp: { value: 0.0 },
        g_y_off: { value: 0.0 },
        g_z_freq: { value: 0.0 },
        g_z_amp: { value: 0.0 },
        g_z_off: { value: 0.0 },
      },
      // vertexShader: glsl`${vertTest}`,
      vertexShader: props.vertexShader,
      fragmentShader: props.fragmentShader,
    })
    console.log(props);
    console.log(this.fragmentShader);
  }
  
  set time(v) { this.uniforms.time.value = v } // prettier-ignore
  get time() { return this.uniforms.time.value } // prettier-ignore
  get colorStart() { return this.uniforms.colorStart.value } // prettier-ignore
  get colorEnd() { return this.uniforms.colorEnd.value } // prettier-ignore
  componentDidMount() {
    this.setState({});
    console.log('mounted')
  }

  render() {
    console.log('render() method')
  }
}

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
WaveMaterial.key = guid.generate()
console.log("test");
// Make the material available in JSX as <waveMaterial />
extend({ WaveMaterial })

export { WaveMaterial }