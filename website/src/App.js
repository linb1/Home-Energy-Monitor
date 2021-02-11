import './App.css';
import NavBar from './navbarcomponents/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Electricity from './pages/Electricity';
import Statistics from './pages/Statistics';
import Solar from './pages/Solar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/electricity' component={Electricity} />
          <Route path='/statistics' component={Statistics} />
          <Route path='/solar' component={Solar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
