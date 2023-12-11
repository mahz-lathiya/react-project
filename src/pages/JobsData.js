import React, { useState, useEffect } from 'react'
import {  useNavigate } from "react-router-dom"
import { createUseStyles, useTheme } from 'react-jss';

import { Column, Row } from 'simple-flexbox';
import { SidebarComponent, SidebarContext } from '../components/sidebar/SidebarComponent';
import HeaderComponent from '../components/header/HeaderComponent';

import BeatLoader from "react-spinners/BeatLoader";

import Theme from '../resources/theme';
import { ThemeProvider } from 'react-jss';

import 'react-toastify/dist/ReactToastify.css';
import DataTable from "react-data-table-component";

import {API_BASE_URL} from '../api';

import './App.css';
import {
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
    const [jobs_data, setJobsData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

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

    function clickCreateJob(){
        navigate('/modify_job');
    }

    async function loadUserData(){
        try{
          let options = {
            method: "GET"
          };
    
          let promise = await fetch(`${API_BASE_URL}/get_jobs`, options);
    
          let response = await promise.json();
    
          if(!promise.ok){
            if(response.message != undefined){
              throw new Error(response.message);
            }
          }
    
          if(response.data['jobs'] != undefined){
            let payload;
            if(response.data['jobs'].length <= 0){
                payload = [{
                    'job_id': '',
                    'job_title': '',
                    'company_name': '',
                    'required_skills': '',
                    'status_text': '',
                }];
            }
            else{
                payload = response.data['jobs'];
            }
            setJobsData(payload);            
          }
    
        }
        catch(e){
          console.warn(e.message);
        }
    }

    var user_obj = JSON.parse(localStorage.getItem('user_data'));

    const filtered_data = jobs_data.filter(
        (item) =>
            item.job_id.toString().toLowerCase().includes(searchText.toLowerCase())
            ||
            item.company_name.toString().toLowerCase().includes(searchText.toLowerCase())
            ||
            item.job_title.toString().toLowerCase().includes(searchText.toLowerCase())
            ||
            item.required_skills.toString().toLowerCase().includes(searchText.toLowerCase())
            ||
            item.status_text.toString().toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearch = (value) => {
        setSearchText(value);
        setResetPaginationToggle(!resetPaginationToggle);
    };


    const paginationOptions = {
        rowsPerPageText: "Rows per page:",
        rangeSeparatorText: "of",
        noRowsPerPage: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: "All"
    };


    const columns = [
        { name: "ID", selector: "job_id", sortable: true },
        { name: "Job Title", selector: "job_title", sortable: true },
        { name: "Company Name", selector: "company_name", sortable: true },
        { name: "Status", selector: "status_text", sortable: true },
        { name: "Required skills", selector: "required_skills", sortable: true },
        { name: "Action", selector: null, sortable: false },
    ];

    const customPagination = () => {
        
        const page = Math.ceil(filtered_data.length / paginationPerPage);
        const pageButtons = [];

        for (let i = 1; i <= page; i++) {
            pageButtons.push(
                <MDBBtn
                    key={i}
                    className={`btn-pagination ${currentPage === i ? "active" : ""}`}
                    onClick={() => setCurrentPage(i)}
                    style={{ width: '40px',height:'40px' }}
                >
                    {i}
                </MDBBtn>
            );
        }

        return (
            <div className="pagination-container">
                <MDBBtn
                    className="btn-pagination"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ width: '40px',height:'40px' }}
                >
                    ‹
                </MDBBtn>
                {pageButtons}
                <MDBBtn
                    className="btn-pagination"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === page}
                    style={{ width: '40px',height:'40px' }}
                >

                    ›
                </MDBBtn>
            </div>
        );
    };

    const paginationPerPage = 10;
    const [currentPage, setCurrentPage] = React.useState(1);

    const paginatedData = filtered_data.slice(
        (currentPage - 1) * paginationPerPage,
        currentPage * paginationPerPage
    );
    return (
        <ThemeProvider theme={Theme}>
            <SidebarContext>
                <Row className={classes.container}>
                    <SidebarComponent />
                    <Column flexGrow={1} className={classes.mainBlock}>
                    <HeaderComponent />
                    <h2>Jobs</h2>
                    <div style={{ width: '1000px', marginTop: '65px' }}>

                        {
                            (jobs_data == undefined || jobs_data == '' || jobs_data.length <= 0 ) ? 
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px' }}>
                            <BeatLoader color="#36d7b7" />
                        </div>
                        :

                        <DataTable
                            columns={columns}
                            data={paginatedData}
                            pagination
                            paginationServer
                            paginationTotalRows={filtered_data.length}
                            onChangePage={(page) => setCurrentPage(page)}
                            paginationComponentOptions={paginationOptions}
                            paginationComponent={customPagination}
                            highlightOnHover
                            pointerOnHover
                            subHeader
                            subHeaderAlign="left"
                            subHeaderComponent={
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: '100%',
                                    }}
                                >
                                    <div style={{ marginRight: "20px" }}>
                                        <MDBInput
                                            type="text"
                                            placeholder="Search.."
                                            value={searchText}
                                            onChange={(e) => handleSearch(e.target.value)}
                                            style={{width:'200px'}}
                                        />
                                    </div>

                                    { (user_obj['role_type'] == 1) ?
                                    <div style={{ marginRight: "20px" }}>
                                        <MDBBtn style={{ width: '120px', height:'40px' }} type="submit" onClick={() => clickCreateJob()}>
                                            Create Job
                                        </MDBBtn>
                                    </div>
                                    :
                                    null}
                                    {/* <select
                                        value={category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                    >
                                        <option value="">All</option>
                                        <option value="Customer Support">Customer Support</option>
                                        <option value="Human Resources">Human Resources</option>
                                        <option value="Engineering">Engineering</option>
                                    </select> */}
                                </div>
                            }
                        />
                        }
                    </div>

                    </Column>
                </Row>
            </SidebarContext>
        </ThemeProvider>
    );
}

export default StudentProfile;