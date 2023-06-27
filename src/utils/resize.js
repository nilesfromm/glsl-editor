import { useState, useEffect, useRef } from 'react'
import { useStore } from './store'

export const useResizeHorizontal = (event) => {
	const resizeHorizontal = useStore((state) => state.resizeHorizontal)
	const setHorizontal = useStore((state) => state.setHorizontal)
	console.log('resizing horizontal')
}

export const useResizeVertical = (event) => {
	const resizeVertical = useStore((state) => state.resizeVertical)
	const setVertical = useStore((state) => state.setVertical)

	console.log('resizing vertical')
}

export const useResize = (axis) => {
	// console.log('resizing')
	// console.log(useStore());
	// const { resize, setHorizontal, setVertical } = useStore();
	const resizeHorizontal = useStore((state) => state.resizeHorizontal)
	const resizeVertical = useStore((state) => state.resizeVertical)
	const setHorizontal = useStore((state) => state.setHorizontal)
	const setVertical = useStore((state) => state.setVertical)
	const isMounted = useRef(false)
	const [coords, setCoords] = useState({ x: Infinity, y: Infinity })
	const [dims, setDims] = useState({ width: Infinity })

	const initResize = (event) => {
		setCoords({ x: event.clientX, y: event.clientY })
		setDims({ width: resizeHorizontal, height: resizeVertical })
	}

	useEffect(() => {
		let resizeVal
		// if (axis === 'horizontal') {
		// 	resizeVal = resizeHorizontal
		// } else if (axis === 'vertical') {
		// 	resizeVal = resizeVertical
		// }
		const startDrag = (event) => {
			if (axis === 'horizontal') {
				// console.log('resizing horizontal')
				const drag = -1 * (coords.x - event.clientX)
				const newPixelVal = (window.innerWidth - 40) * (dims.width / 100) - drag
				console.log(window.innerWidth - 40, dims.width, drag)
				resizeVal = (newPixelVal / (window.innerWidth - 40)) * 100
				console.log(resizeVal)

				if (resizeVal > 90) {
					resizeVal = 90
				} else if (resizeVal < 10) {
					resizeVal = 10
				}
				// console.log(resizeVal)
				setHorizontal(resizeVal)
			} else if (axis === 'vertical') {
				console.log('resizing vertical')
				const drag = coords.y - event.clientY
				const newPixelVal = (window.innerHeight - 40) * (dims.height / 100) - drag
				console.log(window.innerHeight - 40, dims.height, drag)
				resizeVal = (newPixelVal / (window.innerHeight - 40)) * 100
				console.log(resizeVal)

				if (resizeVal > 95) {
					resizeVal = 95
				} else if (resizeVal < 5) {
					resizeVal = 5
				}
				setVertical(resizeVal)
				// resizeElement.style.height = resizeVal + '%'
			}
			window.dispatchEvent(new Event('resize'))
		}

		const stopDrag = () => {
			document.removeEventListener('mousemove', startDrag, false)
			document.removeEventListener('mouseup', stopDrag, false)
		}
		if (isMounted.current) {
			document.addEventListener('mousemove', startDrag, false)
			document.addEventListener('mouseup', stopDrag, false)
		} else {
			isMounted.current = true
			// document.getElementById('viewPanel').style.width = resizeHorizontal + '%'
			// document.getElementById('vertPanel').style.height = resizeVertical + '%'
		}
	}, [coords, dims])

	return { initResize }
}
