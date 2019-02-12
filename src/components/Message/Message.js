import React from 'react';
import './spinner.css'

const Message = () => {
    const style_spinner = {
        width: '100%',
        height: '100%'
    };

    return (
        <div className="lds-css ng-scope absolute w3 h3 bottom--1">
            <div className="lds-spinner" style={style_spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
};

export default Message;