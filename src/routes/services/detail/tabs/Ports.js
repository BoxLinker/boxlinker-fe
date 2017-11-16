import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'bui';
import FieldInput from 'components/FieldInput';
import FieldSelect from 'components/FieldSelect';

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

const data = [
  {
    id: 1,
    port: '8080',
    protocol: 'TCP',
    path: '/test',
  },
  {
    id: 2,
    port: '5678',
    protocol: 'HTTP',
    path: '/test',
  },
  {
    id: 4,
    port: '8080',
    protocol: 'TCP',
    path: '/test',
  },
];

class Ports extends React.Component {
  static propTypes = {
    onSave: PropTypes.func,
  };
  static defaultProps = {
    onSave: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
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
        render: () =>
          editMode ? (
            <Button>
              <i className="fa fa-minus" />
            </Button>
          ) : null,
      },
    ];
  }
  edit = () => {
    this.setState({
      editMode: true,
    });
  };
  cancel = () => {
    this.setState({
      editMode: false,
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
