import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import B from './B'
export default class A extends Component {
    static propTypes = {
        render: PropTypes.func.isRequired
    }
    state = {
        count: 1,
    }
    render() {
        return (
            <div>
                A
                {/* <B count={this.state.count} /> */}
                {this.props.render(this.state.count)}
            </div>
        )
    }
}
