import { Link, Outlet } from 'react-router-dom'

 const Auth = () => {
  return (
    <div className=' flex flex-col bg-gray-100 min-h-screen items-center  ' >

      <Link to="/" className=' bg-blue-400 text-white my-4'> Return </Link>
        <Outlet/>
    </div>
  )
}
export default Auth