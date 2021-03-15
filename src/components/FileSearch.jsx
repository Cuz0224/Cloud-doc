import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { CloseCircleFilled } from '@ant-design/icons'

const FileSearch = ({ title, onFileSearch }) => {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')
    const closeSearch = (e) => {
        e.preventDefault()
        setInputActive(false)
        setValue('')
    }
    let node = useRef(null)
    useEffect(() => {
        const handleInputEvent = (event) => {
            const { keyCode } = event
            if (keyCode === 13 && inputActive) {
                onFileSearch(value)
                
            } else if (keyCode === 27 && inputActive) {
                closeSearch(event)
            }
        }
        document.addEventListener('keyup', handleInputEvent)
        return () => {
            document.removeEventListener('keyup',handleInputEvent)
        }
    })

    useEffect(() => {
        if (inputActive) {
            node.current.focus()
        }
    },[inputActive])

    return (
        <div className='alert alert-primary'>
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
                    className='form-control col-10'
                    value={value}
                    onChange={(e)=>{setValue(e.target.value)}}
                />
                <button
                    type='button'
                    className='icon-button col-2'
                    onClick={closeSearch}
                >
                    <CloseCircleFilled
    
                    />
                </button>
                </div>

            }
        </div>
    )
}

export default FileSearch