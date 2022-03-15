import './App.css';
import React from 'react'
import Editor from './components/Editor';
import Viewer from './components/Viewer';
import Mobile from './components/Mobile';
import "@fontsource/ibm-plex-mono/500.css"
import "@fontsource/ibm-plex-mono/400.css"
import "@fontsource/ibm-plex-mono/300.css"

function App() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 800;

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  React.useEffect(() => {
    // window.onerror = () => alert("test");
  }, []);

  return (
      <div id="wrapper">
        {width < breakpoint ? <Mobile /> : "" }
        {width > breakpoint ? <Viewer /> : "" }
        {width > breakpoint ? <Editor /> : "" }
      </div>
  );
}

export default App;