import React from 'react'
import PropTypes from 'prop-types'

const BottomBtn = ({ text, colorClass, icon, onBtnClick }) => {
    
    return (
        <button
            type='button'    //bootstrap中的规定
            className={`btn btn-block no-border ${colorClass}`}
            onClick={onBtnClick}
        >
            {icon}&nbsp;&nbsp;&nbsp;&nbsp;{text}
        </button>
    )
}

BottomBtn.propTypes = {
    text: PropTypes.string,
    colorClass: PropTypes.string,
    onBtnClick:PropTypes.func,
}
export default BottomBtn