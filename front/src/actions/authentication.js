export const isAuthd = (token) => ({
  type: 'USER_AUTHENTICATED',
  token
})

export const isNotAuthd = () => ({
  type: 'USER_NOT_AUTHENTICATED'
})