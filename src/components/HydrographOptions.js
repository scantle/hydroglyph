import React from 'react'
import { Grid, Header, Icon } from 'semantic-ui-react';
import SeriesMenu from './SeriesMenu';

/* 
Props:
 - labels
 - visibility
 - updateHandler (func)
 - dataReload (func)
*/

const HydrographOptions = (props) => (
                              <Grid columns={3} divided>
                                <Grid.Column>
                                  <Header size='small'>Displayed Series</Header>
                                  <SeriesMenu labels={props.labels}
                                              selected={props.visibility} 
                                              onChange={props.updateHandler} />
                                </Grid.Column>
                                <Grid.Column>
                                  <Header size='small'>Plot Properties</Header>
                                </Grid.Column>
                                <Grid.Column>
                                  <Header size='small'>Information</Header>
                                  <Icon link name='redo alternate' onClick={props.dataReload} />
                                </Grid.Column>
                              </Grid>
);

export default HydrographOptions