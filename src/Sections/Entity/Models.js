export const productObj = (
    id,
    title,
    content,
    price,
    imageList,
    categoryId,
    isActive,
    campaignId
) => {
    return {
        id: id,
        title: title,
        content: content,
        price: price,
        imageList: imageList,
        categoryId: categoryId,
        isActive: isActive,
        campaignId: campaignId
    }
}

export const campaignObj = (
    id,
    title,
    description,
    color,
    imageList,
    isActive,
    order
) => {
    return {
        id: id,
        title: title,
        description: description,
        color: color,
        imageList: imageList,
        isActive: isActive,
        order: order
    }
}

export const categoryObj = {
    id: null,
    title: null,
}