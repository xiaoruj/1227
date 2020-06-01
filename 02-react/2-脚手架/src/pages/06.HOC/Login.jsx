import React, { Component } from "react";
import withForm from "./withForm";
class Login extends Component {
//   state = {
//     username: "",
//     password: "",
//   };
//   handleChange = (key) => {
//     return (e) => {
//       this.setState({
//         [key]: e.target.value.trim(),
//       });
//     };
//   };
//   handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(this.state);
//   };
  render() {
    const { handleChange, handleSubmit } = this.props;
    return (
      <>
        <h1>登录页面</h1>
        <form onSubmit={handleSubmit}>
          用户名:
          <input type="text" onChange={handleChange("username")} /> <br />
          密码：
          <input type="password" onChange={handleChange("password")} />
          <br />
          <button type="submit">登录</button>
        </form>
      </>
    );
  }
}
const NewLogin = withForm(Login);
export default NewLogin;
