import React, { Component } from 'react';
import Select from 'react-select';
import './CustomSelect.css';

class CustomSelect extends Component {
    constructor(props) {
        super(props);
    }

    sendValue = (value) => {
        this.props.sendData(value.value);
    }

    render () {
        return (
            <div className='select-wrapper'>
                <span className='label'>{this.props.name}</span>
                <Select className='select' options={this.props.data} onChange={this.sendValue} defaultValue={this.props.data[0]}/>
            </div>
            );
    }
}


export default CustomSelect;