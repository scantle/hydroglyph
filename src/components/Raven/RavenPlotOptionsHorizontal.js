import React from 'react';
import {Accordion, Icon} from 'semantic-ui-react';
import HydrographOptions from '../HydrographOptions';

class RavenPlotOptions extends React.Component {
  state = {open : true};

  accordionFlip = this.accordionFlip.bind(this);

  accordionFlip() {
    this.setState({open : !this.state.open});
  }

  render() {
    const {open} = this.state;
    const {labels, visibility, updateHandler} = this.props;
    const optTitle = {textAlign: 'left', paddingTop: 0, paddingBottom: 0}

    return(
      <Accordion>
        <Accordion.Title active={open} index={1} onClick={this.accordionFlip} style={optTitle}>
          <Icon name='dropdown' />
          Plot Options
        </Accordion.Title>
        <Accordion.Content active={open} index={1}>
        <HydrographOptions labels={labels.slice(1)}
                           visibility={visibility}
                           updateHandler={updateHandler}
                           dataReload={this.dataReload} />
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default RavenPlotOptions;