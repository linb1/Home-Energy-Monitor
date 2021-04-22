import './App.css';
import NavBar from './navbarcomponents/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Appliances from './pages/appliances/Appliances';
import Rooms from './pages/rooms/Rooms';
import Costs from './pages/costs/Costs';
import Notifications from './pages/notifications/Notifications';
import Weather from './pages/weather/Weather';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/appliances' component={Appliances} />
          <Route path='/rooms' component={Rooms} />
          <Route path='/costs' component={Costs} />
          <Route path='/notifications' component={Notifications} />
          <Route path='/weather' component={Weather} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
