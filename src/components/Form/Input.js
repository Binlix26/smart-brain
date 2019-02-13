import React from 'react'

const Input = ({id,name,type, onInputChange, onInputKeyPress}) => {
    const classname = name === 'password' ? 'mv3' : 'mt3';
    return (
        <div className={classname}>
            <label className='db fw6 lh-copy f6' htmlFor={id}>
                {name}
            </label>
            <input
                onChange={onInputChange}
                onKeyPress={onInputKeyPress ? onInputKeyPress : null}
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type={type}
                name={id}
                id={id}
            />
        </div>
    )
}

export default Input