import React,{ useState, useEffect } from 'react'
import {  useNavigate } from "react-router-dom"
import { createUseStyles, useTheme } from 'react-jss';

import { Column, Row } from 'simple-flexbox';
import { SidebarComponent, SidebarContext } from '../components/sidebar/SidebarComponent';
import HeaderComponent from '../components/header/HeaderComponent';

import Theme from '../resources/theme';
import {ThemeProvider} from 'react-jss';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {API_BASE_URL} from '../api';

import './App.css';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBInput
  } from 'mdb-react-ui-kit';
  
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

function StudentProfile() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [roleType, setroleType] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const theme = useTheme();
    const classes = useStyles({ theme });
 
    useEffect(()=>{
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){

        }
        else{
            navigate('/');
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

        let form_obj = new FormData();
        form_obj.set('name', name);
        form_obj.set('email',email);
        form_obj.set('password',password);
        form_obj.set('confirm_password',confirmPassword);
        form_obj.set('roleType', roleType);
       
        // let payload = {
        //     name: name,
        //     email:email,
        //     password:password,
        //     password_confirmation:confirmPassword,
        //     roleType: roleType
        // };
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

            setIsSubmitting(false)
            // localStorage.setItem('token', r.data.token)
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
            // if (e.response.data.errors != undefined) {
            //     setValidationErrors(e.response.data.errors);
            // }
        });
    }

    var user_obj = JSON.parse(localStorage.getItem('user_data'));

    return (
        <ThemeProvider theme={Theme}>
        <SidebarContext>
            <Row className={classes.container}>
                <SidebarComponent />
                <Column flexGrow={1} className={classes.mainBlock}>
                    <HeaderComponent />
                    <h2>Profile Detail</h2>
                    <div className={classes.contentBlock}>
                        {/* <PrivateRoutes /> */}

                        <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
      <form action="" onSubmit={submitForm}>
        <MDBRow>
          {/* <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol> */}
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="" style={{  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                  
                <p className="text-muted mb-1">{ user_obj['name'] != null ? user_obj['name'] : null }</p>
                <p className="text-muted mb-4">{ user_obj['email'] != null ? user_obj['email'] : null }</p>
                <div className="d-flex justify-content-center mb-2">
                  {/* <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                </div>
              </MDBCardBody>
            </MDBCard>

            {/* <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard> */}
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                <h2>Profile Detail</h2>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {/* <MDBCardText className="text-muted">{ user_obj['name'] != null ? user_obj['name'] : null }</MDBCardText> */}
                    <MDBInput placeholder='username...' type='text' name="name" required autoComplete="off" value={ user_obj['name'] != null ? user_obj['name'] : null }/>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {/* <MDBCardText className="text-muted">{ user_obj['email'] != null ? user_obj['email'] : null }</MDBCardText> */}
                    <MDBInput placeholder='email...' id='form1' type='email' name="email" required autoComplete="off" value={ user_obj['email'] != null ? user_obj['email'] : null }/>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>

                <MDBCol sm="9">
               
                    <MDBCardBody style={{marginLeft:"150px" , marginTop:"50px" }}>
                        <MDBBtn style={{ width: '250px', }} type='submit'>Submit</MDBBtn>
                    </MDBCardBody>

              </MDBCol>

              </MDBCardBody>
            </MDBCard>

            {/* <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow> */}

          </MDBCol>
        </MDBRow>

       </form>

      </MDBContainer>
    </section>
                    </div>
                </Column>
            </Row>
        </SidebarContext>
        </ThemeProvider>
    );
}
   
export default StudentProfile;