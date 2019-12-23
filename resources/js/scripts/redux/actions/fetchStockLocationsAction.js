import Axios from "axios";

export const fetchStockLocations = () => (
    dispatch => {
        dispatch(fetchStockLocationsBegin())
        return Axios.get('/stock_locations')
            .then(response => {
                dispatch(fetchStockLocationsSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchStockLocationsFailure(error))
            })
    }
)
export const fetchStockLocationsBegin = () => ({
    type: 'FETCH_STOCKLOCATION_BEGIN'
});

export const fetchStockLocationsSuccess = data => {
    data.sort((a,b) => {
        return a.title.localeCompare(b.title)
    })
    
    return {
        type: 'FETCH_STOCKLOCATION_SUCCESS',
        payload: { data }
    }
};

export const fetchStockLocationsFailure = error => ({
    type: 'FETCH_STOCKLOCATION_FAILURE',
    payload: { error }
});
  