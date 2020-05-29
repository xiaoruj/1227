import React from 'react';
function FuncComp(){
    console.log("工厂函数", this);
    return <div>FuncComp</div>
}
export default FuncComp