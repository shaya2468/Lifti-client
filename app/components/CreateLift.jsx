var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';
import SearchForm from 'SearchForm';
export class CreateLift extends React.Component{

  constructor(props) {
    super(props);
    this.state = {depart_city:'Jerusalem', depart_street: null, dest_city:'Jerusalem', dest_street: null, time:null, date:null, num_pass:null, comments:null}
    this.handleChange = this.handleChange.bind(this);
    var {groups} = this.props;
    this.groups = groups;
  }

  handleChange( field, event) {
    event.preventDefault();

    this.setState({
      [field]: event.target.value
    });
  }

  onCreateLift = (e) => {
    e.preventDefault();
    console.log(this.state);
  }


  render() {

    return (
      <div className="container-create-lift">
        <div className="row-create-lift header-create-lift">
          <h1 className="create-lift-h1" >Create Lift&nbsp;</h1>
          <h3>Add a lift to your group and invite people to join</h3>
        </div>
        <div className="row-create-lift body-create-lift">
          <form id="lift-form" onSubmit={this.onCreateLift}>
            <ul>
              <CityStreet info={{text:'Point of Departure', id:'depart_' }} handleChange={this.handleChange}/>
              <CityStreet info={{text:'Destination', id:'dest_' }} handleChange={this.handleChange}/>
              <LeavingAt handleChange={this.handleChange}/>
              <NumberOfPassengers handleChange={this.handleChange}/>
              <Comments handleChange={this.handleChange}/>





{

              // <h1 className="create-lift-h1"  className="address_info">Add to groups</h1>
              // <div id="group-checkboxes">
              //
              //
              //
              //   <div className="group-div">
              //     <input id="group-check" type="checkbox" ref="bike1"  name="bike1"  /> <label className="label-bike" htmlFor="bike1">time</label>
              //   </div>
              //
              //   <div className="group-div">
              //     <input id="group-check" type="checkbox"  ref="bike2" name="bike2"/> <label className="label-bike" htmlFor="bike2">time</label>
              //   </div>
              //
              //   <div className="group-div">
              //     <input id="group-check" type="checkbox" ref="bike3"  name="bike3"/> <label className="label-bike" htmlFor="bike3">time</label>
              //   </div>
              //
              //   <div className="group-div">
              //     <input id="group-check" type="checkbox" ref="bike4"  name="bike4"/> <label className="label-bike" htmlFor="bike4">time</label>
              //   </div>
              //
              //   <div className="group-div">
              //     <input id="group-check" type="checkbox" ref="bike5"  name="bike5"/> <label className="label-bike" htmlFor="bike5">time</label>
              //   </div>
              //
              //   <div className="group-div">
              //     <input id="group-check" type="checkbox"  ref="bike6" name="bike6"/> <label className="label-bike" htmlFor="bike6">time</label>
              //   </div>
              //
              //   <div className="group-div">
              //     <input id="group-check" type="checkbox" ref="bike7"  name="bike7"/> <label className="label-bike" htmlFor="bike7">time</label>
              //   </div>
              //
              // </div>
              //
              }
              <li><div className="divider"></div></li>


              <li>
                <input id="btn-submit" type="submit" value="Submit" />
                <small>or press <strong>enter</strong></small>
              </li>

            </ul>
          </form>
        </div>
      </div>
    )
  }
}


class CityStreet extends React.Component{

  constructor(props) {
    super(props);
    this.info = props.info;
  }

  render() {

    return (
      <li>
        <h1 className="address_info">{this.info.text}</h1>
        <div className="address_stuff">

          <p className="left">
            <label htmlFor="depart">city</label>
            <select className="drop-down-lift" name="depart" onChange={  this.props.handleChange.bind( null, this.info.id + 'city') }>
              <option>Jerulalem</option>
              <option >Tel aviv</option>
              <option>Eilat</option>
              <option>Ramat Gan</option>
              <option>Netivot</option>
              <option>Yerucham</option>
              <option>Tiberias</option>
              <option>Lod</option>
            </select>
          </p>
          <p className="pull-right">
            <label htmlFor="depart_street">street</label>
            <input type="text" name="depart_street" onChange={  this.props.handleChange.bind( null, this.info.id + 'street') } />
          </p>
        </div>
      </li>
    )
  }
}

class LeavingAt extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <li>
        <h1 className="create-lift-h1"  className="address_info">Leaving at</h1>
        <div className="address_stuff">


          <p className="left">
            <label htmlFor="time-picker">time</label>
            <input id="time-picker" type="time" name="time-picker" ref="time" onChange={  this.props.handleChange.bind( null, 'time') }/>
          </p>
          <p className="pull-right">
            <label htmlFor="date-picker">date</label>
            <input type="date" name="date-picker" id="date-picker" ref="date" onChange={  this.props.handleChange.bind( null, 'date') } />
          </p>
        </div>
      </li>
    )
  }
}

class NumberOfPassengers extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <li id="num-pass">
        <p>
          <label htmlFor="pass-number">number of passengars</label>
          <input type="number" name="pass-number" min="0" onChange={  this.props.handleChange.bind( null, 'num_pass') }/>
        </p>
      </li>
    )
  }
}

class Comments extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <li>
        <label htmlFor="comments">comments</label>
        <textarea cols="46" rows="3" name="comments" id="group-comments" onChange={  this.props.handleChange.bind( null, 'comments') }></textarea>
      </li>
    )
  }
}

export default connect(
  (state) => {
    return {
      groups: state.groups
    }
  }
)(CreateLift);
