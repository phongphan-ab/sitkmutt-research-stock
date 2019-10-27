import Axios from "axios";

export const fetchStockCategories = () => (
    dispatch => {
        dispatch(fetchStockCategoriesBegin())
        return Axios.get('/stock_categories')
            .then(response => {
                dispatch(fetchStockCategoriesSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchStockCategoriesFailure(error))
            })
    }
)
export const fetchStockCategoriesBegin = () => ({
    type: 'FETCH_STOCKCATEGORIES_BEGIN'
});

export const fetchStockCategoriesSuccess = data => {
    data.sort((a,b) => {
        return a.title.localeCompare(b.title)
    })
    
    return {
        type: 'FETCH_STOCKCATEGORIES_SUCCESS',
        payload: { data }
    }
};

export const fetchStockCategoriesFailure = error => ({
    type: 'FETCH_STOCKCATEGORIES_FAILURE',
    payload: { error }
});
  