import React from "react";
import PubSub from "pubsub-js";
import ReactDOM from "react-dom";
import context from "./context";
export default function Hooks() {
  const defaultValue = useContext(context);
  const [count, setCount] = useState(defaultValue);
  const [num, setNum] = useState(0);
  // const handleClick = () => {
  //     setCount(count + 1)
  // }
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  const handleClick2 = () => {
    setNum(num + 1);
  };
  return (
    <div>
      <p>点击次数:{count}</p>
      <button onClick={handleClick}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
    </div>
  );
}
// export default function Hooks(props) {
//   const [count, setCount] = React.useState(0);
//   const handleClick = () => {
//     setCount(count + 1);
//   };
//   React.useEffect(() => {
//     console.log("useEffect调用了");
//     setTimeout(() => {
//       setCount(10);
//     }, 1000);
//     PubSub.subscribe("MSG", (msg, data) => {});
//     return () => {
//       PubSub.unsubscribe("MSG");
//     };
//   }, []);
//   const goDie = () => {
//     ReactDOM.unmountComponentAtNode(document.getElementById("root"));
//   };
//   return (
//     <div>
//       <p>点击次数：{count}</p>
//       <button onClick={handleClick}>点击</button>
//       <button onClick={goDie}>卸载组件</button>
//     </div>
//   );
// }
