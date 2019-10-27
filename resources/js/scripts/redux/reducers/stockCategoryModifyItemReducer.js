const initialState = {
    object_id: null
} 

export default (state = initialState, { type, object_id }) => {
    switch (type) {
        case 'CPANEL_STOCKCATEGORY_ITEM_DELETE':
            return {
                ...state,
                object_id: object_id
            };

        default:
            return state;
    }
}