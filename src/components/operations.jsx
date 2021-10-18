import React from 'react'

class OperationsContainer extends React.Component{

    render(){
        const { clear, updateOperation, backspace, executeStandaloneOperation, submit } = this.props
        return (
            <div id="operations">
                {/* operations and functions */}
                <div className="operation button" onClick={ submit }><p>=</p></div>
                <div className="operation button" onClick={ updateOperation }><p>÷</p></div>
                <div className="operation button" onClick={ updateOperation }><p>x</p></div>
                <div className="operation button" onClick={ updateOperation }><p>+</p></div>
                <div className="operation button" onClick={ updateOperation }><p>-</p></div>

                <div className="operation button" onClick={ clear }><p>CE</p></div>
                <div className="operation button" onClick={ updateOperation }><p>^</p></div>
                <div className="operation button" onClick={ executeStandaloneOperation }><p>sin</p></div>
                <div className="operation button" onClick={ executeStandaloneOperation }><p>cos</p></div>
                <div className="operation button" onClick={ executeStandaloneOperation }><p>tan</p></div>

                <div className="operation button" onClick={ backspace }><p>del</p></div>
                <div className="operation button" onClick={ executeStandaloneOperation }><p>sqrt</p></div>
                <div className="operation button" onClick={ executeStandaloneOperation }><p>arcsin</p></div>
                <div className="operation button" onClick={ executeStandaloneOperation }><p>arccos</p></div>
                <div className="operation button" onClick={ executeStandaloneOperation }><p>arctan</p></div>
                
                <div className="operation button"></div>
                <div className="operation button" onClick={ executeStandaloneOperation }><p>!</p></div>     
                <div className="operation button" onClick={ executeStandaloneOperation }><p>ln</p></div>
                <div className="operation button" onClick={ executeStandaloneOperation }><p>log</p></div>
            </div>
        
        )
    }
}

export default OperationsContainer