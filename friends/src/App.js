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
    });
  }
  render() {
    return (
      <div className="App">
        <header className="Friends List">
          <Friends friends={this.state.data}/>
        </header>
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
