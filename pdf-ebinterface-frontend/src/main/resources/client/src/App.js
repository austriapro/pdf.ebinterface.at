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

    this.loadUser = this.loadUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

/*  componentDidMount + fetch written without lambda

    componentDidMount(){
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

  componentDidMount(){
    this.loadUser();
  }

// gets informations from server and renders the state component

    loadUser(){
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

   handleChange(e) {
     // target = html element -> triggers current event
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

            result.json().then(newUser =>{
            console.log("newUser ->>>>>>>>",newUser);
            const newUsersArray = this.state.users;
            console.log("newUsersAarray ->>>>>>>>>", newUsersArray);
            newUsersArray.push(newUser);

            this.setState({
              users: newUsersArray
              // users: this.state.users.push(this.state.newUser) doesn't work

            });
          })
        }
      })
  }

  handleDelete(e, item){
    e.preventDefault()

    const deleteUrl = "/api/dummy/" + item.uuid;
    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.loadUser();
        }
      })
    }

  render(){
    return <Mockup name={"Yes"}/>;

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

            {/**/}
          {this.state.users.map(item => {
            return (
              <tr key={item.uuid}>
                <td>{item.uuid}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                {/*Inline event triggers explicit for each item in the list*/}
                <td><button onClick={(e) => { this.handleDelete(e, item)} }>DELETE User</button></td>
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
              <br />
            <button  onClick={this.handleClick}>Save User</button>
             <br />
             <button  onClick={this.handleDelete}>Delete User</button>
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
