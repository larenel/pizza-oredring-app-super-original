import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'

import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'
import EmptyCart from '../cart/EmptyCart'
import { createOrder } from '../../services/apiRestaurant'
import store from '../../store'
import { formatCurrency } from '../../utils/helpers'
import { useState } from 'react'
import { fetchAddress } from '../user/userSlice'
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  )

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false)
  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority && (totalCartPrice * 20) / 100
  const totalPrice = totalCartPrice + priorityPrice
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user)

  const isLoadingAddress = addressStatus === 'loading'

  const navigation = useNavigation()
  const formErrors = useActionData()
  const dispatch = useDispatch()

  const isSubmitting = navigation.state === 'submitting'

  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40 ">Phone number</label>
          <div className="grow ">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              className="input w-full"
              defaultValue={address}
            />
            {addressStatus === 'error' && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {errorAddress}
              </p>
            )}
          </div>
          <span className="absolute right-1 z-50 top-[34.5px] sm:top-[3px] sm:right-[5px] md:top-[5px]">
            {!position.latitude && !position.longitude && (
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault()

                  dispatch(fetchAddress())
                }}
              >
                Get position
              </Button>
            )}
          </span>
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring-yellow-400 focus:ring-offset-1 focus:ring-1"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />
          <Button
            type="primary"
            disabled={isSubmitting || isLoadingAddress}
            className=""
          >
            {isSubmitting
              ? 'Placing order'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  }

  const errors = {}
  if (!isValidPhone(order.phone)) errors.phone = 'please give correct phone num'

  if (Object.keys(errors).length > 0) return errors

  const newOrder = await createOrder(order)

  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
