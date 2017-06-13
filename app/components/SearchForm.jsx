import React from 'react';
var {connect} = require('react-redux');
var _ = require('lodash')
var searchData = [
  'Aang',
  'Appa',
  'Asami',
  'Azula',
  'Bolin',
  'Katara',
  'Korra',
  'Jinora',
  'Lin Beifong',
  'Momo',
  'Mai',
  'Mako',
  'Naga',
  'Sokka',
  'Suki',
  'Tenzin',
  'Toph Beifong',
  'Ty Lee',
  'Uncle Iroh',
  'Zuko'
];
var SearchForm = React.createClass({
  getInitialState: function () {
    return {
      data: searchData,
      items: [],
      isFocus: false
    }
  },
  handleChange: function(e) {
    var val = e.target.value;
    var that = this;
    if (val.length===0){
      that.setState({data: [], isFocus:false});
    }
    else{
      setTimeout(function(){

        var filteredItems = searchData.filter(function(item){
          return _.includes(item.toLowerCase(), val.toLowerCase());
        });
        var shouldShow = val.length >0;
        that.setState({data: filteredItems, isFocus:shouldShow});


      }, 500);
    }

  },

  onFocus: function(e){
    var val = e.target.value;
    var shouldShow = val.length >0;
    this.setState({ isFocus:shouldShow});
  },

  onfocusout: function(e){
    this.setState({ isFocus:false});
    this.refs.search_text.value="";
  },

  render: function() {

    const isFocus = this.state.isFocus;
    return (
      <div className="search-form">
        <input type="text" placeholder="Search" ref="search_text"
               className="form-control"
               onBlur={this.onfocusout} onFocus={this.onFocus} onChange={this.handleChange} id="search-title"/>
             <div className="search-items">

          { isFocus &&

            this.state.data.map((item) => {
              return (
                <SearchItem key={item} text={item} id={item}/>
              );
            })
          }
        </div>
      </div>
    );
  }
});


var SearchItem = React.createClass({

  onClickItem: function(e){
    console.log('onClickSearchItem aafff! ' + this.props.id);
  },

  render: function () {
    return (
      <div className="search-item" onMouseDown={this.onClickItem}>{this.props.text}</div>
    );
  }
});
export default connect()(SearchForm);
