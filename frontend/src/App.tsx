import Index from './routes/index';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './routes/authentication/authentication';
import Navigation from './routes/navigation/navigation';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Index />}/>
            <Route path="auth" element={<Authentication />} />
          </ Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
