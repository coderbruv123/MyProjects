
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthCheck from './AuthCheck/AuthCheck'
import Login from './Pages/Auth/Login/Login'
import Register from './Pages/Auth/Register/Register'
import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth/Auth'
import Navbar from './Components/Navbar'

function App() {

  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>

        <Route path="/" element={
          // <AuthCheck>
            <Home/>
          } />
        <Route path="/Auth" element={<Auth/>} >
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
        </Route>
        <Route path="*" element={<div>404</div>} />
   </Routes>
        </BrowserRouter>
  )
}

export default App
