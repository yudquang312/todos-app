import React, { Component } from "react";
import active from "../../asset/images/active.svg";
import completed from "../../asset/images/completed.svg";
import remove from "../../asset/images/remove.svg";

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      inputStatus: false,
    };
  }

  // componentDidMount() {
  //     console.log(this.props.content);
  //     console.log("check point");
  //     if (this.state.inputStatus) {
  //         console.log(this.props.content);
  //         this.textInput.current.value = this.props.content;
  //         this.textInput.current.focus();
  //     }
  // }
  componentDidUpdate() {
    console.log("did update");
    if (this.state.inputStatus) {
      this.textInput.current.value = this.props.content;
      this.textInput.current.focus();
    }
  }

  //
  render() {
    let { checked, content, onDeleted, onChecked, index } = this.props;
    let { inputStatus } = this.state;
    return (
      <li className={"todo-item"}>
        <span onClick={() => onChecked(index)}>
          <img src={checked ? completed : active} alt="" />
        </span>
        {inputStatus ? (
          <input
            autoFocus
            ref={this.textInput}
            onKeyUp={this.onKeyUp}
            onBlur={this.onBlur}
          ></input>
        ) : (
          <label
            className={checked ? "text-completed " : ""}
            onDoubleClick={this.onDoubleClick}
          >
            {content}
          </label>
        )}

        <button onClick={() => onDeleted(index)}>
          <img src={remove} alt="" />
        </button>
      </li>
    );
  }

  onDoubleClick = (event) => {
    // console.log("double click");
    this.setState({
      inputStatus: true,
    });
  };

  onKeyUp = (event) => {
    if (event.keyCode === 13 || event.key === "Enter") {
      this.props.onEditItem(this.props.index, this.textInput.current.value);
      this.setState({
        inputStatus: false,
      });
    }
  };

  onBlur = (event) => {
    this.props.onEditItem(this.props.index, this.textInput.current.value);
    this.setState({
      inputStatus: false,
    });
  };
}
