export const productObj = (
    id,
    title,
    content,
    price,
    imageList,
    categoryId,
    isActive
) => {
    return {
        id: id,
        title: title,
        content: content,
        price: price,
        imageList: imageList,
        categoryId: categoryId,
        isActive: isActive
    }
}

export const categoryObj = {
    id: null,
    title: null,
}