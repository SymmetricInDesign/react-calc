import React from 'react'

class OperationIndicator extends React.Component{
    // constructor(props){
    //     super(props)
    // }

    render(){
        const {operation} = this.props
        return <div id="operation-indicator">{operation}</div>
    }
}

export default OperationIndicator