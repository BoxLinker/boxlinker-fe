import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'bui';
import FieldInput from 'components/FieldInput';
import FieldSelect from 'components/FieldSelect';
import { cloneDeep } from 'lodash';

const protocolData = [
  {
    label: 'HTTP',
    value: 'HTTP',
  },
  {
    label: 'TCP',
    value: 'TCP',
  },
  {
    label: 'UDP',
    value: 'UDP',
  },
];

class Ports extends React.Component {
  static propTypes = {
    onSave: PropTypes.func,
    data: PropTypes.array, // eslint-disable-line
  };
  static defaultProps = {
    onSave: () => {},
    data: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      data: cloneDeep(props.data),
      editMode: false,
      saving: false,
    };
  }
  getActions() {
    const { editMode, saving } = this.state;
    return editMode ? (
      <div>
        <Button
          onClick={this.save}
          loading={saving}
          theme="primary"
          style={{ margin: '7px 7px 7px 0' }}
        >
          保存
        </Button>
        &nbsp;
        <Button
          onClick={this.cancel}
          theme="default"
          style={{ margin: '7px 7px 7px 0' }}
        >
          取消
        </Button>
      </div>
    ) : (
      <Button
        onClick={this.edit}
        theme="primary"
        style={{ margin: '7px 7px 7px 0' }}
      >
        编辑
      </Button>
    );
  }
  getColumns() {
    const { editMode } = this.state;
    return [
      {
        field: 'port',
        label: '端口',
        render: v => (
          <FieldInput staticMode={!editMode} name="port" value={v} />
        ),
      },
      {
        field: 'protocol',
        label: '协议',
        width: 200,
        render: v => (
          <FieldSelect
            staticMode={!editMode}
            name="port"
            data={protocolData}
            value={v}
          />
        ),
      },
      {
        field: 'path',
        label: '路径',
        render: v => (
          <FieldInput staticMode={!editMode} name="path" value={v} />
        ),
      },
      {
        field: 'operate',
        label: '操作',
        render: (v, item) =>
          editMode ? (
            <Button
              onClick={() => {
                this.removeLine(item);
              }}
            >
              <i className="fa fa-minus" />
            </Button>
          ) : null,
      },
    ];
  }
  removeLine(item) {
    const { data } = this.state;
    const d = cloneDeep(data); // 这里一定要给 state 设置新的数组
    for (let i = 0; i < d.length; i += 1) {
      const k = d[i];
      if (k.id === item.id) {
        d.splice(i, 1);
        break;
      }
    }
    this.setState({
      data: d,
    });
  }
  edit = () => {
    this.setState({
      editMode: true,
    });
  };
  cancel = () => {
    this.setState({
      editMode: false,
      data: this.props.data,
    });
  };
  save = () => {
    const result = this.props.onSave();
    if (result && result.fianlly) {
      this.setState({
        saving: true,
      });
      result.fianlly(() => {
        this.setState({
          saving: false,
          editMode: false,
        });
      });
    } else {
      this.setState({
        editMode: false,
      });
    }
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <label className="control-label" htmlFor="grid">
          端口
        </label>
        <Grid hover rowKey="id" columns={this.getColumns()} data={data} />
        {this.getActions()}
      </div>
    );
  }
}

export default Ports;
