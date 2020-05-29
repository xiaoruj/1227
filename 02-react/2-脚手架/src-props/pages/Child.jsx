import React, {Component} from 'react';
import PropTypes from 'prop-types';
export default class Child extends Component{
    static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number,
        sex: PropTypes.string,
        updatePerson: PropTypes.func.isRequired
    }
    static defaultProps = {
        age: 18,
        sex: "女"
    }
    update = () => {
        this.props.updatePerson({
            name:'杨紫',
            age: 28,
            sex: '女'
        })
    }
    render(){
        const {name, age, sex} = this.props
        return (
            <div>
                <h2 onClick={this.update}>Child</h2>
                <ul>
                    <li>姓名:{name}</li>
                    <li>年龄:{age}</li>
                    <li>性别:{sex}</li>
                </ul>
            </div>
        )
    }
}