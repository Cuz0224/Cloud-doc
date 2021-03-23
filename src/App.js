
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'
import PropTypes from 'prop-types'
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles'
import ButtonBtn from './components/BottomBtn'
import TabList from './components/TabList'
import { EditOutlined } from '@ant-design/icons'
import { FileOutlined } from '@ant-design/icons'
import SimpleMDE from 'react-simplemde-editor'
import { flattenArr, objToArr } from './utils/helper'
// import uuidv4 from 'uuid/v4'
import 'easymde/dist/easymde.min.css'
import { useState } from 'react'; 

const fs = window.require('fs')
console.dir(fs)
const uuid = require('uuid');

function App() {
  const [files, setFiles] = useState(flattenArr(defaultFiles))
  const [activeFileID, setActiveFIleID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const [searchedFiles, setSearchedFiles] = useState([])
  const filesArr = objToArr(files)
  // const openedFiles = openedFileIDs.map(openID => {
  //   return files.find(file => file.id === openID)
  // })
  
  const fileCLick = (fileID) => {
    //set current active file
    setActiveFIleID(fileID)
    //if openedFles don't have the current ID
    //then add new fileID to openedFiles
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID])
    }
  }
  
  const tabClick = (fileID) => {
    //set current active file
    setActiveFIleID(fileID)
  }

  const tabClose = (id) => {
    //remove current id from openedFileIDs
    const tabsWithout = openedFileIDs.filter(fileID => fileID !== id)
    setOpenedFileIDs(tabsWithout)
    //set the active to the first opened tab if still tabs left
    if (tabsWithout.length > 0) {
      setActiveFIleID(tabsWithout[0])
    }
    else {
      setActiveFIleID('')
    }

  }

  const fileChange = (id, value) => {
    //loop through file array to update new value
    // const newFiles = files.map(file => {
    //   if (file.id === id) {
    //     file.body = value
    //   }
    //   return file
    // })
    const newFile = { ...files[id], body: value }
    
    setFiles({ ...files, [id]:newFile})
    //update unsavedIDs
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([ ...unsavedFileIDs,id])
    }
  }

  const deleteFile = (id) => {
    //filter out the current file id
    delete files[id]
    setFiles(files)
    //close the tab if opened
    tabClose(id)
  }

  const updateFileName = (id, title) => {
    //loop through files, and update the title 
    // const newFiles = files.map(file => {
    //   if (file.id === id) {
    //     file.title = title
    //     file.isNew = false
    //   }
    //   return file
    // })
    const modifiedFile = { ...files[id], title, isNew: false}
    setFiles({ ...files, [id]:modifiedFile})
  }

  const fileSearch = (keyword) => {
    //filter out the new files based on the keyword
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
    setSearchedFiles(newFiles)
  }

  const createNewFile = () => {
    const newID = uuid.v4()
    // const newFiles = [
    //   ...files,
    //   {
    //     id: newID,
    //     title: '',
    //     body: '## 请输入 Markdown',
    //     createAt: new Date().getTime(),
    //     isNew:true
    //   }
    // ]
    const newFile = {
      id: newID,
      title: '',
      body: '## 请输入 Markdown',
      createAt: new Date().getTime(),
      isNew:true
    }
    setFiles({ ...files, [newID]: newFile})
  }

  const activeFile = files[activeFileID]
  const openedFiles = openedFileIDs.map(openID => {
    return files[openID]
  })
  const fileListArr = (searchedFiles.length > 0) ? searchedFiles : filesArr
  return (
    <div className="App container-fluid px-0">
      <div className='row no-gutters'>
        <div className='col-3 bg-light left-panel'>
          <FileSearch
            onFileSearch={fileSearch}
          />
          <FileList
            files={fileListArr}
            onFileClick={fileCLick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className='row no-gutters btn-bottom'>
            <div className='col-6'>
              <ButtonBtn
                text={'新建'}
                colorClass={'btn-success'}
                icon={<EditOutlined />}
                onBtnClick={createNewFile}
              />
            </div>
            <div className='col-6'>
              <ButtonBtn
                text={'导入'}
                colorClass={'btn-primary'}
                icon={<FileOutlined />}
              />
            </div>
          </div>
          
        </div>
        <div className='col-9 right-panel'>
          {!activeFile &&
            <div className='start-page'>
              选择或者创建新的Markdown文档
            </div>

          }
          {activeFile &&
            <>
              <TabList
                files={openedFiles}
                onTabClick={tabClick}
                onCloseTab={tabClose}
                unsaveIds={unsavedFileIDs}
                activeId={activeFileID}
              />
            <SimpleMDE
                key={activeFile&& activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => { fileChange(activeFile.id, value) }}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch:PropTypes.func.isRequired
}
FileSearch.defaultProps = {
  title:'my-cloud-doc'
}
FileList.defaultProps = {
  files:{defaultFiles}
}

export default App;
