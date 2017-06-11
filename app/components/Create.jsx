var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';
import CreateGroup from 'CreateGroup';
const Tabs = React.createClass({
  getInitialState(){
    return {
      selected:this.props.selected || 0
    }
  },
  render(){
    return (<div>
      <ul className="inline">
        {this.props.children.map((elem,index)=>{
          let style = index == this.state.selected ? 'selected': '';
         return <li className={style} key={index} onClick={this.handleChange.bind(this,index)}>{elem.props.title}</li>
        })}
      </ul>
      <div className="tab_create">{this.props.children[this.state.selected]}</div>
      </div>
    )
  },
    handleChange(index){
      this.setState({selected:index})
    }
})

const Panel = React.createClass({
  render(){
    return <div id="panel">{this.props.children}</div>
  }
})

const Create = React.createClass({
  render(){
    return (

        <Tabs selected={1}>
          <Panel title="Group"><CreateGroup/></Panel>
          <Panel title="Lift"><h1>This is the Lift panel</h1></Panel>
        </Tabs>

    )
  }
})

export default connect()(Create);
