import React, { useEffect, useState } from 'react';


export const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    },
        [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deActivateEditMode = () => {

        setEditMode(false);
        props.updateProfileStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div onDoubleClick={activateEditMode}>
                    <span>{status}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deActivateEditMode} value={status} onChange={onStatusChange} />
                </div>
            }
        </div>
    );

}