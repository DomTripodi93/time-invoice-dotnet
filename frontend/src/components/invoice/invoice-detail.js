import React, { useState } from 'react';
import edit from '../../shared/assets/Edit.png';
import trash from '../../shared/assets/Trash.png';
import show from '../../shared/assets/Show.png';
import helpers from '../../shared/helpers';

const InvoiceDetail = props => {
    const helper = new helpers()
    const [editMode, updateEditMode] = useState(false);
    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
            "Are you sure you want to delete this invoice ?" 
        )) {
            props.deleteInvoice(
                props.invoice.id
            );
        }
    }

    return (
        <div className='invoice-grid grid-line centered'>
            <div className="inner-border-left">
                {props.invoice.invoiceNumber ?
                    <h5>{props.invoice.invoiceNumber}</h5>
                    :
                    null
                }
            </div>
            <div className="inner-border-left">
                <h5>{helper.dateForDisplay(props.invoice.date)}</h5>
            </div>
            <div className="inner-border-left">
                {props.invoice.customer ?
                    <h5 className="customer">{props.invoice.customer}</h5>
                    :
                    null
                }
            </div>
            <div className="inner-border-left">
                {props.invoice.dateRange ?
                    <h5 className="date-range">{props.invoice.dateRange}</h5>
                    :
                    null
                }
            </div>
            <div className="inner-border-left">
                {props.invoice.hours ?
                    <h5>{props.invoice.hours}</h5>
                    :
                    null
                }
            </div>
            <div className="inner-border-right">
                {props.invoice.paid ?
                    <h5>Yes</h5>
                    :
                    <h5>No</h5>
                }
            </div>
            {!props.change ?
                <div className="grid33 inner-border-right">
                    <img alt="edit" className="icon" src={edit} onClick={setEditMode}/>
                    <img alt="delete" className="icon" src={trash} onClick={handleDelete}/>
                    <img alt="show" className="icon" src={show} onClick={()=>{}}/>
                </div>
                :
                null
            }
        </div>
    )
}



export default InvoiceDetail;