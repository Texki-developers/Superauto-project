import { useSearchParams } from "react-router-dom";
import { ICategory } from "../types/apimodal/apimodal.d";
import useGetApis from "./useGetApi.hook";
import { useQuery } from "@tanstack/react-query";

const useGetCategoryApi = (category: ICategory) => {
    const [searchParams] = useSearchParams()
    const { callApi } = useGetApis();
    const url = `accounts/list/category/${category}?page=${searchParams.get('page') ?? 1}&perPage=${searchParams.get('perPage') ?? 10}`
    const fetchFinance = () => callApi(url);
    const { data, isPending, refetch } = useQuery({ queryKey: [url], queryFn: fetchFinance })
    return {
        data, isPending, refetch
    }
}

export default useGetCategoryApi