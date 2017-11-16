import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import { Button } from 'bui';
import FieldToggle from './index';

const logger = console;
class SaveableSelect extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    checked: PropTypes.bool,
    onSave: PropTypes.func,
  };
  static defaultProps = {
    label: '',
    checked: false,
    data: [],
    onSave: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
      saveable: false,
      loading: false,
    };
  }
  onChange = ({ target: { checked } }) => {
    this.setState({
      checked,
      saveable: checked !== this.props.checked,
    });
  };
  onCancel = () => {
    const { checked } = this.props;
    this.setState({
      checked,
    });
  };
  onSave = () => {
    const result = this.props.onSave();
    if (result && isFunction(result.then)) {
      this.setState({
        loading: true,
      });
      result
        .catch(e => {
          logger.log('SaveableSelect save error', e); // TODO 添加错误输出
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    }
  };
  render() {
    const { name, label } = this.props;
    const { checked, loading } = this.state;
    const saveable = this.props.checked !== checked;
    return (
      <div>
        <FieldToggle
          name={name}
          label={label}
          checked={checked}
          onChange={this.onChange}
        />
        <Button
          loading={loading}
          disabled={!saveable}
          theme="primary"
          onClick={this.onSave}
        >
          保存
        </Button>
        &nbsp;
        {!loading && saveable ? (
          <Button theme="default" onClick={this.onCancel}>
            取消
          </Button>
        ) : null}
      </div>
    );
  }
}

export default SaveableSelect;
