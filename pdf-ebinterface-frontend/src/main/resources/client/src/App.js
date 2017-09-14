import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Mockup from "./Mockup";

import './wkostyle.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: null,
      loading: true,
      newUser: {
        name: '',
        email: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    fetch("/api/dummies/")
      .then(response => {
        if (response.status === 200) {
          response.json().then(users => {
          console.log(users);
            this.setState({
              users: users,
              loading: false,
              error: null,
            })
          });
        }
      });
  }

/*  componentDidMount(){
    let $component = this;
    fetch("/api/dummies/")
      .then(function(response) {
        if (response.status === 200) {
          response.json().then(function(users){
            console.log(users);
            $component.setState({
              users: users,
              loading: false,
              error: null,
            })
          });
        }
        else{}
      });
  }*/


   handleChange(e) {
    const etarget = e.target;
    // the name of the currently edited input field
    const fieldName = etarget.name;
    // the value of the currently edited input field
    const value = etarget.value;

    console.log('fieldName', fieldName);
    console.log('value of field', value);
    console.log("newUser", this.state.newUser);
    const tempUser = this.state.newUser;
    tempUser[fieldName] = value;
    console.log("newUserchanged", tempUser);

    this.setState ({
      newUser: tempUser
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log('click state', this.state);
    console.log("name und mail", );

    fetch("/api/dummy/", {
      method: "POST",
      body: JSON.stringify(this.state.newUser),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(result => {
        if (result.status === 200) {
          
        }
        const newUsersArray = this.state.users;
        newUsersArray.push(this.state.newUser);
        this.setState({
          users: newUsersArray
          // users: this.state.users.push(this.state.newUser) doesnt work
        });
        }

      )
  }

  render(){
  //  return <Mockup name={"Yes"}/>;

    if (this.state.loading === true) {
      return (
        <div>Loading...</div>
      )}

    else if (this.state.loading === false) {

      console.log('users is', this.state.users);
      return (
        <div>
          <table>
            <thead>
            <tr>
              <th>UID</th>
              <th>Name</th>
              <th>eMail</th>
            </tr>
            </thead>
            <tbody>

          {this.state.users.map(item => {
            return (
              <tr key={item.uuid}>
                <th>{item.uuid}</th>
                <th>{item.name}</th>
                <th>{item.email}</th>
              </tr>
//              <div key={item.uuid}>{JSON.stringify(item)}</div>
            )
          })}
            </tbody>
          </table>

           <form>
            <label>
              Name
              <input type="text" name="name" onChange={this.handleChange} value={this.state.newUser.name}/>
            </label>
            <label>
              eMail
              <input type="text" name="email" onChange={this.handleChange} value={this.state.newUser.email}/>
            </label>

            <button  onClick={this.handleClick}>Save User</button>
           </form>
        </div>
      )}

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }


}

export default App;
