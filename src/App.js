import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        email: "",
        message: "",
        subject: "react",
        agree: false,
        stateManage: "redux"
      },
      errors: {
        name: "",
        email: ""
      }
    }
  }

  render() {
    return (
      <div className="myForm">
        <form onSubmit={e => this.onSubmit(e)}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" placeholder="Text input"
              value={this.state.formData.name} 
              onChange={e => this.onFieldChange("name", e)}
              onBlur={e => this.validateField("name")} 
              />
          </div>
          {this.state.errors.name ? <p className="help is-danger">{this.state.errors.name}</p> :  null}
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="text" placeholder="Email input"
              value={this.state.formData.email} 
              onChange={e => this.onFieldChange("email", e)}
              onBlur={e => this.validateField("email")}  />
          </div>
          {this.state.errors.email ? <p className="help is-danger">{this.state.errors.email}</p> :  null}
        </div>

        <div className="field">
          <label className="label">Message</label>
          <div className="control">
            <textarea className="textarea" placeholder="Message input"
              value={this.state.formData.message} onChange={e => this.onFieldChange("message", e)} />
          </div>
        </div>

        <div className="field">
          <label className="label">Subject</label>
          <div className="control">
            <div className="select">
              <select value={this.state.formData.subject} onChange={e => this.onFieldChange("subject", e)}>
                <option value="">Please select</option>
                <option value="react">React JS</option>
                <option value="vue">Vue JS</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" checked={this.state.formData.agree}
               onChange={e => this.onFieldChange("agree", e, "checked")} />
              I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="radio">
              <input type="radio" name="question" value="redux" checked={this.state.formData.stateManage==="redux"}
              onChange={e => this.onFieldChange("stateManage", e)}/>
              Redux
            </label>
            <label className="radio">
              <input type="radio" name="question" value="mobx" checked={this.state.formData.stateManage==="mobx"} 
              onChange={e => this.onFieldChange("stateManage", e)}/>
              MobX
            </label>
          </div>
        </div>

        {/* button type default: submit */}
        {/* some else: type="reset" */}
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Submit</button>
          </div>
          <div className="control">
            <button className="button is-text" type="button">Cancel</button>
          </div>
        </div>
        </form>
      </div>
      
    );
  }

  onFieldChange(field, e, valueField) {
    // var value = e.target.value; or e.target.checked
    var value = e.target[valueField || "value"];
    
    this.setState({ formData: {
      ...this.state.formData,
      [field]: value
    }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.validateField()) {
      return;
    }
    console.log(this.state.formData);
  }

  validateField(field) {
    var errors = this.state.errors;

    if (!field || field === "name") {
      if (!this.state.formData.name) {
        errors.name = "Please input a name";
      } else {
        errors.name = null;
      }
    }
    if (!field || field === "email") {
      var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (this.state.formData.email && !re.test(this.state.formData.email)) {
        errors.email = "Invalid email";
      } else {
        errors.email = null;
      }
    }

    this.setState({errors: errors});

    for (var k in errors) {
      if (errors[k]) {
        return false;
      } 
    }
    return true;
  }
}

export default App;
