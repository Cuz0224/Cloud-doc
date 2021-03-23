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
    const closeSearch = (editItem) => {
        setEditStatus(false)
        setValue('')
        // if we are editing a newly created file ,wo should delete this file
        if (editItem.isNew) {
            onFileDelete(editItem.id)
        }
    }
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    // let node = useRef(null)

    // useEffect(() => {
    //     if (editItem.isNew) {
    //         node.current.focus()
    //     }
    // },[editItem])

    useEffect(() => {
        const newFile = files.find(file => file.isNew)
        console.log(newFile)
        if (newFile) {
            setEditStatus(newFile.id)
            setValue(newFile.title)
        }
    },[files])

    useEffect(() => {
        const editItem = files.find(file=>file.id===editStatus)
        if (enterPressed && editStatus && value.trim() !== '') {
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
                        className='list-group-item bg-light d-flex align-items-center file-item row justify-content-between no-gutters'
                        key={file.id}
                    >
                        {   (file.id !== editStatus && !file.isNew) &&
                            <>
                                <span className='col-2'><FileMarkdownOutlined /></span>
                                <span
                                    className='c-link col-6'
                                    onClick={() => { onFileClick(file.id); }}
                                >
                                    {file.title}
                                </span>
                                <button
                                    className='icon-button col-2'
                                onClick={() => { setEditStatus(file.id); setValue(file.title)}}
                                >
                                    <EditOutlined />
                                </button>
                                <button
                                    className='icon-button col-2'
                                    onClick={() => { onFileDelete(file.id) }}
                                >
                                    <DeleteOutlined />
                                </button>
                            </>}
                        {   ((file.id === editStatus) || file.isNew) &&
                           <>
                            <input
                                    style={ {height:28}}
                                    className='form-control col-10'
                                    value={value}
                                    onChange={(e) => { setValue(e.target.value) }}
                                    placeholder='请输入文件名称'
                                />
                                <button
                                    type='button'
                                    className='icon-button col-2'
                                    onClick={() => { closeSearch(file) }}
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



