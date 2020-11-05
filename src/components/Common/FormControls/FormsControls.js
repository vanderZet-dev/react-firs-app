import React from 'react';
import styles from './FormsControls.module.css';


export const ValidatedFormControl = ({ input, meta, ...props }) => {

    const el = React.createElement(props.customFieldType, { ...input, ...props })
    const showError = meta.error && (meta.visited || meta.touched);

    return (
        <div className={styles.formControl + ' ' + (showError ? styles.error : "")}>
            <div>
                {el}
            </div>
            {showError && <span>{meta.error}</span>}
        </div>
    );
}