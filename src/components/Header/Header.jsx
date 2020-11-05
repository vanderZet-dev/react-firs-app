import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import styles from './Header.module.css';

class Header extends React.Component {

  logout = () => {
    this.props.logout().then(() => this.props.history.push("/profile"));
  };

  render() {
    return (
      <header className={styles.header}>
        <img src='https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg' />
        <div className={styles.loginLink}>
          {
            this.props.isAuth
              ? (
                <div>
                  <div>{'Logged as ' + this.props.email}</div>
                  <div><button onClick={this.logout}>logout</button></div>
                </div>
              )

              : (<NavLink to='/login'>Login</NavLink>)
          }
        </div>
      </header>
    );
  }
}

export default compose(
  withRouter
)(Header);