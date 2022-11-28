import Index from './routes/index';
import { Route, Routes } from 'react-router-dom';
import ProfileRoute from './routes/profile/profile.route';
import Navigation from './routes/navigation/navigation';
import TextToSpeech from './routes/text-to-speech/text-to-speech';
import SignIn from './routes/authentication/sign-in';
import SignUp from './routes/authentication/sign-up';



function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Index />}/>
            <Route path="text-reader" element={<TextToSpeech />} />
            <Route path="sign-in" element={<SignIn />} /> 
            <Route path="sign-up" element={<SignUp />} /> 
            <Route path="profile" element={<ProfileRoute />}/>
          </ Route>
        </Routes>
    </div>
  );
}

export default App;
