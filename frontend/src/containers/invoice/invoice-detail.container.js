import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSingleInvoice } from '../../reducers/invoice/invoice.actions';
import InvoiceNew from '../../components/invoice/invoice-new';
import Invoices from '../../components/invoice/invoices';
import "./invoice.styles.scss";
import { fetchSingleCustomer } from '../../reducers/customer/customer.actions';


const InvoiceContainer = (props) => {
    const fetchSingleInvoice = props.fetchSingleInvoice;
    const fetchSingleCustomer = props.fetchSingleCustomer;

    useEffect(() => {
        fetchSingleInvoice(id);
    }, [fetchSingleInvoice]);

    useEffect(()=>{
        fetchSingleCustomer(id);
    }, [fetchSingleCustomer])

    return (
        <div className="size-holder middle">
            {props.customer.companyName & props.invoice.customer ?
                <div className="grid100">
                    <InvoiceDetail
                        invoice={props.invoice}
                        customers={props.customer} />
                </div>
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSingleInvoice: (id) => 
            dispatch(fetchSingleInvoice(id)),
        fetchSingleCustomer: (id) => dispatch(fetchSingleCustomer(id))
    }
}

const mapStateToProps = state => ({
    invoices: state.invoice.selectedInvoice,
    customers: state.customer.selectedCustomer
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceContainer);