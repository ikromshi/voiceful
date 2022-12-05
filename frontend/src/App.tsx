import { Route, Routes } from 'react-router-dom';
import Spinner from './styled-components/spinner/spinner.component';
import { lazy, Suspense } from 'react';

const Index = lazy(() => import("./routes/index"));
const ProfileRoute = lazy(() => import("./routes/profile/profile.route"));
const Navigation = lazy(() => import("./routes/navigation/navigation"));
const SignIn = lazy(() => import("./routes/authentication/sign-in"));
const SignUp = lazy(() => import("./routes/authentication/sign-up"));
const Folders = lazy(() => import("./routes/folders/folders.route"));
const NewFolder = lazy(() => import("./components/new-folder/new-folder"));
const NewButton = lazy(() => import("./components/new-button/new-button"));
const Donation = lazy(() => import("./routes/donatation/donation"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="App">
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Index />}/>
              <Route path="sign-in" element={<SignIn />} /> 
              <Route path="sign-up" element={<SignUp />} /> 
              <Route path="profile" element={<ProfileRoute />}/>
              <Route path="folders/*" element={<Folders />}/>
              <Route path="new-folder" element={<NewFolder />} />
              <Route path="new-button" element={<NewButton />} />
              <Route path="donation" element={<Donation />} />
            </ Route>
          </Routes>
      </div>
    </Suspense>
  );
}

export default App;
