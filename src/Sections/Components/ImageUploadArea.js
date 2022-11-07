import React from 'react';
import ImageUploading from 'react-images-uploading';

const ImageUploadArea = ({ setImageList, images, onlyOne }) => {

    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        setImageList(imageList)
    };

    const _onClick = (func) => {
        func()
    }

    return (
        <div className="App">
            <ImageUploading
                multiple={!onlyOne}
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
                                _onClick(onImageUpload)
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
                                                            onImageRemove(index)
                                                        }}>Sil</button>
                                                </div>
                                            </div>
                                        )) :
                                        onlyOne ?
                                            <div style={{
                                            }}>
                                                Kampanya fotoğrafını sürükleyin veya tıklayıp seçin.
                                            </div> :
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
export default React.memo(ImageUploadArea);