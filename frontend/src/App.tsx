import Index from './routes/index';
import { Route, Routes } from 'react-router-dom';
import ProfileRoute from './routes/profile/profile.route';
import Navigation from './routes/navigation/navigation';
import SignIn from './routes/authentication/sign-in';
import SignUp from './routes/authentication/sign-up';
import Folders from './components/folders/folder';



function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Index />}/>
            <Route path="sign-in" element={<SignIn />} /> 
            <Route path="sign-up" element={<SignUp />} /> 
            <Route path="profile" element={<ProfileRoute />}/>
            <Route path="folders/*" element={<Folders />}/>
          </ Route>
        </Routes>
    </div>
  );
}

export default App;
