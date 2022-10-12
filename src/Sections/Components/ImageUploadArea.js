import React from 'react';
import ImageUploading from 'react-images-uploading';

const ImageUploadArea = ({setImageList}) => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setImageList(imageList)
    };
    console.log('Image list:', images)

    const _onClick = (func) => {
        console.log('Clickeld.')
        func()
    }

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div >
                        <button
                            onClick={() => {
                                _onClick(onImageUpload)()
                            }}
                            style={{
                                width: '100%',
                                minHeight: 200,
                                backgroundColor: 'lightgray',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                zIndex: 1,
                                borderWidth: 0
                            }}
                            {...dragProps}
                        >

                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                {
                                    imageList.length > 0 ?

                                        imageList.map((image, index) => (

                                            <div style={{
                                                marginLeft: 5,
                                                marginTop: 5,
                                                marginBottom: 5,
                                                zIndex: 5
                                            }}>
                                                <img src={image['data_url']} alt="" width="100" />
                                                <div className="image-item__btn-wrapper">
                                                    <button
                                                        style={{
                                                            backgroundColor: 'red',
                                                            color: 'white',
                                                            borderWidth: 0,
                                                            paddingRight: 10,
                                                            paddingLeft: 10,
                                                            borderRadius: 10,
                                                            marginTop: 5
                                                        }} onClick={() => {
                                                            console.log('deleting...')
                                                            onImageRemove(index)
                                                        }}>Sil</button>
                                                </div>
                                            </div>
                                        )) :
                                        <div style={{
                                        }}>
                                            Fotoğrafları sürükleyin veya tıklayıp seçin.
                                        </div>
                                }
                            </div>

                        </button>
                        {/* <button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </button> */}
                        {
                            imageList.length > 1 ?
                                <button
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        borderWidth: 0,
                                        padding: 10,
                                        borderRadius: 10,
                                        marginTop: 10
                                    }}
                                    onClick={onImageRemoveAll}>Tüm Fotoğrafları Sil</button>
                                : null
                        }
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}
export default ImageUploadArea;