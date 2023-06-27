import './App.css'
import { useState, useEffect } from 'react'
// import { useResize } from './utils/resize'
import EditorPanel from './components/EditorPanel'
import Viewer from './components/Viewer'
import Mobile from './components/Mobile'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/300.css'
import '@fontsource/ibm-plex-mono/500-italic.css'
import '@fontsource/ibm-plex-mono/400-italic.css'
import '@fontsource/ibm-plex-mono/300-italic.css'
import Test from './components/Test'

function App() {
	const [width, setWidth] = useState(window.innerWidth)
	const breakpoint = 800

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleWindowResize)
		return () => window.removeEventListener('resize', handleWindowResize)
	}, [])

	// #wrapper {
	// 	display: flex;
	// 	flex-direction: row;
	// 	justify-content: space-between;
	// 	position: absolute;
	// 	width: calc(100vw - 40px);
	// 	height: calc(100vh - 40px);
	// 	top: 20px;
	// 	left: 20px;
	// 	background-color: #f4f4f4;
	// 	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
	// 	border-radius: 5px;
	// 	overflow: hidden;
	// }

	return (
		<div className='flex m-5 bg-[#f4f4f4] w-[calc(100vw-40px)] h-[calc(100vh-40px)] rounded-md'>
			{width < breakpoint ? (
				<Mobile />
			) : (
				<>
					<Viewer />
					<EditorPanel />
				</>
			)}
		</div>
	)
}

export default App
