const HybridLink = ({ to, target = '_self', state = {}, children }) => {
  const handleClickLink = (e) => {
    if(target === '_blank') return
    e.preventDefault()
    window.history.pushState(state, "", to)
  }
  return (
    <a href={to} onClick={handleClickLink} target={target}>
      {children}
    </a>
  )
}

export default HybridLink