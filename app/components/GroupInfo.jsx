var React = require('react');
import * as actions from 'actions';
var {connect} = require('react-redux');
import GroupApi from 'GroupApi';

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
      this.state = {userStatus: group.userStatus, members:[]}
      GroupApi.getGroupById(this.groupId).then((result) => {
        this.setState({members: result.data.members})
      }).catch((e) => {
          console.log(e);
      })
    }



  }

  sendJoinRequest( message){
    // here we send the request to server to join the group.
    this.setState({userStatus: 'permission_request_sent'})
    this.dispatch(actions.sendJoinRequest(this.groupId, message));
  }

  render() {

    var status = this.state.userStatus;
    var members = this.state.members;
    console.log(members);
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
                    <label htmlFor="comments" id="label-join-group">Add join message:</label>
                   <textarea ref= "message" cols="46" rows="3" name="comments" id="text-join-group" ></textarea>

                  <button id="send-permission-request-button" onClick={ (e) => {
                      var message = this.refs.message.value;
                      this.sendJoinRequest(message)
                    }}>send request</button>

                </li>
              }

          </ul>

            <div id="group-members-title-layout" className="group-main-info-layout group-members-title">
              <h2 >
                  members
              </h2>
              <MembersSVG/>
            </div>


          <div id="who-in-group">
            <ul className="group-users-layout ">

              {
                  members.map((member, index) => {
                    return(
                      <li key={index} className="group-main-info-layout group-user-single-layout">
                          <img id="group-info-user-image" src={member.pic}/>
                          <h3 id="group-user-title">{member.name}</h3>
                      </li>
                    )

                  })
              }

            </ul>
          </div>
      </div>
      </div>
    )
  }
}

class MembersSVG extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <svg id="members-svg" width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M529 896q-162 5-265 128h-134q-82 0-138-40.5t-56-118.5q0-353 124-353 6 0 43.5 21t97.5 42.5 119 21.5q67 0 133-23-5 37-5 66 0 139 81 256zm1071 637q0 120-73 189.5t-194 69.5h-874q-121 0-194-69.5t-73-189.5q0-53 3.5-103.5t14-109 26.5-108.5 43-97.5 62-81 85.5-53.5 111.5-20q10 0 43 21.5t73 48 107 48 135 21.5 135-21.5 107-48 73-48 43-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-1024-1277q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm704 384q0 159-112.5 271.5t-271.5 112.5-271.5-112.5-112.5-271.5 112.5-271.5 271.5-112.5 271.5 112.5 112.5 271.5zm576 225q0 78-56 118.5t-138 40.5h-134q-103-123-265-128 81-117 81-256 0-29-5-66 66 23 133 23 59 0 119-21.5t97.5-42.5 43.5-21q124 0 124 353zm-128-609q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181z"/></svg>
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
