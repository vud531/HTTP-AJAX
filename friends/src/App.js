import React, { Component } from 'react';
import axios from 'axios';
// import  from 'react-router-dom';
// import { NavLink, Link, Route } from 'react-router-dom';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
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
            id: null,
            name: "",
            age: "",
            email: ""
          },
          edittingFriend: null
        }
      }) 
    })
    .catch(err => console.log(err));
    

  }


  updateFriend = event => {
    event.preventDefault();
    const newFriend = this.state.newFriend;
    axios.post('http://localhost:5000/friends/' + this.state.friend.id, newFriend)
    .then(res => { 
      console.log(res.data)
      this.setState(state => {
        return {
          data: res.data,
          newFriend: {
            id: null,
            name: "",
            age: "",
            email: ""
          }
        }
      }) 
    })
    .catch(err => console.log(err));
  }


  handleFriendClick = event => {
    console.dir(event.target);
    const id = event.target.id;
    this.setState(state => {
      const friend = state.data[id-1];
      return {
        newFriend: friend
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="Friend Form">
          <Form data={this.state.data}  
          handleFormSubmit={this.handleFormSubmit}
          updateFriend={this.updateFriend}
          newFriend={this.state.newFriend}
          handleInputChange={this.handleInputChange}
          />
        </header>
          <Friends friends={this.state.data}
          name={this.name}
          email={this.email}
          age={this.age}
          handleFriendClick={this.handleFriendClick}/>

          {/* <Route path='/friends/:id' render={props => <Form 
          handleFormSubmit={this.handleFriendUpdate}
          handleInputChange={this.handleInputChange}
          {...props} /> }/> */}
      </div>
    );
  }
}

export default App;


export const Friends = props => {
  // console.log(props);
  return (
    <ul>
      {props.friends.map(friend => (
        <li key={friend.name} id={friend.id} > 
          <button id={friend.id} onClick={props.handleFriendClick}>Edit Friend</button>
          <p>{friend.name}</p>
          <p>{friend.age}</p>
          <p>{friend.email}</p>
        </li>
      ))}
    </ul>
  )
}

export const Form = props => {

  // console.log(props);
  // if(!newFriend) {
    
  // }
  const { handleFormSubmit, handleInputChange, newFriend, updateFriend } = props;
  const { id, name, age, email } = newFriend;
  return (
    <form onSubmit={id ? updateFriend : handleFormSubmit } >
      {id ? <input type="number" name="id" value={id} readOnly /> : <></>}
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


