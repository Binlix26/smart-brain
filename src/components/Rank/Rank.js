import React from 'react';

const Rank = ({name, entries, rank}) => {
    return (
        <div>
            <div className="white f3">
                {`${name} , your current rank is ${rank}`}
            </div>
            <div className="white f1">
                {entries}
            </div>
        </div>
    );
};

export default Rank;