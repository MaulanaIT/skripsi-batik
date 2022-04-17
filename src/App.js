import React, { Component } from 'react';

// Import Library
import { Navigate, Route, Routes } from 'react-router-dom';

// Import Component
import Dashboard from './pages/dashboard';
import Header from './component/header';
import Sidebar from './component/sidebar';

// Import CSS
import style from './App.module.css';

// Import Javascript
import WOW from 'wowjs';

export class App extends Component {

    componentDidMount() {
        const wow = new WOW.WOW({
            live: false
        });
        
        wow.init();
    }

    render() {
        return (
            <div className={style.container}>
                <Header />
                <div className={style.container_content}>
                    <Sidebar />

                    <div className={style.content}>
                        <Routes>
                            <Route path={'/'} element={<Navigate to={'/dashboard'} />} />
                            <Route path={'/dashboard'} element={<Dashboard />} />
                        </Routes>
                    </div>
                </div>
            </div>
        )
    }
}

export default App