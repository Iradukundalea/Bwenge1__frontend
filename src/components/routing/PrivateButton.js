import React from 'react';

const PrivateButton = (props) => {
    if (localStorage.getItem("authToken") && localStorage.getItem("role") === 'admin') {
        return (
            <div>{props.children}</div>
        )
    } else {
        return <></>;
    }
};

export default PrivateButton;
