import React, { useState, useEffect } from "react";
import SW_logo from "./SW-logo.svg";
import "./App.css";
import Select from "react-select";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.css";
const axios = require("axios");

function App() {
  const [charactersData, setCharactersData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseData = (data) => {
    return data.map((character) => {
      return { ...character, value: character.name, label: character.name };
    });
  };

  useEffect(() => {
    let people = [];
    axios("https://swapi.dev/api/people/")
      .then((response) => {
        people = response.data.results;
        return response.data.count;
      })
      .then((count) => {
        // exclude the first request
        const numberOfPagesLeft = Math.ceil((count - 1) / 10);
        let promises = [];
        // start at 2 as you already queried the first page
        for (let i = 2; i <= numberOfPagesLeft; i++) {
          promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
        }
        return Promise.all(promises);
      })
      .then((response) => {
        //get the rest records - pages 2 through n.
        people = response.reduce(
          (acc, data) => [...acc, ...data.data.results],
          people
        );
        const parsedData = parseData(people);
        console.log(parsedData);
        setCharactersData(parsedData);
        setSelected(parsedData[0])
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <header>
        <img src={SW_logo} className="SW-logo" alt="logo" />
      </header>
      <div>
        {!!error && <p>An error ocurred fetching data...</p>}
        {!!loading && <Spinner data-testid="loading-spinner" animation="border" variant="info" />}
        {!loading && (
          <>
            <p data-testid="header-text">
              Choose a Star Wars character to retrieve some meta-data from{" "}
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
              className="App-select basic-single"
              classNamePrefix="select"
              name="characters"
              options={charactersData}
              onChange={setSelected}
              placeholder={"Luke Skywalker"}
            />
          </>
        )}
        {!!selected && (
          <Card className="App-card mt-5">
            <Card.Header>
              <strong>Name:</strong> {selected.name}
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Height:</strong> {selected.height} cm
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Weight:</strong> {selected.mass} kg
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Hair color:</strong> {selected.hair_color}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Eye color:</strong> {selected.eye_color}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Birth year:</strong> {selected.birth_year}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Gender:</strong> {selected.gender}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
