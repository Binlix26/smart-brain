import React from 'react'

const Submit = ({onSubmit, value}) => {
    return (
        <div className=''>
            <input
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value={value}
                onClick={onSubmit}
            />
        </div>
    )
}

export default Submit