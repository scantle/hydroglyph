import React from 'react'
import synchronize from './synchronizer';
import RavenTimeSeriesBlock from './Raven/RavenTimeSeriesBlock';
import { Icon, Button } from 'semantic-ui-react';
import WelcomeMessage from './WelcomeMessage';

class PlotManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nplots: 1,
                  allplotcount: 1,
                  order: [1],
                  graphs: [null],
                  showWelcome: true
                 }
    this.addPlot = this.addPlot.bind(this);
    this.delPlot = this.delPlot.bind(this);
    this.gSet = this.gSet.bind(this);
    this.hideWelcome = this.hideWelcome.bind(this);
  }

  addPlot() {
    const {nplots, allplotcount} = this.state;
    const ocurrent = [...this.state.order, allplotcount + 1];
    const gcurrent = [...this.state.graphs, null];
    console.log('New plot', allplotcount + 1);
    this.setState({nplots: nplots + 1,
                   allplotcount: allplotcount +1,
                   order: ocurrent,
                   graphs: gcurrent,
                   showWelcome: false});
  }

  delPlot(e,d) {
    const ncurrent = this.state.nplots;
    const ocurrent = [...this.state.order];
    const gcurrent = [...this.state.graphs];
    console.log('Removing plot', d.okey)
    ocurrent.splice(ocurrent.indexOf(d.okey),1);
    gcurrent.splice(ocurrent.indexOf(d.okey),1); // Should be in same place in both arrays
    this.setState({nplots: ncurrent -1,
                   order: ocurrent,
                   graphs: gcurrent});
  }

  gSet(key, graph) {
    const {order} = this.state;
    let gcurrent = [...this.state.graphs];
    gcurrent[order.indexOf(key)] = graph;
    console.log('Updating graph ',key-1)
    this.setState({graphs: gcurrent});
  }

  hideWelcome() {
    this.setState({showWelcome : false});
  }

  render() {
    const {nplots, order, graphs} = this.state;
    var {showWelcome} = this.state;
    // Generate blocks
    const blocks = order.map((key) => 
        <RavenTimeSeriesBlock key={key} okey={key}
                              onClose={this.delPlot}
                              noClose={nplots===1}
                              graphSet={this.gSet}
                              graph={graphs[order.indexOf(key)]}/>
      );

    // showWelcome is a POWERLESS state variable
    if (nplots > 1 || graphs[0] !== null) {
      showWelcome = false;
    }

    // Synchronize the plots
    if (nplots > 1 && !graphs.includes(null)) {
      synchronize(graphs, {zoom: true, selection: true, range: false});
    }

    console.log(showWelcome);

    return(
      <div>
        <WelcomeMessage hidden={!showWelcome} hideWelcome={this.hideWelcome}/>
        {blocks}
        <div className='hangingBlock'>
          <Button icon onClick={this.addPlot} color='black' size='large' style={{opacity: 0.85}}>
            <Icon name='plus square outline' /> Add Plot
          </Button>
        </div>
      </div>
    )
  }

}

export default PlotManager