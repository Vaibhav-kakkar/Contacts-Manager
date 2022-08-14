import React from "react";
import { Link, withRouter } from "react-router-dom";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email } = props.location.state.contact;
    this.state = {
      id,
      name,
      email,
    };
  }
  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All fields are mandatory");
      return;
    }
    this.props.updateContactHandler(this.state); //Passing state to appjs
    this.setState({ name: "", email: "" });
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h2>
          Edit Contact
          <Link to="/">
            <button className="ui button blue" style={{ float: "right" }}>
              Contacts
            </button>
          </Link>
        </h2>

        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <button className="ui button blue">Update</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Edit);
