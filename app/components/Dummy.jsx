var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';
import SearchForm from 'SearchForm';
export class Dummy extends React.Component{

  render() {

    return (
      <div id="dummy">
        <SearchForm/>
      </div>
    )
  }
}
export default connect()(Dummy);
