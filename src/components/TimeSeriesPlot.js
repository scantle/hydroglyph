import React from 'react';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.min.css';

class TimeSeriesPlot extends React.Component {
  /** Wrapper for DyGraph
   * @author Leland Scantlebury
   * @param {object} props:
   * - okey: int, unique key of plot
   * - data: object, data for plot as array (see https://dygraphs.com/data.html)
   * - graph: object, existing dygraph (recreated on every load, owned by a parent)
   * - graphSet: function, used to pass DyGraph to parent
   * - title: str, title for plot (currently not used)
   * - labels: str array, names of time series
   * - ylabel: str, y-axis label for plot
   * - visibility: bool array, whether time series item is currently displayed
   * - height: height of plot (often based on resizeable block size)
   */

  state = {data  : this.props.data,};

  static getDerivedStateFromProps(nextProps, prevState) {
    /** Gatekeeper for if data really updated.
     * See https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
     */
    if (JSON.stringify(nextProps.data) !== JSON.stringify(prevState.data)) {
      return({data: nextProps.data});
    } else {
      return null;
    }
  }

  componentDidMount() {
    /** Creates Dygraph, passes to parent via graphSet() */
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
      // Always passes options/data - If performance becomes issue, could find smarter way that checks if update necessary
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