import React from 'react'
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import BlockCornerMenu from './BlockCornerMenu';

const pholder = {marginTop: 20,
  marginLeft : 'auto',
  marginRight : 'auto',
  width : '90%'}

const PlotPlaceholder = (props) => (
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