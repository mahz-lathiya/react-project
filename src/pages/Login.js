import React,{ useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {API_BASE_URL} from '../api';

import './App.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    useEffect(()=>{
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
        //    return <PrivateSection />;
            navigate("/dashboard");
        }
        else {
            //getUser()
            // return <PrivateSection />;
        }

    },[])
 
    const loginAction = (e) => {
        setValidationErrors({})
        e.preventDefault();
        setIsSubmitting(true)
        let form_obj = new FormData();
        form_obj.set('email', email);
        form_obj.set('password', password);

        let options = {
            method: 'POST',
            body: form_obj,
        };

        // axios.post('/api/login', payload)
        fetch(`${API_BASE_URL}/login`, options)
        .then(function(promise){
            return promise.json();
        })
        .then((r) => {
            if(r.success != true){
                throw new Error(r.message);
            }

            toast.success(r.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            localStorage.setItem('token', r.data.token);
            localStorage.setItem('user_data', r.data.user_data);
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        })
        .catch((e) => {
            setIsSubmitting(false);

            toast.warn(e.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }
 
     
    return (
        <div className="loginlayout">

            <div className="row justify-content-md-center mt-5 align-item-center">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Sign In</h5>
                            <form onSubmit={(e)=>{loginAction(e)}}>
                                {Object.keys(validationErrors).length != 0 &&
                                     <p className='text-center '><small className='text-danger'>Incorrect Email or Password</small></p>
                                }
                                
                                <div className="mb-3">
                                    <label 
                                        htmlFor="email"
                                        className="form-label">
                                            Email address
                                    </label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        required
                                        autoComplete='off'
                                        placeholder='Enter Email..'
                                        onChange={(e)=>{setEmail(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label 
                                        htmlFor="password"
                                        className="form-label">Password
                                    </label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        required
                                        value={password}
                                        placeholder='Enter Password..'
                                        onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button 
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary btn-block">Login</button>
                                    <p className="text-center">Don't have account? <Link to="/register">Register here</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// const styles = StyleSheet.create({
//     login_layout : {
        
      
        
//     }
// });
   
export default Login;