
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


function App() {
  return (
    <div className="App container-fluid px-0">
      <div className='row no-gutters'>
        <div className='col-3 bg-light left-panel'>
          <FileSearch
            // title={'my-cloud-app'}
            onFileSearch={(value)=>{console.log(value)}}

          />
          <FileList
            files={defaultFiles}
            onFileClick={(id) => { console.log(id) }}
            onFileDelete={(id) => { console.log('deleteing', id) }}
            onSaveEdit={(id, newValue) => { console.log(id); console.log(newValue) }}
          />
          <div className='row no-gutters'>
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
        <div className='col-9 bg-light right-panel'>
          <TabList
            files={defaultFiles}
          />

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
