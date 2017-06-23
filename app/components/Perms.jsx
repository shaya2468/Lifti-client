var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';
import SearchForm from 'SearchForm';
export class Perms extends React.Component{

  render() {

    return (
      <div id="dummy">
        <h1 id="dummy_title">Pending requests</h1>
      </div>
    )
  }
}
export default connect()(Perms);
