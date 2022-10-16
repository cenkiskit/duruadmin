export const productObj = (
    id,
    title,
    content,
    price,
    imageList,
    categoryId,
) => {
    return {
        id: id,
        title: title,
        content: content,
        price: price,
        imageList: imageList,
        categoryId: categoryId
    }
}

export const categoryObj = {
    id: null,
    title: null,
}