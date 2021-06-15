import React from 'react'
import { Dropdown, Header } from 'semantic-ui-react';

class SeriesDropdown extends React.Component {
  /** 
   * Dropdown menu for selecting visible series
   */
  state = {selected : this.props.selected}
  update = this.update.bind(this);

  update(e,d) {
    // Translate back to bool for dygraph
    let bools = [];
    for (let i=0; i < d.options.length; i++) {
      bools[i] = d.value.includes(d.options[i]['value']);
    }
    // Replace values for passing up
    e.target.name = 'visibility';
    d.value = bools;
    this.props.onChange(e,d);
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
    const options = labels.map((lab,index) =>
      ({key: index, text: lab, value: lab}));

    // I swear there must be a simpler way to do this
    let selectedString = [];
    for (let i=0; i < selected.length; i++) {
      if (selected[i]) {
        selectedString.push(labels[i]);
      }
    }

    console.log(selected);

    return (
        <Dropdown selection multiple options={options} search 
                  value={selectedString} onChange={this.update} />
    );
  }
}

export default SeriesDropdown;