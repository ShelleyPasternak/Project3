import React, { Component } from "react";
import "./style.css";

class PetForm extends Component {
  // Setting the component's initial state
  state = {
    PetName: "",
    dateOfBirth: "",
    Notes: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (!this.state.PetName) {
      alert("Create Your Pet Profile Now!");
    } 

    this.setState({
      PetName: "",
      Age: "",
      Notes: ""
    });
  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
        <p>
          Start Your Pet Profile Here!
        </p>
        <form className="petform">
          <input
            value={this.state.PetName}
            name="PetName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Pet Name"
          />
          <input
            value={this.state.dateOfBirth}
            name="dateOfBirth"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Pet's Date of Birth"
          />
          <input
            value={this.state.Notes}
            name="Notes"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Notes"
          />

          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default PetForm;