var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
import * as actions from 'actions';
import SearchForm from 'SearchForm';
import LiftApi from 'LiftApi';
export class CreateLift extends React.Component{

  constructor(props) {
    super(props);
    this.state = {isLoading:false, depart_city:'Jerusalem', depart_street: null, dest_city:'Jerusalem', dest_street: null, time:null, date:null, num_pass:null, comments:null, groupsToAdd: {}}
    this.handleChange = this.handleChange.bind(this);
    this.groupChosen = this.groupChosen.bind(this);
    var {groups} = this.props;
    this.groups = groups;
  }

  handleChange(field, event) {
    event.preventDefault();

    this.setState({
      [field]: event.target.value
    });
  }

  groupChosen(id, event) {

    var newState = {
        ...this.state.groupsToAdd,
        [id]: event.target.checked
    }

    this.setState({groupsToAdd: newState});
  }

  onCreateLift = (e) => {
    e.preventDefault();

    var p = this.state.groupsToAdd;
    var groupIdsArray = [];
    for (var key in p) {
      if (p.hasOwnProperty(key)) {
      if (p[key] === true){
          groupIdsArray.push(key);
        }
      }
    }

    if (groupIdsArray.length === 0){
      alert('please choose at least one group');
      return;
    }

    var leaveAtTimestamp  = moment("2017-06-29 14:33", "YYYY/MM/DD HH:mm").unix();
    var body = {
      origin_city: this.state.depart_city,
      origin_street: this.state.depart_street,
      destination_city: this.state.dest_city,
      destination_street: this.state.dest_street,
      description: this.state.comments,
      leave_at:leaveAtTimestamp,
      capacity: parseInt(this.state.num_pass),
      groups:groupIdsArray
    }


    this.setState({isLoading:true});
    LiftApi.createLift(body).then((res) => {

      this.setState({isLoading:false});
      var data = res.data;

      document.getElementById("lift-form").reset();
      this.setState({groupsToAdd: {}})
      alert('Lift added successfully!!')
    }).catch((e) => {
      this.setState({isLoading:false});
      console.log('request error!');
      console.log(e);
    })
  }


  render() {

    let {isLoading} = this.state;
    if (isLoading){
      return(
        <div>
          <h1 id="loading_text">Loading, please wait...</h1>
          <div id='loading'></div>
        </div>
      )
    }

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
              <GroupContainer groups={this.groups} groupChosen={this.groupChosen}/>
              <Comments handleChange={this.handleChange}/>

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


class GroupContainer extends React.Component{

  constructor(props) {
    super(props);

  }

  render() {

    var {groups} = this.props;

    return (
      <li>
        <h1 className="create-lift-h1"  className="address_info">Add to groups</h1>
        <div id="group-checkboxes">
          {
            groups.map((group, index) => {
              return (
                <SingleGroup key={index} name={group.name} id={group.id} groupChosen= {this.props.groupChosen}/>
              );
            })
          }

        </div>
      </li>

    )
  }

}

class SingleGroup extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    var {name} = this.props;
    var {id} = this.props;

    return (
      <div className="group-div">
        <input id="group-check" type="checkbox" name={name} onChange={ this.props.groupChosen.bind( null, id)}/> <label className="label-bike" htmlFor={name}>{name}</label>
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
            <input type="text" required name="depart_street" onChange={  this.props.handleChange.bind( null, this.info.id + 'street') } />
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
            <input id="time-picker" required type="time" name="time-picker" ref="time" onChange={  this.props.handleChange.bind( null, 'time') }/>
          </p>
          <p className="pull-right">
            <label htmlFor="date-picker">date</label>
            <input type="date" required name="date-picker" id="date-picker" ref="date" onChange={  this.props.handleChange.bind( null, 'date') } />
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
          <input required type="number" name="pass-number" min="0" onChange={  this.props.handleChange.bind( null, 'num_pass') }/>
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
