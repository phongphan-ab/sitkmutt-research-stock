const initialState = {
    error: null,
    data: null,
    loading: false
} 

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'FETCH_STOCKCATEGORIES_BEGIN':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'FETCH_STOCKCATEGORIES_SUCCESS':
            return {
                ...state,
                loading: false,
                data: payload.data
            };

        case 'FETCH_STOCKCATEGORIES_FAILURE':
            return {
                ...state,
                loading: false,
                error: payload.error,
                data: []
            };

        default:
            return state;
    }
}