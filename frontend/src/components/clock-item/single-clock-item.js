import React, { useState } from 'react';
import ClockItemForm from './clock-item-form';
import { deleteClockItem } from '../../reducers/clock-item/clock-item.actions';
import { connect } from 'react-redux';
import edit from '../../shared/assets/Edit.png';
import trash from '../../shared/assets/Trash.png';
import helpers from '../../shared/helpers';

const SingleClockItem = props => {
    const helper = new helpers()
    const [editMode, updateEditMode] = useState(false);
    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
            "Are you sure you want to delete this clockItem ?" 
        )) {
            props.deleteClockItem(
                props.clockItem._id,
                props.clockItem.date.split("T")[0]
            );
        }
    }

    return (
        <div className='centered'>
            {!editMode ?
                <div className='times-grid'>
                    <div className="inner-border-left">
                        <h5>{helper.dateForDisplayWithDOW(props.clockItem.date)}</h5>
                    </div>
                    <div className="inner-border-left">
                        {props.clockItem.customer ?
                            <h5>{props.clockItem.customer}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.clockItem.startTime ?
                            <h5>{helper.timeForDisplay(helper.timeFromDate(props.clockItem.startTime))}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.clockItem.endTime ?
                            <h5>{helper.timeForDisplay(helper.timeFromDate(props.clockItem.endTime))}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.clockItem.hours ?
                            <h5>{props.clockItem.hours}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-right">
                        {props.clockItem.invoiced ?
                            <h5>Yes</h5>
                            :
                            <h5>No</h5>
                        }
                    </div>
                    {!props.change && !props.clockItem.invoiced ?
                        <div className="grid50 inner-border-right">
                        <img alt="edit" className="icon" src={edit} onClick={setEditMode}/>
                        <img alt="delete" className="icon" src={trash} onClick={handleDelete}/>
                        </div>
                        :
                        <div className="grid50 inner-border-right">
                        </div>
                    }
                </div>
                :
                <ClockItemForm
                    editMode={true}
                    clockItemInput={props.clockItem}
                    callback={setEditMode} />
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteClockItem: (id, date) => dispatch(deleteClockItem(id, date))
    }
}

export default connect(null, mapDispatchToProps)(SingleClockItem);