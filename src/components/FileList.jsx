import React, { useState, useEffect, useRef } from 'react'
import { FileMarkdownOutlined } from '@ant-design/icons'
import { EditOutlined } from '@ant-design/icons'
import { DeleteOutlined } from '@ant-design/icons'
import { SearchOutlined } from '@ant-design/icons'
import { CloseCircleOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')
    const closeSearch = () => {

        setEditStatus(false)
        setValue('')
    }
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    useEffect(() => {
        
        if (enterPressed && editStatus) {
            const editItem = files.find(file=>file.id===editStatus)
            onSaveEdit(editItem.id,value)
            setEditStatus(false)
            setValue('')
        }
        else if (escPressed && editStatus) {
            closeSearch()
        }
    })
    
    return (
        <ul className='list-group list-group-flush file-list'>
            {
                files.map(file => (
                    <li
                        className='list-group-item bg-light d-flex align-items-center file-item row justify-content-between'
                        key={file.id}
                    >
                        {   (file.id !== editStatus) &&
                            <>
                                <span className='col-2'><FileMarkdownOutlined /></span>
                                <span
                                    className='c-link col-6'
                                    onClick={() => { onFileClick(file.id) }}
                                >
                                    {file.title}
                                </span>
                                <button
                                    className='icon-button col-1'
                                    onClick={() => { setEditStatus(file.id); setValue(file.title) }}
                                >
                                    <EditOutlined />
                                </button>
                                <button
                                    className='icon-button col-1'
                                    onClick={() => { onFileDelete(file.id) }}
                                >
                                    <DeleteOutlined />
                                </button>
                            </>}
                        {   (file.id === editStatus) &&
                           <>
                                <input
                                    style={ {height:28}}
                                    className='form-control col-10'
                                    value={value}
                                    onChange={(e)=>{setValue(e.target.value)}}
                                />
                                <button
                                    type='button'
                                    className='icon-button col-2'
                                    onClick={closeSearch}
                                >
                                    < CloseCircleOutlined />
                                </button>
                            </>

                        }
                        
                    </li>
                ))
            }
        </ul>
    )
}

FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func,
    onSaveEdit:PropTypes.func,
}

export default FileList



