import React from "react";
import Child from "./pages/Child";
// import FuncComp from './pages/FuncComp';
// import ClassComp from './pages/ClassComp';
class App extends React.Component {
  state = {
    person: {
      name: "李易峰",
      age: 33,
      sex: "男",
    },
  };
  updatePerson = (person) => {
    this.setState({
      person,
    });
  };
  render() {
    const { person } = this.state;
    return (
      <div>
        <h1>App</h1>
        <Child {...person} updatePerson={this.updatePerson} />
      </div>
    );
  }
}
export default App;
