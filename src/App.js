import React from "react"; // have to do this for every project
import Titles from "./components/Titles"; // Import titles.js 
import Form from "./components/Form"; // Import Form.js
import Weather from "./components/Weather"; // Import Weather.js
import { tsUndefinedKeyword } from "@babel/types";

const API_KEY = "38358b62a57ba5c4cda581381e62de93"; // API key from opensourceweather 

// Creating an instance of App extending React.Component from the node_modules
class App extends React.Component {
    // Object that contains key value pairs
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }
    // getWeather method that contains an arrow function to call the api 
    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
        const data = await api_call.json();// convert api_call to json
        console.log(data);
        if (city && country) {
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            })

        } else {
            this.setState({
                temperature:undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter a valid City and Country."
            })

        }
         
    }
    render() { // returns jsx... react and babel work behind the scenes to convert this
        return ( // can only return one parent element (one div etc. can have anything within it)
            <div>
                <div className="wrapper">
                    
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Titles />
                                </div>
                                <div className="col-xs-7 form-container">
                                <Form getWeather={this.getWeather}/> 
                                <Weather temperature={this.state.temperature} 
                                city={this.state.city}
                                country={this.state.country}
                                humidity={this.state.humidity}
                                description={this.state.description}
                                error={this.state.error} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        );
    }
};


export default App; // tells the file to make the component available for other files to import (for index.js in this case)
