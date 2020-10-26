import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateSettings } from '../../reducers/user/user.actions';
import FormInput from '../../shared/elements/form-input/form-input.component';
import save from '../../shared/assets/save.png';
import cancel from '../../shared/assets/cancel.png';
import edit from '../../shared/assets/Edit.png';
import '../../containers/invoice/invoice.styles.scss';


const SettingsItem = (props) => {
    const setting = props.setting[props.keyVal];
    const [addMode, setAddMode] = useState(false);
    const submitSettingsForUpdate = () => {
        props.submitSettingsForUpdate();
        showSettingForm();
    }
    const handleChange = props.handleChange;

    const showSettingForm = () => {
        setAddMode(!addMode);
    }

    return (
        <div>
            <hr />
            <h4 className="centered">{props.title}</h4>
            <hr />
            <div className="grid90">
                {addMode ?
                    <div>
                        <form onSubmit={submitSettingsForUpdate} className="slight-drop">
                            <FormInput
                                className="slight-drop"
                                label={props.title}
                                type='text'
                                name={props.keyVal}
                                value={setting}
                                onChange={handleChange} />
                        </form>
                    </div>
                    :
                    <div>
                        {setting ?
                            <h5>
                                {setting}
                            </h5>
                            :
                            <h5>
                                Please add your {props.title}
                            </h5>
                        }
                    </div>
                }
                {addMode ?
                    <div className="grid50">
                        <img 
                            className="icon" 
                            onClick={submitSettingsForUpdate}
                            src={save}
                            alt="save" />
                        <img 
                            className="icon" 
                            onClick={showSettingForm}
                            src={cancel}
                            alt="cancel" />
                    </div>
                    :
                    <div className="grid100">
                            <img 
                                className="icon" 
                                onClick={showSettingForm}
                                src={edit}
                                alt="edit" />
                    </div>
                }
            </div>
        </div>
    )
}


export default SettingsItem;