import Axios from "axios";

export const fetchCpanelStockSkus = (stock_id, pagination) => {
    return (dispatch) => {
        dispatch(fetchCpanelStockSkusBegin())
        return Axios.get(`/stocks/${stock_id}/skus`, {
            params: {
                page: pagination ? pagination.current : 1
            }
        })
            .then(response => {
                dispatch(fetchCpanelStockSkusSuccess(response.data))
            })
            .catch(error => {
                console.error(error)
                dispatch(fetchCpanelStockSkusFailure(error))
            })
    }
}
export const fetchCpanelStockSkusBegin = () => ({
    type: 'FETCH_CPANEL_STOCKSKUS_BEGIN'
});

export const fetchCpanelStockSkusSuccess = (data) => {
    return {
        type: 'FETCH_CPANEL_STOCKSKUS_SUCCESS',
        payload: { data }
    }
};

export const fetchCpanelStockSkusFailure = error => ({
    type: 'FETCH_CPANEL_STOCKSKUS_FAILURE',
    payload: { error }
});
