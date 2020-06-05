import React, { Component } from "react";
// import {Button, message} from 'antd'
// import 'antd/dist/antd.min.css'
import { connect } from "react-redux";
import { increment, decrement, incrementAsync } from "./redux/actions";
@connect(
  (state) => ({
    count: state,
  }),
  { increment, decrement, incrementAsync }
)
class App extends Component {
  state = {
    number: 1,
  };
  handleChange = (e) => {
    this.setState({
      number: +e.target.value,
    });
  };
  increment = () => {
    const { number } = this.state;
    this.props.increment(number);
  };
  decrement = () => {
    const { number } = this.state;
    this.props.decrement(number);
  };
  incrementIfOdd = () => {
    const { count } = this.props;
    if (count & 1) {
      const { number } = this.state;
      this.props.increment(number);
    }
  };
  incrementAsync = () => {
    const { number } = this.state;
    this.props.incrementAsync(number);
  };
  render() {
    const count = this.props;
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
export default App;
