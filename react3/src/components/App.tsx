import React, { FunctionComponent } from 'react';
import ContainerModel from '../model/Container';
import Container from './Container';
import { connect } from 'react-redux';

const App: FunctionComponent<{
  container: ContainerModel
}> = (props) => {
  console.log('app', props.container.label);
  return <Container container={props.container} />;
};

const mapStateToProps = function (state) {
  return { container: state };
}

export default connect(mapStateToProps)(App);
