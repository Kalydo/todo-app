import React, { Component } from 'react';
import CounterButton from './CounterButton';
import './Counter.css';
import propTypes from 'prop-types';

class Counter extends Component{
    constructor(){
        super();
        this.state = {
            counter : 0.75
        }
    }

    render(){
        return(
           <div className="counter">
               <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
               <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
               <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
               <span className="count">{this.state.counter}</span>
               <div><button className="reset" onClick={this.reset}>Reset</button></div>
           </div>
        );
    }

    increment = (by) => {
        //console.log(`increment from parent - ${by}`);
        this.setState(
            (prevState) => {
                return {counter : prevState.counter + by} //+ this.props.by
            });

    }

    decrement = (by) => {
        this.setState(
            (prevState) => {
                return { counter : prevState.counter - by}
        });
    }

    reset = () => {
        this.setState({ counter : 0}); 
    }
}

CounterButton.defaultProps = {
    by : 1
}

CounterButton.propTypes = {
    by : propTypes.number
}

export default Counter
