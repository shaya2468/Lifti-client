var React = require('react');
import * as actions from 'actions';
var {connect} = require('react-redux');
import LiftItem from 'LiftItem';

class LiftsGrid extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){

    var {lifts} = this.props;

    var renderLift = () => {
      return lifts.map((lift, index) => {
        return (
          <LiftItem key={index} {...lift}/>
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
