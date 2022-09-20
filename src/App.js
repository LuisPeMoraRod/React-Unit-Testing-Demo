import React, {  useState, createRef, useEffect } from "react";
import SW_logo from './SW-logo.svg'
import './App.css';
import Select from "react-select";
const axios = require("axios");

function App() {

  const [charactersData, setCharactersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseData = (data) => {
    return data.map((character) => {
      return {...character, value: character.name, label: character.name}
    });
  }

  useEffect(()=>{
    // fetch("https://swapi.dev/api/people/")
    //   .then((response) => {
    //     if (response.ok) return response.json();
    //     throw response;
    //   })
    //   .then((data) => {
    //     const parsedData = parseData(data.results);
    //     console.log(parsedData)
    //     setCharactersData(parsedData);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data: ", error);
    //     setError(error);
    //   })
    //   .finally(() => setLoading(false));
    let people = [];
    axios("https://swapi.dev/api/people/")
        .then(response => {
            people = response.data.results;
            return response.data.count;
        })
        .then(count => {
            // exclude the first request
            const numberOfPagesLeft = Math.ceil((count - 1) / 10);
            let promises = [];
            // start at 2 as you already queried the first page
            for (let i = 2; i <= numberOfPagesLeft; i++) {
                promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
            }
            return Promise.all(promises);
        })
        .then(response => {
            //get the rest records - pages 2 through n.
            people = response.reduce((acc, data) => [...acc, ...data.data.results], people);
            const parsedData = parseData(people);
            setCharactersData(parsedData);
        })
        .catch((error) => {
              console.error("Error fetching data: ", error);
              setError(error);
            })
        .finally(() => setLoading(false));
  }, [])

  if (loading) return "Loading...";
  if (error) return "Error!";
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
        <Select
           className="basic-single"
           classNamePrefix="select"
           name="characters"
           options={charactersData}
        />
      </body>

    </div>
  );
}

export default App;
