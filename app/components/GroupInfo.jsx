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
        pic: this.props.location.image
      }
    }else{
      group = groups.filter((group) => {
        return group._id === this.groupId;
      })[0]
    }

    this.name = group.name;
    this.pic = group.pic;
  }

  render() {

    return (
      <div id="dummy">
        <h1 id="group-page-header">Welcome to {this.name}!!</h1>
          <img id="group-page-image"
           src={this.pic}
           alt="loading..." />
      </div>
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
