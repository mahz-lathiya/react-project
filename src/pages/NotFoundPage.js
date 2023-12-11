import React, { useEffect } from 'react'
import {  useNavigate } from "react-router-dom"
import { createUseStyles, useTheme } from 'react-jss';

import { Column, Row } from 'simple-flexbox';
import { SidebarComponent, SidebarContext } from '../components/sidebar/SidebarComponent';
import HeaderComponent from '../components/header/HeaderComponent';

import Theme from '../resources/theme';
import { ThemeProvider } from 'react-jss';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';

const useStyles = createUseStyles({
    container: {
        height: '100%',
        minHeight: 850
    },
    mainBlock: {
        marginLeft: 255,
        padding: 30,
        '@media (max-width: 1080px)': {
            marginLeft: 0
        }
    },
    contentBlock: {
        marginTop: 54
    }
});

function NotFoundPage() {
    const navigate = useNavigate();

    const theme = useTheme();
    const classes = useStyles({ theme });

    useEffect(() => {
        if (localStorage.getItem('token') != "" && localStorage.getItem('token') != null) {
            // loadUserData();
        }
        else {
            navigate('/');
        }
    }, [])

    var user_obj = JSON.parse(localStorage.getItem('user_data'));

    return (
        <ThemeProvider theme={Theme}>
            <SidebarContext>
                <Row className={classes.container}>
                    <SidebarComponent />
                    <Column flexGrow={1} className={classes.mainBlock}>
                    <HeaderComponent />
                    <h2>404 Page Not Found</h2>
                    </Column>
                </Row>
            </SidebarContext>
        </ThemeProvider>
    );
}

export default NotFoundPage;