import React from 'react';
import PropTypes from 'prop-types';
import FieldSelect from 'components/FieldSelect';
import { isFunction } from 'lodash';
import { Button } from 'bui';

const logger = console;
class SaveableSelect extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.string,
    onSave: PropTypes.func,
  };
  static defaultProps = {
    label: '',
    value: '',
    data: [],
    onSave: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      saveable: false,
      loading: false,
    };
  }
  onChange = ({ value }) => {
    this.setState({
      value,
      saveable: value !== this.props.value,
    });
  };
  onCancel = () => {
    const { value } = this.props;
    this.setState({
      value,
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
    const { name, label, data } = this.props;
    const { value, loading } = this.state;
    const saveable = this.props.value !== value;
    return (
      <div>
        <FieldSelect
          name={name}
          label={label}
          value={value}
          data={data}
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
