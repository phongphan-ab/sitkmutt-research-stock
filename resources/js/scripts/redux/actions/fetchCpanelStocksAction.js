import Axios from "axios";

export const fetchCpanelStocks = (pagination) => {
    return (dispatch) => {
        dispatch(fetchCpanelStocksBegin())
        return Axios.get('/stocks', {
            params: {
                page: pagination ? pagination.current : 1
            }
        })
            .then(response => {
                dispatch(fetchCpanelStocksSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchCpanelStocksFailure(error))
            })
    }
}
export const fetchCpanelStocksBegin = () => ({
    type: 'FETCH_CPANEL_STOCKS_BEGIN'
});

export const fetchCpanelStocksSuccess = (data) => {
    return {
        type: 'FETCH_CPANEL_STOCKS_SUCCESS',
        payload: { data }
    }
};

export const fetchCpanelStocksFailure = error => ({
    type: 'FETCH_CPANEL_STOCKS_FAILURE',
    payload: { error }
});
  