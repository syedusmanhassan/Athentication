import './App.css'
import Login from './components/Login';
import Profile from './components/Profile';
import Registration from './components/Registration'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectedRoute/ProtectRoute';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute> }/>
      </Routes>

    </Router>
    </>
  )
}

export default App
