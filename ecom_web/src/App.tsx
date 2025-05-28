import { BrowserRouter, Routes, Route, Outlet,  } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Auth from './Pages/Auth/Auth/Auth'
import Login from './Pages/Auth/Login/Login'
import Register from './Pages/Auth/Register/Register'
import Profile from './Pages/Profile/Profile'
import Product from './Pages/Product/Product'
import ProtectedRoute from './AuthCheck/AuthCheck'
import Aboutinfo from './Pages/About/Aboutinfo'
import Dashboard from './Pages/Admin/Dashboard'

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function AuthLayout() {
  return <Outlet />;
}
function ProfileLayout() {
  return <Outlet />;
}



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<Aboutinfo/>} />
          <Route path="/Account" element={<ProfileLayout />}>
            <Route
              path="Cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="Dashboard"
              element={
                  <Dashboard />
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path="/Auth" element={<AuthLayout />}>
          <Route index element={<Auth />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
