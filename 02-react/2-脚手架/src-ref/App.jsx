import React from "react";
// import Child from "./pages/Child";
// import FuncComp from './pages/FuncComp';
// import ClassComp from './pages/ClassComp';
class App extends React.Component {
  inputRef = React.createRef();
  handleClick = () => {
    const value = this.inputRef.current.value.trim();
    alert(value);
  };
  handleBlur = (e) => {
    alert(e.target.value.trim());
  };
  render() {
    return (
      <div>
        <input type="text" placeholder="请输入内容" ref={this.inputRef} />
        <button onClick={this.handleClick}>点击提示数据</button>
        <input
          type="text"
          placeholder="失去焦点提示数据"
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}
export default App;
