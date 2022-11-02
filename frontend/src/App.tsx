import Index from './routes/index';
import { Route, Routes } from 'react-router-dom';
import Authentication from './routes/authentication/authentication';
import Navigation from './routes/navigation/navigation';
import TextToSpeech from './routes/text-to-speech/text-to-speech';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Index />}/>
            <Route path="auth" element={<Authentication />} />
            <Route path="text-reader" element={<TextToSpeech />} />
          </ Route>
        </Routes>
    </div>
  );
}

export default App;
