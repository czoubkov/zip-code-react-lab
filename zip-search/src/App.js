import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div className="card" style="width: 18rem;">
    <div className="card-body">
      <h3 class="card-title">{props.data.City}, {props.data.State}</h3>
      <ul>
        <li>Population: {props.data.EstimatedPopulation}</li>
        <li>Location: ({props.data.Lat}, {props.data.Long})</li>
      </ul>
    </div>
  </div>
  );
}

function Zip(props) {
  return (
    <span>{props.data}, </span>
  );
}

function ZipSearchField(props) {
  return (
    <div>
      Zip Code:
      <input type="text" onChange={ props.zipChanged } value={ props.zipValue }/>
      <p>You entered: { props.zipValue }</p>
    </div>);
}

function CitySearchField(props) {
  return (
    <div>
      City Name:
      <input type="text" onChange={ props.cityChanged } value={ props.cityValue }/>
      <p>You entered: { props.cityValue }</p>
    </div>
  )
}

class App extends Component {
  state = {
    inputZip: "",
    cityResults: [],
    inputCity: "",
    zipResults: []
  }

  handleZipChange(event) {
    this.setState({
      inputZip: event.target.value
    })

    if(event.target.value.length === 5) {
      fetch('https://ctp-zip-api.herokuapp.com/zip/' + event.target.value)
        .then(res => res.json())
        .then(jsonData => {
          this.setState({
            cityResults: jsonData,
          })
        })
        .catch(err => {
          this.setState({ cityResults: [] })
        })
    } else {
      this.setState({ cityResults: [] })
    }
  }

  handleCityChange(event) {
    this.setState({
      inputCity: event.target.value
    })

    fetch('https://ctp-zip-api.herokuapp.com/city/' + event.target.value.toUpperCase())
      .then(res => res.json())
      .then(jsonData => {
        this.setState({
          zipResults: jsonData,
        })
      })
      .catch(err => {
        this.setState({ zipResults: [] })
      })
  }

  render() {
    // Zip code search returns city results
    console.log(this.state.cityResults);
    // City search returns zip code results
    console.log(this.state.zipResults);

    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(e) => this.handleZipChange(e)} zipValue={this.state.inputZip} />
        <div>
          { this.state.cityResults.map((item, index) => {
            return <City data={item} key={index}/>
          }) }
        </div>
        <CitySearchField cityChanged={(e) => this.handleCityChange(e)} cityValue={this.state.inputCity} />
        <div>
          { this.state.zipResults.map((item, index) => {
            return <Zip data={item} key={index}/>
          }) }
        </div>
      </div>
    );
  }
}

export default App;
