var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';
import SearchForm from 'SearchForm';
export class CreateLift extends React.Component{



  onCreateLift = (e) => {
    e.preventDefault();
    var bike1 = this.refs.bike1.checked;
    var bike2 = this.refs.bike2.checked;
    console.log('1: ' + bike1);
    console.log('2: ' + bike2);
  }


  render() {

    return (
      <div className="container-create-lift">
        <div className="row-create-lift header-create-lift">
          <h1 className="create-lift-h1" >Create Lift&nbsp;</h1>
          <h3>Add a lift to your group and invite people to join</h3>
        </div>
        <div className="row-create-lift body-create-lift">
          <form id="lift-form" onSubmit={this.onCreateLift}>
            <ul>

              <li>
                <h1 className="create-lift-h1"  className="address_info">Point of Departure</h1>
                <div className="address_stuff">


                  <p className="left">
                    <label htmlFor="depart">city</label>
                    <select className="drop-down-lift" name="depart">
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
                  <p className="pull-right">
                    <label htmlFor="depart_street">street</label>
                    <input type="text" name="depart_street" />
                  </p>
                </div>
              </li>

              <li>
                <h1 className="create-lift-h1"  className="address_info">Destination</h1>
                <div className="address_stuff">
                  <p className="left">
                    <label htmlFor="dest">city</label>
                    <select className="drop-down-lift" name="dest">
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
                  <p className="pull-right">
                    <label htmlFor="destination_street">street</label>
                    <input type="text" name="destination_street" />
                  </p>
                </div>
              </li>

              <li>
                <h1 className="create-lift-h1"  className="address_info">Leaving at</h1>
                <div className="address_stuff">


                  <p className="left">
                    <label htmlFor="time-picker">time</label>
                    <input id="time-picker" type="time" name="time-picker" />
                  </p>
                  <p className="pull-right">
                    <label htmlFor="date-picker">date</label>
                    <input type="date" name="date-picker" id="date-picker"/>
                  </p>
                </div>
              </li>


              <li id="num-pass">
                <p>
                  <label htmlFor="pass-number">number of passengars</label>
                  <input type="number" name="pass-number" min="0" />
                </p>
              </li>

              <h1 className="create-lift-h1"  className="address_info">Add to groups</h1>
              <div id="group-checkboxes">



                <div className="group-div">
                  <input id="group-check" type="checkbox" ref="bike1"  name="bike1"  /> <label className="label-bike" htmlFor="bike1">time</label>
                </div>

                <div className="group-div">
                  <input id="group-check" type="checkbox"  ref="bike2" name="bike2"/> <label className="label-bike" htmlFor="bike2">time</label>
                </div>

                <div className="group-div">
                  <input id="group-check" type="checkbox" ref="bike3"  name="bike3"/> <label className="label-bike" htmlFor="bike3">time</label>
                </div>

                <div className="group-div">
                  <input id="group-check" type="checkbox" ref="bike4"  name="bike4"/> <label className="label-bike" htmlFor="bike4">time</label>
                </div>

                <div className="group-div">
                  <input id="group-check" type="checkbox" ref="bike5"  name="bike5"/> <label className="label-bike" htmlFor="bike5">time</label>
                </div>

                <div className="group-div">
                  <input id="group-check" type="checkbox"  ref="bike6" name="bike6"/> <label className="label-bike" htmlFor="bike6">time</label>
                </div>

                <div className="group-div">
                  <input id="group-check" type="checkbox" ref="bike7"  name="bike7"/> <label className="label-bike" htmlFor="bike7">time</label>
                </div>

              </div>

              <li><div className="divider"></div></li>
              <li>
                <label htmlFor="comments">comments</label>
                <textarea cols="46" rows="3" name="comments" id="group-comments"></textarea>
              </li>

              <li>
                <input id="btn-submit" type="submit" value="Submit" />
                <small>or press <strong>enter</strong></small>
              </li>

            </ul>
          </form>
        </div>
      </div>
    )
  }
}
export default connect()(CreateLift);
