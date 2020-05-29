# 引入

1. react.js: React 的核心库
<script src="./js/react.development.js"></script>
2. react-dom.js: 提供操作 DOM 的 react 扩展库
<script src="./js/react-dom.development.js"></script>
3. babel.min.js: 解析 JSX 语法代码转为纯 JS 语法代码的库
   <script src="./js/babel.min.js"></script>
   注意先引入 react 库，在引入 react-dom，babel 用来做编译，语法转换

# 构建 react

1. 创建虚拟 DOM 对象
2. 将虚拟 DOM 对象渲染到页面指定容器中
   ReactDOM 提供一个声明式语法 render()渲染
   ReactDOM.render(vDom, document.getElementById("root"));

# jsx 语法

    JavaScript XML
    JSX语法浏览器时不识别，所以需要引入babel来编译 如果用jsx就要在<script>里面加type="text/babel"
    对比js
    const vDom = <h1>hello react</h1>;jsx，会返回一个对象
    const vDom1 = '<h1>hello react</h1>' js,标签字符串

1.  以<开头，<>如果里面是 html 元素，最终会被解析成 html 元素，如果不是，会特殊解析例如<h1>
2.  （JSX 语法内）以{开头，{}里面代码就会当做 JS 代码解析
    注意 {JS 表达式},如果是纯文本就用""直接写就行,如果是变量就要用{}
    作用：创建虚拟 DOM 对象
    JSX 语法最终都会经过 babel 编译，编译上面的 JS 语法

# 定义组件

1. 组件名首字母必须大写
   原因是：
   JSX 一旦标签 <myComponent1 /> 首字母小写就会当做 html 元素解析，
   但是 html 中没有 myComponent1 这个元素就会报错
   所以首字母大写 <MyComponent1 />，就会当做组件解析
   内部会判断是工厂函数还是 ES6 类组件
2. 内部返回虚拟 DOM 对象元素必须有结束符
   单标签自结束标签或者双标签
3. 内部返回多个虚拟 DOM 对象，必须有且有一个根标签

# 工厂函数组件和 ES6 类组件的区别

1. this 不一样
   工厂函数没有 this undefined
   ES6 类组件函数中有 this this指向ES6类组件实例对象
2. 功能不一样
   因为工厂函数没有 this，有些功能默认实现不了
   因为 ES6 类组件有 this，所以可以实现

# 在React绑定事件
    采用小驼峰命名法
# ES6类组件 实例对象三大属性 state 状态
    作用：用来更新用户界面
    使用 
       1. 初始化状态
        constructor() {
          super();
          this.state = { xxx }
        }
        简写state = {xxx} 
       2. 读取状态  this.state.xxx 
       3. 更新状态  this.setState({ xxx })
# 在React 类组件中，this指向：
1. 如果是生命周期函数中，this指向组件实例对象 constructor / render
2. 如果在其他自定义函数中，this默认指向undefined（严格模式）
    需求: 需要将 其他自定义函数 this 指向组件实例对象
    解决：用箭头函数
# ES6类组件 实例对象三大属性props
    import PropTypes from "prop-types"用来对props类型检查的库
    对传入的props进行类型/必要性检查
    读取props
    class 定义类
    extends 继承
    constructor 类的构造方法
    super() 调用父类的构造方法 / super.xxx() 调用父类的xxx方法
    static 定义类的静态方法
    （类的直接方法，只有类可以使用，实例对象不能使用）
    普通方法是实例对象可以使用，类不能使用