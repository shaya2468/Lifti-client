var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';
import SearchForm from 'SearchForm';
import SeeLiftsForm from 'SeeLiftsForm';
import LiftApi from 'LiftApi';
import LiftsGrid from 'LiftsGrid';
var moment = require('moment');
var _ = require('lodash')
export class SeeLifts extends React.Component{

  constructor(props){
    super(props);
  }

  render() {

    return (
      <div id="lifts-list">
          <SearchForm/>
          <SeeLiftsForm/>
          <LiftsGrid/>
      </div>
    )
  }
}

export default connect()(SeeLifts);
