import React from 'react'
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import BlockCornerMenu from './BlockCornerMenu';

const pholder = {marginTop: 20,
  marginLeft : 'auto',
  marginRight : 'auto',
  width : '90%'}

const PlotPlaceholder = (props) => (
  /** Plot Placeholder, shown when there is no data loaded yet for a graph
   *  Someday could have additional button facilitating the creation of different types of blocks
   *  (not just time series)
   * @param {object} props:
   *  - text: str of text to display
   *  - okey: int, unique key of block
   *  - onClick: function, run when import data button is pressed
   *  - onClose: function, what happens when block close button is hit
   *  - noClose: bool, whether the plot can be closed (e.g., last plot cannot be closed)
   */
  <Segment placeholder style={pholder}>
    <BlockCornerMenu disabled={props.noClose} close={props.onClose} okey={props.okey}/>         
    <Header as='h2' icon textAlign='center' className='beforefix' >
      <Icon name='area graph' circular />
      {props.text}
    </Header>
    
    <Button primary onClick={props.onClick}>Import data</Button>
  </Segment>
)

export default PlotPlaceholder