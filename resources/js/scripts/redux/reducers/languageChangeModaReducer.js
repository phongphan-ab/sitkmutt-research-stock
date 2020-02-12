export default (state = false, { type, isOpen }) => {
    switch (type) {
        case 'FOOTER_LANGUAGECHANGE_MODAL':
            state = isOpen
            break
    }

    return state
}
