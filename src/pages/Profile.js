import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { createUseStyles, useTheme } from 'react-jss';

import BeatLoader from "react-spinners/BeatLoader";

import { Column, Row } from 'simple-flexbox';
import { SidebarComponent, SidebarContext } from '../components/sidebar/SidebarComponent';
import HeaderComponent from '../components/header/HeaderComponent';

import Theme from '../resources/theme';
import { ThemeProvider } from 'react-jss';

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
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';

import Select from 'react-select';

import moment from 'moment';

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
  const [phone, setphone] = useState("")
  const [user_id, set_user] = useState("")
  const [degree, set_degree] = useState("")
  const [institution, set_institution] = useState("")
  const [majors, set_majors] = useState("")
  const [passing_year, set_passing_year] = useState("")
  const [grade_CGPA, set_grade_CGPA] = useState("")
  const [created_at, set_created_at] = useState("")
  const [start_date, set_start_date] = useState("")
  const [end_date, set_end_date] = useState("")
  const [description, set_description] = useState("")
  const [updated_at, set_updated_at] = useState("")
  const [company_name, set_company_name] = useState("")
  const [work_experience_id, set_work_experience_id] = useState("")
  const [academeic_credential_id, set_academeic_credential_id] = useState("")
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const theme = useTheme();
  const classes = useStyles({ theme });

  useEffect(() => {
    if (localStorage.getItem('token') != "" && localStorage.getItem('token') != null) {
      loadUserData();
    }
    else {
      navigate('/');
    }
  }, [])

  async function loadUserData(){
    try{
      let options = {
        method: "GET"
      };

      let promise = await fetch(`${API_BASE_URL}/edit-profile-full/${user_obj.id}`, options);

      let response = await promise.json();

      if(!promise.ok){
        if(response.message != undefined){
          throw new Error(response.message);
        }
      }

      if(response.user_data[0] != undefined){
        render_data(response.user_data[0]);
      }
      if(response.skills[0] != undefined){
        setSelectedOptions(response.skills);
      }
      

    }
    catch(e){
      console.warn(e.message);
    }
  }

  function render_data(data={}){
    let form = document.querySelector('form');

    console.log(data);
    setName(data['name']);
    setEmail(data['email']);
    setPassword(data['password']);
    setphone(data['phone']);
    set_user(data['user_id']);
    set_degree(data['degree']);
    set_institution(data['institution']);
    set_majors(data['majors']);
    set_passing_year(data['passing_year']);
    set_grade_CGPA(data['grade_CGPA']);
    set_created_at(data['created_at']);
    set_start_date(data['start_date']);
    set_end_date(data['end_date']);
    set_description(data['description']);
    set_company_name(data['company_name']);
    set_work_experience_id(data['work_experience_id']);
    
    // for(let key in data){
    //   let input_selector = `input[name="${key}"]`;
    //   let field = form.querySelector(input_selector);

    //   if(field == undefined){
    //     continue;
    //   }

    //   field.value = data[key];
    // }
  }

  var user_obj = JSON.parse(localStorage.getItem('user_data'));

  var date_new = new Date();
  const formatted_date = moment(date_new).format('YYYY-MM-DD HH:mm:ss')

  // const options = [
  //    { value: 'apple', label: 'Apple' },
  //    { value: 'banana', label: 'Banana' },
  //    { value: 'orange', label: 'Orange' },
  //    // Add more options as needed
  // ];
   
   
    const handleSelectChange = (selectedValues) => {
     setSelectedOptions(selectedValues);
    };
   

  const submitForm = (e) =>{
    e.preventDefault();

   
    let form_obj = new FormData();
    form_obj.set('user_name', name);
    form_obj.set('user_email',email);
    form_obj.set('user_password',password);
    form_obj.set('user_id',JSON.parse(user_obj.id));
    form_obj.set('degree', degree);
    form_obj.set('institution', institution);
    form_obj.set('majors', majors);
    form_obj.set('passing_year', passing_year);
    form_obj.set('grade_CGPA', grade_CGPA);
    form_obj.set('start_date', start_date);
    form_obj.set('end_date', end_date);
    form_obj.set('description', description);
    form_obj.set('updated_at', formatted_date);
    form_obj.set('company_name', company_name);
    form_obj.set('created_at', formatted_date);
    form_obj.set('work_experience_id', null);
    form_obj.set('academic_credential_id', null);
   
    let options = {
        method: 'POST',
        body : form_obj,
        headers: {
            // 'Content-Type': 'application/json'
        },
    };

    fetch(`${API_BASE_URL}/insert-profile`,options)
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
              {
                (name == undefined || name == '' ) ? 
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px' }}>
                <BeatLoader color="#36d7b7" />
              </div>
              :
               
              <section style={{ backgroundColor: '#eee' }}>
              <form action="" onSubmit={submitForm}>
                <MDBContainer className="py-5">

                  <MDBRow>

                    <MDBCol lg="12">
                      <MDBCard className="mb-4">
                        <MDBCardBody>
                          <MDBRow>

                            <MDBRow>
                              <h2>Personal Details</h2>
                            </MDBRow>

                            <MDBCol sm="3" style={{ marginTop: '30px' }}>

                              <MDBCardText>Full Name</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9" style={{ marginTop: '30px' }}>
                              {/* <MDBCardText className="text-muted">{ user_obj['name'] != null ? user_obj['name'] : null }</MDBCardText> */}
                              <MDBInput placeholder='username...' type='text' name="name" required autoComplete="off" value={name}
                               onChange={(e)=>{setName(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Email</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              {/* <MDBCardText className="text-muted">{ user_obj['email'] != null ? user_obj['email'] : null }</MDBCardText> */}
                              <MDBInput placeholder='email...'  type='email' name="email" required autoComplete="off" value={email}
                               onChange={(e)=>{setEmail(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>
                          <hr />



                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Password</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              {/* <MDBCardText className="text-muted">{ user_obj['email'] != null ? user_obj['email'] : null }</MDBCardText> */}
                              <MDBInput placeholder='...'  type='password' name="password" required  value={password}
                               onChange={(e)=>{setPassword(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>

                          <hr />



                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Phone</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              {/* <MDBCardText className="text-muted">{ user_obj['email'] != null ? user_obj['email'] : null }</MDBCardText> */}
                              <MDBInput placeholder='722662288' type='text' name="phone" required autoComplete="off" value={phone} 
                               onChange={(e)=>{setphone(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>


                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol lg="12">
                      <MDBCard className="mb-4">
                        <MDBCardBody>
                          <MDBRow>
                            <MDBRow>
                              <h2>Skills</h2>
                            </MDBRow>

                            <MDBCol sm="9" style={{ marginTop: '30px' }}>
                            <Select
                              isMulti
                              options={selectedOptions}
                              value={[]}
                              onChange={handleSelectChange}
                            />
                          </MDBCol>
                          </MDBRow>

                        </MDBCardBody>
                      </MDBCard>


                    </MDBCol>
                  </MDBRow>



                  <MDBRow>
                    <MDBCol lg="12">
                      <MDBCard className="mb-4">
                        <MDBCardBody>
                          <MDBRow>
                            <MDBRow>
                              <h2>Academic Credentials</h2>
                            </MDBRow>

                            <MDBCol sm="3" style={{ marginTop: '30px' }}>

                              <MDBCardText>Degree</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9" style={{ marginTop: '30px' }}>
                              {/* <MDBCardText className="text-muted">{ user_obj['name'] != null ? user_obj['name'] : null }</MDBCardText> */}
                              <MDBInput placeholder='Degree' type='text' name="degree" required autoComplete="off" value={degree}
                               onChange={(e)=>{set_degree(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Institution</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              {/* <MDBCardText className="text-muted">{ user_obj['email'] != null ? user_obj['email'] : null }</MDBCardText> */}
                              <MDBInput placeholder='Harvard University'  type='text' name="msc" required autoComplete="off" value={institution}
                               onChange={(e)=>{set_institution(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>
                          <hr />

                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Majors</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              {/* <MDBCardText className="text-muted">{ user_obj['email'] != null ? user_obj['email'] : null }</MDBCardText> */}
                              <MDBInput placeholder='B.Sc'  type='text' name="major" required autoComplete="off" value={majors}
                               onChange={(e)=>{set_majors(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>

                          <hr />

                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Passing Year</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              {/* <MDBCardText className="text-muted">{ user_obj['email'] != null ? user_obj['email'] : null }</MDBCardText> */}
                              <MDBInput placeholder='20/11/1947'  type='month' name="passing_year" required autoComplete="off" value={passing_year}
                               onChange={(e)=>{set_passing_year(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>

                          <hr />

                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Grade / CGPA</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              {/* <MDBCardText className="text-muted">{ user_obj['email'] != null ? user_obj['email'] : null }</MDBCardText> */}
                              <MDBInput placeholder='A+'  type='text' name="grade" required autoComplete="off" value={grade_CGPA}
                               onChange={(e)=>{set_grade_CGPA(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>

                      {/*
       <MDBRow>
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
       </MDBRow>*/}

                    </MDBCol>
                  </MDBRow>


                  <MDBRow>
                    <MDBCol lg="12">
                      <MDBCard className="mb-4">
                        <MDBCardBody>
                          <MDBRow>
                            <MDBRow>
                              <h2>Work Experience</h2>
                            </MDBRow>

                            <MDBCol sm="3" style={{ marginTop: '30px' }}>

                              <MDBCardText>Company Name</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9" style={{ marginTop: '30px' }}>
                              {/* <MDBCardText className="text-muted">{ user_obj['name'] != null ? user_obj['name'] : null }</MDBCardText> */}
                              <MDBInput placeholder='Private limited' type='text' name="company_name" required autoComplete="off" value={company_name}
                               onChange={(e)=>{set_company_name(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Duration / Start Date</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              {/* <MDBCardText className="text-muted">{ user_obj['email'] != null ? user_obj['email'] : null }</MDBCardText> */}
                              <MDBInput placeholder='MSC' type='date' name="start_date" required autoComplete="off" pattern="\d{4}-\d{2}-\d{2}" value={start_date}
                               onChange={(e)=>{set_start_date(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>
                          <hr />

                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Duration / End Date </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              {/* <MDBCardText className="text-muted">{ user_obj['email'] != null ? user_obj['email'] : null }</MDBCardText> */}
                              <MDBInput placeholder='...'  type='date' name="end_date" required autoComplete="off" pattern="\d{4}-\d{2}-\d{2}" value={end_date}
                               onChange={(e)=>{set_end_date(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>

                          <hr />

                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Description</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              {/* <MDBCardText className="text-muted">{ user_obj['email'] != null ? user_obj['email'] : null }</MDBCardText> */}
                              <MDBInput placeholder='....'  type='text' name="description" required autoComplete="off" value={description}
                               onChange={(e)=>{set_description(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>

                          <hr />


                          <MDBCol sm="9">

                            <MDBCardBody style={{ marginLeft: "150px", marginTop: "20px", alignItems: 'flex-end', display: 'flex', justifyContent: 'center', width: '100%' }}>
                              <MDBBtn style={{ width: '350px', height:'40px' }} type="submit" >Save Information</MDBBtn>
                            </MDBCardBody>

                          </MDBCol>
                        </MDBCardBody>
                      </MDBCard>



                    </MDBCol>
                  </MDBRow>


                </MDBContainer>
                </form>
              </section>
              }
            </div>
          </Column>
        </Row>
      </SidebarContext>
    </ThemeProvider>
  );
}

export default StudentProfile;