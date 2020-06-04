import React, { Component } from "react";

export default function withForm(title) {
  return function (WrappedComponent) {
    return class extends Component {
      static displayName = `Form(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
      })`;
      handleChange = (key) => {
        return (e) => {
          this.setState({
            [key]: e.target.value.trim(),
          });
        };
      };
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
      };
      render() {
        return (
          <>
            <h1>{title}</h1>
            <WrappedComponent
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </>
        );
      }
    };
  };
}
