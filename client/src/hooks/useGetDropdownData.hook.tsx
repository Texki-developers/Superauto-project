import { useQuery } from "@tanstack/react-query";
import { ICategory } from "../types/apimodal/apimodal.d"
import useGetApis from "./useGetApi.hook";

const useGetDropdownData = (type?: ICategory | null, apiUrl?: string) => {
    const { callApi } = useGetApis();
    const url = `accounts/list/category-drop/${type}`
    const fetchData = () => callApi(apiUrl ?? url);
    const { data, isPending, refetch } = useQuery({ queryKey: [url], queryFn: fetchData })
    const formatedData = data?.data?.map((item: { account_id: number, name: string }) => ({
        value: item?.account_id,
        label: item?.name
    }))
    return {
        data, formatedData, isPending, refetch
    }

}

export default useGetDropdownData