import React, { useEffect, useState } from 'react';
import style from './ProfileInfo.module.css';
import errorsStyle from '../../Common/FormControls/FormsControls.module.css';
import EmptyProfilePhoto from '../../../assets/images/emptyUserPhoto.png'
import { ProfileStatusWithHooks } from './ProfileStatusWithHooks';
import { Field, reduxForm } from 'redux-form';
import { ValidatedFormControl } from '../../Common/FormControls/FormsControls';

function ProfileInfo(props) {

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setEditMode(props.profileDataEditMode);
  }, [props.profileDataEditMode]
  );

  let imageSrc = EmptyProfilePhoto;

  if (props?.profile?.photos?.large) {
    imageSrc = props.profile.photos.large;
  }

  const onImageSelected = (event) => {

    if (event.target.files[0]) {

      props.changeProfilePhoto(event.target.files[0]);
    }
  }

  const isMyProfile = props.profile.userId === props.authUserId;

  const onEditProfile = () => {

    props.toggleProfileDataEditMode(true);
  }

  const onLeaveEditMode = () => {

    props.toggleProfileDataEditMode(false);
  }

  const onProfileDataSave = (formData) => {

    props.updateProfileData(formData);
  }

  return (
    <div>
      <div>
        <img className={style.profileHeaderImg} src='https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg' />
      </div>
      <div className={style.descriptionBlock}>
        <div>
          <img src={imageSrc} />
        </div>
        {isMyProfile &&
          <div>
            <div>
              <input type='file' onChange={onImageSelected} />
            </div>
            {!editMode &&
              <div>
                <button onClick={onEditProfile}>Edit profile</button>
              </div>
            }
            {editMode &&
              <div>
                <button onClick={onLeaveEditMode}>Leave edit mode</button>
              </div>
            }
          </div>
        }
        <div>
          USER_ID: {props.profile.userId}
        </div>
        <ProfileStatusWithHooks status={props.profileStatus} updateProfileStatus={props.updateProfileStatus} />
        {!editMode &&
          <ProfileDataViewer profile={props.profile} />
        }
        {editMode &&
          <ProfileDataReduxFormEditor initialValues={props.profile} onSubmit={onProfileDataSave} />
        }
      </div>
    </div>
  );
}

function ProfileDataViewer({ profile }) {

  return (
    <div>
      <div>
        <b>Full name: </b>
        <span>{profile.fullName}</span>
      </div>
      <div>
        <b>About me: </b>
        <span>{profile.aboutMe}</span>
      </div>
      <div>
        <b>Looking for a job: </b>
        <span>{profile.lookingForAJob ? 'Yes' : 'No'}</span>
      </div>
      {profile.lookingForAJob &&
        <div>
          <b>Looking for a job description: </b>
          <span>{profile.lookingForAJobDescription}</span>
        </div>}
      <div>
        <b>Contacts: </b>
        <span>{profile.contacts && Object.keys(profile.contacts).map(key => { return <div>{key}: {profile.contacts[key]}</div> })}</span>
      </div>
    </div>
  );
}

function ProfileDataEditor(props) {

  return (
    <form>
      <div>
        EDIT MODE:
        {props.error &&
          <div className={errorsStyle.commonErrors}>General errors:
            {props.error.map(error =>
            (<div>{error}</div>)
          )}
          </div>}
      </div>
      <div>
        <button onClick={props.handleSubmit}>Save changes</button>
      </div>
      <div>
        <b>Full name: </b>
        <Field name={"fullName"} placeholder={"Enter your full name"} component={ValidatedFormControl} customFieldType='input' />
      </div>
      <div>
        <b>About me: </b>
        <Field name={"aboutMe"} placeholder={"Some about you"} component={ValidatedFormControl} customFieldType='input' />
      </div>
      <div>
        <b>Looking for a job: </b>
        <Field name={"lookingForAJob"} component='input' type={"checkbox"} />Remember me
      </div>
      <div>
        <b>Looking for a job description: </b>
        <Field name={"lookingForAJobDescription"} placeholder={"Enter description about your skills"} component="textarea" />
      </div>
      <div>
        <b>Contacts: </b>
        <span>{props.initialValues.contacts && Object.keys(props.initialValues.contacts).map(key => {
          return (
            <div>
              <b>{key}:</b><Field name={"contacts." + key} component={ValidatedFormControl} customFieldType='input' />
            </div>
          )
        })}</span>
      </div>
    </form>
  );
}

const ProfileDataReduxFormEditor = reduxForm({ form: 'ProfileDataEditor' })(ProfileDataEditor);

export default ProfileInfo;