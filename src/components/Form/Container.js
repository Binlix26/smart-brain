import React from 'react';

const Container = (props) => {

    return (
        <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center relative'>
            <main className='pa4 black-80'>
                {props.children}
            </main>
        </article>
    )
}

export default Container