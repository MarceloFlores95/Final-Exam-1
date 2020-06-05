import React from 'react';

/*
function displayBook (event) {
    event.preventDefault()
  }
*/
function BookForm( props ){
    return(
        <div>
            <form >
                <label>Search for a book:</label>
                <input type = "text"></input>
                <input id = 'bookName' type= "submit"></input>
            </form>
        </div>
    );
}

export default BookForm;