var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';


export class SinglePerm extends React.Component{

  constructor(props) {
    super(props);
    this.onClickAccept = this.onClickAccept.bind(this);
    this.onClickReject = this.onClickReject.bind(this);
    this.dispatch = props.dispatch;
  }

  onClickAccept(event){
    event.preventDefault();
    this.dispatch(actions.acceptJoin(this.applicantId, this.groupId, true))
  }

  onClickReject(event){
    event.preventDefault();
    this.dispatch(actions.acceptJoin(this.applicantId, this.groupId, false))
  }

  render() {
    var {applicantName} = this.props;
    var {applicantPic} = this.props; // done
    var {groupId} = this.props;
    var {applicantId} = this.props;
    var {groupName} = this.props;
    var {message} = this.props;
    var {requestStatus} = this.props;
    this.applicantId = applicantId;
    this.groupId = groupId;

    return (
      <div className="card" >
            <div className="card-content">
              <img src={applicantPic} alt=""></img>
              <div className="card-words">
                  <h2 id="perm-title">{applicantName} would like to join {groupName}</h2>
                  <h3 id="perm-message">{message}</h3>
              </div>

              {

                  requestStatus === 'loading'
                  ?
                    <div className="acc-rej">
                      <div className="loader"></div>
                    </div>
                  :

                    requestStatus === 'static'
                    ?
                    <div className="acc-rej">
                      <button className="perm-button" id="acc" onClick={this.onClickAccept}>accept</button>
                      <button className="perm-button" id="rej" onClick={this.onClickReject}>reject</button>
                    </div>
                    :
                    <div className="acc-rej">
                      <h4 id="sent">sent</h4>
                    </div>


              }


            </div>

          </div>
        )
  }

}

export default connect()(SinglePerm);
