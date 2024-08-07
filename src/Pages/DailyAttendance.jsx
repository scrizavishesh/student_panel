import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllStudentAttendanceApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import Calender from '../Layouts/Calender';

const Container = styled.div`
    height: 92vh;
    .mainBreadCrum{
        --bs-breadcrumb-divider: none !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .greyText{
        color: var(--greyTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }


    /* .hoverIcon{
        position: relative;
        cursor: pointer;

        &:hover .hoveringDescriptionDiv{
            display: block;
            cursor: pointer;
            position: absolute;
            background-color: var(--hoveringDivBg) !important;
            border: 1px solid var(--hoveringDivBorder);
            color: #fff;
            width: 260px;
            z-index: 1;
        }
    }

    .hoveringDescriptionDiv{
        display: none;
    } */
/* 
    .custom-tooltip {
        --bs-tooltip-bg: var(--bd-violet-bg);
        --bs-tooltip-color: var(--bs-white);
    } */

`;

const DailyAttendance = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const searchByKey = '';

  const [DailyAttendanceData, setDailyAttendanceData] = useState([]);
  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    getAllDailyAttendance();
  }, [token]);

  const getAllDailyAttendance = async () => {
    try {
      setloaderState(true);
      var response = await getAllStudentAttendanceApi(month, year);
      console.log(response, 'current response')
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setDailyAttendanceData(response?.data?.attendance)
          setCurrentPage(response?.data?.currentPage)
          setTotalPages(response?.data?.totalPages)
          toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          // toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All DailyAttendance API - ', error)
    }
  }

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };



  return (

    <Container className="container-fluid p-4 overflow-scroll">
      {
        loaderState && (
          <DataLoader />
        )
      }
      <div className="row pb-3">
        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
          <ol className="breadcrumb mb-1">
            <li className="breadcrumb-item">
              <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
              <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
            </li>
            <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">DailyAttendance</li>
          </ol>
        </nav>
        <p className='font14 ps-0 fw-bolder'>DailyAttendance Details</p>
      </div>
      <div className="row p-3 bg-white borderRadius5 pb-5">
        <div className="col-12">
          <div className="row mb-4">
            <div className="col-6">
              <label htmlFor="inputState" className="form-label font14">Month</label>
              <select id="inputState" className="form-select font14" onChange={(e)=> setMonth(e.target.value)}>
                <option selected disabled>Choose...</option>
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="inputState" className="form-label font14">Year</label>
              <select id="inputState" className="form-select font14" onChange={(e)=> setYear(e.target.value)}>
                <option selected disabled>Choose...</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
                <option value={2028}>2028</option>
                <option value={2029}>2029</option>
                <option value={2030}>2030</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <p className='text-center p-3'>
              <button type='button' className='btn searchButtons text-white' onClick={getAllDailyAttendance}>Search</button>
              <button type='button' className='btn cancelButtons ms-3'>Cancel</button>
            </p>
          </div>
          <div className="row">
            <Calender DailyAttendanceData={DailyAttendanceData} month={month} year={year}/>
            {/* {DailyAttendanceData.length > 0 ? <Calender DailyAttendanceData={DailyAttendanceData} /> : <p className='text-Danger font14'>No Data Found !!</p>} */}
          </div>
        </div>
        <Toaster />
      </div>
    </Container>

  )
}

export default DailyAttendance