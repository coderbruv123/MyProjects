import { ShoppingBagIcon } from "lucide-react"


const Cart = () => {
    const cart =[
        {
            
        }
    ]
  return (
    <div className="h-screen p-4 flex flex-col gap-4">
        <h1 className="text-5xl flex items-center justify-center"> <ShoppingBagIcon size={45}/> My Carts </h1>

        <div className="bg-white">
          <h1 className="bg-blue-400">Cart 1</h1>
          <div>
            
          </div>

        </div>

    </div>
  )
}

export default Cart