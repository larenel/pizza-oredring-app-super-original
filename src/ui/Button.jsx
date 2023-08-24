import { Link } from 'react-router-dom'
const base =
  'bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed text-sm'

const Button = ({ children, disabled, to, type, onClick }) => {
  const styles = {
    base,
    primary: base + ' py-3 px-4 md:px-6 md:py-4',
    small: base + ' py-2 px-4 md:px-6 md:py-2.5 text-xs',
    secondary:
      ' uppercase font-semibold text-stone-400 inline-block tracking-wide rounded-full hover:bg-stone-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:bg-stone-300 focus:ring-offset-1 hover:text-stone-800 disabled:cursor-not-allowed border-2 border-stone-300 py-2 px-4 md:px-6 md:py-3 text-sm',
    round: base + ' py-1 px-2.5 md:px-4 md:py-2 text-sm  ',
  }

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    )

  if (onClick) {
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    )
  }

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
