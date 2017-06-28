var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';
import SearchForm from 'SearchForm';
export class SeeLifts extends React.Component{

  render() {

    return (
      <div id="lifts-list">
        <SearchForm/>
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


        <div >

        <section className="responsive2">



          <ul >
             <li className="list-item-lift">
                  <div className="lift-address-wrapper">

                    <div className="lift-address">
                      <h3 className="single-lift-top-title">Leaving from</h3>
                      <h4 className="lift-street">Rachel Alter 34, lod</h4>
                    </div>

                    <div className="lift-address">
                      <h3 className="single-lift-top-title">Destination</h3>
                      <h4 className="lift-street">Alenbi 22, Tel aviv</h4>
                    </div>

                  </div>

                    <h3 className="when-leave">Departing on August 21, 2017 at 11:30am</h3>

                    <div className="driver-and-join">
                      <div className="driver-of-ride">
                        <h4>Driver is Walter white</h4>
                        <div className="ride-image-strip">
                          <img src="https://goo.gl/jiiEQx" alt="" />
                        </div>
                      </div>
                      <div className="join-ride-layout">
                        <CarSVG/>
                        <h4 className="join-ride-text">join ride</h4>
                      </div>
                    </div>

                  <h4>who's confirmed?</h4>
                  <div className="ride-image-strip confirmed-list">
                      <img src="https://goo.gl/e3fq8V" alt="" />
                      <img src="https://goo.gl/u5bPP7" alt=""/>
                      <img src="https://goo.gl/giKRBV" alt=""/>
                      <img src="https://goo.gl/LxAz1b" alt="" />

                  </div>

                  <p className="ride-comments">The airconditioning is going to be on 12 degrees, so if you can't handle it please don't come. In addition
                      we will be listening to norwegian death metal in full volume the entire way. Also, please be on time!! </p>
              </li>
             <li className="list-item-lift">
                  <div className="lift-address-wrapper">

                    <div className="lift-address">
                      <h3 className="single-lift-top-title">Leaving from</h3>
                      <h4 className="lift-street">Rachel Alter 34, lod</h4>
                    </div>

                    <div className="lift-address">
                      <h3 className="single-lift-top-title">Destination</h3>
                      <h4 className="lift-street">Alenbi 22, Tel aviv</h4>
                    </div>

                  </div>

                    <h3 className="when-leave">Departing on August 21, 2017 at 11:30am</h3>

                    <div className="driver-and-join">
                      <div className="driver-of-ride">
                        <h4>Driver is Walter white</h4>
                        <div className="ride-image-strip">
                          <img src="https://goo.gl/jiiEQx" alt="" />
                        </div>
                      </div>
                      <div className="join-ride-layout">
                        <CarSVG/>
                        <h4 className="join-ride-text">join ride</h4>
                      </div>
                    </div>

                  <h4>who's confirmed?</h4>
                  <div className="ride-image-strip confirmed-list">
                      <img src="https://goo.gl/e3fq8V" alt="" />
                      <img src="https://goo.gl/u5bPP7" alt=""/>
                      <img src="https://goo.gl/giKRBV" alt=""/>
                      <img src="https://goo.gl/LxAz1b" alt="" />

                  </div>

                  <p className="ride-comments">The airconditioning is going to be on 12 degrees, so if you can't handle it please don't come. In addition
                      we will be listening to norwegian death metal in full volume the entire way. Also, please be on time!! </p>
              </li>
             <li className="list-item-lift">
                  <div className="lift-address-wrapper">

                    <div className="lift-address">
                      <h3 className="single-lift-top-title">Leaving from</h3>
                      <h4 className="lift-street">Rachel Alter 34, lod</h4>
                    </div>

                    <div className="lift-address">
                      <h3 className="single-lift-top-title">Destination</h3>
                      <h4 className="lift-street">Alenbi 22, Tel aviv</h4>
                    </div>

                  </div>

                    <h3 className="when-leave">Departing on August 21, 2017 at 11:30am</h3>

                    <div className="driver-and-join">
                      <div className="driver-of-ride">
                        <h4>Driver is Walter white</h4>
                        <div className="ride-image-strip">
                          <img src="https://goo.gl/jiiEQx" alt="" />
                        </div>
                      </div>
                      <div className="join-ride-layout">
                        <CarSVG/>
                        <h4 className="join-ride-text">join ride</h4>
                      </div>
                    </div>

                  <h4>who's confirmed?</h4>
                  <div className="ride-image-strip confirmed-list">
                      <img src="https://goo.gl/e3fq8V" alt="" />
                      <img src="https://goo.gl/u5bPP7" alt=""/>
                      <img src="https://goo.gl/giKRBV" alt=""/>
                      <img src="https://goo.gl/LxAz1b" alt="" />

                  </div>

                  <p className="ride-comments">The airconditioning is going to be on 12 degrees, so if you can't handle it please don't come. In addition
                      we will be listening to norwegian death metal in full volume the entire way. Also, please be on time!! </p>
              </li>
             <li className="list-item-lift">
                  <div className="lift-address-wrapper">

                    <div className="lift-address">
                      <h3 className="single-lift-top-title">Leaving from</h3>
                      <h4 className="lift-street">Rachel Alter 34, lod</h4>
                    </div>

                    <div className="lift-address">
                      <h3 className="single-lift-top-title">Destination</h3>
                      <h4 className="lift-street">Alenbi 22, Tel aviv</h4>
                    </div>

                  </div>

                    <h3 className="when-leave">Departing on August 21, 2017 at 11:30am</h3>

                    <div className="driver-and-join">
                      <div className="driver-of-ride">
                        <h4>Driver is Walter white</h4>
                        <div className="ride-image-strip">
                          <img src="https://goo.gl/jiiEQx" alt="" />
                        </div>
                      </div>
                      <div className="join-ride-layout">
                        <CarSVG/>
                        <h4 className="join-ride-text">join ride</h4>
                      </div>
                    </div>

                  <h4>who's confirmed?</h4>
                  <div className="ride-image-strip confirmed-list">
                      <img src="https://goo.gl/e3fq8V" alt="" />
                      <img src="https://goo.gl/u5bPP7" alt=""/>
                      <img src="https://goo.gl/giKRBV" alt=""/>
                      <img src="https://goo.gl/LxAz1b" alt="" />

                  </div>

                  <p className="ride-comments">The airconditioning is going to be on 12 degrees, so if you can't handle it please don't come. In addition
                      we will be listening to norwegian death metal in full volume the entire way. Also, please be on time!! </p>
              </li>
             <li className="list-item-lift">
                  <div className="lift-address-wrapper">

                    <div className="lift-address">
                      <h3 className="single-lift-top-title">Leaving from</h3>
                      <h4 className="lift-street">Rachel Alter 34, lod</h4>
                    </div>

                    <div className="lift-address">
                      <h3 className="single-lift-top-title">Destination</h3>
                      <h4 className="lift-street">Alenbi 22, Tel aviv</h4>
                    </div>

                  </div>

                    <h3 className="when-leave">Departing on August 21, 2017 at 11:30am</h3>

                    <div className="driver-and-join">
                      <div className="driver-of-ride">
                        <h4>Driver is Walter white</h4>
                        <div className="ride-image-strip">
                          <img src="https://goo.gl/jiiEQx" alt="" />
                        </div>
                      </div>
                      <div className="join-ride-layout">
                        <CarSVG/>
                        <h4 className="join-ride-text">join ride</h4>
                      </div>
                    </div>

                  <h4>who's confirmed?</h4>
                  <div className="ride-image-strip confirmed-list">
                      <img src="https://goo.gl/e3fq8V" alt="" />
                      <img src="https://goo.gl/u5bPP7" alt=""/>
                      <img src="https://goo.gl/giKRBV" alt=""/>
                      <img src="https://goo.gl/LxAz1b" alt="" />

                  </div>

                  <p className="ride-comments">The airconditioning is going to be on 12 degrees, so if you can't handle it please don't come. In addition
                      we will be listening to norwegian death metal in full volume the entire way. Also, please be on time!! </p>
              </li>





          </ul>
              </section>

        </div>
      </div>
    )
  }
}



class CarSVG extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
     <svg id="car-in-lift" width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M352 1088q0-66-47-113t-113-47-113 47-47 113 47 113 113 47 113-47 47-113zm36-320h1016l-89-357q-2-8-14-17.5t-21-9.5h-768q-9 0-21 9.5t-14 17.5zm1372 320q0-66-47-113t-113-47-113 47-47 113 47 113 113 47 113-47 47-113zm160-96v384q0 14-9 23t-23 9h-96v128q0 80-56 136t-136 56-136-56-56-136v-128h-1024v128q0 80-56 136t-136 56-136-56-56-136v-128h-96q-14 0-23-9t-9-23v-384q0-93 65.5-158.5t158.5-65.5h28l105-419q23-94 104-157.5t179-63.5h768q98 0 179 63.5t104 157.5l105 419h28q93 0 158.5 65.5t65.5 158.5z"/></svg>
   )
  }
}




export default connect()(SeeLifts);
