export default (state = false, { type, isLoading }) => {
    switch (type) {
      case 'FRM_LOGIN_LOADING':
        state = isLoading
        return state;
      default:
        return state
    }
}