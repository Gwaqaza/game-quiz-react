import React from 'react';
import ReactDOM from 'react-dom';
import GameQuiz from './GameQuiz';

describe("Game Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GameQuiz />, div);
  });
});
