import React from 'react';
import {Segment} from 'semantic-ui-react';

import DataUploadModal from './RavenTSUploadModal';
import raven_csvDate_parse from '../../tools/csvparse';
//import SeriesDropdown from './SeriesDropdown';
import TimeSeriesPlot from '../TimeSeriesPlot';
import PlotPlaceholder from '../PlotPlaceholder';
import BlockCornerMenu from '../BlockCornerMenu';
import SeriesMenu from '../SeriesMenu';
//import hydfile from '../example_hydrograph.csv';

const ResizableBox = require('react-resizable').ResizableBox;

class RavenTimeSeriesBlock extends React.Component {
  /** Raven Times Series Block
   *  Facilitates data reading and owns data for times series plots. Plot itself is held by PlotManager
   *  to facilitate synced time series scrubbing (horizontal scrolling + subsetting).
   *  Creates modals to import data, has close/reload buttons.
   * 
   * @param {object} props:
   *  - key: int, unique key
   *  - okey: int, unique key duplicate, becayse `key` is not exposed by React
   *  - onClose: function, what happens when block close button is hit
   *  - noClose: bool, whether the plot can be closed (e.g., last plot cannot be closed)
   *  - graphSet: function, used to set/update graph to parent
   *  - graph: DyGraph object (if data) passed from parent (to be passed to child TimeSeriesPlot component)
   */
  constructor(props) {
    super(props);
    this.state = {open:   false,
                  dataType: null,
                  data:   null,
                  file:   null,
                  labels: null,
                  title:  null,
                  visibility: null,
                  ylabel: null};
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onResize = this.onResize.bind(this);
    this.dataImport = this.dataImport.bind(this);
    this.dataReload = this.dataReload.bind(this);
    this.readResponder = this.readResponder.bind(this);
    this.readResponderReload = this.readResponderReload.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  closeModal() {
    /**  Closes child modal used to import data*/
    this.setState({open : false});
  }

  openModal() {
    /** Opens child modal used to import data */
    this.setState({open : true});
  }

  onResize(e,d) {
    /** Resize Handler (blocks can be dragged larger/smaller from bottom)
     * - e, object, synthetic event (unused)
     * - d, object, data with new height (d.size.height)
     */
    const {pHeight} = this.state;
    if (Math.abs(d.size.height - pHeight) >= 5) {
      this.setState({pHeight : d.size.height});
    }
  }

  dataImport(e, d) {
    /** Data Import Handler passed to child modal
     * - e, object, synthetic event (unused)
     * - d, object, with file object/metadata
     */
    //this.closeModal();
    // To reduce calls to setState... (even though React is prettttty smart)
    let fileURL = URL.createObjectURL(d.file.file);
    this.setState({file: d.file.file,
                   fileURL : fileURL,
                   dataType: d.file.dataType,
                   open: false});
    let reader = new FileReader();
    reader.onloadend = this.readResponder;
    reader.readAsText(d.file.file);
  }

  dataReload() {
    /** Non-working data reload function.
     * Browsers don't like it when you re-access files on people's computers without new asking again. */
    const reloadFile = this.state.file;
    // If things were better we could just use dataImport
    let reader = new FileReader();
    reader.onloadend = this.readResponderReload;
    reader.readAsText(reloadFile);
    console.log("RELOAD");
  }

  updateHandler(e) {
    /** Handles state updates from series menu
     * - e: object, synthetic event with name of state property being updated (e.name) and new value (e.value)
    */
    this.setState({[e.name] : e.value});
  }

  readResponder(e) {
    /** Called when the dataImport call to the filereader are done loading the file
     *  Parses the data and applies a default visibility based on data type
     * - e: object, synthetic event returned from FileReader
     */
    const {dataType} = this.state;
    let parsed = raven_csvDate_parse(e.target.result);
    let visible = new Array(parsed['header'].length - 1).fill(false);
    if (dataType === 'hydrograph') {
      // Assume precip in 0, first hydrograph in 1
      visible[1] = true;
      // More checks if there's multiple hydrographs present
      if (parsed['header'].length > 3) {
        // If second hydrograph is "observed" show it
        if (parsed['header'][3].includes('(observed)')) {
          visible[2] = true;
        }
      }
    } else {
      // First value will display
      //TODO defaults for other dataTypes
      visible[0] = true;
    }
    this.setState({data : parsed['data'],
                    labels: parsed['header'],
                    title: parsed['header'][2],
                    visibility: visible,
                    pHeight: 340});
  }

  readResponderReload(e) {
    /** Same as readResponder above, but preserves current visability settings
     * Reload is not working, but the problem is not (likely) with this method
     */
    let visible = [...this.state.visibility];
    let parsed = raven_csvDate_parse(e.target.result);
    //let visible = new Array(parsed['header'].length - 1).fill(false);
    // If there's less/more items then we react
    if (visible.length > parsed['header'].length - 1) {
      visible.slice(0, parsed['header'].length - 1)
    } else if (visible.length < parsed['header'].length - 1) {
      visible.push(...Array((parsed['header'].length - 1) - visible.length).fill(false));
    }
    this.setState({data : parsed['data'],
                   labels: parsed['header'],
                   title: parsed['header'][2],
                   visibility: visible})
  }

  render() {
    const {data, labels, visibility, open, pHeight, title, ylabel} = this.state;
    const {okey, onClose, noClose, graph, graphSet} = this.props;
    const cssFix = {width: '95%', marginLeft: 'auto', marginRight: 'auto', height: pHeight};

    return(
      <div>
        <DataUploadModal onUpload={this.dataImport} open={open} close={this.closeModal} data={data !== null}/>

        {data === null && <PlotPlaceholder text="Empty Time Series Plot"
                                           okey={okey}
                                           onClick={this.openModal}
                                           onClose={onClose}
                                           noClose={noClose}/>}
        {data !== null && <ResizableBox style={cssFix}
                                        resizeHandles={['s']}
                                        onResize={this.onResize}
                                        axis="y"
                                        width={1000} height={pHeight}>
                          <Segment.Group raised horizontal style={{height: pHeight}}>
                            <Segment style={{width:'100%'}}>
                              <TimeSeriesPlot okey={okey}
                                              data={data}
                                              graph={graph}
                                              graphSet={graphSet}
                                              title={title}
                                              labels={labels}
                                              ylabel={ylabel}
                                              visibility={visibility}
                                              height={pHeight-30}/>
                            </ Segment>
                            <Segment style={{width:'330px', overflowY: 'scroll'}}>
                              <BlockCornerMenu close={onClose}
                                               disabled={noClose}
                                               refresh={this.dataReload}
                                               okey={okey}/>
                              <SeriesMenu labels={labels.slice(1)}
                                                selected={visibility} 
                                                onChange={this.updateHandler} />
                            </Segment>
                          </Segment.Group></ResizableBox> }
      </div>
    );
  }
}

//  <SeriesDropdown labels={labels.slice(1)} selected={visibility} onChange={this.updateHandler} /> Depricated menu

export default RavenTimeSeriesBlock;