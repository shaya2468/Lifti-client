import React from 'react';
var {connect} = require('react-redux');
var _ = require('lodash')
import GroupApi from 'GroupApi';
import {
  Redirect
} from 'react-router-dom'


var SearchForm = React.createClass({

  getInitialState: function () {
    return {
      data: null,
      isFocus: false,
      chosen: null
    }
  },

  handleChange: function(e) {
    var val = e.target.value;
    var that = this;
    if (val.length===0){
      that.setState({data: [], isFocus:false});
    }
    else{

      GroupApi.searchGroups(val).then((groups) => {
        groups = groups.data;
        var shouldShow = groups.length >0;
        that.setState({data: groups, isFocus:shouldShow});
      }).catch((e) => {
        that.setState({data: [], isFocus:false});
      })
    }
  },

  onFocus: function(e){
    var val = e.target.value;
    var shouldShow = val.length >0;
    this.setState({ isFocus:shouldShow});
  },

  onfocusout: function(e){
    this.setState({ isFocus:false, data:null});
    this.refs.search_text.value="";
  },
  onClickSearchItem: function(event, searchData){
    this.setState({ chosen:searchData});
  },

  render: function() {

    const isFocus = this.state.isFocus;

    if (this.state.chosen){
      return(
        <Redirect to={{
          pathname: `/home/group/${this.state.chosen.id}`,
          fromSearch: true,
          image: this.state.chosen.image,
          name: this.state.chosen.name,
          description: this.state.chosen.description,
          userStatus: this.state.chosen.userStatus
        }}/>
      )

    }
    else{
      return (
        <div className="search-form">
          <input type="text" placeholder="Search" ref="search_text"
                 className="form-control"
                 onBlur={this.onfocusout} onFocus={this.onFocus} onChange={this.handleChange} id="search-title"/>
               <div className={this.state.data && this.state.data.length >0 ? "search-items" : ""}>

            { isFocus &&

              this.state.data.map((group) => {
                return (
                  <SearchItem key={group.id} description={group.description} name={group.name} image={group.image} id={group.id} userStatus={group.user_status} onClickItem={this.onClickSearchItem}/>
                );
              })
            }
          </div>
        </div>
      );
    }

  }
});


var SearchItem = React.createClass({

  render: function () {
    return (
      <div className="search-item" onMouseDown={e => this.props.onClickItem(e, {name:this.props.name, description:this.props.description, image: this.props.image, id:this.props.id, userStatus:this.props.userStatus })}>{this.props.name}</div>
    );
  }
});
export default connect()(SearchForm);
