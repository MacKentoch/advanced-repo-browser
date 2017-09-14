// @flow

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import ReactNativeLibs        from './ReactNativeLibs';


const mapStateToProps = (
  state: any
): any => {
  return {
    // views
    currentView:  state.views.currentView
  };
};

const mapDispatchToProps = (
  dispatch: () => any
): any => {
  return bindActionCreators(
    {
      // views
      ...viewsActions
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactNativeLibs);
