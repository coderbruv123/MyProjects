import AddCategory from '../../Components/Admins/AddCategory'
import AddProduct from '../../Components/Admins/AddProduct'

const Dashboard = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold text-center my-3'>
        Dashboard
        </h1>
        <AddProduct />
        <AddCategory/>
    </div>
  )
}

export default Dashboard