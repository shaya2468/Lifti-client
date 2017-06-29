var React = require('react');
import * as actions from 'actions';
var {connect} = require('react-redux');

class SeeLiftsDate extends React.Component{


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
        <label htmlFor="date-picker" className="date-text" id="timep-text">date</label>
        <input type="date" required name="date-picker" className="see-lift-date-picker" ref="date" onChange={  this.handleChange } value={ currentFilter? currentFilter : ""}/>
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
)(SeeLiftsDate);
