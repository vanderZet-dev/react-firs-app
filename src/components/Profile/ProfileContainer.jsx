import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile, getProfileStatus, updateProfileStatus } from '../../redux/profile-reducer';
import Loader from '../Common/Loader/Loader';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        if (userId) {
            this.props.getProfile(userId);
            this.props.getProfileStatus(userId);
        }
    };

    componentDidUpdate() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
    }

    render() {
        return (
            <div>
                {this.props.isFetching ? <Loader /> : null}
                <Profile profile={{ ...this.props.profile }} profileStatus={this.props.profileStatus} updateProfileStatus={this.props.updateProfileStatus} />
            </div>

        );
    };
};

let mapStateToProps = (state) => {

    return {
        profile: state.profileModuleData.profile,
        profileStatus: state.profileModuleData.profileStatus,
        isFetching: state.profileModuleData.isFetching,
        authUserId: state.auth.userId
    }

};

export default compose(
    withRouter,
    connect(mapStateToProps, { getProfile, getProfileStatus, updateProfileStatus})
)(ProfileContainer);