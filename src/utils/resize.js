import { useState, useEffect, useRef } from 'react'
import { useStore } from './store'

export const useResize = (axis) => {
    console.log('resizing');
    // console.log(useStore());
    // const { resize, setHorizontal, setVertical } = useStore();
    const resizeHorizontal = useStore(state => state.resizeHorizontal);
    const resizeVertical = useStore(state => state.resizeVertical);
    const setHorizontal = useStore(state => state.setHorizontal);
    const setVertical = useStore(state => state.setVertical);
    const isMounted = useRef(false);
    const [coords, setCoords] = useState({ x: Infinity, y: Infinity })
    const [dims, setDims] = useState({ width: Infinity })

    const initResize = (event) => {
        setCoords({ x: event.clientX, y: event.clientY })
        setDims({ width: resizeHorizontal, height: resizeVertical })
    }

    useEffect(() => {
        let resizeVal;
        let resizeElement;
        if(axis === 'horizontal'){
            resizeVal = resizeHorizontal;
            resizeElement = document.getElementById('viewPanel');
        } else if(axis === 'vertical'){
            resizeVal = resizeVertical;
            resizeElement = document.getElementById('vertPanel');
        }
        const startDrag = (event) => {
            if(axis === 'horizontal'){
                const drag = (coords.x - event.clientX);
                const newPixelVal = ((window.innerWidth-40)*(dims.width/100)-drag);
                resizeVal = ((newPixelVal/(window.innerWidth-40)) * 100);
            
                if(resizeVal > 90){
                    resizeVal = 90;
                } else if(resizeVal < 10){
                    resizeVal = 10;
                }
                resizeElement.style.width = resizeVal + '%';
            } else if (axis === 'vertical'){
                const drag = (coords.y - event.clientY);
                const newPixelVal = ((window.innerHeight-40)*(dims.height/100)-drag);
                resizeVal = ((newPixelVal/(window.innerHeight-40)) * 100);
            
                if(resizeVal > 95){
                    resizeVal = 95;
                } else if(resizeVal < 5){
                    resizeVal = 5;
                }
                resizeElement.style.height = resizeVal + '%';
            }
            window.dispatchEvent(new Event('resize'));
        }

        const stopDrag = () => {
            if(axis === 'horizontal'){
                setHorizontal(resizeVal)
            } else if (axis === 'vertical'){
                setVertical(resizeVal)
            }
            document.removeEventListener('mousemove', startDrag, false)
            document.removeEventListener('mouseup', stopDrag, false)
        }
        if(isMounted.current){
            document.addEventListener('mousemove', startDrag, false)
            document.addEventListener('mouseup', stopDrag, false)
        } else {
            isMounted.current = true;
            document.getElementById('viewPanel').style.width = resizeHorizontal + '%';
            document.getElementById('vertPanel').style.height = resizeVertical + '%';
        }

    }, [coords, dims])

    return { initResize }
}