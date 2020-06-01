import React, { Component } from "react";
import personContext from "./context";
export default class Son extends Component {
  static contextType = personContext;
  handleClick = () => {
    console.log(this.context);
  };
  render() {
    return (
      <>
        <h3 onClick={this.handleClick}>Son</h3>
        <personContext.Consumer>
          {(person) => {
            console.log(person);
            const { name, age } = person;
            return (
              <ul>
                <li>姓名：{name}</li>
                <li>年龄：{age}</li>
              </ul>
            );
          }}
        </personContext.Consumer>
      </>
    );
  }
}
