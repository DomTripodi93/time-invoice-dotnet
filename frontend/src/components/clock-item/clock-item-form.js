import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { addClockItem, updateClockItem } from '../../reducers/clock-item/clock-item.actions';
import CustomButton from '../../shared/elements/button/custom-button.component';
import FormInput from '../../shared/elements/form-input/form-input.component';
import helpers from '../../shared/helpers';
import FormSelect from '../../shared/elements/form-select/form-select.component';


const ClockItemForm = props => {
    const helper = new helpers();
    const [clockItemInfo, setClockItemInfo] = useState({
        date: helper.getCurrentDate(),
        startTime: helper.getCurrentTime(),
        endTime: helper.getCurrentTime(),
        customer: "None",
        hours: 0,
        invoiced: false
    });

    const [invalidState, setInvalidState] = useState(true);

    const [customerOptions, setCustomerOptions] = useState([{ value: "None", label: "None" }])

    const setUpCustomerOptions = useCallback(() => {
        props.customers.forEach(customer => {
            setCustomerOptions((customers => {
                return [...customers, {
                    value: customer.companyName, label: customer.companyName
                }]
            }))
        })
    }, [props])
    
    useEffect(() => {
        setUpCustomerOptions();
    }, [setUpCustomerOptions])

    useEffect(() => {
        let effectHelper = new helpers();
        if (props.editMode) {
            setClockItemInfo({
                ...props.clockItemInput,
                date: props.clockItemInput.date.split('T')[0],
                startTime: effectHelper.timeFromDate(props.clockItemInput.startTime),
                endTime: effectHelper.timeFromDate(props.clockItemInput.endTime)
            });
        }
    }, [props])

    const { date, startTime, endTime, customer } = clockItemInfo;

    const handleSubmit = async event => {
        event.preventDefault();
        let clockItemToSubmit = {
            ...clockItemInfo, 
            startTime: [clockItemInfo.date, clockItemInfo.startTime].join("T"),
            endTime: [clockItemInfo.date, clockItemInfo.endTime].join("T"),
            hours: helper.getHoursDifference(
                clockItemInfo.startTime,
                clockItemInfo.endTime)
        }
        if (props.editMode) {
            if (clockItemInfo !== props.clockItemInput) {
                props.updateClockItem(clockItemToSubmit, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.addClockItem(clockItemToSubmit, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        if (name === "customer" & value !== "None"){
            setInvalidState(false);
        } else if (name === "customer" & value === "None"){
            setInvalidState(true);
        }
        
        setClockItemInfo({ ...clockItemInfo, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a Time
                </h3>
                :
                <h3 className='centered'>
                    {props.clockItemInput.customer} - {helper.dateForDisplay(props.clockItemInput.startTime)}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Date'
                    type='date'
                    name='date'
                    value={date}
                    onChange={handleChange}
                />
                <FormInput
                    label='Start Time'
                    type='time'
                    name='startTime'
                    value={startTime}
                    onChange={handleChange}
                />
                <FormInput
                    label='End Time'
                    type='time'
                    name='endTime'
                    value={endTime}
                    onChange={handleChange}
                    required
                />
                <FormSelect
                    label='Customer'
                    name='customer'
                    options={customerOptions}
                    value={customer}
                    onChange={handleChange}
                    required
                />
                <div className="grid50">
                    {!props.editMode ?
                        <CustomButton
                            inactive={invalidState}
                            buttonStyle="blue"
                            type="submit"
                            label="Add"
                        />
                        :
                        <CustomButton
                            inactive={invalidState}
                            buttonStyle="blue"
                            type="submit"
                            label="Update"
                        />
                    }
                    <CustomButton
                        buttonStyle="red"
                        action={props.callback}
                        label="Cancel"
                    />
                </div>
            </form>
        </div>
    );
}


const mapDispatchToProps = dispatch => ({
    addClockItem: (clockItem, callback) => {
        dispatch(addClockItem(clockItem, callback))
    },
    updateClockItem: (clockItem, callback) => {
        dispatch(updateClockItem(clockItem, callback))
    }
});

export default connect(null, mapDispatchToProps)(ClockItemForm);