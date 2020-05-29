import React from 'react';
// import FuncComp from './pages/FuncComp';
// import ClassComp from './pages/ClassComp';
class App extends React.Component{
    // render(){
    //     return(
    //         <div>
    //             <h1>App</h1>
    //             <FuncComp />
    //             <ClassComp />
    //         </div>
    //     )
    // }
    state = {
        isLoveMe: false,
    }
    handleClick = () => {
        const {isLoveMe} = this.state;
        this.setState({
            isLoveMe: !isLoveMe,
        });
    }
    render(){
        console.log("render()");
        const {isLoveMe}  = this.state
        return (
        <h1 onClick={this.handleClick}>{isLoveMe ? "我爱你" : "你爱我"}</h1>
        )
    }

}
export default App;