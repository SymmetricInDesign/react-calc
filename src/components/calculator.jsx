import React from 'react'
import OperationIndicator from './operation_indicator'
import DigitsContainer from './digits_container'
import OperationsContainer from './operations'
import * as MyMath from '../util/my_math.js' 

class Calculator extends React.Component{
    constructor(){
        super()
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

    //handles equals button presses and operation chains
    submit( e, newOperation = "" ){
        //if either res or current is empty, do nothing as there is no operation to make.
        const { current, operation } = this.state
        let { result } = this.state
        //do nothing if only entered character is "-" or either display field is empty as there is no operation to make
        if ( current === "-" ) return
        if ( current === "" || result === "" ) return

        //parse current display and account for constants
        result = parseFloat(result)
        let operand = parseFloat(current) 
        if ( isNaN(operand) ) operand = 1
        if ( current.includes("π") ) operand*=Math.PI
        if ( current.includes("e") ) operand*=Math.E

        switch ( operation ){
            case '+':
                this.updateResult( operand+result, newOperation ? newOperation : "" )
                break
            case '-':
                this.updateResult( result - operand, newOperation ? newOperation : "" )
                break
            case 'x':
                this.updateResult( result * operand, newOperation ? newOperation : "" )
                break
            case '÷':
                //pass divide by zero error to display
                if ( operand === 0 ) {
                    this.updateResult( "Divide By Zero Error" )
                    break
                }
                this.updateResult( result / operand, newOperation ? newOperation : "" )
                break
            default:
                return
        }


    }

    //unlike operations, these functions act on only one input, defaulting to the current input but also being able 
    //to be used on the last result if there is no current input.
    executeStandaloneOperation(e){
        const operation = e.target.textContent
        const {current, result} = this.state
        if (current === "-" || (current.length < 1 && !result)) return
        let operand
        //if there is a current input, parse float and account for constants
        if (current){
            operand = parseFloat(current) 
            if (isNaN(operand)) operand = 1
            if (current.includes("π")) operand*=Math.PI
            if (current.includes("e")) operand*=Math.E
        //else, operate on result, which will always be a float under intended use
        }else{
            if (isNaN(result)) return
            operand = parseFloat(result)
        }

        //check which button was clicked and execute function accordingly
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
        const { current, operation } = this.state
        const noOp = operation === "" ? true : false
        const digit = e.target.textContent

        //don't add pi or e if last character is decimal point
        if (current.charAt(current.length-1) === '.' && (digit==='π' || digit === 'e')) return

        //clear result if beginning a new input (not chaining operations between inputs)
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
        //change sign or add - sign if no current characters
        let { current } = this.state 
        if (current.charAt(0) !== "-"){
            this.setState({ current: "-" + current })
        }else{
            this.setState({ current: current.slice(1) })
        }
    }

    updateOperation(e){
        // if result is empty
        const { result, current } = this.state
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
                this.setState({ operation: e.target.textContent })
            }
        }
    }

    //update result display upon submission of operation or function
    updateResult( result, operation = this.state.operation ){
        //handle error string outputs from functions and operations, such as divide by zero
        if (isNaN(result) && typeof result === 'string' && result.includes("Error")){
            this.setState({ result: result, current: "", operation: "" })
            return
        }
        //convert strings containing constants to floats
        const input = `${result}`
        result = parseFloat(result) 
        if (isNaN(result)) result = 1
        if (input.includes("π")) result*=Math.PI
        if (input.includes("e")) result*=Math.E
        if (Math.abs(result) < 0.0000000000001) result = 0
        this.setState({ result: result, current: "", operation: operation })
    }

    clear(){
        this.setState({ result: "", current: "", operation: "" })
    }

    backspace(){
        //delete one character from current
        this.setState({current: this.state.current.substr(0,this.state.current.length-1)})
    }

    render(){
        return (
            <div id="calculator">

                <h2>Calculator</h2>

                <div id="display">
                    <input type="text" value={ this.state.result } readOnly/>
                    <input type="text" value={ this.state.current } readOnly/>
                    <OperationIndicator operation={ this.state.operation }/>
                </div>
            
                <div id="controls-container">

                    {/* digits, constants, and other characters */}
                    <DigitsContainer 
                        updateCurrentNumber = { this.updateCurrentNumber }
                        changeSign = { this.changeSign }
                    />
                
                    {/* operations and functions */}
                    <OperationsContainer 
                        submit = { this.submit }
                        clear = { this.clear } 
                        updateOperation = { this.updateOperation }
                        backspace={ this.backspace }
                        executeStandaloneOperation={ this.executeStandaloneOperation }
                    />

                </div>
            </div>
        )
    }


}

export default Calculator