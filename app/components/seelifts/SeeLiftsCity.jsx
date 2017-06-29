var React = require('react');
import * as actions from 'actions';
var {connect} = require('react-redux');

class SeeLiftsCity extends React.Component{

  constructor(props) {
    super(props);
  }

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

      <ul>
        <p className="see-lift-city">
          <label htmlFor="depart">{title}</label>
          <select required className="drop-down-lift drop-down-see-lift" name="depart" onChange={  this.handleChange } >
            <option value="">---</option>
            {
              cities.map((city, index) => {
                var inputProps = {};
                if (currentFilter === city.id){
                  inputProps.selected = true;
                }

                return(
                  <option key={index} value={city.id} {...inputProps}  >{city.name} </option>
                )
              })
            }
          </select>
        </p>
      </ul>
   )
  }
}

export default connect(
  (state) => {
    return {
      filters: state.filters,
      cities: state.cities
    }
  }
)(SeeLiftsCity);
