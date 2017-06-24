var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';
import SearchForm from 'SearchForm';
export class Perms extends React.Component{

  render() {
    var {perms} = this.props;
    console.log('in perms screen');
    console.log(perms);
    return (
      <div >
        <div className="cards-list">

          <div className="card">
            <div className="card-content">
              <img src="https://goo.gl/mw8pHx" alt=""></img>
              <div className="card-words">
                  <h2 id="perm-title">Shaya Ajzner would like to join beer 7 students</h2>
                  <h3 id="perm-message">"sup man you remember me from studying medicine together, would love to join"</h3>
              </div>
              <div className="acc-rej">
                <button className="perm-button" id="acc">accept</button>
                <button className="perm-button" id="rej">reject</button>
              </div>
            </div>

          </div>
          <div className="card">
            Card 2
          </div>
          <div className="card">
            Card 3
          </div>
          <div className="card">
            Card 4
          </div>

        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      perms: state.perms
    }
  }
)(Perms);
