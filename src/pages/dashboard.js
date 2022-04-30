import React, { Component } from 'react';

// Import Component
import Header from '../component/header';

// Import CSS
import style from '../css/dashboard.module.css';

// Import Javacsript

export class dashboard extends Component {
    render() {
        return (
            <div className={style.container}>
                dashboard
            </div>
        )
    }
}

export default dashboard