import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { required } from '../../utils/validators/validators';
import { ValidatedFormControl } from '../Common/FormControls/FormsControls';
import styles from '../Common/FormControls/FormsControls.module.css';

function Login(props) {

    const onSubmit = (formData) => {
        props.login(formData);
    }

    if (props.isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div>
            <h1>LOGIN</h1>

            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>);
}

const LoginFrom = (props) => {

    let errors;
    if (props.error) {
        errors = props.error.map((e) => (<div>{e}</div>))
    }


    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"login"} placeholder={"username"} component={ValidatedFormControl} customFieldType='input' validate={required} />
            </div>
            <div>
                <Field name={"password"} placeholder={"password"} component={ValidatedFormControl} customFieldType='input' type='password' validate={required} />
            </div>
            <div>
                <Field name={"rememberMe"} component='input' type={"checkbox"} />Remember me
            </div>
            {
                errors &&
                <div className={styles.commonErrors}>
                    {errors}
                </div>
            }

            <div>
                <button type='submit'>Login</button>
            </div>

            {props.captchaUrl &&
                <div>
                    <div>
                        <img src={props.captchaUrl} />
                    </div>
                    <div>
                        <Field name={"captcha"} component='input' type={"text"} placeholder={"Enter captcha"}/>
                    </div>
                </div>
            }


        </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginFrom);

const mapStateToProps = (state) => {
    return ({
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    });
}

export default connect(mapStateToProps, { login })(Login);