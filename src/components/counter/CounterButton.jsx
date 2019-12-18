import React, { Component } from 'react';
import './Counter.css';


class CounterButton extends Component{
    constructor(){
        super();
        this.state = {
            counter : 0
        }
        //this.increment = this.increment.bind(this); not needed with the arrow function 
    }

    render(){
        return(
            <div className="counterButton">
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            </div>
        ) 
    }

    //arrow funtcion replace the bind methode
    increment = () => {
        console.log('increment from child');
        this.setState({
            counter: this.state.counter + this.props.by
        });
    }
}

export default CounterButton