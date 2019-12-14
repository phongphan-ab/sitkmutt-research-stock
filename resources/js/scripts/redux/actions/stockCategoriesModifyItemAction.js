export const editStockCategoryItem = (data) => ({
    type: 'CPANEL_STOCKCATEGORY_ITEM_EDIT',
    data: data,
    editMode: true
})

export const cancelStockCategoryItemEditing = () => ({
    type: 'CPANEL_STOCKCATEGORY_ITEM_EDIT_CANCEL',
    data: null,
    editMode: false
});

export const deleteStockCategoryItem = (data) => ({
    type: 'CPANEL_STOCKCATEGORY_ITEM_DELETE',
    data: data
});
