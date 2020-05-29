import React, { Component } from "react"
class ClassComp extends Component{
    render(){
        console.log("ES6类组件", this);
        return <h1>ES6类组件</h1>
    }
}
export default ClassComp