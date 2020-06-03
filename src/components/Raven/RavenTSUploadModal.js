import React from 'react';
import { Modal, Icon, Button, Divider, Input, Message, Menu} from 'semantic-ui-react';

class DataUploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file:     null,
                  dataType: null,
                  fileTypes: [
                    {key: 'hydrograph', name: 'Hydrograph'},
                    {key: 'storage', name: 'Watershed Storage'},
                    {key: 'forcing', name: 'Forcing Functions'},
                    {key: 'custom', name: 'Custom Output'},
                    ]   };
    this.fileSelect = this.fileSelect.bind(this);
    this.fileTypeChange = this.fileTypeChange.bind(this);
  }

  fileSelect(e,d) {
    const file = e.target.files[0];
    var dataType = 'custom' // if all else fails, custom is assumed
    // Raven output names, by default, are pretty straight forward
    if (file.name.toLowerCase().match('hydrograph') !== null) {
      dataType = 'hydrograph';
    } else if (file.name.toLowerCase().match('forcing') !== null) {
      dataType = 'forcing';
    } else if (file.name.toLowerCase().match('storage') !== null) {
      dataType = 'storage';
    }
    this.setState({file: file,
                dataType: dataType});
  }

  fileTypeChange(e,d) {
    this.setState({dataType: d.name});
  }

  render() {
    const {open, onUpload, close} = this.props;
    const {file, fileTypes, dataType} = this.state;
    const result = {file : file, dataType : dataType}

    const fileMenuItems = fileTypes.map((item, index) =>
      <Menu.Item name={item.key} active={item.key===dataType} content={item.name} onClick={this.fileTypeChange} key={index} />
    );

    //const {fileSelected} = this.state;

    return(
      <div>
        <Modal dimmer='inverted' open={open} >
        
          <Modal.Header><Icon name='upload'/>Import Raven Output File</Modal.Header>
        
          <Modal.Content>
          Import a Raven output file you wish you visualize using Hydroglyph.
          <Divider hidden />
          <Message>
          Files are <i>not</i> uploaded to a server and remain on your computer.
          </Message>
          
          <Input type="file" onChange={this.fileSelect} accept=".csv" />

          <Menu onChange={this.fileTypeChange}>
            <Menu.Item header><Icon name='file' />File Type</Menu.Item>
            {fileMenuItems}
          </Menu>

          </Modal.Content>

          <Modal.Actions>
            <Button color="black" onClick={close} disabled={false} icon><Icon name="close" /> Close</Button>
            <Button color="teal"  onClick={onUpload} disabled={file == null} icon file={result}><Icon name="upload" /> Import File</Button>
        </Modal.Actions>

        </Modal>
      </div>
    );
  }
}

//<Button color="green" onClick={this.importFile} icon disabled={!fileSelected}>Import</Button>

export default DataUploadModal;