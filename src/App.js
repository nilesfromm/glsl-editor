import './App.css';
import { useState, useEffect, useRef } from 'react'
import { useResize } from './utils/resize';
import Editor from './components/Editor';
import Viewer from './components/Viewer';
import Mobile from './components/Mobile';
import "@fontsource/ibm-plex-mono/500.css"
import "@fontsource/ibm-plex-mono/400.css"
import "@fontsource/ibm-plex-mono/300.css"
import "@fontsource/ibm-plex-mono/500-italic.css"
import "@fontsource/ibm-plex-mono/400-italic.css"
import "@fontsource/ibm-plex-mono/300-italic.css"

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 800;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const { initResize } = useResize('horizontal');

  return (
      <div id='wrapper'>
        {width < breakpoint ? <Mobile /> : "" }
        {width > breakpoint ? <Viewer /> : "" }
        {width > breakpoint ? <div id='vBreak' className='Break' onMouseDown={ initResize } /> : "" }
        {width > breakpoint ? <Editor /> : "" }
      </div>
  );
}

export default App;