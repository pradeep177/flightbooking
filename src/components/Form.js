import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './css/form.css'
import flightData from '../flights.json'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css' 
import '../App.css'

import "react-datepicker/dist/react-datepicker.css";
const Form = () => {
    const [details, setdetails] = useState({
        origin:"",
        destination:"",
        passengers:"",
        travelMode:""
    })
    const [startDate, setStartDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [data, setdata] = useState(flightData)
    const [displayData, setdisplayData] = useState(false)
    const [volume, setvolume] = useState(0)
    const [returnInfo, setreturnInfo] = useState(false)
   
    const myChangeHandler = (e) => {
        const {value, name} = e.target;
        setdetails(preValue => {
            return {
                ...preValue,
                [name]:value
            }
        })
    }

    const infoReturn = () => {
        console.log(returnInfo)
        setreturnInfo(true)
        console.log(returnInfo)

    }
    const handleVolumeChange = (value) => {
        setvolume(value)
        console.log(volume)
        
      }
    
    const updateChange = () => {
        const filteredData = data.filter(item => {
            return item.ticketCost === volume.toString()
       })
       setdata(filteredData)
    }  

    const filterData = () => {
        const {origin, destination, passengers} = details;
         const filteredData = data.filter(item => {
             return item.origin === origin.toLowerCase() || 
                    item.destination === destination.toLowerCase() ||
                    item.departureDateTime.slice(0, 11) === startDate.toString().slice(4, 15) ||
                    item.returnDateTime.slice(0, 11) === returnDate.toString().slice(4, 15) ||
                    item.availableCapacity > passengers
        })
        setdata(filteredData)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setdisplayData(true)
        filterData()
    }


    return (
        <>
        <div id="form">
             <form onSubmit={handleSubmit}>
             <div className="radio-button">
                 <input 
                    type="radio"
                    id="return"
                    name="travelMode"
                    onClick={myChangeHandler}
                    value="return"
                    onChange={infoReturn}
                />
                <label>Return</label>
                </div>
                    <input
                        className="input"
                        type='text'
                        placeholder="Enter origin city"
                        value={details.origin}
                        name="origin"
                        onChange={myChangeHandler}
                    />
                <input
                    className="input"
                    type='text'
                    placeholder="Enter Destination city"
                    value={details.destination}
                    name="destination"
                    onChange={myChangeHandler}
                />
                <div id="departure">
                <span >Enter Departure Date</span>
                <DatePicker
                    placeholder="Select Date"
                    selected={startDate}
                    minDate={new Date()}
                    showDisabledMonthNavigation
                    name="startdate" 
                    onChange={date => {
                        setStartDate(date);
                    }}
                    dateFormat="yyyy-MM-dd"
               />
                </div>
                <div id="return-date">
                <span >Enter return Date</span>
                <DatePicker 
                    selected={returnDate}
                    name="returndate" 
                    onChange={date => {
                        setReturnDate(date)
                    }} 
                />
                </div>
                <input 
                    className="input" 
                    type="number" 
                    placeholder="passengers" 
                    value={details.passengers}
                    name="passengers"
                    onChange={myChangeHandler}
                />
                <input
                    className="button"
                    onClick={handleSubmit}
                    type='submit'
                />
            </form>
                <Slider
                    value={volume}
                    min={1000}
                    max={5000}
                    step={500}
                    orientation="horizontal"
                    onChange={handleVolumeChange}
                    onChangeComplete={updateChange}
                    style={{ 
                    background:"blue",
                    position:"absolute",
                    top:"20px"
                    }}
                />
        </div>
    {data.length === 0 ? <h1 className="data-info">There is no data available for this search</h1>:null}
      {displayData ? data.map((data,index) => {
          return (
              <div className="display" key={index}>
                  <h1>Price: {data.ticketCost}</h1>
                    <h2>{data.origin} to {data.destination}</h2>
                    <h3>departureDateTime: {data.departureDateTime}</h3>
                    <h3>returnDateTime: {data.returnDateTime}</h3>
                    <h3>availableCapacity: {data.availableCapacity}</h3>
                   {/* {Object.entries(data.returnInfo)} */}
                   {returnInfo && <h2>Return Info</h2>}
                   {returnInfo && data.travelMode === "return" ? Object.entries(data.returnInfo).map((info, index) => {
                       console.log(info)
                  return(
                      <div key={index}>
                        <h3>{info}</h3>
                      </div>
                  )
              }):null}    
              {returnInfo && data.travelMode !== "return" ? <h4>No return information is available</h4>:null}
              </div>
          )
      }) : null }
      
      </>
    )
}

export default Form
