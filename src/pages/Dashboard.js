import React,{ useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { createUseStyles, useTheme } from 'react-jss';
import { Column, Row } from 'simple-flexbox';
import { SidebarComponent, SidebarContext } from '../components/sidebar/SidebarComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import Theme from '../resources/theme';
import {ThemeProvider} from 'react-jss';

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
  
function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})

    const theme = useTheme();
    const classes = useStyles({ theme });
 
    useEffect(()=>{
        if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
            navigate("/");
        }else {
            //getUser()
            // return <PrivateSection />;
        }
    },[])
 
    const getUser = () => {
        let payload = {
        };
        let options = {
            method: 'GET',
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        };

        fetch('https://demo.californiathemes.com/api/user_data', options)
        .then(function(promise){
            return promise.json();
        })
        .then((r) => {
           setUser(r.data)
        })
        .catch((e) => {
            console.log(e)
        });
    }
 
    const logoutAction = () => {
        let payload = {
        };
        let options = {
            method: 'POST',
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
            body : JSON.stringify(payload)
        };

        fetch('https://demo.californiathemes.com/api/logout', options)
        .then(function(promise){
            return promise.json();
        })
        .then((r) => {
            localStorage.setItem('token', "")
           navigate("/");
        })
        .catch((e) => {
            console.log(e)
        });
    }


     
    return (
        // <Layout>
        //    <div className="row justify-content-md-center">
        //         <div className="col-12">
        //             <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //                 <div className="container-fluid">
        //                     <a className="navbar-brand" href="#">Dashboard</a>
        //                     <div className="d-flex">
        //                         <ul className="navbar-nav">
        //                             <li className="nav-item">
        //                                 <a onClick={()=>logoutAction()} className="nav-link " aria-current="page" href="#">Logout</a>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </nav>
        //             <h2 className="text-center mt-5">Welcome, {user.name}!</h2  >
        //         </div>
        //     </div>
        // </Layout>
        <ThemeProvider theme={Theme}>
        <SidebarContext>
            <Row className={classes.container}>
                <SidebarComponent />
                <Column flexGrow={1} className={classes.mainBlock}>
                    <HeaderComponent />
                    <div className={classes.contentBlock}>
                        {/* <PrivateRoutes /> */}
                    </div>
                </Column>
            </Row>
        </SidebarContext>
        </ThemeProvider>

    );
}
   
export default Dashboard;