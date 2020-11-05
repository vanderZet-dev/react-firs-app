import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { maxLength, required } from '../../utils/validators/validators';
import { ValidatedFormControl } from '../Common/FormControls/FormsControls';
import Dialog from './Dialog/Dialog';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {

    let dialogs = props.dialogs;
    let messages = props.messages;

    let dialogsElements = dialogs.map(dialog => (<Dialog id={dialog.id} name={dialog.name} avatar={dialog.avatar} key={dialog.id} />));
    let messagesElements = messages.map(message => (<Message content={message.content} myMessage={message.myMessage} key={message.id} />));

    let onSubmit = (formData) => {
        props.addNewMessage(formData.newMessageText);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>
                    {messagesElements}
                </div>
                <div>
                    <AddMessageReduxForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
}

let maxLengthValidator = maxLength(5);
function AddMessageForm(props) {

    return (
        <Form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newMessageText' placeholder='Enter your message' component={ValidatedFormControl} customFieldType='textarea' validate={required, maxLengthValidator} />
            </div>
            <div>
                <button>Add message</button>
            </div>
        </Form>
    );
}

const AddMessageReduxForm = reduxForm(
    {
        form: 'dialogsAddMessageForm'
    }
)(AddMessageForm);

export default Dialogs;
