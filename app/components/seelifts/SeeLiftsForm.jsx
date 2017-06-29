var React = require('react');
var moment = require('moment');
import * as actions from 'actions';
var {connect} = require('react-redux');
import SeeLiftsCity from 'SeeLiftsCity';
import SeeLiftsDate from 'SeeLiftsDate';
import SeeLiftsTime from 'SeeLiftsTime';
import LiftApi from 'LiftApi';


class SeeLiftsForm extends React.Component{

  constructor(props) {
    super(props);
  }

  onFormFilled = (e) => {
    e.preventDefault();
    var timestamps = this.constructTimeStamps();
    var query = _.merge(timestamps, {origin_city: this.props.filters.origin_city, destination_city:this.props.filters.destination_city});
    return LiftApi.getLifts(query).then((result) => {
      console.log(result.data);
    }).catch((e) => {
      console.log(e);
    });
  }

  constructTimeStamps(){
    var {date} = this.props.filters;
    var {from_time} = this.props.filters;
    var {till_time} = this.props.filters;

    var from_time = moment(date + " " + from_time, "YYYY/MM/DD HH:mm").unix();
    var till_time = moment(date + " " + till_time, "YYYY/MM/DD HH:mm").unix();
    return {from_time, till_time}
  }

  render(){

    return (
      <form id="see-lift-form" onSubmit={this.onFormFilled}>
        <ul>

          <SeeLiftsCity title={'depart'}  jsonKey={'origin_city'} />
          <SeeLiftsCity title={'destination'}  jsonKey={'destination_city'}/>
          <SeeLiftsDate jsonKey={'date'}/>
          <SeeLiftsTime title={'from'} jsonKey={'from_time'}/>
          <SeeLiftsTime title={'till'} jsonKey={'till_time'}/>

        <li>
            <input id="see-lift-submit" type="submit" value="find lifts" />
          </li>

        </ul>
      </form>
    )
  }
}

export default connect(
  (state) => {
    return {
      filters: state.filters
    }
  }
)(SeeLiftsForm);
