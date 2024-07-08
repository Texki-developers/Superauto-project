import { useQuery } from "@tanstack/react-query";
import useGetApis from "./useGetApi.hook";

const useQueryGetApi = (url: string) => {
    const { callApi } = useGetApis();
    const fetchData = () => callApi(url);
    const { data, error, isPending, refetch } = useQuery({ queryKey: [url], queryFn: fetchData })
    return {
        data,
        isPending,
        refetch,
        error
    }
}

export default useQueryGetApi