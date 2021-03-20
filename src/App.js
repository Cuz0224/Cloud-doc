
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
import 'easymde/dist/easymde.min.css'
import { useState } from 'react';


function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFIleID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const openedFiles = openedFileIDs.map(openID => {
    return files.find(file => file.id === openID)
  })
  const activeFile = files.find(file => file.id === activeFileID)
  return (
    <div className="App container-fluid px-0">
      <div className='row no-gutters'>
        <div className='col-3 bg-light left-panel'>
          <FileSearch
            // title={'my-cloud-app'}
            onFileSearch={(value)=>{console.log(value)}}

          />
          <FileList
            files={files}
            onFileClick={(id) => { console.log(id) }}
            onFileDelete={(id) => { console.log('deleteing', id) }}
            onSaveEdit={(id, newValue) => { console.log(id); console.log(newValue) }}
          />
          <div className='row no-gutters btn-bottom'>
            <div className='col-6'>
              <ButtonBtn
                text={'新建'}
                colorClass={'btn-success'}
                icon={<EditOutlined />}
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
                onTabClick={(id) => { console.log(id) }}
                onCloseTab={(id) => { console.log('closing', id) }}
                unsaveIds={unsavedFileIDs}
                activeId={activeFileID}
              />
              <SimpleMDE
                value={activeFile && activeFile.body}
                onChange={(value) => { console.log(value) }}
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
