const defaultUserState = { isAuthorized: false }

export default (state = defaultUserState, action) => {
  switch (action.type) {
    case 'USER_AUTHORIZED':
      return { ...state, isAuthorized: true }
    case 'USER_NOT_AUTHORIZED':
      return { ...state, isAuthorized: false }
    default:
      return state
  }
}