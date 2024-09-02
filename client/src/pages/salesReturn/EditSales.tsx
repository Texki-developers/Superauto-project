import React, { useEffect, useState } from 'react'
import SellVehicleForm from '../../components/vehicles/SellVehicleForm'
import { useForm } from 'react-hook-form'
import { ISalesEdit, IVehicleSellFormValues } from '../../types/vehicle/sellVehicle';
import Header from '../../components/header/Header';
import useGetApis from '../../hooks/useGetApi.hook';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/loading/Loading';
import moment from 'moment';
import { paymentObj } from '../../config/paymentTypes.data';
import useQueryGetApi from '../../hooks/useQueryGetApi.hook';
import useToast from '../../hooks/useToast.hook';
import AuthApiService from '../../services/api-services';


const defaultValues: IVehicleSellFormValues = {
    customer: {
        value: '',
        label: '',
    },  // Default values for all fields
    saleRate: '',
    mrp: '',
    salesDate: '',
    paymentType: {
        value: '',
        label: '',
    },
    financeAmount: '',
    customerPhoneNumber: '',
    financeServiceCharge: '',
    registrationNumber: '',
    rate: null,
    paymentAmount: '',
    dueDate: '',
    balance: ''
};
const breadCrumbData = [
    { name: 'Dashboard', link: '/' },
    { name: 'Sales', link: '/sales' },
    { name: 'Edit Sales' },
];
const EditSales = ({ selectedItem, refetch, selectedVehicle, onCancel }: { selectedVehicle: number, selectedItem: number, refetch: () => void; onCancel: () => void }) => {
    const [showFinance, setShowFinance] = useState(false)
    const { toastError, toastLoading, toastSuccess } = useToast()
    const [total, setTotal] = useState(0)
    const { register, control, reset, setValue, formState: { errors }, watch, handleSubmit } = useForm({ defaultValues });
    const onSubmit = async (data: IVehicleSellFormValues) => {
        console.log(data);
        const id = toastLoading('Loading...');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const apiBody: any = {
            "accountId": data?.customer?.value,
            "soldRate": parseInt(data?.saleRate),
            "soldDate": data?.salesDate,
            "paymentMode": data?.paymentType?.label,
            "soldVehicleId": vehicleData?.data?.sold_vehicle,
            "isFinance": showFinance,
            "financeAmount":data.financeAmount,
            "financeCharge":data.financeServiceCharge,
            "rate": null,
            "amount": parseInt(data?.paymentAmount),
            "due_date": data?.dueDate,
            "salesId": vehicleData?.data?.sales_id
        };

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await AuthApiService.postApi<any, any>('inventory/edit-sales', apiBody);
            if (response?.status === "error") {
                toastError(id, response?.message);
                return;
            }
            onCancel();
            toastSuccess(id, 'Sales Edited successfully');
            refetch()
        } catch (error) {
            onCancel();
            toastError(id, 'Something went wrong');
        }
    }
    const editApiurl = `inventory/list/edit-sales/${selectedItem}`
    const { callApi } = useGetApis();
    const fetchData = () => callApi(editApiurl);
    const { data: vehicleData, isPending } = useQuery<ISalesEdit>({ queryKey: [editApiurl], queryFn: fetchData })
    useEffect(() => {
        if (vehicleData?.data) {
            setShowFinance(vehicleData.data?.is_finance)
            const mappedValues = {
                ...defaultValues,
                customer: {
                    value: vehicleData?.data?.account_id,
                    label: `${vehicleData?.data?.Account?.name}-${vehicleData?.data?.Account?.contact_info}`,
                },
                saleRate: vehicleData?.data?.sold_rate as string,
                salesDate: moment(vehicleData?.data?.sold_date)?.format('YYYY-MM-DD'),
                paymentType: {
                    value: paymentObj[vehicleData?.data?.payment_mode as string],
                    label: vehicleData?.data?.payment_mode,
                },
                financeAmount: vehicleData?.data?.finance_amount,
                customerPhoneNumber: '',
                financeServiceCharge: vehicleData?.data?.finance_service_charge,
                registrationNumber: '',
                rate: null,
                paymentAmount: vehicleData?.data?.Inventory?.sold_price ?? null,
                dueDate: moment(vehicleData?.data?.due_date)?.format('YYYY-MM-DD'),
                balance: ''

            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reset(mappedValues as any);

        }
    }, [vehicleData])
    useEffect(() => {
        const salesRate = watch('saleRate')
        const financeAmount = watch('financeAmount')
        const financeServiceCharge = watch('financeServiceCharge')
        setTotal(Number(salesRate ?? 0) + Number(financeAmount ?? 0) + Number(financeServiceCharge ?? 0))
    }, [watch('saleRate'), watch('financeAmount'), watch('financeServiceCharge')])

    const { data, refetch: mrpRefetch } = useQueryGetApi(`inventory/vehicle/mrp?vehicle_id=${selectedVehicle}`)
    useEffect(() => {
        if (data) {
            setValue('mrp', data?.data?.mrp)
        }
    }, [data])

    useEffect(() => {
        mrpRefetch()
    }, [selectedVehicle])
    return (
        <>
            {
                isPending && <Loading />
            }
            <Header breadCrumbData={breadCrumbData} />
            <form className='pt-5 mb-3' onSubmit={handleSubmit(onSubmit)}>
                <SellVehicleForm
                    onCancelClick={() => { onCancel() }}
                    control={control}
                    errors={errors}
                    setShowFinance={setShowFinance}
                    showFinance={showFinance}
                    register={register}
                    reset={reset}
                    total={total}
                    setValue={setValue}
                    hideExchange={true}
                    hideBalance={true}
                    watch={watch} />
            </form>
        </>
    )
}

export default EditSales