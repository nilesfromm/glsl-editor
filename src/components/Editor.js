import '../App.css';
import AceEditor from "react-ace";
import { useStore } from '../utils/store'
import { useResize } from '../utils/resize';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-language_tools';
import "ace-builds/src-noconflict/mode-glsl";
import "ace-builds/src-noconflict/theme-tomorrow"; //change to tomorrow / monokai

function Editor() {
    const { setVert, setVertFlat, setFrag, vert, vertFlat } = useStore()
    // const vert = useStore(state => state.vert);
    // const vertFlat = useStore((state) => state.vertFlat);
    const flat = useStore((state) => state.toolbar.flat);
    const { initResize } = useResize('vertical');

    return (
        <div id="editPanel">
            <div id="vertPanel" className="editorWrap">
                <p className="editorTitle">Vertex Shader</p>
                <AceEditor
                    style={{
                        boxShadow:"none",
                        opacity: flat ? 0.25 : 1,
                    }}
                    mode="glsl"
                    theme="tomorrow"
                    className="editor"
                    width="100%"
                    height="100%"
                    debounceChangePeriod={1000}
                    value={ flat ? vertFlat : vert }
                    onChange={ flat ? e=>setVertFlat(e) : e=>setVert(e) }
                    name="Vert"
                    showGutter={!useStore(state => state.errorLog.run)}
                    showPrintMargin={false}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        readOnly: flat ? true : false,
                    }}
                />
            </div>
            <div id="hBreak" className='Break' onMouseDown={ initResize } />
            <div id="fragPanel" className="editorWrap">
                <p className="editorTitle">Fragment Shader</p>
                <AceEditor
                    mode="glsl"
                    theme="tomorrow"
                    className="editor"
                    width="100%"
                    height="100%"
                    debounceChangePeriod={1000}
                    value={useStore(state => state.frag)}
                    onChange={e=>setFrag(e)}
                    name="Frag"
                    showGutter={!useStore(state => state.errorLog.run)}
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
