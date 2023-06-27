import { useState } from 'react'
import { useStore } from '../utils/store'

const Test = () => {
	const [bg, setBg] = useState(true)

	const bgC = useStore((state) => state.bgC)
	const setBgC = useStore((state) => state.setBgC)
	const handleClick = () => {
		setBgC(!bgC)
	}
	console.log('render test')
	return (
		<div
			style={{ backgroundColor: `${bgC ? 'red' : 'blue'}` }}
			onClick={handleClick}
		>
			test
		</div>
	)
}

export default Test
