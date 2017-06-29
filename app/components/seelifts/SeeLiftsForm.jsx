var React = require('react');
import * as actions from 'actions';
var {connect} = require('react-redux');
import SeeLiftsCity from 'SeeLiftsCity';
import SeeLiftsDate from 'SeeLiftsDate';
import SeeLiftsTime from 'SeeLiftsTime';


class SeeLiftsForm extends React.Component{

  constructor(props) {
    super(props);
    this.cities = this.props.cities;
  }

  onFormFilled = (e) => {
    e.preventDefault();
    var timestamps = this.constructTimeStamps();
    var query = _.merge(timestamps, {origin_city: this.state.origin_city, destination_city:this.state.destination_city});
    return LiftApi.getLifts(query).then((result) => {
      console.log(result);
    }).catch((e) => {
      console.log(e);
    });
  }

  constructTimeStamps(){
    var {date} = this.state;
    var {from_time} = this.state;
    var {till_time} = this.state;

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
          <SeeLiftsTime jsonKey={'from_time'}/>
          <SeeLiftsTime jsonKey={'till_time'}/>

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
