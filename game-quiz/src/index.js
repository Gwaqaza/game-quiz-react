import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { shuffle, sample } from 'underscore';

import './index.css';
import GameQuiz from './GameQuiz';
import reportWebVitals from './reportWebVitals';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/author/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: '',
    books: ['The Adventures of Huckleberry Fin']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/author/josephconrad.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: '',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K Rowling',
    imageUrl: 'images/author/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Happy Potter and the Sorcerers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/author/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/author/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/author/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, [])
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) => 
      author.books.some((title) => 
        title === answer))
  }
}

const state = {
  turnData: getTurnData(authors),
  highlight: ''
};

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function AddAuthorForm({ match }) {
  return <div>
    <h1>Add Author</h1>
    <p>{JSON.stringify(match)}</p>
  </div>
}

function App() {
  return <GameQuiz { ...state } onAnswerSelected={ onAnswerSelected }/>
}

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={ App } />
        <Route exact path="/add" component={ AddAuthorForm } />
      </React.Fragment>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
render();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
