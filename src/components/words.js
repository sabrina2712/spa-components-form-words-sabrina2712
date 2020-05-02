import React, { Component } from "react";
import "./words.css";

export default class Words extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: "",
      words: [],
      errorMessage: "",
      isShowButtonClicked: false,
      index: 0,
      isPaused: false,
    };
  }

  addWords = (word) => {
    if (word.length < 1) {
      return;
    }

    this.setState((state) => {
      let words = state.words;
      words.push(word);
      return { words: words, word: "" };
    });
  };
  onTextChangeHandler = (event) => {
    let text = event.target.value;
    this.setState((state) => {
      state.word = text;
      return state;
    });
  };
  onShowMeHandler = () => {
    if (this.state.words.length < 3) {
      this.setState({ errorMessage: "please enter three" });
      return;
    }
    this.setState({ errorMessage: "", isShowButtonClicked: true });

    this.interval = setInterval(() => {
      this.setState((state) => {
        let index = state.index;
        index++;
        if (index >= this.state.words.length) {
          clearInterval(this.interval);

          return { isShowButtonClicked: false, index: 0, words: [] };
        }
        return { errorMessage: "", isShowButtonClicked: true, index: index };
      });
    }, 1000);
  };
  onAddHandler = () => {
    this.addWords(this.state.word);
  };

  errorMessage = () => {
    if (!this.state.errorMessage) {
      return null;
    }
    return <div>{this.state.errorMessage}</div>;
  };

  messages = (index) => {
    let placeholder = "I am a ";
    return (
      <div className="main-msg-container">
        <div className="message-box">
          <div className="message-holder">
            <span>{placeholder}</span>
            <span className="span-msg">{this.state.words[index]}</span>
          </div>
          <button onClick={this.pauseHandler}>
            {this.state.isPaused === false ? "Pause" : "Resume"}
          </button>
        </div>
        <div className="message-item">
          {this.state.words.map((word, i) => {
            let cls = "message-word";
            if (i === index) cls += " selected";
            return <div className={cls}>{word}</div>;
          })}
        </div>
      </div>
    );
  };

  wordEntry = () => {
    return (
      <div>
        {" "}
        <div>Add Words</div>
        <input
          className="text-area"
          id="inputText"
          type="text"
          name="word"
          value={this.state.word}
          onChange={this.onTextChangeHandler}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.shiftKey) {
                this.onShowMeHandler();
              } else {
                this.onAddHandler();
              }
            }
          }}
        />
        {this.errorMessage()}
        <br />
        <button className="show-button" onClick={this.onShowMeHandler}>
          {" "}
          Show me the message
        </button>
        <button
          className="add-button"
          disabled={this.state.word.length < 1}
          onClick={this.onAddHandler}
          onChange={this.addItem}
        >
          Add New Words ({this.state.words.length})
        </button>
        <div className="container">
          {this.state.words.map((word, i) => (
            <div className="item-word">
              {word}
              <span
                className="span"
                onClick={() => {
                  this.removeWord(i);
                }}
              >
                x
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  addItem = (e) => {
    this.setState({
      words: [e.target.value, ...this.state.words],
    });
  };

  removeWord = (index) => {
    this.setState((state) => {
      let currentWords = state.words;
      currentWords.splice(index, 1);
      return { words: currentWords };
    });
  };
  pauseHandler = () => {
    if (this.state.isPaused === false) {
      clearInterval(this.interval);
      this.setState({
        isPaused: true,
      });
    } else {
      this.setState({
        isPaused: false,
      });
      this.onShowMeHandler();
    }
  };

  render() {
    return (
      <div className="main-container">
        <div className="text-container">
          {this.state.isShowButtonClicked
            ? this.messages(this.state.index)
            : this.wordEntry()}
        </div>
      </div>
    );
  }
}
