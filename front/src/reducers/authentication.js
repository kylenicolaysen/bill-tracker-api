const defaultAuthState = { isAuthenticated: false, token: '' }

export default (state = defaultAuthState, action) => {
  switch (action.type) {
    case 'USER_AUTHORIZED':
      return { ...state, isAuthenticated: true, token: action.token }
    case 'USER_NOT_AUTHORIZED':
      return { ...state, isAuthenticated: false, token: ''}
    default:
      return state
  }
}