import { connect } from 'react-redux';
import NavBar from './Navbar';

let mapStateToProps = (state) => {
  return {
    friends: state.friends
  }
}

let mapDispatchToProps = (dispatch) => {
  return {

  }
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarContainer;