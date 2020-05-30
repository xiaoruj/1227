// console.log(123); console.log("hello vue cli")();
import React, { Component } from "react";
import PubSub from "pubsub-js";
import Child from "./Child";
export default class App extends Component {
  handleClick = () => {
    console.log('App组件发送了数据');
    PubSub.publish('RECEIVE_DATA', '我喜欢你')
  }
  render(){
    return (
      <div>
        App
        <button onClick={this.handleClick}>点击按钮向子组件传递数据</button>
        <Child />
      </div>
    )
  }
}
