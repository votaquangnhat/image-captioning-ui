import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import UploadImage from './components/UploadImage';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Captioning</h1>
        <p>Upload an image or take a picture in order to generate a caption.</p>
      </header>
      <MantineProvider>
        <UploadImage />
      </MantineProvider>
    </div>
  )
}

export default App
