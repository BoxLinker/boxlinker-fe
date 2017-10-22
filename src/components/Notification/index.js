import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.pcss';
import Item from './Item';

class Notification extends React.Component {
  static contextTypes = {
    event: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    this.context.event.on('app.notification', this.showNotification);
  }
  componentWillUnmount() {
    this.context.event.off('app.notification', this.showNotification);
  }
  onRemoveItem = id => {
    const { list } = this.state;
    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      if (item.id === id) {
        list.splice(i, 1);
      }
    }
    this.setState({
      list,
    });
  };
  getOne(data) {
    return data
      ? <Item key={data.id} data={data} onRemove={this.onRemoveItem} />
      : null;
  }
  showNotification = data => {
    const list = this.state.list.concat({
      id: `appNotification-${Date.now()}`,
      ...data,
    });
    this.setState({
      list,
    });
  };
  render() {
    const list = this.state.list.map(item => this.getOne(item));
    return (
      <div className={s.root}>
        {list}
      </div>
    );
  }
}
export default withStyles(s)(Notification);
