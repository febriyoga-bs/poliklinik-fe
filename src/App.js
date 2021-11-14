//import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import { Layout } from "antd";
import Routes from "./Route";

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} 
*/

const App = () => {

  return (
    <Layout>
      <Routes/>
    </Layout>
  )
}

export default App;
