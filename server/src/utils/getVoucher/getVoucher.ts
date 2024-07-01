import accountsQueries from "../../api/v1/queries/accounts.queries"

const getVoucher = async (voucherType: string) => {
    const {prefix, last_invoice_number} = await accountsQueries.getVoucher(voucherType);
    return `${prefix}${last_invoice_number}`
}

export default getVoucher