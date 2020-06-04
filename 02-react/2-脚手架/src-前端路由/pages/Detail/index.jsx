import React, { Component } from "react";

export default class Detail extends Component {
  render() {
      console.log(this.props.location);
      
    return <div>Hello Detail</div>;
  }
}
