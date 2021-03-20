import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CloseOutlined } from '@ant-design/icons'
import { SaveOutlined } from '@ant-design/icons'
import './TabList.scss'

const TabList = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {
    return (
       
        <ul className='nav nav-pills tablist-component'>
            {files.map(file => {
                const withUnsavedMark = unsaveIds.includes(file.id)
                const fClassName = classNames({
                    'nav-link': true,
                    'active': file.id === activeId,
                    'withUnsaved':withUnsavedMark
                })
                return (
                    <li className='nav-item' key={file.id}>
                        <a
                            href="#"
                            className={fClassName}
                            onClick={(e) => { e.stopPropagation();onTabClick(file.id)}}
                        >
                            {file.title}&nbsp;&nbsp;&nbsp;
                            <span
                                    className='close-icon'
                                onClick={(e) => { e.stopPropagation(); onCloseTab(file.id) } }
                            >
                                <CloseOutlined />
                            </span>
                            {withUnsavedMark&& <span className='rounded-circle ml-2 unsaved-icon'></span>}
                        </a>
                       
                    </li>
                )
            })}
        </ul>
    )
}

TabList.propTypes = {
    files: PropTypes.array,
    activeId: PropTypes.string,
    unsaveIds: PropTypes.array,
    onTabClick: PropTypes.func,
    onCloseTab: PropTypes.func,
}

TabList.defaultProps = {
    unsaveIds:[]
}

export default TabList;