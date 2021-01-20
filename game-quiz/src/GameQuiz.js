import React from 'react';
import PropTypes from 'prop-types'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Hero() {
  return(
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>The Game Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

function Turn({author, books, highlight, onAnswerSelected}) {
  function highlightBgColor(highlight) {
    const mapping = {
      none: '',
      correct: 'green',
      wrong: 'red'
    }
    return mapping[highlight];
  }
  return(
    <div className="row turn" style={{backgroundColor: highlightBgColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authimage" alt="author"/>
      </div>
      <div className="col-6">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/>)}
      </div>
    </div>
  );
}
Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlight: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
}

function Continue() {
  return(
    <div></div>
  );
}

function Footer() {
  return(
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are from Wikemedia Commons and are in the public domain.
        </p>

      </div>
    </div>
  );
}

function Book({title, onClick}) {
  return(
    <div className="answer" onClick={() => {onClick(title)}}>
      <h4>{title}</h4>
    </div>
  );
}

function GameQuiz({turnData, highlight, onAnswerSelected}) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
      <Continue />
      <Footer />
    </div>
  );
}

export default GameQuiz;
