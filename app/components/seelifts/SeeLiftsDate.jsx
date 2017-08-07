var React = require('react');
import * as actions from 'actions';
var moment = require('moment');
var {connect} = require('react-redux');

class SeeLiftsDate extends React.Component{


  handleChange = (e) => {
    event.preventDefault();
    var {jsonKey, dispatch}  = this.props;
    dispatch(actions.addFilter({
      [jsonKey]: e.target.value
    }))
  }

  componentDidMount(){
    var {jsonKey, filters} = this.props;
    var currentFilter = filters[jsonKey] ;
    this.datePicker('.' + jsonKey, 'datetime-local', currentFilter);
  }

   datePicker = (selector, type, currentFilter) => {
    var self = this;
    var _type =   'datetime-local';
    var _elm = document.querySelector(selector);
    _elm.value = this._prettifyDate(currentFilter, _type);
    var {jsonKey, dispatch}  = this.props;

    var format = 'YYYY-MM-DDTHH:mm';
    var tempDateInit =  moment(currentFilter).format(format);

    dispatch(actions.addFilter({
      [jsonKey]: tempDateInit
    }))
  }

  _uglifyDate = (dateString) => {

    var target = dateString.target;
    var _type = 'datetime-local';
    var format = 'YYYY-MM-DDTHH:mm';
    dateString.target.value = moment(dateString.target.value).format(format);

    target.setAttribute('_type', target.getAttribute('type'));
    target.setAttribute('type', _type);
};

  onBlur = (dateString) => {
    var target = dateString.target;

    target.setAttribute('type', target.getAttribute('_type'));
    target.removeAttribute('_type');
    dateString.target.value = this._prettifyDate(dateString.target.value, 'datetime-local');
  }

  _prettifyDate = (dateString, _type) => {
      var format ='ll HH:mm';
      return moment(dateString).format(format);
  };

  render() {
    var {dispatch, title, cities, filters, jsonKey} = this.props;
    var currentFilter = filters[jsonKey];

    return (

      <div className="timep">
      <label htmlFor="date-picker" className="date-text text-my-date timep-text1" >{title}</label>
      <input name="date-picker" className="input-date-screen" type="text" placeholder="Till Date" className={jsonKey +  " date date-time start-date-time"} onFocus={this._uglifyDate} onBlur={this.onBlur} onChange={  this.handleChange }/>

    </div>
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
