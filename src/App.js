import './App.css';
import Editor from './components/Editor';
import Viewer from './components/Viewer';

function App() {
  return (
    <div id="wrapper">
      <Viewer />
      <Editor />
    </div>
  );
}

export default App;