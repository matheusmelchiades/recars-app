const TAG = '@RECARS::USER'

const setUser = async (user) => await localStorage.setItem(TAG, JSON.stringify(user));

const getUser = async () => JSON.parse(await localStorage.getItem(TAG))

const logOut = async () => await localStorage.removeItem(TAG)

export default { setUser, getUser, logOut }
