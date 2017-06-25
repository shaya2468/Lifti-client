var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';
import SearchForm from 'SearchForm';
import SinglePerm from 'SinglePerm';
export class Perms extends React.Component{

  render() {
    var {perms} = this.props;
    console.log('in perms screen');
    console.log(perms);
    return (
      <div >
        <div className="cards-list">

          {
            perms.map((perm, index) => {
              
              return (

                <SinglePerm key={index} applicantName={perm.applicant_name}
                  applicantPic={perm.applicant_pic} groupId={perm.group_id} groupName={perm.group_name} applicantId={perm.applicant_id}
                  requestStatus={perm.requestStatus} message={perm.message}
                  />
              )
            })
          }

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
