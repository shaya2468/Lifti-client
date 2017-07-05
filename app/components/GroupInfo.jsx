var React = require('react');
import * as actions from 'actions';
var {connect} = require('react-redux');


export class GroupInfo extends React.Component{

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;

    this.sendJoinRequest = this.sendJoinRequest.bind(this);
    var {groups} = this.props;

    var {fromSearch} = this.props.location;

    this.groupId = this.props.match.params.id;

    var group;

    if (fromSearch){
      group = {
        name: this.props.location.name,
        pic: this.props.location.image,
        userStatus: this.props.location.userStatus,
        description: this.props.location.description
      }
    }else{
      group = groups.filter((group) => {
        return group.id === this.groupId;
      })[0];

      // this is for now, since we get here from create group page
      if (group){
        group.userStatus = 'manager';
      }
    }

    if (group){
      this.name = group.name;
      this.pic = group.pic;
      this.description = group.description;
      this.state = {userStatus: group.userStatus}
    }
  }

  sendJoinRequest( message){
    // here we send the request to server to join the group.
    this.setState({userStatus: 'permission_request_sent'})
    this.dispatch(actions.sendJoinRequest(this.groupId, message));
  }

  render() {

    var status = this.state.userStatus;
    var message;
    if (status === 'permission_request_sent'){
      message = 'join request sent'
    }
    if (status === 'manager'){
      message = 'you are the manager'
    }
    if (status === 'member'){
      message = 'you are a member'
    }

    return (
      <div id="dummy">

        <div id= "whole-group-layout">
            <ul className="group-main-things-layout">
              <li className="group-main-info-layout">
                <h5 id="group-is-member">{message}</h5>
                <img id="group-info-main-image" src={this.pic}/>
                <h3 className="single-lift-top-title">{this.name}</h3>
                <h4 className="lift-street" id="group-info-secondary-title">{this.description}</h4>
                <h5 id="group-number-members">27 members</h5>
              </li>

              {
                (status === 'non_member') &&
                <li className="group-main-info-layout group-join-layout">

                    <h5 id="group-interested">Looks interesting?</h5>
                    <label htmlFor="comments" id="label-join-group">Add message</label>
                   <textarea ref= "message" cols="46" rows="3" name="comments" id="text-join-group" ></textarea>

                  <button id="send-permission-request-button" onClick={ (e) => {
                      var message = this.refs.message.value;
                      this.sendJoinRequest(message)
                    }}>join group</button>

                </li>
              }

          </ul>
          <div id="who-in-group">
            <ul className="group-users-layout ">

              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>
              <li className="group-main-info-layout group-user-single-layout">

                  <img id="group-info-user-image" src="http://www.sarairivera.net/images/workthumb05.png"/>
                  <h3 id="group-user-title">Shaya ajzner</h3>
              </li>

            </ul>
          </div>
      </div>
      </div>
    )
  }
}

// class UserStatus extends React.Component{
//
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     var {status} = this.props;
//
//     if (status === 'non_member'){
//       return(
//         <div id="join-group-layout">
//
//             <label htmlFor="comments" id="label-join-group" </label></label></label>oin message</label>
//             <textarea ref= "message" cols="46" rows="3" name="comments" id="text-join-group" ></textarea>
//
//           <button id="send-permission-request-button" onClick={ (e) => {
//               var message = this.refs.message.value;
//               this.props.sendJoinRequest(message)
//             }}>join group</button>
//         </div>
//
//       )
//     }
//     var message;
//
//     if (status === 'permission_request_sent'){
//       message = 'join request sent'
//     }
//     if (status === 'manager'){
//       message = 'you are the manager'
//     }
//     if (status === 'member'){
//       message = 'you are a member'
//     }
//
//
//     return (
//       <h1 id="group-page-header">{message}</h1>
//     )
//   }
// }



export default connect(
  (state) => {
    return {
      groups: state.groups
    }
  }
)(GroupInfo);
