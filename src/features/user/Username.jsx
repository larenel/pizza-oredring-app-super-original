import { useSelector } from 'react-redux'

const Username = () => {
  const selector = useSelector((store) => store.user)

  if (!selector.username) return null

  return (
    <div className="my-2 text-sm font-semibold hidden md:block">
      {selector.username}
    </div>
  )
}

export default Username
