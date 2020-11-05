import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import s from './App.module.css';
import Music from './components/Music/Music';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
// import DialogsContainer from './components/Dialogs/DialogsContainer';

import NavBarContainer from './components/Navbar/NavbarContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initialize } from './redux/initial-reducer';
import Loader from './components/Common/Loader/Loader';
// import UsersContainerWithHooks from './components/Users/UsersContainerWithHooks';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import ProfileContainerWithHooks from './components/Profile/ProfileContainerWithHooks';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainerWithHooks = React.lazy(() => import('./components/Users/UsersContainerWithHooks'));

class App extends React.Component {

  componentDidMount() {
    this.props.initialize();
  };

  render() {
    if (!this.props.isInitialized) {
      return <Loader />
    }
    else return (
      <BrowserRouter>
        <div className={s.appWrapper}>
          <HeaderContainer />
          <NavBarContainer />
          <div className={s.appWrapperContent}>
            <Switch>

            <Route exact path='/' render={() => (<Redirect to='/profile' />)} />

              <Route path='/profile/:userId?' render={() => (<ProfileContainerWithHooks />)} />
              <Route path='/dialogs' render={() => {
                return <React.Suspense fallback={<div>Loading...</div>}><DialogsContainer /></React.Suspense>
              }} />

              <Route path='/news' component={News} />
              <Route path='/music' component={Music} />
              <Route path='/settings' component={Settings} />
              <Route path='/login' component={Login} />

              <Route path='/users' render={() => {
                return <React.Suspense fallback={<div>Loading...</div>}><UsersContainerWithHooks pageTitle={"Самураи"} /></React.Suspense>
              }} />


              <Route path='*' render={() => <div>404 NOT FOUND</div>} />
            </Switch>

          </div>
        </div>
      </BrowserRouter>
    )
  }
}


let mapStateToProps = (state) => {

  return {
    isInitialized: state.initial.isInitialized
  }

}

const ComposedApp = compose(
  connect(mapStateToProps, { initialize })
)(App);


const MainApp = () => {
  return <Provider store={store}>
    <ComposedApp />
  </Provider>
}

export default MainApp;

