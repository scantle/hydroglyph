import React from 'react'
import { Icon } from 'semantic-ui-react';

/*
Props:
 - close (func)
 - refresh (func)
 - disabled (bool)
*/

/* CSS Styles */
const cssFix = {position: 'absolute',
                right: '2px',
                top: '5px'}

const icoStyle = {
  display: 'block',
  marginBottom: '10px'
}

const BlockCornerMenu = (props) => (
  /** Corner buttons for closing/refreshing blocks
   * @param {object} props:
   * - okay: unique block key 
   * - close: function, what happens when close button is hit
   * - disabled: bool, whether the block can be closed (e.g., last plot cannot be closed)
   * - refresh: function, run when refresh ("redo") button is hit
   */
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
          disabled={props.disabled}   //TODO: Refresh really shouldn't be disabled too
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