import React from 'react';
import { Divider, Segment, Grid, Header, Icon } from 'semantic-ui-react';
import DataUploadModal from '../components/Raven/RavenTSUploadModal';
import raven_csvDate_parse from '../tools/csvparse';
//import SeriesDropdown from './SeriesDropdown';
import SeriesMenu from '../components/SeriesMenu';
import TimeSeriesPlot from '../components/TimeSeriesPlot';
//import hydfile from '../example_hydrograph.csv';

class Hydrograph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open:   true,
                  data:   null,
                  file:   null,
                  labels: null,
                  title:  null,
                  visibility: null,
                  ylabel: 'Streamflow'};
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.dataImport = this.dataImport.bind(this);
    this.dataReload = this.dataReload.bind(this);
    this.readResponder = this.readResponder.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  closeModal() {
    this.setState({open : false});
  }

  openModal() {
    this.setState({open : true});
  }

  dataImport(e) {
    //this.closeModal();
    // To reduce calls to setState... (even though React is prettttty smart)
    this.setState({file: e.target.files[0],
                   open: false});
    let reader = new FileReader();
    reader.onloadend = this.readResponder;
    reader.readAsText(e.target.files[0]);
  }

  dataReload() {
    this.dataImport = this.dataImport.bind(this);
    const reloadFile = this.state.file;
    // If things were better we could just use dataImport
    let reader = new FileReader();
    reader.onloadend = this.readResponder;
    reader.readAsText(reloadFile);
  }

  updateHandler(e) {
    this.setState({[e.name] : e.value});
  }

  readResponder(e) {
      let parsed = raven_csvDate_parse(e.target.result);
      let visible = new Array(parsed['header'].length - 1).fill(false);
      // TODO: What if there's no hydrographs in the file?!

      // Assume precip in 0, first hydrograph in 1
      visible[1] = true;
      // If second hydrograph is "observed" show it
      if (parsed['header'][3].includes('(observed)')) {
        visible[2] = true;
      }
      this.setState({data : parsed['data'],
                     labels: parsed['header'],
                     title: parsed['header'][2],
                     visibility: visible,
                     pHeight: 450});
  }

  render() {
    const {data, labels, visibility, open, pHeight, title, ylabel} = this.state;
    const cssFix = {marginTop : pHeight + 20,
                    marginLeft : 'auto',
                    marginRight : 'auto',
                    width : '80%'};

    return(
      <div>
        <DataUploadModal onUpload={this.dataImport} open={open} close={this.closeModal} data={data !== null}/>
        {data !== null && <div>
                            <TimeSeriesPlot data={data}
                                            title={title}
                                            labels={labels}
                                            ylabel={ylabel}
                                            visibility={visibility}
                                            height={pHeight}/>
                            <Divider hidden />
                            <Segment style={cssFix}>
                              <Grid columns={3} divided>
                                <Grid.Column>
                                  <Header size='small'>Displayed Series</Header>
                                  <SeriesMenu labels={labels.slice(1)} selected={visibility} onChange={this.updateHandler} />
                                </Grid.Column>
                                <Grid.Column>
                                  <Header size='small'>Plot Properties</Header>
                                </Grid.Column>
                                <Grid.Column>
                                  <Header size='small'>Information</Header>
                                  <Icon link name='redo alternate' onClick={this.dataReload} />
                                </Grid.Column>
                            </Grid>
                            </Segment>
                          </div> }
      </div>
    );
  }
}

//                                  <SeriesDropdown labels={labels.slice(1)} selected={visibility} onChange={this.updateHandler} />

export default Hydrograph;