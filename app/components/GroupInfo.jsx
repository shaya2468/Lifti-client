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
        <h1 id="group-page-header">Welcome to the group page {groupId}!!</h1>
          <img id="group-page-image"
           src="https://scontent.ftlv1-1.fna.fbcdn.net/v/t1.0-9/12112368_10204247364098648_1699726661887914998_n.jpg?oh=c1fc1a641b84073805c4b8b4483abbc3&oe=59DE23EA"
           alt="loading..." />
      </div>
    )
  }
}
// export default connect()(GroupInfo);
module.exports = GroupInfo;
