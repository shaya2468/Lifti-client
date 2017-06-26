var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';
import SearchForm from 'SearchForm';
export class SeeLifts extends React.Component{

  render() {

    return (
      <div id="dummy">

          <form id="see-lift-form" >
            <ul>
              <ul>
                <p className="see-lift-city">
                  <label htmlFor="depart">depart</label>
                  <select className="drop-down-lift drop-down-see-lift" name="depart" >
                    <option>Jerulalem</option>
                    <option >Tel aviv</option>
                    <option>Eilat</option>
                    <option>Ramat Gan</option>
                    <option>Netivot</option>
                    <option>Yerucham</option>
                    <option>Tiberias</option>
                    <option>Lod</option>
                  </select>
                </p>
              </ul>

              <ul>
                <p className="see-lift-city">
                  <label htmlFor="depart">destination</label>
                  <select className="drop-down-lift drop-down-see-lift" name="depart" >
                    <option>Jerulalem</option>
                    <option >Tel aviv</option>
                    <option>Eilat</option>
                    <option>Ramat Gan</option>
                    <option>Netivot</option>
                    <option>Yerucham</option>
                    <option>Tiberias</option>
                    <option>Lod</option>
                  </select>
                </p>
              </ul>

              <p className="timep">
                <label htmlFor="date-picker" className="date-text" id="timep-text">date</label>
                <input type="date" required name="date-picker" className="see-lift-date-picker" ref="date" />
              </p>

              <p className="timep">
                <label htmlFor="time-picker">from</label>
                <input  required type="time" name="time-picker" ref="time" className="see-lift-date-picker"/>
              </p>

              <p className="timep">
                <label htmlFor="time-picker">to</label>
                <input  required type="time" name="time-picker" ref="time" className="see-lift-date-picker"/>
              </p>

              <li>
                <input id="see-lift-submit" type="submit" value="find lifts" />
              </li>

            </ul>
          </form>

        <SearchForm/>
      </div>
    )
  }
}
export default connect()(SeeLifts);
