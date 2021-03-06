import React from 'react';
import {Segment} from 'semantic-ui-react';
import DataUploadModal from './RavenTSUploadModal';
import raven_csvDate_parse from '../../tools/csvparse';
//import SeriesDropdown from './SeriesDropdown';
import TimeSeriesPlot from '../TimeSeriesPlot';
import PlotPlaceholder from '../PlotPlaceholder';
import BlockCornerMenu from '../BlockCornerMenu';
import RavenPlotOptions from './RavenPlotOptions';
//import hydfile from '../example_hydrograph.csv';

class RavenTimeSeriesBlock extends React.Component {
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
    this.dataImport = this.dataImport.bind(this);
    this.dataReload = this.dataReload.bind(this);
    this.readResponder = this.readResponder.bind(this);
    this.readResponderReload = this.readResponderReload.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  closeModal() {
    this.setState({open : false});
  }

  openModal() {
    this.setState({open : true});
  }

  dataImport(e, d) {
    //this.closeModal();
    // To reduce calls to setState... (even though React is prettttty smart)
    this.setState({file: d.file.file,
                   dataType: d.file.dataType,
                   open: false});
    let reader = new FileReader();
    reader.onloadend = this.readResponder;
    reader.readAsText(d.file.file);
  }

  dataReload() {
    const reloadFile = this.state.file;
    // If things were better we could just use dataImport
    let reader = new FileReader();
    reader.onloadend = this.readResponderReload;
    reader.readAsText(reloadFile);
  }

  updateHandler(e) {
    this.setState({[e.name] : e.value});
  }

  readResponder(e) {
      const {dataType} = this.state;
      let parsed = raven_csvDate_parse(e.target.result);
      let visible = new Array(parsed['header'].length - 1).fill(false);
      if (dataType === 'hydrograph') {
        // Assume precip in 0, first hydrograph in 1
        visible[1] = true;
        // If second hydrograph is "observed" show it
        if (parsed['header'][3].includes('(observed)')) {
          visible[2] = true;
        }
      } else {
        // First value will display
        visible[0] = true;
      }
      this.setState({data : parsed['data'],
                     labels: parsed['header'],
                     title: parsed['header'][2],
                     visibility: visible,
                     pHeight: 400});
  }

  readResponderReload(e) {
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
    const {data, labels, visibility, open, pHeight, title, ylabel, dataType} = this.state;
    const {okey, onClose, noClose} = this.props;
    const cssFix = {marginTop : pHeight + 20,
                    marginLeft : 'auto',
                    marginRight : 'auto',
                    paddingTop : '10px',
                    width: '90%'};

    return(
      <div>
        <DataUploadModal onUpload={this.dataImport} open={open} close={this.closeModal} data={data !== null}/>

        {data === null && <PlotPlaceholder text="Empty Time Series Plot"
                                           okey={okey}
                                           onClick={this.openModal}
                                           onClose={onClose}
                                           noClose={noClose}/>}
        {data !== null && <Segment style={{width: '90%', marginLeft : 'auto', marginRight : 'auto'}} raised color='blue'>
                            <BlockCornerMenu close={onClose}
                                             disabled={noClose}
                                             refresh={this.dataReload}
                                             okey={okey}/>
                            <TimeSeriesPlot data={data}
                                            title={title}
                                            labels={labels}
                                            ylabel={ylabel}
                                            visibility={visibility}
                                            height={pHeight}/>
                            <Segment style={cssFix} >
                              <RavenPlotOptions dataType={dataType}
                                                updateHandler={this.updateHandler}
                                                visibility={visibility}
                                                labels={labels}/>
                            </Segment>
                          </Segment> }
      </div>
    );
  }
}

//  <SeriesDropdown labels={labels.slice(1)} selected={visibility} onChange={this.updateHandler} />

export default RavenTimeSeriesBlock;