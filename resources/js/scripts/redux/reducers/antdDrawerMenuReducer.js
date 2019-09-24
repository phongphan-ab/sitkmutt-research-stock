export default (state = false, { type, isDrawerShow }) => {
    switch (type) {
      case 'ANTD_DRAWER_MENU_TOGGLE':
        if (isDrawerShow !== undefined) {
          state = isDrawerShow
          return state
        }
        return !state;
      default:
        return state
    }
}