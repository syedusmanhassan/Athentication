import './App.css'
import Login from './components/Login';
// import Profile from './components/Profile';
import Registration from './components/Registration'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectedRoute/ProtectRoute';
import Home from './pages/Home';
import Favorites from "./pages/Favorites"
import { MovieProvider } from './context/MovieContext';

function App() {

  return (
    <>
    
    <MovieProvider>
      <Routes>
        <Route path='/' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<ProtectedRoute><Home/></ProtectedRoute> }/>
        <Route path='/favorites' element={<ProtectedRoute><Favorites/></ProtectedRoute>}/> 
      </Routes>
    </MovieProvider>
    </>
  )
}

export default App
