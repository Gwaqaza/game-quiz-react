import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GameQuiz from './GameQuiz';
Enzyme.configure({ adapter: new Adapter() });


const state = {
  turnData: {
    books: ['The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Macbeth'],
    author: {
      name: 'Charles Dickens',
      imageUrl: 'images/author/charlesdickens.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['David Copperfield', 'A Tale of Two Cities']
    },
  },
  highlight: 'none'
}

describe("Game Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GameQuiz { ...state } onAnswerSelected={() => {}} />, div);
  });

  describe("When no answer has been selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<GameQuiz { ...state } onAnswerSelected={() => {}} />);
    });

    it("should not have a background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    });
  });

  describe("When wrong answer has been selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<GameQuiz { ...Object.assign({}, state, { highlight: 'wrong'}) } onAnswerSelected={() => {}} />);
    });

    it("should have a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
    });
  });

  describe("When correct answer has been selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<GameQuiz { ...Object.assign({}, state, { highlight: 'correct'}) } onAnswerSelected={() => {}} />);
    });

    it("should have a green background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
    });
  });

  describe("When first answer is selected", () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();

    beforeAll(() => {
      wrapper = mount(<GameQuiz { ...state } onAnswerSelected={ handleAnswerSelected } />);
      wrapper.find('.answer').first().simulate('click');
    });

    it("onAnswerSelected should be called", () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("should receive The Shining", () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith('The Shining');
    });
  });
});
