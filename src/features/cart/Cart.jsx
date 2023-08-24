import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { getCart } from './cartSlice'
import { useDispatch } from 'react-redux'
import { clearCart } from './cartSlice'
import EmptyCart from './EmptyCart'

function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector(getCart)
  const username = useSelector((store) => store.user.username)
  const handleClearCart = () => dispatch(clearCart())

  if (!cart.length) return <EmptyCart />

  return (
    <div className="py-3 px-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divide-y divide-stone-200 border-b mt-4">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="mt-6 space-x-3">
        <Button type={'primary'} to="/order/new">
          Order pizzas
        </Button>

        <Button onClick={handleClearCart} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  )
}

export default Cart
