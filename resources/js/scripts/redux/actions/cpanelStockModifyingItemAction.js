export const editStockItem = (data) => ({
    type: 'CPANEL_STOCK_ITEM_EDIT',
    data: data,
    editMode: true
})

export const cancelStockItemEditing = () => ({
    type: 'CPANEL_STOCK_ITEM_EDIT_CANCEL',
    data: null,
    editMode: false
});

export const deleteStockItem = (data) => ({
    type: 'CPANEL_STOCK_ITEM_DELETE',
    data: data
});
