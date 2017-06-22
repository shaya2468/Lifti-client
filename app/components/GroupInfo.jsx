var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';

export class GroupInfo extends React.Component{

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
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

    console.log(group);

    if (group){
      this.name = group.name;
      this.pic = group.pic;
      this.userStatus = group.userStatus
    }

  }

  render() {

    return (
      <div id="dummy">
        <h1 id="group-page-header">Welcome to {this.name}!!</h1>
          <img id="group-page-image"
           src={this.pic}
           alt="loading..." />
         <UserStatus status={this.userStatus} />
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
        <button id="send-permission-request">join group</button>
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
