import './App.css';
import routes from './routes'
import Nav from './Components/Nav'
import AuthHandler from './Components/AuthHandler'

function App() {
  return (
    <div className="App">
      <AuthHandler/>
      <Nav />
      {routes}
    </div>
  );
}

export default App;
