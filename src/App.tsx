import './App.css'
import '@mantine/core/styles.css';
import { Tabs, MantineProvider } from '@mantine/core';
import UploadImage from './components/UploadImage';
import Evaluation from './components/Evaluation';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Captioning</h1>
        <p>Upload an image or take a picture in order to generate a caption.</p>
      </header>
      <MantineProvider>
        <Tabs variant="outline" defaultValue="generating">
          <Tabs.List grow>
            <Tabs.Tab value="generating">Generation</Tabs.Tab>
            <Tabs.Tab value="evaluation">Evaluation</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="generating"><UploadImage /></Tabs.Panel>
          <Tabs.Panel value='evaluation'><Evaluation /></Tabs.Panel>
        </Tabs>
      </MantineProvider>
    </div>
  )
}

export default App
