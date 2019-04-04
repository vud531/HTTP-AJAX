import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    axios
    .get('http://localhost:5000/friends')
    .then(res => {
      console.log(res);
      this.setState({ data: res.data });
    })
    .catch(err => {
      console.log(err);
    })
    .then(() => {
      console.log("cool")
    });
  }

  formSubmitHandler(e) {

  }

  render() {
    return (
      <div className="App">
        <header className="Friend Form">
          <Form form={this.state.data}/>
        </header>
          <Friends friends={this.state.data}
          formSubmitHandler={this.formSubmitHandler}/>
      </div>
    );
  }
}

export default App;


export const Friends = props => {
  console.log(props);
  return (
    <ul>
      {props.friends.map(friend => (
        <li key={friend.id}>
          <p>{friend.name}</p>
          <p>{friend.age}</p>
          <p>{friend.email}</p>
        </li>
      ))}
    </ul>
  )
}

export const Form = props => {
  console.log(props);
  // const { name, age, email } = props;
  return (
    <form onSubmit={props.formSubmitHandler}>
      <input name="name" />
      <input name="age" />
      <input name="email" />

      <button type="submit">Submit</button>
    </form>
  )
}
