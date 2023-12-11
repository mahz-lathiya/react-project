import React,{ useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../api';

import './App.css';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [roleType, setroleType] = useState("");
    const [phone, setPhone] = useState("");
    const [website_address, setWebsiteAddress] = useState("");
    const [show_website_address, setShowWebsiteAddress] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function changeValue(e){
        setroleType(e.target.value);  
        if(e.target.value == 1){
            setShowWebsiteAddress(true);
        }
        else{
            setShowWebsiteAddress(false);
        }
    }
 
    useEffect(()=>{
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
            navigate("/dashboard");
        }
    },[])

    const submitForm = (e) =>{
        e.preventDefault();

        if(password != confirmPassword){
            toast.warn('Password does not match', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        let form_obj = new FormData(e.target);
        form_obj.set('website_address',website_address);

        let options = {
            method: 'POST',
            body : form_obj,
            headers: {
                // 'Content-Type': 'application/json'
            },
        };
        fetch(`${API_BASE_URL}/register`,options)
        .then(function(promise){
            return promise.json();
        })
        .then((response) => {
            if(response.success != true){
                throw new Error(response.message);
            }
            toast.success(response.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => {
                navigate("/");
            }, 2000);
        })
        .catch((e) => {
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

            setIsSubmitting(false)
        });
    }

    return (
        <div className="loginlayout">
        <Layout>
            <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Register</h5>
                            <form action="" onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label 
                                        htmlFor="name"
                                        className="form-label">Name
                                    </label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={name}
                                        required
                                        autoComplete='off'
                                        onChange={(e)=>{setName(e.target.value)}}
                                        placeholder='John'
                                    />
                                    {validationErrors.name != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.name[0]}
                                            </small >
                                        </div>
                                    }
                                     
                                </div>
                                <div className="mb-3">
                                    <label 
                                        htmlFor="email"
                                        className="form-label">Email address
                                    </label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        required
                                        autoComplete='off'
                                        onChange={(e)=>{setEmail(e.target.value)}}
                                        placeholder='John@gmail.com'
                                    />
                                    {validationErrors.email != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.email[0]}
                                            </small >
                                        </div>
                                    }
                                     
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
                                        value={password}
                                        required
                                        autoComplete='off'
                                        onChange={(e)=>setPassword(e.target.value)}
                                        placeholder='Password'
                                    />
                                    {validationErrors.password != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.password[0]}
                                            </small >
                                        </div>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label 
                                        htmlFor="confirm_password"
                                        className="form-label">Confirm Password
                                    </label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        id="confirm_password"
                                        name="confirm_password"
                                        value={confirmPassword}
                                        required
                                        autoComplete='off'
                                        onChange={(e)=>setConfirmPassword(e.target.value)}
                                        placeholder='Confirm Password'
                                    />
                                </div>

                                <div className="mb-3">
                                    <label 
                                        htmlFor="role_type"
                                        className="form-label">Role
                                    </label>
                                    <select
                                    className="form-control"
                                    id="role_type"
                                    name="role_type"
                                    required
                                    onChange={(e)=>changeValue(e)}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="1">Employee</option>
                                        <option value="2">Student</option>
                                    </select>
                                    {/* <input 
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    /> */}
                                    {validationErrors.password != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.password[0]}
                                            </small >
                                        </div>
                                    }
                                </div>

                                { 
                                    show_website_address == true ?

                                <div className="mb-3">
                                    <label 
                                        htmlFor="website_address"
                                        className="form-label">Website Address
                                    </label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="website_address"
                                        name="website_address"
                                        value={website_address}
                                        onChange={(e)=>setWebsiteAddress(e.target.value)}
                                        autoComplete='off'
                                        placeholder='website address'
                                    />
                                </div>
                                : null
                                }

                                <div className="mb-3">
                                    <label 
                                        htmlFor="phone"
                                        className="form-label">Phone
                                    </label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={phone}
                                        autoComplete='off'
                                        onChange={(e)=>setPhone(e.target.value)}
                                        placeholder='phone'
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    {/* <button 
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary btn-block">Register Now
                                    </button> */}
                                    <button type="submit" className="btn btn-primary mt-4">Register</button>

                                    <p 
                                        className="text-center">Have already an account <Link to="/">Login here</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
        </div>
    );
}
   
export default Register;