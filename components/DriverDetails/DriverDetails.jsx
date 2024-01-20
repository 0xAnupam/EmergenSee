import axios from "axios";
import { useEffect, useState } from "react";

function Details(props) {
  const reg_id = props.reg_id;
  console.log(reg_id);

  function handleClick() {
    const data = {
      hospital_name: props.hospital_name,
      vehicleNo: props.vehicleNo,
      driver_phone: props.contactNo,
    };
    console.log(reg_id);
    axios.patch(`/api/ambulances/${reg_id}`, {
      hospital_name: data.hospital_name,
      vehicle_no: data.vehicleNo,
      driver_phone: data.driver_phone,
    });
    props.onDriverData(data);
  }
  return (
    <div id="registrationsCard">
      <div id="registCompo">
        <div id="registCompoHeader">Name :</div>
        <div id="registCompoValue">{props.name}</div>
      </div>
      <div id="registCompo">
        <div id="registCompoHeader">Email :</div>
        <div id="registCompoValue">{props.email}</div>
      </div>
      {/* <div id="registCompo">
            <div id="registCompoHeader">Location :</div>
            <div id="registCompoValue">{props.location}</div>
        </div> */}
      <div id="registCompo">
        <div id="registCompoHeader">Has Oxygen Cylinder :</div>
        <div id="registCompoValue">{props.oxygen ? "Yes" : "No"}</div>
      </div>
      <div id="registCompo">
        <div id="registCompoHeader">Vehicle No :</div>
        <div id="registCompoValue">{props.vehicleNo}</div>
      </div>
      <div id="registCompo">
        <div id="registCompoHeader">Contact No :</div>
        <div id="registCompoValue">{props.contactNo}</div>
      </div>
      <div id="registCompo">
        <button onClick={handleClick} id="proceed">
          Assign
        </button>
      </div>
    </div>
  );
}

export default function DriverDetials(props) {
  const [driverDetails, setDriverDetails] = useState([]);
  const [driverData, setDriverData] = useState({});

  const reg_id = props.reg_id;
  //   console.log(reg_id);

  props.onDriverData(driverData);

  useEffect(() => {
    axios.get("/api/drivers").then((res) => {
      const data = res.data;
      const filteredData = data.filter((d) => {
        return d.available === true;
      });
      setDriverDetails(filteredData);
    });
  }, []);

  return (
    <div id="viewRegistrationsPage">
      <div id="header">Available Drivers</div>
      <div id="container">
        {driverDetails &&
          driverDetails.map((data, id) => {
            return (
              <Details
                key={id}
                name={data.name}
                email={data.email}
                oxygen={data.oxygenSupport}
                vehicleNo={data.vehicleNo}
                contactNo="8965324795"
                hospital_name={data.hospitalName}
                reg_id={reg_id}
                onDriverData={(data) => {
                  setDriverData(data);
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
