import React, { Component } from "react";
import PostGameModal from "./PostGameModal";

export class PlayAgain extends Component {
  render() {
    return (
      <div className="battle-text-content">
        <p id="play-again-text" onClick={() => this.props.handlePlayAgain()}>
          Click here to return to the Main Menu!
        </p>
      </div>
    );
  }
}

export default PlayAgain;
