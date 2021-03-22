import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { CloseCircleOutlined } from '@ant-design/icons'
import useKeyPress from '../hooks/useKeyPress'

const FileSearch = ({ title, onFileSearch }) => {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')

    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    const closeSearch = () => {
        setInputActive(false)
        setValue('')
        onFileSearch('')
    }
    
    let node = useRef(null)
    useEffect(() => {
        if (enterPressed && inputActive) {
            onFileSearch(value)
        }
        else if(escPressed && inputActive){
            closeSearch()
        }
    })

    useEffect(() => {
        if (inputActive) {
            node.current.focus()
        }
    },[inputActive])

    return (
        <div className='alert alert-primary mb-0'>
            {!inputActive &&
                <div className='d-flex justify-content-between align-items-center'>
                <span>{title}</span>
                <button
                    type='button'
                    className='icon-button col-2'
                    onClick={()=>{setInputActive(true)}}
                >
                    <SearchOutlined />
                </button>
                </div>
            }
            {inputActive &&
                <div className='d-flex justify-content-between align-items-center'>
                <input
                    ref={node}
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
                </div>

            }
        </div>
    )
}



export default FileSearch