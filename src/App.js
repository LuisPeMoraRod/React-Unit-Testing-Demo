import SW_logo from './SW-logo.svg'
import './App.css';
import Form from 'react-bootstrap/Form';

function App() {

  return (
    <div className="App">
      <header>
        <img src={SW_logo} className="SW-logo" alt="logo" />

      </header>
      <body>
        <p>
          Choose a Star Wars character to retrieve some meta-data from {" "}
          <a
            className="App-link"
            href="https://swapi.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            SWAPI
          </a>
        </p>
        <Form.Select className='App-select'>
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </body>

    </div>
  );
}

export default App;
