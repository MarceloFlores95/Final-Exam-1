import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      /*
        Your code goes here
      */
     book: [],
     fetchBook: this.problem,
     bookName: 'Prueba'
    }
  }

  problem = () => {
    let term = 'Harry Potter'
    let url = ` https://www.googleapis.com/books/v1/volumes?q=${term} `

    let settings = {
      method : 'GET'
    }

    fetch (url, settings)
    .then( response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error ("Err")
    })
    .then(responseJSON => {
      console.log(responseJSON)
    })
    .catch(err => {
      console.log(err)
    })

   
  }

  render(){
    return(
      <div>
        <BookForm displayBook = {this.bookName}></BookForm>
      </div>
    )
  }

}

export default App;
