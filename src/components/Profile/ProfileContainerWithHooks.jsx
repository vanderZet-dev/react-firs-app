import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile, getProfileStatus, updateProfileStatus, changeProfilePhoto, updateProfileData, toggleProfileDataEditMode } from '../../redux/profile-reducer';
import Loader from '../Common/Loader/Loader';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

function ProfileContainerWithHooks(props) {

    useEffect(() => {

        let userId = props.match.params.userId;

        if (!userId) {
            userId = props.authUserId;
            if (!userId) {
                props.history.push("/login");
            }
        }
        if (userId) {
            props.getProfile(userId);
            props.getProfileStatus(userId);
        }
    }, [props.match.params.userId, props.authUserId]);

    return (
        <div>
            {props.isFetching ? <Loader /> : null}
            <Profile profile={{ ...props.profile }}
                profileDataEditMode={props.profileDataEditMode}
                profileStatus={props.profileStatus}
                authUserId={props.authUserId}

                updateProfileStatus={props.updateProfileStatus}
                changeProfilePhoto={props.changeProfilePhoto}
                updateProfileData={props.updateProfileData}
                toggleProfileDataEditMode={props.toggleProfileDataEditMode}
            />
        </div>

    );

};

let mapStateToProps = (state) => {

    return {
        profile: state.profileModuleData.profile,
        profileStatus: state.profileModuleData.profileStatus,
        isFetching: state.profileModuleData.isFetching,
        profileDataEditMode: state.profileModuleData.profileDataEditMode,
        authUserId: state.auth.userId
    }

};

export default compose(
    withRouter,
    connect(mapStateToProps, { getProfile, getProfileStatus, updateProfileStatus, changeProfilePhoto, updateProfileData, toggleProfileDataEditMode })
)(ProfileContainerWithHooks);