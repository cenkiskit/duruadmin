import React from 'react'
import { Audio, Watch } from 'react-loader-spinner';
import { useSelector } from 'react-redux'
import { Selectors as InitialSelectors } from '../Redux/InitialRedux'

export default function LoadingOverlay() {
    const loading = useSelector(InitialSelectors.loading);

    return loading ? (
        <div style={{
            backgroundColor: 'rgba(255,255,255,0.5)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
        }}>

            <Watch
                height="100"
                width="100"
                radius="48"
                color="#4fa94d"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    ) : null
}
