
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'

function App() {
  return (
    <div className="App container-fluid">
      <div className='row'>
        <div className='col-6 bg-danger left-panel'>
          <FileSearch
            title='my-cloud-doc'
            onFileSearch={(value)=>{console.log(value)}}

          />
        </div>
        <div className='col-6 bg-primary right-panel'>
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
