export default (state = false, { type, isOpen }) => {
    switch (type) {
        case 'CPANEL_STOCKLOCATION_MODAL_ADD_OPEN':
            state = isOpen
            break
    }

    return state
}