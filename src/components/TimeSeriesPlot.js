import React from 'react';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.min.css';

class TimeSeriesPlot extends React.Component {

  state = {data  : this.props.data,};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.data) !== JSON.stringify(prevState.data)) {
      return({data: nextProps.data});
    } else {
      return null;
    }
  }

  componentDidMount() {
    const {data, labels, visibility, ylabel, okey, graphSet} = this.props;
    // Currently not bothering with a title
    let g = new Dygraph(this.refs.dygraphInst,
                data,
                {
                  ylabel: ylabel,
                  legend: 'always',
                  showRangeSelector: true,
                  labels: labels,
                  visibility: visibility,
                });
    graphSet(okey, g);
    //this.setState({graph : g});
  }
  
  render() {
    const {data} = this.state;
    const {visibility, labels, height, graph} = this.props;

    const wideplot= {backgroundColor: '#ffffff',
                     width: '100%',
                     height: height,
                     };
    

    if (graph !== null) {
      // Just do it - If performance becomes issue, could find smarter way that checks if update necessary
      graph.updateOptions({
        visibility: visibility,
        labels: labels,
        file: data,
      });
      graph.resize();
      //console.log('re-rendering. Hint: ', labels[1]);
    }
    return <div ref='dygraphInst' style={wideplot}></div>
  }

}

export default TimeSeriesPlot