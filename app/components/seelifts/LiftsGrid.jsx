var React = require('react');
import * as actions from 'actions';
var {connect} = require('react-redux');
import LiftItem from 'LiftItem';

class LiftsGrid extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){

    var renderLift = () => {
      var {lifts} = this.props;
      console.log('in exile');
      console.log(lifts);

      return lifts.map((lift, index) => {
        return (
          <LiftItem key={index} lift = {lift}/>
        );
      })
    }

    return (
      <section className="responsive2">
        <ul>
        {renderLift()}
        </ul>
      </section>
    )

  }
}



export default connect(
  (state) => {
    return {
      lifts: state.lifts
    }
  }
)(LiftsGrid);
