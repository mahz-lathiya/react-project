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
  MDBTextArea,
  MDBInput
} from 'mdb-react-ui-kit';

import Select from 'react-select';

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

function JobForm() {
  const navigate = useNavigate();
  const [show_form, set_show_form] = useState(false);
  const [job_id, set_job_id] = useState("");
  const [company_name, set_company_name] = useState("");
  const [job_title, set_job_title] = useState("");
  const [job_description, set_job_description] = useState("");
  const [skills, set_skills] = useState("");
  const [status, set_status] = useState([
    {'value' : 1, 'label': 'Vacant'},
    {'value' : 2, 'label': 'Fulfilled'},
    {'value' : 3, 'label': 'Closed'}
  ]);
  const [selected_status, set_selected_status] = useState("");
  const [selected_skills, set_selected_skills] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const theme = useTheme();
  const classes = useStyles({ theme });

  useEffect(() => {
    if (localStorage.getItem('token') != "" && localStorage.getItem('token') != null) {
      let user_data = JSON.parse(localStorage.getItem('user_data'));

      if((user_obj['role_type'] != 1)){
        navigate('/not_allowed');
      }

      let yurl = new URL(window.location.href);
      let splitted_path = yurl.pathname.split('/');

      loadJobData(splitted_path[2]);
    }
    else {
      navigate('/');
    }
  }, [])

  async function deleteFunction(e){
    try{
      let form_obj = new FormData();
      form_obj.set('job_id', job_id);

      let options = {
        method: "POST",
        body: form_obj
      };

      let url = `${API_BASE_URL}/delete_job`;

      let promise = await fetch(url, options);

      let response = await promise.json();

      if(!promise.ok){
        if(response.message != undefined){
          throw new Error(response.message);
        }
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
        navigate('/jobs');
      }, 3000);

    }
    catch(e){
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

      console.warn(e.message);
    }
  }

  async function loadJobData(job_id=null){
    try{
      let options = {
        method: "GET"
      };

      let url = `${API_BASE_URL}/job_form`;
      if(job_id != null){
        url = url + `/${job_id}`;
      }

      let promise = await fetch(url, options);

      let response = await promise.json();

      if(!promise.ok){
        if(response.message != undefined){
          throw new Error(response.message);
        }
      }

      if(response.skills[0] == undefined){
        set_skills([{
          'value' : null,
          'label' : 'Select Skills'
        }]);
      }
      else{
        set_skills(response.skills);
      }

      if((response.job_data[0]['job_id'] != undefined) && (response.job_data[0]['job_id'] != 0)){
        let chosen_skills = [];
  
        for(let key in response.skills){
          if(response.skills[key]['selected'] != undefined && response.skills[key]['selected'] != null){
            chosen_skills.push(response.skills[key]);
          }
        }
        set_selected_skills(chosen_skills);
      }

      if(response.job_data[0] != undefined){
        render_data(response.job_data[0]);
      }
    }
    catch(e){
      console.warn(e.message);
    }
  }

  function render_data(data={}){
    set_job_id(data['job_id']);
    set_company_name(data['company_name']);
    set_job_title(data['job_title']);
    set_job_description(data['job_description']);

    let chosen = {};
    if(data['status'] != undefined){
      for(let key in status){
        if(status[key].value == data['status']){
          chosen = status[key];
          break;
        }
      }
    }
    set_selected_status(chosen);

    set_show_form(true);
  }

  var user_obj = JSON.parse(localStorage.getItem('user_data'));

  const handleSelectChange = (selectedValues) => {
    set_selected_skills(selectedValues);
  };

  function handle_status_change(selected_value){
    set_selected_status(selected_value);
  }

  const submitForm = (e) =>{
    e.preventDefault();

    let form_obj = new FormData(e.target);
    form_obj.set('job_id', job_id);
    form_obj.set('user_id', user_obj['id']);

    let options = {
        method: 'POST',
        body : form_obj,
        headers: {
            // 'Content-Type': 'application/json'
        },
    };

    fetch(`${API_BASE_URL}/modify_job`,options)
    .then(function(promise){
        return promise.json();
    })
    .then((response) => {
        if(response.status != true){
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
            navigate("/jobs");
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
                (show_form == undefined || show_form == false ) ? 
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
                              <h2>Details</h2>
                            </MDBRow>

                            <MDBCol sm="3" style={{ marginTop: '30px' }}>

                              <MDBCardText>Job Title</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9" style={{ marginTop: '30px' }}>
                              <MDBInput placeholder='Job Title...' type='text' name="job_title" required autoComplete="off" value={job_title}
                               onChange={(e)=>{set_job_title(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Company Name</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBInput placeholder='Company name...'  type='text' name="company_name" required autoComplete="off" value={company_name}
                               onChange={(e)=>{set_company_name(e.target.value)}}
                              />
                            </MDBCol>
                          </MDBRow>
                          <hr />



                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Job Description</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBTextArea placeholder='Job Description..'  name="job_description" required  value={job_description} onChange={(e)=>{set_job_description(e.target.value)}}>

                              </MDBTextArea>
                            </MDBCol>
                          </MDBRow>

                          <hr />



                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Status</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                            <Select
                              name="status"
                              options={status}
                              value={selected_status}
                              onChange={handle_status_change}
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
                              <h2>Skills Required</h2>
                            </MDBRow>

                            <MDBCol sm="9" style={{ marginTop: '30px' }}>
                            <Select
                              isMulti
                              name="skills[]"
                              options={skills}
                              value={selected_skills}
                              onChange={handleSelectChange}
                            />
                          </MDBCol>
                          </MDBRow>

                        </MDBCardBody>
                      </MDBCard>


                    </MDBCol>
                  </MDBRow>

                  <hr />

                <MDBCol sm="9">

                  <MDBCardBody style={{ marginLeft: "150px", marginTop: "20px", alignItems: 'flex-end', display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                    <MDBBtn style={{ width: '175px', height:'40px' }} type="submit" >Save Information</MDBBtn>
                    <MDBBtn className='btn-danger' style={{ width: '175px', height:'40px' }} type="button" onClick={deleteFunction} >Delete Job</MDBBtn>
                  </MDBCardBody>

                </MDBCol>

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

export default JobForm;