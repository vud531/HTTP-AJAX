import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      newFriend: {
        name: "",
        age: "",
        email: ""
      }
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
  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      const newFriend = state.newFriend;
      // console.log(newFriend);
      newFriend[name] = value;
      return {
        newFriend:newFriend
      }
    });


  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.newFriend)

    const newFriend = this.state.newFriend;
    axios.post('http://localhost:5000/friends', newFriend)
    .then(res => { 
      console.log(res.data)
      this.setState(state => {
        return {
          data: res.data,
          newFriend: {
            name: "",
            age: "",
            email: ""
          }
        }
      }) 
    })
    .catch(err => console.log(err));
    // this.setState(state => {
      
    // })
    
    // event.target

  }

  render() {
    return (
      <div className="App">
        <header className="Friend Form">
          <Form form={this.state.data}  
          handleFormSubmit={this.handleFormSubmit}
          newFriend={this.state.newFriend}
          handleInputChange={this.handleInputChange}
          />
        </header>
          <Friends friends={this.state.data}
          name={this.name}
          email={this.email}
          age={this.age}/>
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
  const { handleFormSubmit, handleInputChange, newFriend } = props;
  const { name, age, email } = newFriend;
  return (
    <form onSubmit={handleFormSubmit} >
      <input
      type="text" 
      name="name" 
      value={name} 
      onChange={handleInputChange}
      required/>
      <input 
      type="number" 
      name="age" 
      value={age} 
      onChange={handleInputChange}
      required/>
      <input 
      type="email" 
      name="email" 
      value={email} 
      onChange={handleInputChange}
      required/>

      <input name="submit" type="submit" value="Submit" />
    </form>
  )
}
