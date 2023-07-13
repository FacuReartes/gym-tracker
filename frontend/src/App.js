import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/main" element={<Main />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Register />}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='*' element={<Navigate to="/home" replace/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
