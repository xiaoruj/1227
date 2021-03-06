import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Detail from "../Detail";
export default class Messages extends Component {
  push = () => {
    this.props.history.push("/home/message/5", { name: jack });
  };
  replace = () => {
    this.props.history.replace("/home/message/3");
  };
  goForward = () => {
    this.props.history.goForward();
  };
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <>
        <ul>
          <li>
            {/* 路由导航链接 */}
            <Link to="/home/message/1">message001</Link>
          </li>
          <li>
            <Link to="/home/message/3">message003</Link>
          </li>
          <li>
            <Link to="/home/message/5">message005</Link>
          </li>
        </ul>
        <button onClick={this.push}>添加</button>
        <button onClick={this.replace}>替换</button>
        <button onClick={this.goForward}>前进</button>
        <button onClick={this.goBack}>后退</button>
        <Route path="/home/message/:id" component={Detail} />
      </>
    );
  }
}
