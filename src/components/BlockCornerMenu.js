import React from 'react'
import { Icon } from 'semantic-ui-react';

/*
Props:
 - close (func)
 - refresh (func)
 - disabled (bool)
*/

const cssFix = {position: 'absolute',
                right: '2px',
                top: '5px'}

const icoStyle = {
  display: 'block',
  marginBottom: '10px'
}

const BlockCornerMenu = (props) => (
  <div style={cssFix} >
    <Icon name='close' link
          okey={props.okey}
          onClick={props.close}
          disabled={props.disabled}
          size='large'
          style={icoStyle}/>
    <Icon name='redo alternate' link
          okey={props.okey}
          onClick={props.refresh}
          disabled={props.disabled}
          size='large'
          style={icoStyle}/>
  </div>
);

//    <Icon name='close' link onClick={props.close} disabled={props.disabled}/>
//    <Icon name='redo alternate' link onClick={props.refresh} disabled={props.disabled} />

/*
  <Button.Group vertical icon basic style={cssFix}>
    <Button icon='close' />
    <Button icon='redo alternative' />
  </Button.Group>

*/

export default BlockCornerMenu