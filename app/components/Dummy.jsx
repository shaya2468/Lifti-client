var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';

export class Dummy extends React.Component{

  render() {

    return (
      <div id="dummy">
        
      </div>
    )
  }
}
export default connect()(Dummy);
