import Axios from "axios";

export const fetchCpanelStocks = () => (
    dispatch => {
        dispatch(fetchCpanelStocksBegin())
        return Axios.get('/stocks')
            .then(response => {
                dispatch(fetchCpanelStocksSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchCpanelStocksFailure(error))
            })
    }
)
export const fetchCpanelStocksBegin = () => ({
    type: 'FETCH_CPANEL_STOCKS_BEGIN'
});

export const fetchCpanelStocksSuccess = data => {
    data.sort((a,b) => {
        return a.title.localeCompare(b.title)
    })
    
    return {
        type: 'FETCH_CPANEL_STOCKS_SUCCESS',
        payload: { data }
    }
};

export const fetchCpanelStocksFailure = error => ({
    type: 'FETCH_CPANEL_STOCKS_FAILURE',
    payload: { error }
});
  