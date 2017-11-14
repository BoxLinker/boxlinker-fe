import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {
  static propTypes = {
    rowKey: PropTypes.string,
    rowValue: PropTypes.string,
  };
  static defaultProps = {
    rowKey: 'id',
    rowValue: 'value',
  };
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
    };
  }
  addLines(lines) {
    if (!lines) {
      return;
    }
    if (!Array.isArray(lines)) {
      this.addLines([lines]);
      return;
    }
    this.setState({
      lines: [].concat(this.state.lines).concat(lines),
    });
  }
  render() {
    const { rowKey, rowValue } = this.props;
    const { lines } = this.state;
    return (
      <ul>
        {lines.map((line, k) => (
          <li key={line[rowKey] || k}>{line[rowValue]}</li>
        ))}
      </ul>
    );
  }
}
