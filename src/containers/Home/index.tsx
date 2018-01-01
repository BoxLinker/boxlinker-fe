import * as React from 'react';
import { Link } from 'react-router';
import App from '../../components/App';
import { StoreState } from '../../types/index';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../../actions';

export interface Props {
  name: string;
  enthusiasmLevel: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

class Home extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { name, enthusiasmLevel = 1, onIncrement, onDecrement } = this.props;
    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }
    return (
      <App>
        <div className="hello">
          <div className="greeting">
            Hello {name + getExclamationMarks(enthusiasmLevel)}
          </div>
          <div>
            <button onClick={onDecrement}>-</button>
            <button onClick={onIncrement}>+</button>
          </div>
        </div>
        <div>Home ...</div>
        <Link to="/services">Services</Link>
      </App>
    );
  }
}

// function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement }: Props) {
//   if (enthusiasmLevel <= 0) {
//     throw new Error('You could be a little more enthusiastic. :D');
//   }

//   return (
//     <div className="hello">
//       <div className="greeting">
//         Hello {name + getExclamationMarks(enthusiasmLevel)}
//       </div>
//       <div>
//         <button onClick={onDecrement}>-</button>
//         <button onClick={onIncrement}>+</button>
//       </div>
//     </div>
//   );
// }

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  };
}

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home);