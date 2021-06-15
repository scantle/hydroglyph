import React from 'react'
import { Menu } from 'semantic-ui-react';

class SeriesMenu extends React.Component {
  /** Menu for time series blocks
   *  Currently just changes visibility in plots
   *  //TODO: Should be able to change color, line type as well
   * 
   * @param {object} props:
   *  - labels: str array of names of various time series on plot
   *  - selected: bool array of which series are currently visible
   *  - onChange: function from parent called when a series is (de)selected
   */
  state = {selected : this.props.selected}
  update = this.update.bind(this);

  update(e,d) {
    const {labels} = this.props;
    let {selected} = this.state;
    // Find the updated value's index and flip it
    let index = labels.indexOf(d.name);
    selected[index] = !selected[index];
    // Create Object for passing up
    let update = {name : 'visibility',
                  value : selected}
    this.props.onChange(update);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selected !== prevState.selected) {
      return({selected: nextProps.selected});
    } else {
      return null;
    }
  }

  render() {
    const {labels} = this.props;
    const {selected} = this.state;
    // Generate Menu items
    const options = labels.map((lab,index) => 
        <Menu.Item name={lab} active={selected[index]} onClick={this.update} key={index}>{lab}</Menu.Item>
      );

    return (
        <Menu vertical>
          {options}
        </Menu>
    );
  }
}

export default SeriesMenu;