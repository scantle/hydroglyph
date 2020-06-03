import React from 'react';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.min.css';

class TimeSeriesPlot extends React.Component {

  state = {graph : null,
           data  : this.props.data,
           dateRange : null};

  drawChange = this.drawChange.bind(this);

  static getDerivedStateFromProps(nextProps, prevState) {
    // Only one can update - is this a problem?
    if (JSON.stringify(nextProps.data) !== JSON.stringify(prevState.data)) {
      return({data: nextProps.data});
    } else if (JSON.stringify(nextProps.dateRange) !== JSON.stringify(prevState.dateRange)) {
      return({dateRange: nextProps.dateRange});
    } else {
      return null;
    }
  }

  componentDidMount() {
    const {data, labels, visibility, ylabel} = this.props;
    // Currently not bothering with a title
    let g = new Dygraph(this.refs.dygraphInst,
                data,
                {
                  ylabel: ylabel,
                  legend: 'always',
                  showRangeSelector: true,
                  labels: labels,
                  visibility: visibility,
                  drawCallback: this.drawChange,
                });
    console.log('Initial', g.xAxisExtremes());
    this.setState({graph : g});
  }

  drawChange() {
    const {graph, dateRange} = this.state;
    if (graph !== null) {
      const newRange = graph.xAxisRange();
      if (JSON.stringify(newRange) !== JSON.stringify(dateRange)) {
        this.props.rangeUpdate(newRange);
      }
    }
  }
  
  render() {
    const {graph, data, dateRange} = this.state;
    const {visibility, labels, height, } = this.props;

    const wideplot= {backgroundColor: '#ffffff',
                     position: 'absolute',
                     left: '2em',
                     right: '3em',
                     height : height,
                    };
    

    if (graph !== null) {
      // Just do it - If performance becomes issue, could find smarter way that checks if update necessary
      graph.updateOptions({
        visibility: visibility,
        labels: labels,
        file: data,
        dateWindow: dateRange
      });
      graph.resize();
      //console.log('re-rendering. Hint: ', labels[1]);
    }
    return <div ref='dygraphInst' style={wideplot}></div>
  }

}

export default TimeSeriesPlot