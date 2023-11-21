export const initWindowLocation = () => {
  window = Object.create(window)

  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost:1234/',
      origin: 'http://localhost:1234',
      pathname: '/'
    },
    writable: true
  })
} 