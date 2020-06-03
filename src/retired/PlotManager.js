import React from 'react'
import RavenTimeSeriesBlock from './Raven/RavenTimeSeriesBlock';
import { Icon, Button } from 'semantic-ui-react';

class PlotManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nplots: 1,
                  allplotcount: 1,
                  order: [1],
                  dateRange: null
                 }
    this.addPlot = this.addPlot.bind(this);
    this.delPlot = this.delPlot.bind(this);
    this.rangeUpdate = this.rangeUpdate.bind(this);
  }

  addPlot() {
    const {nplots, allplotcount} = this.state;
    const ocurrent = [...this.state.order, allplotcount + 1];
    console.log('New plot', allplotcount + 1);
    this.setState({nplots: nplots + 1,
                   allplotcount: allplotcount +1,
                   order: ocurrent});
  }

  delPlot(e,d) {
    const ncurrent = this.state.nplots;
    const ocurrent = [...this.state.order];
    console.log('Removing plot', d.okey)
    ocurrent.splice(ocurrent.indexOf(d.okey),1);
    this.setState({nplots: ncurrent -1,
                   order: ocurrent});
  }

  rangeUpdate(newDateRange) {
    const ncurrent = this.state.nplots;
    // Just one? Why bother
    if (ncurrent > 1){
      this.setState({dateRange : newDateRange});
    }
    //console.log(xmin, xmax);
  }

  render() {
    const {nplots, order, dateRange} = this.state;
    // Generate blocks
    const blocks = order.map((key) => 
        <RavenTimeSeriesBlock key={key} okey={key}
                              onClose={this.delPlot}
                              noClose={nplots===1}
                              dateRange={dateRange}
                              rangeUpdate={this.rangeUpdate} />
      );

    return(
      <div>
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