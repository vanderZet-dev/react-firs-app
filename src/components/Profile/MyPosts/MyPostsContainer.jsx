import { connect } from 'react-redux';
import { compose } from 'redux';
import { addNewPost } from '../../../redux/profile-reducer';
import { postsSelector } from '../../../redux/profile-selectors';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {

  return {
    posts: postsSelector(state.profileModuleData)
  }
}

export default compose(
  connect(mapStateToProps, { addNewPost })
)(MyPosts);