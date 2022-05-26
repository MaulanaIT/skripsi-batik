// Import Library
import React, { Component } from 'react';

// Import CSS
import global from '../css/global.module.css';

export class popup extends Component {
    render() {
        return (
            <div id='loading' className={`${global.loading_background} d-none`}>
                <div className={global.container}>
                    <div className={global.spinner}></div>
                </div>
            </div>
        )
    }
}

export default popup