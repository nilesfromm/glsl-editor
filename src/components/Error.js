import '../App.css';
import React from 'react'
import { useStore } from '../utils/store'
import { ReactComponent as ErrorIcon } from '../imgs/error.svg';

function Error() {
    const errorLog = useStore(state => state.errorLog);

    return (
        <div id="error_wrapper">
            <div id="errorText_wrapper">
                <div id="errorIcon">
                    <ErrorIcon />
                </div>
                <p style={{fontWeight: 500, color: "#EB5757"}}>Program Info Log: invalid shaders</p>
                <p>{errorLog.shader}</p>
                <p>{errorLog.error}</p>
                {/* <p>ERROR: 0:131: ‘vUv’ : syntax error 0:131: ‘vUv’ : syntax error</p> */}
            </div>
        </div>
    );
}

export default Error;