var React = require('react');
import * as actions from 'actions';
var {connect} = require('react-redux');

class SeeLiftsTime extends React.Component{


  handleChange = (e) => {
    event.preventDefault();
    var {jsonKey, dispatch}  = this.props;

    dispatch(actions.addFilter({
      [jsonKey]: e.target.value
    }))
  }

  render() {
    var {dispatch, title, cities, filters, jsonKey} = this.props;
    var currentFilter = filters[jsonKey];
    return (

      <p className="timep">
        <label htmlFor="time-picker">{title}</label>
        <input  required type="time" name="time-picker" ref="time" className="see-lift-date-picker" onChange={  this.handleChange } value={ currentFilter? currentFilter : ""}/>
      </p>
    )
  }
}

export default connect(
  (state) => {
    return {
      filters: state.filters
    }
  }
)(SeeLiftsTime);
