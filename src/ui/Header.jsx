import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'

const Header = () => {
  return (
    <header className="bg-yellow-500 uppercase px-4 py-3 border-b-2 border-stone-950 sm:px-6 flex items-center justify-between ">
      <Link className="tracking-widest" to="/">
        PizzaHot Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  )
}

export default Header
