import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import guid from 'short-uuid'
import glsl from 'babel-plugin-glsl/macro'

class WaveMaterial extends THREE.ShaderMaterial {
  constructor(props) {
    super({
      uniforms: {
        time: { value: 0 },
        colorStart: { value: new THREE.Color('hotpink') },
        colorEnd: { value: new THREE.Color('white') },
      },
      // vertexShader: glsl`${vertTest}`,
      vertexShader: props.vertexShader,
      fragmentShader: props.fragmentShader,
    })
    // console.log(props);
    // console.log(this.fragmentShader);
  }
  
  set time(v) { this.uniforms.time.value = v } // prettier-ignore
  get time() { return this.uniforms.time.value } // prettier-ignore
  get colorStart() { return this.uniforms.colorStart.value } // prettier-ignore
  get colorEnd() { return this.uniforms.colorEnd.value } // prettier-ignore
  componentDidMount() {
    this.setState({});
    console.log('mounted');
  }

  render() {
    console.log('render() method');
  }
}

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
WaveMaterial.key = guid.generate()
// Make the material available in JSX as <waveMaterial />
extend({ WaveMaterial })

export { WaveMaterial }