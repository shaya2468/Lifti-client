var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';
import SearchForm from 'SearchForm';
import SeeLiftsForm from 'SeeLiftsForm';
import LiftiModal from 'LiftiModal';
import LiftApi from 'LiftApi';
import LiftsGrid from 'LiftsGrid';
var moment = require('moment');
var _ = require('lodash')
export class SeeLifts extends React.Component{

  constructor(props){
    super(props);
  }

  render() {

    var isLoadingLifts = this.props.loadingLifts;
    return (
      <div id="lifts-list">

        {
          isLoadingLifts &&

          <LiftiModal
              isModalOpen={true}
              closeModal={() => {console.log('do nothing');}}
              >

              <div id="loading_wrapper-layout">
                <div className="acc-rej">
                  <div className="loader"></div>
                </div>

                <h5 id="loading-message">Finding Lifts...</h5>

              </div>
          </LiftiModal>
        }


          <SeeLiftsForm/>
          <LiftsGrid/>
          <SearchForm/>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      loadingLifts: state.loadingLifts
    }
  }
)(SeeLifts);
