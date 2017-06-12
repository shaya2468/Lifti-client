var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';

export class GroupInfo extends React.Component{

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;

  }

  render() {
    var groupId = this.props.match.params.id;

    return (
      <div id="dummy">
        <h1>Welcome to the group page {groupId}!!</h1>
      </div>
    )
  }
}
// export default connect()(GroupInfo);
module.exports = GroupInfo;
