const initialState = {
    data: null,
    editMode: false
} 

export default (state = initialState, { type, data }) => {
    switch (type) {
        case 'CPANEL_STOCK_ITEM_EDIT':
            return {
                ...state,
                data: data,
                editMode: true
            }

        case 'CPANEL_STOCK_ITEM_EDIT_CANCEL':
            return {
                ...state,
                data: null,
                editMode: false
            }

        case 'CPANEL_STOCK_ITEM_DELETE':
            return {
                ...state,
                data: data,
                editMode: false
            };

        default:
            return state;
    }
}