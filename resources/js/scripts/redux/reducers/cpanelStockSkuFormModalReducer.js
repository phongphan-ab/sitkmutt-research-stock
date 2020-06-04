export default (state = false, { type, isOpen }) => {
    switch (type) {
        case 'CPANEL_STOCKSKU_FORM_MODAL':
            state = isOpen
            break
    }

    return state
}
