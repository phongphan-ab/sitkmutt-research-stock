const initialState = {
    error: null,
    data: null,
    pagination: {
        current: 1,
        defaultCurrent: 1,
        total: 0,
    },
    loading: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'FETCH_CPANEL_STOCKSKUS_BEGIN':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'FETCH_CPANEL_STOCKSKUS_SUCCESS':
            return {
                ...state,
                loading: false,
                pagination: payload.data ? {
                    pageSize: payload.data.meta.per_page,
                    current: payload.data.meta.current_page,
                    total: payload.data.meta.total
                } : null,
                data: payload.data
            };

        case 'FETCH_CPANEL_STOCKSKUS_FAILURE':
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
