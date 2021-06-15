import React from 'react';
import 'semantic-ui-css/semantic.min.css';
//import 'semantic-ui-css';
import './App.css';
import PlotManager from './components/PlotManager';
//import logo from './hg_flag.png';

class App extends React.Component {
  /**
   * Parent Component for Entire App
   * @returns React App w/ Header
   */
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
/* LS - Some various unfinished ideas I had for a menu (below)
   Things like About, Help, and maybe even a SAVE and a global REFRESH
   Information displayed using additional modal boxes

<div className='header-menu-box'>
<span className='header-menu'>ABOUT</span><span className='header-menu'>HELP</span>
</div>
*/

export default App;
