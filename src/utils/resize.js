import { useState, useEffect, useRef } from 'react'
import { useStore } from './store'

export const useResize = (axis) => {
  const { resize, setHorizontal, setVertical } = useStore();
  const isMounted = useRef(false);
  const [coords, setCoords] = useState({ x: Infinity, y: Infinity })
  const [dims, setDims] = useState({ width: Infinity })

  const initResize = (event) => {
    setCoords({ x: event.clientX, y: event.clientY })
    setDims({ width: resize.horizontal, height: resize.vertical })
  }

  useEffect(() => {
    let resizeVal;
    let resizeElement;
    if(axis === 'horizontal'){
        resizeVal = resize.horizontal;
        resizeElement = document.getElementById('viewPanel');
    } else if(axis === 'vertical'){
        resizeVal = resize.vertical;
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
        document.getElementById('viewPanel').style.width = resize.horizontal + '%';
        document.getElementById('vertPanel').style.height = resize.vertical + '%';
    }

  }, [dims, coords])

  return { initResize }
}