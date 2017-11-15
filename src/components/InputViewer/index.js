import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'boxlinker-ui'; // eslint-disable-line
import FieldInput from '../FieldInput';

class InputViewer extends React.Component {
  static propTypes = {
    value: PropTypes.string,
  };
  static defaultProps = {
    value: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }
  edit = () => {
    this.setState({
      editMode: true,
    });
  };
  save = () => {
    this.setState({
      editMode: false,
    });
  };
  cancel = () => {
    this.setState({
      editMode: false,
    });
  };
  render() {
    const { editMode } = this.state;
    if (!editMode) {
      return (
        <div>
          <FieldInput staticMode {...this.props} />
          <Button size="sm" theme="default" onClick={this.edit}>
            编辑
          </Button>
        </div>
      );
    }
    return (
      <div>
        <FieldInput {...this.props} />
        <Button size="sm" theme="default" onClick={this.cancel}>
          取消
        </Button>
        <Button size="sm" theme="primary" onClick={this.save}>
          保存
        </Button>
      </div>
    );
  }
}
export default InputViewer;
