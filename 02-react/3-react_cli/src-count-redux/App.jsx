import React, { Component } from "react";
// import {Button, message} from 'antd'
// import 'antd/dist/antd.min.css'
import store from "./redux/store";
import { increment, decrement } from "./redux/actions";
export default class App extends Component {
  state = {
    count: 0,
    number: 1,
  };
  handleChange = (e) => {
    this.setState({
      number: +e.target.value,
    });
  };
  increment = () => {
    const { number } = this.state;
    const action = increment(number);
    store.dispatch(action);
  };
  decrement = () => {
    const { number } = this.state;
    store.dispatch(decrement(number));
  };
  incrementIfOdd = () => {
    const count = store.getState;
    if (count & 1) {
      const { number } = this.state;
      store.dispatch(increment(number));
    }
  };
  incrementAsync = () => {
    setTimeout(() => {
      const { number } = this.state;
      store.dispatch(increment(number));
    }, 1000);
  };
  render() {
    const count = store.getState();
    return (
      <>
        <p>click {count} times</p>
        <select onChange={this.handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementIfOdd}>increment if odd</button>
        <button onClick={this.incrementAsync}>increment async</button>
      </>
    );
  }
}
