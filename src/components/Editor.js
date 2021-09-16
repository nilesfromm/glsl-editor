import '../App.css';
import AceEditor from "react-ace";
import { useStore } from '../utils/store'
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-language_tools';
import "ace-builds/src-noconflict/mode-glsl";
import "ace-builds/src-noconflict/theme-tomorrow"; //change to tomorrow / monokai

function Editor() {
    const { setVert, setFrag } = useStore()
    return (
        <div id="editPanel">
            <div className="editorWrap">
                <p className="editorTitle">Vertex Shader</p>
                <AceEditor
                    style={{
                        boxShadow:"none"
                    }}
                    mode="glsl"
                    theme="tomorrow"
                    className="editor"
                    width="100%"
                    height="100%"
                    debounceChangePeriod={1000}
                    value={useStore(state => state.vert)}
                    // value={
                    //     [
                    //         "varying vec2 vUv;",
                    //         "",
                    //         "void main() {",
                    //         "    vec4 modelPosition = modelMatrix * vec4(position, 1.0);",
                    //         "    vec4 viewPosition = viewMatrix * modelPosition;",
                    //         "    vec4 projectionPosition = projectionMatrix * viewPosition;",
                    //         "    gl_Position = projectionPosition;",
                    //         "    vUv = uv;",
                    //         "}"
                    //     ].join("\n")
                    // }
                    onChange={e=>setVert(e)}
                    // onChange={e=>console.log(e)}
                    name="Vert"
                    showGutter={false}
                    showPrintMargin={false}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true
                    }}
                />
            </div>
            <div className="editorWrap">
                <p className="editorTitle">Fragment Shader</p>
                <AceEditor
                    mode="glsl"
                    theme="tomorrow"
                    className="editor"
                    width="100%"
                    height="100%"
                    debounceChangePeriod={1000}
                    value={useStore(state => state.frag)}
    //                 value={`
    // #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 

    // uniform float time;
    // uniform vec3 colorStart;
    // uniform vec3 colorEnd;
    // varying vec2 vUv;
    // void main() {
    //     vec2 displacedUv = vUv + cnoise3(vec3(vUv * 10.0, time * 0.1));
    //     float strength = cnoise3(vec3(displacedUv * 10.0, time * 0.2));
    //     float outerGlow = distance(vUv, vec2(0.5)) * 2.0 - 0.5;
    //     strength += outerGlow;
    //     strength += step(-0.2, strength) * 0.6;
    //     strength = clamp(strength, 0.0, 1.0);
    //     vec3 color = mix(colorStart, colorEnd, strength);
    //     gl_FragColor = vec4(color, 1.0);
    // }`}
                    onChange={e=>setFrag(e)}
                    // onChange={e=>console.log(e)}
                    name="Frag"
                    showGutter={false}
                    showPrintMargin={false}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true
                    }}
                />
            </div>
        </div>
    );
}

export default Editor;
