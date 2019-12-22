export default (state = false, { type, isOpen }) => {
    switch (type) {
        case 'CPANEL_STOCKS_FORM_MODAL_OPEN':
            state = isOpen
            break
    }

    return state
}