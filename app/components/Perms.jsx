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

          {
            perms.map((perm) => {
              return (
                <SinglePerm key ={perm.applicant_id + perm.group_id} applicantName={perm.applicant_name}
                  applicantPic={perm.applicant_pic} groupId={perm.group_id} groupName={perm.group_name}
                  message={perm.message}
                  />
              )
            })
          }

        </div>
      </div>
    )
  }
}

class SinglePerm extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    var {applicantName} = this.props;
    var {applicantPic} = this.props; // done
    var {groupId} = this.props;
    var {groupName} = this.props;
    var {message} = this.props;
    console.log(groupId, groupName, message);
    return (
      <div className="card" >
            <div className="card-content">
              <img src={applicantPic} alt=""></img>
              <div className="card-words">
                  <h2 id="perm-title">{applicantName} would like to join {groupName}</h2>
                  <h3 id="perm-message">{message}</h3>
              </div>
              <div className="acc-rej">
                <button className="perm-button" id="acc">accept</button>
                <button className="perm-button" id="rej">reject</button>
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
