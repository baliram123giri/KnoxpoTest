import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Users from './components/pages/Users';

function App() {
  return (
  <BrowserRouter>
    <Header/>
     <Routes>
      <Route path='/' element={<Users/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
