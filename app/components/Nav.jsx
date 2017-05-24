var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';

export class Nav extends React.Component{
  onLogout = (e) => {
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.startLogout());
  }


  render() {

    return (
      <div id="home_nav">
        <button type="button" name="button" id="btn_logout" onClick={ this.onLogout }>Logout</button>
      </div>
    )
  }
}
export default connect()(Nav);
