import AceEditor from 'react-ace'

import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-glsl'
import 'ace-builds/src-noconflict/theme-tomorrow' //change to tomorrow / monokai

const Editor = ({ title, name, opacity, value, onChange, readOnly }) => {
	return (
		<div className='flex flex-col grow bg-white w-full border border-gray-300 rounded-sm overflow-hidden'>
			<p className='m-1.5 text-[#333] text-xs font-mono'>{title}</p>
			<AceEditor
				style={{
					boxShadow: 'none',
					opacity: { opacity },
				}}
				mode='glsl'
				theme='tomorrow'
				className='editor'
				width='100%'
				height='100%'
				debounceChangePeriod={1000}
				value={value}
				onChange={onChange}
				name={name}
				// showGutter={!useStore(state => state.errorLog.run)}
				showPrintMargin={false}
				editorProps={{ $blockScrolling: true }}
				setOptions={{
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					enableSnippets: true,
					readOnly: readOnly,
				}}
			/>
		</div>
	)
}

export default Editor
