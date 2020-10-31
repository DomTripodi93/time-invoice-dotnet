import React, { useState } from 'react';
import edit from '../../shared/assets/Edit.png';
import trash from '../../shared/assets/Trash.png';
import show from '../../shared/assets/Show.png';
import helpers from '../../shared/helpers';

const InvoiceDetail = props => {
    const helper = new helpers()
    const total = props.invoice.hours * 0 //props.customer.rate //your rate here

    return (
        <div className="size-holder middle">
            {props.invoice.date ?
                <div className="size-holder middle">
                    <div className="invoice-detail-companies-grid">
                        <div>
                            <div className="invoice-small-detail-grid">
                                <div className="inner-border-left-header">
                                    <h5 className="heading-offset">Invoice No.</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5>{props.invoice.invoiceNumber}</h5>
                                </div>
                            </div>
                            <br />
                            <div className="inner-border-full-header">
                                <h4>Contractor Details</h4>
                            </div>
                            <div className="invoice-small-detail-grid">
                                <div className="inner-border-left-header">
                                    <h5>Name</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5>{props.user.defaultPointOfContact}</h5>
                                </div>
                                <div className="inner-border-left-header">
                                    <h5>Address</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5 className="heading-offset">{props.user.address}</h5>
                                </div>
                                <div className="inner-border-left-header">
                                    <h5 className="heading-offset">State + Zip Code</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5>{props.user.state} {props.user.zipCode}</h5>
                                </div>
                                <div className="inner-border-left-header">
                                    <h5>Phone</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5>{props.user.defaultPhone}</h5>
                                </div>
                            </div>
                            <br/>
                            <div className="invoice-small-detail-grid">
                                <div className="inner-border-left-header">
                                    <h5>Terms</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5>Net 15</h5>
                                </div>
                            </div>
                        </div>
                        <div></div>
                        <div>
                            <div className="invoice-small-detail-grid">
                                <div className="inner-border-left-header">
                                    <h5>Date</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5>{helper.dateForDisplay(props.invoice.date)}</h5>
                                </div>
                            </div>
                            <br />
                            <div className="inner-border-full-header">
                                <h4>Client Details</h4>
                            </div>
                            <div className="invoice-small-detail-grid">
                                <div className="inner-border-left-header">
                                    <h5>Name</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5>{props.customer.pointOfContact}</h5>
                                </div>
                                <div className="inner-border-left-header">
                                    <h5>Address</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5 className="heading-offset">{props.customer.address}</h5>
                                </div>
                                <div className="inner-border-left-header">
                                    <h5 className="heading-offset">State + Zip Code</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5>{props.customer.state} {props.customer.zipCode}</h5>
                                </div>
                                <div className="inner-border-left-header">
                                    <h5>Phone</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5>{props.customer.defaultPhone}</h5>
                                </div>
                            </div>
                            <br/>
                            <div className="invoice-small-detail-grid">
                                <div className="inner-border-left-header">
                                    <h5>Period</h5>
                                </div>
                                <div className="inner-border-right">
                                    <h5 className="heading-offset">{props.invoice.dateRange}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="inner-border-full-header">
                        <h4>Charges</h4>
                    </div>
                    <div className="invoice-detail-grid">
                        <div className="inner-border-left-header">
                            <h5>
                                Line Item
                            </h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5>
                                Service Item
                            </h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="heading-offset">
                                Service Description
                            </h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5>
                                Quantity
                            </h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5>
                                Cost / Ea.
                            </h5>
                        </div>
                        <div className="inner-border-right-header">
                            <h5>
                                Amount
                            </h5>
                        </div>
        
        
                        <div className="inner-border-left">
                            {props.invoice.lineItem ?
                                <h5>{props.invoice.invoiceNumber}</h5>
                                :
                                <h5>0001</h5>
                            }
                        </div>
                        <div className="inner-border-left">
                            {props.user.service ?
                                <h5>{props.user.service}</h5>
                                :
                                <h5>Service Hour</h5>
                            }
                        </div>
                        <div className="inner-border-left">
                            {props.user.serviceDescription ?
                                <h5>{props.user.serviceDescription}</h5>
                                :
                                <h5 className="heading-offset">Consulting Service</h5>
                            }
                        </div>
                        <div className="inner-border-left">
                            {props.invoice.hours ?
                                <h5>{props.invoice.hours}</h5>
                                :
                                null
                            }
                        </div>
                        <div className="inner-border-left">
                            {props.customer.rate ?
                                <h5>${props.customer.rate}</h5>
                                :
                                null
                            }
                        </div>
                        <div className="inner-border-right">
                            {total ?
                                <h5>${total}</h5>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className="invoice-total-grid">
                        <div>
                        </div>
                        <div className="inner-border-left-header">
                            <h5>Total</h5>
                        </div>
                        <div className="inner-border-right">
                            {total ?
                                <h5>${total}</h5>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
                :
                <h5>nopity Nope</h5>
            }
        </div>
    )
}



export default InvoiceDetail;