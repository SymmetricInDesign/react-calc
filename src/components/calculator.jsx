import React from 'react'
import OperationIndicator from './operation_indicator'
import * as MyMath from '../util/my_math.js' 

class Calculator extends React.Component{
    constructor(){
        super()
        console.log(MyMath)
        this.standAloneOperations = new Set(['sqrt', 'fact', 'sin', 'cos', 'tan', 'arcsin', 'arccos', 'arctan'])
        this.state = {
            result: "",
            current: "",
            operation: ""
        }
        this.updateCurrentNumber = this.updateCurrentNumber.bind(this)
        this.updateOperation = this.updateOperation.bind(this)
        this.updateResult = this.updateResult.bind(this)
        this.clear = this.clear.bind(this)
        this.submit = this.submit.bind(this)
        this.executeStandaloneOperation = this.executeStandaloneOperation.bind(this)
        this.backspace = this.backspace.bind(this)
        this.changeSign = this.changeSign.bind(this)
    }

    updateResult(result, operation = this.state.operation){
        console.log(result)
        if (isNaN(result) && typeof result === 'string' && result.includes("Error")){
            this.setState({result: result, current: "", operation: ""})
            return
        }
        const input = `${result}`
        result = parseFloat(result) 
        if (isNaN(result)) result = 1
        if (input.includes("π")) result*=Math.PI
        if (input.includes("e")) result*=Math.E
        if (Math.abs(result) < 0.0000000000001) result = 0
        this.setState({result: result, current: "", operation: operation})
    }

    submit( e, newOperation = "" ){
        //if either res or current is empty, do nothing as there is no operation to make.
        const {current, operation} = this.state
        let {result} = this.state
        if (current === "-") return

        if (current === "" || result === "") return
        result = parseFloat(result)
        let operand = parseFloat(current) 
        if (isNaN(operand)) operand = 1
        if (current.includes("π")) operand*=Math.PI
        if (current.includes("e")) operand*=Math.E
        switch (operation){
            case '+':
                this.updateResult(operand+result, newOperation ? newOperation : "")
                break
            case '-':
                this.updateResult(result - operand, newOperation ? newOperation : "")
                break
            case 'x':
                this.updateResult(result * operand, newOperation ? newOperation : "")
                break
            case '÷':
                if (operand === 0) {
                    this.updateResult("Divide By Zero Error")
                    break
                }
                this.updateResult(result / operand, newOperation ? newOperation : "")
                break
            default:
                return
        }


    }

    executeStandaloneOperation(e){
        const operation = e.target.textContent
        const {current, result} = this.state
        if (current === "-" || current.length < 1) return
        let operand
        if (current){
            operand = parseFloat(current) 
            if (isNaN(operand)) operand = 1
            if (current.includes("π")) operand*=Math.PI
            if (current.includes("e")) operand*=Math.E
        }else{
            if (isNaN(result)) return
            operand = parseFloat(result)
        }

        switch (operation){
            case 'sqrt':
                this.updateResult(Math.sqrt(operand))
                break
            case '!':
                this.updateResult(MyMath.factorial(operand))
                break
            case 'sin':
                this.updateResult(Math.sin(operand))
                break
            case 'arcsin':
                this.updateResult(Math.asin(operand))
                break
            case 'cos':
                this.updateResult(Math.cos(operand))
                break
            case 'arccos':
                this.updateResult(Math.acos(operand))
                break
            case 'tan':
                this.updateResult(Math.tan(operand))
                break
            case 'arctan': 
                this.updateResult(Math.atan(operand))
                break
            case 'ln':
                if (operand < 0){
                    this.updateResult("Input Error")
                }else{
                    this.updateResult(Math.log(operand))
                }
                break
            case 'log':
                if (operand < 0){
                    this.updateResult("Input Error")
                }else{
                    this.updateResult(Math.log10(operand))
                }
                break
            default:
                return
        }
    }

