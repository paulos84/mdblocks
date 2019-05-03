import React from "react";

export default (props) => {
    let logo = '/logos/'.concat(props.catName.toLowerCase().replace(' ', '_'), '_logo.png');
    return (
        <div onClick={() => props.handleClick(props.catName)}>
            <img className='category_logo' src={logo} alt={props.catName}/>
            <h5 className='category_label'>{props.catName}</h5>
        </div>
    )
}