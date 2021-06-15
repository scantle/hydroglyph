import React from 'react';
import { Message} from 'semantic-ui-react';
import Mailto from 'react-protected-mailto'
import UWLogo from '../UWLogo.png'

const WelcomeMessage = (props) => (
  /** Small "message" block displaying basic information about Hydroglyph & Raven
   * @param {object} props:
   *  - hidden: bool, whether the block is visible (false) or not (true)
   *  - hideWelcome: function run when block is closed (onDismiss)
   */
  <Message icon
           hidden={props.hidden}
           style={{width: '50%', 
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   marginTop: '1em',
                   textAlign: 'left',
                   backgroundColor:'#ffffff',
                   opacity: 0.84}}
           onDismiss={props.hideWelcome}>
    <img src={UWLogo} alt='Waterloo Logo' height={'110px'}/>
    <Message.Content>
      <Message.Header>A Time Series Visualizer for Raven</Message.Header>
      <p>Hydroglyph displays CSV output files from the 
      <a href="http://raven.uwaterloo.ca/" target="_blank" rel="noopener noreferrer"> Raven Hydrological Modelling Framework </a> 
      developed by the Raven Development Team at the University of Waterloo.</p>
      <p>Hydroglyph was developed by Leland Scantlebury and is still in testing.
        If you encounter a bug, please report it to: <Mailto email='lscantle@uwaterloo.ca' 
                headers={{subject:'Hydroglyph Bug Report'}} /></p>
    </Message.Content>
  </Message>
);

export default WelcomeMessage;