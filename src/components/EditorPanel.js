import '../App.css'
import AceEditor from 'react-ace'
import { useStore } from '../utils/store'
import { useResize } from '../utils/resize'
import { useState } from 'react'

import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-glsl'
import 'ace-builds/src-noconflict/theme-tomorrow' //change to tomorrow / monokai
import Editor from './Editor'

function EditorPanel() {
	const resizeVertical = useStore((state) => state.resizeVertical)
	const resizeHorizontal = useStore((state) => state.resizeHorizontal)

	const vert = useStore((state) => state.vert)
	const vertFlat = useStore((state) => state.vertFlat)
	const frag = useStore((state) => state.frag)
	const setVert = useStore((state) => state.setVert)
	const setVertFlat = useStore((state) => state.setVertFlat)
	const setFrag = useStore((state) => state.setFrag)
	// const flat = useStore((state) => state.toolbar.flat);
	const flat = false
	const { initResize: resizeV } = useResize('vertical')
	const { initResize: resizeH } = useResize('horizontal')
	// const { initResizeVertical } = useResizeVertical()

	return (
		<div
			className='flex'
			style={{ width: `${resizeHorizontal}%` }}
		>
			<div
				id='vBreak'
				className='Break'
				onMouseDown={resizeH}
			/>
			<div className='flex flex-col p-2 pl-0 w-full h-full'>
				<div
					className='flex'
					style={{ height: `${resizeVertical}%` }}
				>
					<Editor
						title='Vertex Shader'
						name='Vert'
						opacity={flat ? 0.25 : 1}
						value={flat ? vertFlat : vert}
						onChange={flat ? (e) => setVertFlat(e) : (e) => setVert(e)}
						readOnly={flat ? true : false}
					/>
				</div>
				<div
					id='hBreak'
					className='Break'
					onMouseDown={resizeV}
				/>
				<Editor
					title='Fragment Shader'
					name='Frag'
					opacity={1}
					value={frag}
					onChange={(e) => setFrag(e)}
					readOnly={false}
				/>
			</div>
		</div>
	)
}

export default EditorPanel
