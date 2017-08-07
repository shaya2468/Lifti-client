var React = require('react');
var moment = require('moment');
import * as actions from 'actions';
var {connect} = require('react-redux');
import SeeLiftsCity from 'SeeLiftsCity';
import SeeLiftsDate from 'SeeLiftsDate';
import SeeLiftsTime from 'SeeLiftsTime';
import LiftApi from 'LiftApi';


class SeeLiftsForm extends React.Component{

  onFormFilled = (e) => {
    e.preventDefault();
    var { dispatch}  = this.props;
    var timestamps = this.constructTimeStamps();
    var query = _.merge(timestamps, {origin_city: this.props.filters.origin_city, destination_city:this.props.filters.destination_city});
    dispatch(actions.getLifts(query))
  }

  constructTimeStamps(){
    var {from_time} = this.props.filters;
    var {till_time} = this.props.filters;
    var from_time = moment(from_time, "YYYY-MM-DDTHH:mm").unix();
    var till_time = moment(till_time, "YYYY-MM-DDTHH:mm").unix();
    return {from_time, till_time}
  }

  render(){

    return (
      <form id="see-lift-form" onSubmit={this.onFormFilled}>
        <ul>

          <SeeLiftsCity title={'depart'}  jsonKey={'origin_city'} />
          <SeeLiftsCity title={'destination'}  jsonKey={'destination_city'}/>
          <SeeLiftsDate jsonKey={'from_time'} title={'from'}/>
          <SeeLiftsDate jsonKey={'till_time'} title={'till'}/>


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
