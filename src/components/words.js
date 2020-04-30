import React, { Component } from "react";

export default class Words extends Component {
  constructor(props) {
    super(props);
    this.words = [];
    this.state = { word: "" };
  }

  addWords = (word) => {
    this.words.push(word);
  };
  onTextChangeHandler = (event) => {
    this.setState((state) => {
      state.word = event.target.value;
      return state;
    });
  };
  onShowMeHandler = () => {
    this.setState({});
  };
  onAddHandler = (e) => {};
  render() {
    return (
      <div>
        <input type="text" name="word"></input>
        <br />
        <button onClick={this.onShowMeHandler}> Show mw the message</button>
        <button onClick={this.onAddHandler}>Add the word</button>
      </div>
    );
  }
}
