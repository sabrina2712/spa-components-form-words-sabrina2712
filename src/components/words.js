import React, { Component } from "react";

export default class Words extends Component {
  constructor(props) {
    super(props);
    this.words = [];
    this.state = { word: "", showWords: this.words, errorMessage: "" };
  }

  addWords = (word) => {
    if (word.length < 1) {
      return null;
    } else this.words.push(word);
  };
  onTextChangeHandler = (event) => {
    let text = event.target.value;
    this.setState((state) => {
      state.word = text;
      return state;
    });
  };
  onShowMeHandler = () => {
    if (this.words.length < 3) {
      this.setState({ errorMessage: "please enter three" });
    }
  };
  onAddHandler = (e) => {
    this.addWords(this.state.word);
    this.setState({ word: "" });
  };

  errorMessage = () => {
    if (!this.state.errorMessage) {
      return null;
    }
    return <div>{this.state.errorMessage}</div>;
  };
  render() {
    return (
      <div>
        <input
          id="inputText"
          type="text"
          name="word"
          value={this.state.word}
          onChange={this.onTextChangeHandler}
        />

        {this.errorMessage()}
        <br />
        <button onClick={this.onShowMeHandler}> Show me the message</button>
        <button
          disabled={this.state.word.length < 1}
          onClick={this.onAddHandler}
        >
          Add Words
        </button>
      </div>
    );
  }
}
