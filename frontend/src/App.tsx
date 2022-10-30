import Index from './routes/index';
import { Route, Routes } from 'react-router-dom';
import Authentication from './routes/authentication/authentication';
import Navigation from './routes/navigation/navigation';
import TextReader from './components/text-reader/text-reader';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Index />}/>
            <Route path="auth" element={<Authentication />} />
            <Route path="text-reader" element={<TextReader />} />
          </ Route>
        </Routes>
    </div>
  );
}

export default App;
