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
import Orders from './Pages/Orders/Order'
import AdminRoute from './AuthCheck/AdminCheck'
import Success from './Pages/payments/Success'
import Failure from './Pages/payments/Failure'
import Deliveries from './Pages/Admin/Deliveries'
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
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
              path="orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="Dashboard"
              element={
                <AdminRoute>

                  <Dashboard />
                </AdminRoute>
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
        <Route path="/Auth" element={<Auth />}>
          <Route index element={<Auth />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path ="/delivery" element={<Deliveries/>} />

         <Route path='/payment'>
  <Route path='success' element={<Success/>} />
  <Route path='failure' element={<Failure/>} />
</Route>

        <Route path="*" element={<div>404</div>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;