    updateCurrentNumber(e){
        const {current, operation} = this.state
        const noOp = operation === "" ? true : false
        const digit = e.target.textContent
        //don't add pi or e if last character is decimal point
        if (current.charAt(current.length-1) === '.' && (digit==='π' || digit === 'e')) return

        if (noOp && current === "") this.setState({ current: digit, result: "" })

        //ensure that constants only appear max once each and only at the end of the string
        if (current.includes('π')){
            if (digit === 'e' && !current.includes('e')) this.setState({ current: current + digit })
        }else if (current.includes('e')){
            if (digit === 'π') this.setState({ current: current + digit })
        }else{
            this.setState({ current: current + digit })
        }
    }

    changeSign(e){
        let {current} = this.state 
        if (current.charAt(0) !== "-"){
            this.setState({ current: "-" + current })
        }else{
            this.setState({ current: current.slice(1) })
        }
    }

    updateOperation(e){
        // if result is empty
        const {result, current, operation} = this.state
        console.log(current)
        if (typeof result === 'string' && result.includes("Error")) {
            this.setState({ result: "", current: "", operation: "" })
            return
        }
        if (current === "-") return
        if (result === ""){
            //if current entry is not empty
            if (current !== ""){
                //update operation to button text value
                //set result to current entry, clear current entry
                this.updateResult(current, e.target.textContent)
            }else{
                //do nothing since there is nothing to operate on.
                return
            }
        //if result has a value
        }else{
            //if current entry has a value
            if (current !== ""){
                //calculate the result of current entry and previous result given current operation
                this.submit( "" , e.target.textContent)
            }else{
                //set new operation state, do nothing else.
                this.setState({operation: e.target.textContent})
            }
        }
    }

    clear(){
        this.setState({
            result: "",
            current: "",
            operation: "",
        })
    }

    backspace(){
        this.setState({current: this.state.current.substr(0,this.state.current.length-1)})
    }

    render(){

        return (
                <div id="calculator">
                    <h2>Calculator</h2>
                    <div id="display">
                        <input type="text" value={this.state.result} readOnly/>
                        <input type="text" value={this.state.current} readOnly/>
                        <OperationIndicator operation={this.state.operation}/>
                    </div>
                    <div id="controls-container">
                        <div id="digits">
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>7</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>8</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>9</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>4</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>5</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>6</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>1</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>2</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>3</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>0</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>.</p></div>
                            <div className="digit button" onClick={this.submit}><p>=</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>π</p></div>
                            <div className="digit button" onClick={this.updateCurrentNumber}><p>e</p></div>
                            <div className="digit button" onClick={this.changeSign}><p>(-)</p></div>
                            <div className="digit button"><p></p></div>
                        </div>
                        <div id="operations">
                            <div className="operation button" onClick={this.clear}><p>CE</p></div>
                            <div className="operation button" onClick={this.updateOperation}><p>÷</p></div>
                            <div className="operation button" onClick={this.updateOperation}><p>x</p></div>
                            <div className="operation button" onClick={this.updateOperation}><p>+</p></div>
                            <div className="operation button" onClick={this.updateOperation}><p>-</p></div>
                            <div className="operation button" onClick={this.backspace}><p>del</p></div>
                            <div className="operation button" onClick={this.executeStandaloneOperation}><p>sqrt</p></div>
                            <div className="operation button" onClick={this.executeStandaloneOperation}><p>sin</p></div>
                            <div className="operation button" onClick={this.executeStandaloneOperation}><p>cos</p></div>
                            <div className="operation button" onClick={this.executeStandaloneOperation}><p>tan</p></div>
                            <div className="operation button" onClick={this.backspace}><p>del</p></div>
                            <div className="operation button" onClick={this.executeStandaloneOperation}><p>!</p></div>

                            <div className="operation button" onClick={this.executeStandaloneOperation}><p>arcsin</p></div>
                            <div className="operation button" onClick={this.executeStandaloneOperation}><p>arccos</p></div>
                            <div className="operation button" onClick={this.executeStandaloneOperation}><p>arctan</p></div>
                            <div className="operation button" onClick={this.backspace}><p>del</p></div>

                            <div className="operation button" onClick={this.executeStandaloneOperation}><p>ln</p></div>
                            <div className="operation button" onClick={this.executeStandaloneOperation}><p>log</p></div>
                        </div>
                    </div>
                </div>
            )
    }


}

export default Calculator