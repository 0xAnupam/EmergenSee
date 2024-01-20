import { useEffect, useState } from "react";
import Modal from "react-modal";
import DriverDetials from "./DriverDetails/DriverDetails";
import axios from "axios";

function Registrations(props) {
  const reg_id = props.id;
  //   console.log(reg_id);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [driverData, setDriverData] = useState(null);

  //   useEffect(() => {
  //     if (driverData) {
  //       axios.patch(`/api/ambulances/${reg_id}`, {
  //         hospital_name: driverData.hospital_name,
  //         vehicle_no: driverData.vehicleNo,
  //         driver_phone: driverData.driver_phone,
  //       });
  //     }
  //   }, [driverData]);

  //   console.log(driverData);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div id="registrationsCard">
      <div id="registCompo">
        <div id="registCompoHeader">Name :</div>
        <div id="registCompoValue">{props.name}</div>
      </div>
      <div id="registCompo">
        <div id="registCompoHeader">Location :</div>
        <div id="registCompoValue">{props.location}</div>
      </div>
      <div id="registCompo">
        <div id="registCompoHeader">Need Oxygen Cylinder :</div>
        <div id="registCompoValue">{props.oxygen}</div>
      </div>
      <div id="registCompo">
        <div id="registCompoHeader">Emergency Type :</div>
        <div id="registCompoValue">{props.emergency}</div>
      </div>
      <div id="registCompo">
        <button id="proceed" onClick={openModal}>
          Proceed
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DriverDetials
          reg_id={reg_id}
          onDriverData={(data) => {
            setDriverData(data);
          }}
        />
      </Modal>
    </div>
  );
}
export default function ViewRegistrations() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("/api/ambulances").then((res) => {
      console.log(res.data);
      setRequests(res.data);
    });
  }, []);

  return (
    <div id="viewRegistrationsPage">
      <div id="header">Registrations</div>
      <div id="container">
        {/* <Registrations
          name="arindam"
          location="beleghata"
          oxygen="Yes"
          emergency="car accident"
          onDriverData={(data) => {
            setDriverData(data);
          }}
        /> */}

        {requests &&
          requests.map((data, idx) => {
            console.log(data);

            return (
              <Registrations
                key={idx}
                id={data._id}
                name={data.name}
                location={data.location}
                oxygen={data.oxygenSupport}
                emergency={data.emergencyType}
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
