import './App.css';
import NavBar from './navbarcomponents/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Appliances from './pages/appliances/Appliances';
import Rooms from './pages/Rooms';
import Costs from './pages/Costs';
import Notifications from './pages/Notifications'

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
