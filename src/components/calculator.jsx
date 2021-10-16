import React from 'react'

class Calculator extends React.Component{
    constructor(){
        super()
        this.state = {
            result: "",
            current: "",
            operation: null,
            prev: null
        }
        this.updateCurrentNumber = this.updateCurrentNumber.bind(this)
        this.updateOperation = this.updateOperation.bind(this)
        this.clear = this.clear.bind(this)
    }

    submit(){
        // this.
    }

    updateCurrentNumber(e){
        this.state.current === "" ? 
        this.setState({
            current: e.target.textContent
        })
        :
        this.setState({
            current: this.state.current + e.target.textContent
        })
    }

    updateOperation(e){
        this.setState({operation: e.target.textContent})
    }

    clear(){
        this.setState({
            result: "",
            current: "",
            operation: null,
            prev: null
        })
    }

    render(){

        return (
                <div id="calculator">
                    <div id="display">
                        <input type="text" value={this.state.result} readOnly/>
                        <input type="text" value={this.state.current} readOnly/>
                    </div>
                    <div id="controls-container">
                        <div id="digits">
                            <div className="digit" onClick={this.updateCurrentNumber}>7</div>
                            <div className="digit" onClick={this.updateCurrentNumber}>8</div>
                            <div className="digit" onClick={this.updateCurrentNumber}>9</div>
                            <div className="digit" onClick={this.updateCurrentNumber}>4</div>
                            <div className="digit" onClick={this.updateCurrentNumber}>5</div>
                            <div className="digit" onClick={this.updateCurrentNumber}>6</div>
                            <div className="digit" onClick={this.updateCurrentNumber}>1</div>
                            <div className="digit" onClick={this.updateCurrentNumber}>2</div>
                            <div className="digit" onClick={this.updateCurrentNumber}>3</div>
                            <div className="digit" onClick={this.updateCurrentNumber}>0</div>
                            <div className="digit" onClick={this.updateCurrentNumber}>.</div>
                            <div className="digit" onclick={this.submit}>=</div>
                        </div>
                        <div id="operations">
                            <div className="operation" onClick={this.clear}>CE</div>
                            <div className="operation" onClick={this.updateOperation}>÷</div>
                            <div className="operation" onClick={this.updateOperation}>x</div>
                            <div className="operation" onClick={this.updateOperation}>+</div>
                            <div className="operation" onClick={this.updateOperation}>-</div>
                        </div>
                    </div>
                </div>
            )
    }


}

export default Calculator