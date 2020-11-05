import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addNewMessage } from '../../redux/message-reducer';
import WithAuthRedirectComponent from '../hoc/WithAuthRedirectComponent';
import Dialogs from './Dialogs';

function DialogsContainer(props) {

    return <Dialogs {...props} />
}

let mapStateToPropsForAuth = (state) => {

    return {
        isAuth: state.auth.isAuth
    }
};

let mapStateToProps = (state) => {
    return {
        dialogs: state.messagesModuleData.dialogs.getDialogs(),
        messages: state.messagesModuleData.messages
        // newMessageText: state.messagesModuleData.newMessageText,
    }
};

// let mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewMessageText: (text) => {
//             let action = updateNewMessageTextActionCreator(text);
//             dispatch(action);
//         },
//         addMessage: () => {
//             let action = addMessageActionCreator();
//             dispatch(action);
//         }
//     }
// };

export default compose(
    connect(mapStateToPropsForAuth),
    WithAuthRedirectComponent,
    connect(mapStateToProps, { addNewMessage })
)(DialogsContainer);