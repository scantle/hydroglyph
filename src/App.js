import React from 'react';
import 'semantic-ui-css/semantic.min.css';
//import 'semantic-ui-css';
import './App.css';
import PlotManager from './components/PlotManager';
//import logo from './hg_flag.png';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hydroglyph</h1>
        </header>
        <PlotManager />
      </div>
    );
  }
}
//           <div className='header-menu-box'>
// <span className='header-menu'>ABOUT</span><span className='header-menu'>HELP</span>
// DataImportModal
// DyGraph
// DataSelector
// Settings?

export default App;
