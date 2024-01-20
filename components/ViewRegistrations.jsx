function Registrations(props){
    const reg_id = props.id;

    return(
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
            <button id="proceed">Proceed</button>
        </div>
        
    </div>
    );
}
export default function ViewRegistrations(){
    return(
        <div id="viewRegistrationsPage">
            <div id="header">
                Registrations
            </div>
            <div id="container">
                <Registrations name="arindam" location="beleghata" oxygen="Yes" emergency="car accident" />
                <Registrations name="arindam" location="beleghata" oxygen="Yes" emergency="car accident" />
                <Registrations name="arindam" location="beleghata" oxygen="Yes" emergency="car accident" />
                <Registrations name="arindam" location="beleghata" oxygen="Yes" emergency="car accident" />
            </div>
        </div>
    );

}