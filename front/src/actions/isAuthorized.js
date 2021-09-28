export const isAuthorized = (token) => ({
  type: 'USER_AUTHORIZED',
  token
})

export const isNotAuthorized = () => ({
  type: 'USER_NOT_AUTHORIZED'
})