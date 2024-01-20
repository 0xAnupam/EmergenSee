function Details(props) {
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
        <div id="registCompoValue">{props.oxygen}</div>
      </div>
      <div id="registCompo">
        <div id="registCompoHeader">Vehicle No :</div>
        <div id="registCompoValue">{props.vehicleNo}</div>
      </div>
      <div id="registCompo">
        <div id="registCompoHeader">Contact No :</div>
        <div id="registCompoValue">{props.driver_phone}</div>
      </div>
      <div id="registCompo">
        <button id="proceed">Proceed</button>
      </div>
    </div>
  );
}

export default function DriverDetials() {
  return (
    <div id="viewRegistrationsPage">
      <div id="header">Available Drivers</div>
      <div id="container">
        <Details
          name="Manoj"
          email="manoj@gmail.com"
          oxygen="Yes"
          vehicleNo="WB4567"
          contactNo="8536974589"
        />
        <Details
          name="Dinesh"
          email="dinesh@gmail.com"
          oxygen="Yes"
          vehicleNo="WB6543"
          contactNo="9875624894"
        />
      </div>
    </div>
  );
}
