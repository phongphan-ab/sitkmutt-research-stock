export default (state = true, { type, isSiderShow }) => {
    switch (type) {
      case 'ANTD_SIDER_MENU_TOGGLE':
        if (isSiderShow !== undefined) {
          state = isSiderShow
          return state
        }
        return !state;
      default:
        return state
    }
}