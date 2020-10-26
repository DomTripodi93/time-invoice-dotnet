import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../invoice/invoice.styles.scss';
import SettingsItem from '../../components/settings/settingsItem';
import { updateSettings } from '../../reducers/user/user.actions';


const SettingsContainer = (props) => {
    const [settings, setSettings] = useState({...props.settings});
    const settingDict = {
        defaultEmail: 'Default Email',
        defaultPointOfContact: "Default Point Of Contact",
        companyName: "Company Name",
        address: "Address",
        state: "State",
        zipCode: "Zip Code",
        defaultPhone: "Default Phone Number"
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setSettings({...settings, [name]: value });
    };

    const submitSettingsForUpdate = () => {
        props.updateSettings(settings);
    }

    return (
        <div className="middle minimal">
            <h3 className='centered'>Settings</h3>
            {Object.keys(settingDict).map(key => (
                <SettingsItem
                    key={key}
                    keyVal={key}
                    title={settingDict[key]}
                    setting={{[key]: settings[key]}} 
                    handleChange={handleChange}
                    submitSettingsForUpdate={submitSettingsForUpdate}/>   
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    settings: state.user.settings
});

const mapDispatchToProps = dispatch => {
    return {
        updateSettings: (settings) => {
            dispatch(updateSettings(settings))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
