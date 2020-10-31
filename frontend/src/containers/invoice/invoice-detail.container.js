import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSingleInvoice } from '../../reducers/invoice/invoice.actions';
import "./invoice.styles.scss";
import { fetchSingleCustomer } from '../../reducers/customer/customer.actions';
import InvoiceDetail from '../../components/invoice/invoice-detail';


const InvoiceDetailContainer = (props) => {
    console.log(props.customer)
    console.log(props.invoice)
    const invoiceId = props.match.params.invoiceId
    const customer = props.match.params.customer
    const fetchSingleInvoice = props.fetchSingleInvoice;
    const fetchSingleCustomer = props.fetchSingleCustomer;

    useEffect(() => {
        fetchSingleInvoice(invoiceId);
    }, [fetchSingleInvoice, invoiceId]);

    useEffect(()=>{
        fetchSingleCustomer(customer);
    }, [fetchSingleCustomer, customer])

    return (
        <div className="size-holder middle">
            {props.customer.companyName ?
                <div>
                    <InvoiceDetail
                        invoice={props.invoice}
                        customer={props.customer}
                        user={props.user} />
                </div>
                :
                <h5>
                    nope
                </h5>
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSingleInvoice: (id) => 
            dispatch(fetchSingleInvoice(id)),
        fetchSingleCustomer: (customer) => dispatch(fetchSingleCustomer(customer))
    }
}

const mapStateToProps = state => ({
    invoice: state.invoice.selectedInvoice,
    customer: state.customer.selectedCustomer,
    user: state.user.settings
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetailContainer);