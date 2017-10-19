import React from 'react';
import PropTypes from 'prop-types';
import { isArray, assign } from 'lodash';

export class Form extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    getElements: PropTypes.func,
    onSubmit: PropTypes.func,
  };
  static defaultProps = {
    getElements: () => null,
    onSubmit: () => {},
  };
  onSubmit = e => {
    e.preventDefault();
    const eles = this.props.getElements();
    const pms = [];
    eles.forEach(ele => {
      pms.push(ele.validation());
    });
    Promise.all(pms).then(
      data => {
        let results = {};
        if (isArray(data)) {
          results = assign({}, ...data);
        }
        this.props.onSubmit(results, null);
      },
      reason => {
        this.props.onSubmit(null, reason);
      },
    );
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.props.children}
      </form>
    );
  }
}

export default Form;
