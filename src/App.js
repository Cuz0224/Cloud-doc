
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'
import PropTypes from 'prop-types'
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles'

function App() {
  return (
    <div className="App container-fluid">
      <div className='row'>
        <div className='col-6 bg-light left-panel'>
          <FileSearch
            // title={'my-cloud-app'}
            onFileSearch={(value)=>{console.log(value)}}

          />
          <FileList
            files={defaultFiles}
            onFileClick={(id) => { console.log(id) }}
            onFileDelete={(id) => { console.log('deleteing',id) }}
          />
        </div>
        <div className='col-6 bg-primary right-panel'>
          <h1>this is the right</h1>
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
