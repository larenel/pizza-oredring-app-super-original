import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice'
import { formatCurrency } from '../../utils/helpers'

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity)

  const totalCartPrice = useSelector(getTotalCartPrice)

  return (
    <div className="bg-stone-800 uppercase text-stone-200 px-4 py-4 sm:px-6 sm:py-6 text-sm md:text-base flex justify-between items-center">
      <p className="font-semibold text-stone-300  space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  )
}

export default CartOverview
