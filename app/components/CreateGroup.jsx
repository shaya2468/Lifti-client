import React from 'react';
import $ from 'jquery';
import * as actions from 'actions';
var axios = require('axios');
var {connect} = require('react-redux');


export class CreateGroup extends React.Component{

  render() {

    return (
      <div id='container'>
        <div id='create-group'>
           <form id="group-form">
             <input className="create-group-input" type='text' placeholder='Name'  />
             <input className='text' className="create-group-input" placeholder='Description'  />
             <input className='email' className="create-group-input" placeholder='Email:' required="true" />
             <input className='text' className="create-group-input" placeholder='Phone:'  />
             <input type='submit' id="group-submit" placeholder='SUBMIT' />

           </form>
        </div>
        <div className='whysign'>
          <h1>Create Group</h1>
          <p>Start adding lifts and inviting people immediatly!</p>

        </div>
      </div>
    )
  }
}
export default connect()(CreateGroup);
