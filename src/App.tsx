import * as React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ShipmentView from './components/ShipmentView'
import { getShipmentstrore } from './store/GetShipment.strore'
import ShipmentDetailsView from './components/ShipmentDetailsView';
import { getShipmentDetails } from './store/GetShipment.Details';

class App extends React.Component<{}, {}>{

  render() {
    return (
      <div className="App">
        <h1 className="headerTitle">Shipment Details</h1>
        <header className="App-header">
          <Router>
            <Switch>
              <Route exact={true} path='/' render={props => {
                return <ShipmentView {...props} store={getShipmentstrore} />
              }} />
              <Route
                exact={true}
                path="/shipments/:shipmentId"
                render={props => {
                  return (
                    <ShipmentDetailsView {...props} store={getShipmentDetails} />
                  );
                }} ></Route>
            </Switch>
          </Router>

        </header>
      </div>
    );
  }
}

export default App;
