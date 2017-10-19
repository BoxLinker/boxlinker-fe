import React from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Form, Field, Select, Option } from 'bui';
import s from './index.css';

class Comp extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Form>
            <Field name="name" rules={['required']}>
              <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Field>
            <button type="submit" className="btn btn-primary">
              提交
            </button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Comp);
