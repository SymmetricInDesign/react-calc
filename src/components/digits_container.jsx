import React from 'react'

class DigitsContainer extends React.Component{

    render(){
        const { updateCurrentNumber, changeSign } = this.props
        return (
            <div id="digits">
                <div className="digit button" onClick={ updateCurrentNumber }><p>7</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>8</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>9</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>4</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>5</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>6</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>1</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>2</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>3</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>0</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>e</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>π</p></div>
                <div className="digit button" onClick={ updateCurrentNumber }><p>.</p></div>
                <div className="digit button" onClick={ changeSign }><p>(-)</p></div>
            </div>
        )
    }
}

export default DigitsContainer