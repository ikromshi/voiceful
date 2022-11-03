import Index from './routes/index';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/profile/profile';
import Navigation from './routes/navigation/navigation';
import TextToSpeech from './routes/text-to-speech/text-to-speech';
import Authentication from './routes/authentication/authentication';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Index />}/>
            <Route path="text-reader" element={<TextToSpeech />} />
            <Route path="auth" element={<Authentication />} /> 
            <Route path="profile" element={<Profile />}/>
          </ Route>
        </Routes>
    </div>
  );
}

export default App;
