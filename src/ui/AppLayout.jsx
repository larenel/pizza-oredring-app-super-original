import { Outlet, useNavigation } from 'react-router-dom'
import CartOverview from '../features/cart/CartOverview'
import Header from './Header'
import Loader from './Loader'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const AppLayout = () => {
  const cart = useSelector((store) => store.cart.cart)
  const navigation = useNavigation()

  const isLoading = navigation.state === 'loading'

  return (
    <div className="grid h-screen  grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-y-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      {!!cart.length && <CartOverview />}
    </div>
  )
}

export default AppLayout
