import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { maxLength, required } from '../../../utils/validators/validators';
import { ValidatedFormControl } from '../../Common/FormControls/FormsControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const maxLengthValidation = maxLength(10);

const MyPosts = React.memo((props) => {

  let posts = props.posts;
  let postsElements = posts.map(p => (<Post message={p.content} likesCount={p.likesCount} key={p.id} />));

  let onSubmit = (fromData) => {
    props.addNewPost(fromData.newPostText);
  }

  return (
    <div className={s.postsBlock}>
      <h3>
        My posts
      </h3>

      <AddNewPostReduxForm onSubmit={onSubmit} />

      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
}
)

function AddNewPostForm(props) {

  return (
    <Form onSubmit={props.handleSubmit}>
      <div>
        <Field name='newPostText' component={ValidatedFormControl} customFieldType='textarea' placeholder='Enter your post data!!!'
          validate={required, maxLengthValidation} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </Form>
  );
};

const AddNewPostReduxForm = reduxForm({ form: 'AddNewPostForm' })(AddNewPostForm);

export default MyPosts;