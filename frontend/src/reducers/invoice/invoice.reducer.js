import InvoiceActionTypes from './invoice.types';

const INITIAL_STATE = {
    invoices: [],
    selectedInvoice: {}
}

const invoiceReducer = (state = INITIAL_STATE, action) => {
    let invoicesHold = [...state.invoices]
    switch (action.type) {
        case InvoiceActionTypes.SET_INVOICES:
            console.log("&")
            return {
                ...state,
                invoices: action.payload.data
            };
        case InvoiceActionTypes.ADD_OR_UPDATE_INVOICES:
            if (invoicesHold){
                invoicesHold = [
                    action.payload,
                    ...invoicesHold
                        .filter((value) => {
                            return value.id !== action.payload.id
                        })]
                    .sort((first, second) => {
                        if (first.invoiceNumber > second.invoiceNumber) {
                            return -1
                        } else {
                            return 1
                        }
                    })
            }
            return {
                ...state,
                invoices: invoicesHold
            };
        case InvoiceActionTypes.SET_SELECTED_INVOICE:
            return {
                ...state,
                selectedInvoice: action.payload
            };
        case InvoiceActionTypes.DELETE_INVOICE:
            invoicesHold = [
                ...invoicesHold
                    .filter((value) => {
                        return value.id !== action.payload
                    })]
            return {
                ...state,
                invoices: invoicesHold
            };
        case InvoiceActionTypes.SIGNOUT_USER:
            return {
                invoices: [],
                selectedInvoice: {}
            };
        default:
            return state;
    }
}

export default invoiceReducer;