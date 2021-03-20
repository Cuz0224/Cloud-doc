import React from 'react'
import PropTypes from 'prop-types'
import { EditOutlined } from '@ant-design/icons'

const BottomBtn = ({ text, colorClass, icon, onClick }) => {
    
    return (
        <button
            type='button'    //bootstrap中的规定
            className={`btn btn-block no-border ${colorClass}`}
            // onClick={()=>{console.log('button clicked')}}
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