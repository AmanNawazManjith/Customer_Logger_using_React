import React from "react";

const SearchBox = (props) => {
    return (
        <div>
        <input type='search'
        className='search'
        placeholder={props.placeholder}
        onChange={props.handleChange}
        />

        <input type='radio'
        className='choose'
        value='Sort by Name'
        />
        <input type='radio'
        className='choose'
        value='Sort by Work Done'
        />
        </div>
        
    )
}

export default SearchBox;