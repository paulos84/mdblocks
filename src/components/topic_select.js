import React from "react";

export default (props) => {

    const addLen = props.selectedOption.length * 9;
    const width = 24 + addLen;

    const getDropdown = () => {
        return <select
            style={{'width': width}}
            className='category_select'
            onChange={(e) => props.handleCategorySelection(e.target.value)}
            value={props.selectedOption}
            >
            {props.categories.map(category => {
                return <option key={category} value={category}>{category}</option>})}
            </select>
    };

    if ( !props.selectedOption ) {
        return (
            <select
                style={{'width': width, color: 'green'}}
                className='category_select'
                value={'Select'}
                onClick={getDropdown}
            >
            </select>
        )
    }
    getDropdown()
}