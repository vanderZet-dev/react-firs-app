import React from 'react';


export class ProfileStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            status: this.props.status
        }
    }

    activateEditMode = () => {
        this.setState(
            {
                editMode: true
            }
        );
    }

    deActivateEditMode = () => {
        this.setState(
            {
                editMode: false
            }
        );
        this.props.updateProfileStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({ status: e.currentTarget.value });
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.status != prevProps.status) {
            this.setState({
                ...this.state,
                status: this.props.status
            });
        }
    }

    render() {

        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.state.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={this.deActivateEditMode} value={this.state.status} onChange={this.onStatusChange} />
                    </div>
                }
            </div>
        );
    }
}