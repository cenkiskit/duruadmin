import React, { useRef } from 'react'
import './Styles/ProductSwitchStyles.css'

export default function ProductSwitch(props) {
    const {
        state,
        changeState
    } = props;

    const switchRef = useRef();
    const switchContainerRef = useRef();

    const _onPress = () => {
        changeState();
        switchContainerRef.current.classList.toggle('switchOn')
        switchRef.current.classList.toggle('switchOn')
    }

    return (
        <div ref={switchContainerRef} onClick={_onPress} className={`containerSwitch ${state ? 'switchOn' : null}`}>
            <div
                className={`subContainerSwitch ${state ? 'switchOn' : null}`} ref={switchRef}>

            </div>
        </div>
    )
}
