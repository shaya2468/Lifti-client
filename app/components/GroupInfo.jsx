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
        userStatus: this.props.location.userStatus
      }
    }else{
      group = groups.filter((group) => {
        return group._id === this.groupId;
      })[0];

      // this is for now, since we get here from create group page
      if (group){
        group.userStatus = 'manager';
      }
    }

    if (group){
      this.name = group.name;
      this.pic = group.pic;
      this.state = {userStatus: group.userStatus}
    }
  }

  sendJoinRequest( message){
    // here we send the request to server to join the group.
    this.setState({userStatus: 'permission_request_sent'})
    this.dispatch(actions.sendJoinRequest(this.groupId, message));
  }

  render() {

    return (
      <div id="dummy">
        <h1 id="group-page-header">Welcome to {this.name}!!</h1>
          <img id="group-page-image"
           src={this.pic}
           alt="loading..." />
         <UserStatus status={this.state.userStatus} sendJoinRequest={this.sendJoinRequest}/>
      </div>
    )
  }
}

class UserStatus extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    var {status} = this.props;

    if (status === 'non_member'){
      return(
        <div id="join-group-layout">

            <label htmlFor="comments" id="label-join-group">Add join message</label>
            <textarea ref= "message" cols="46" rows="3" name="comments" id="text-join-group" ></textarea>

          <button id="send-permission-request-button" onClick={ (e) => {
              var message = this.refs.message.value;
              this.props.sendJoinRequest(message)
            }}>join group</button>
        </div>

      )
    }
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
      <h1 id="group-page-header">{message}</h1>
    )
  }
}



export default connect(
  (state) => {
    return {
      groups: state.groups
    }
  }
)(GroupInfo);
