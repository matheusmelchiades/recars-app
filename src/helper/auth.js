const setUser = (user) => window.localStorage.recars = JSON.stringify(user);

const getUser = () => {
  if (!window.localStorage.recars) return {}
  return JSON.parse(window.localStorage.recars)
}

export default { setUser, getUser }
