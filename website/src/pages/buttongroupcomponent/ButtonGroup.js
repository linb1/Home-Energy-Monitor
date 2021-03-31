import React, { useState, Component } from 'react'
import { ButtonGroupData } from './ButtonGroupData'
import './ButtonGroup.css'

class ButtonGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            clickedId: 0,
        }
    }

    setClickedId = (index) => {
        this.setState({clickedId: index})
    }

    sendTime = (item) => {
        this.props.timeCallback(item.value);
    }

    render(){
        return (
        <div className='button-group'>
            {ButtonGroupData.map((item, index) => {
                return (
                    <button key={index} name={item.name} className={index === this.state.clickedId ? "customButton active" : "customButton"} onClick={(event) => {this.setClickedId(index); this.sendTime(item)}} >
                        {item.name}
                    </button>
                );
            })}
        </div>
        );
    }

}


export default ButtonGroup;