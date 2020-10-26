import React from 'react';

import {
    CustomizedButton,
    CustomizedDiv,
    ButtonText
} from './custom-button.styles';

const CustomButton = ({ label, buttonStyle, action, inactive }) => (
    <div className="grid100">
        {inactive?
            <CustomizedDiv className={buttonStyle}>
                <ButtonText className={buttonStyle}>{label}</ButtonText>
            </CustomizedDiv>
            :
            <CustomizedButton onClick={action} className={buttonStyle}>
                <ButtonText className={buttonStyle}>{label}</ButtonText>
            </CustomizedButton>
        }
    </div>
);

export default CustomButton;
