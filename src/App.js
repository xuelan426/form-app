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
    /*
    下面有好多处引用都用到了 formData和error时，可以尝试先将它们保存成变量，用起来就更加方便
    var formData = this.state.formData;
    var errors = this.state.errors;

    此外如果你学过ES6，可以直接使用
    PS: 我看你下面使用了一句ES6的语法: `{...this.state.formData, [field]: ...}`
    const { formData, errors } = this.state;
    没学过的话，上面这句忽略，我们会在下一个阶段重点学习ES6
    它可以让编写js更加高效和健壮。
    */

    /* 目前我们的class命名习惯用中划线连接的小写英文单词，比如 my-form */
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

    // 这里使用了ES6语法很好哦，不过可以格式化成更好读的形式，比如
    /*
    const formData = { ...this.state.formData, [field]: value };
    this.setState({ formData });
    */

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
      var re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
