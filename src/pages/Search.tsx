import { useParams } from "react-router-dom";
import { useFetch } from "../utils/fetch";
import { fetchOptions } from "../assets/data";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { TextSpace } from "../types/textSpace.type";
import MoreButton from "../components/MoreButton";
import { useState } from "react";
import TextSpaceCard from "../components/TextSpaceCard";


type QueryResult = {
    textSpaces: TextSpace[];
    totalPages: number;
    value: string;
    page: number;
    limit: number;
};

const LIMIT = 12;

export default function Search() {
    const [limit, setLimit] = useState(LIMIT);
    const { searchValue } = useParams();

    const { loading, error, data, retry } = useFetch<QueryResult>(`${import.meta.env.VITE_SERVER_URL}/spaces/search/${searchValue}?limit=${limit}`, fetchOptions);

    return (
        <div className="min-h-screen flex flex-col">
            <h3 className="font-semibold text-4xl mt-20 text-gray-900">Search results for <span className="font-bold text-gray-600">{searchValue}</span></h3>
            <div className="flex-1 flex flex-col gap-20 mt-10">
                {
                    loading ?
                        <div className="min-h-full pt-20">
                            <Loading text="Fetching your spaces..." />
                        </div> :
                        error ?
                            <div className="min-h-full pt-20">
                                <Error retry={retry} />
                            </div> :
                            Number(data?.textSpaces?.length) < 1 ?
                            <div className="flex flex-col items-center justify-center border">
                                <h2 className="text-4xl font-bold italic text-gray-800">Nothing was found</h2>
                            </div> :
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {
                                    data?.textSpaces?.map((item, index) => (
                                        <li key={index}><TextSpaceCard index={index} limit={LIMIT} data={item} refetch={retry} /></li>
                                    ))
                                }
                            </ul>
                }
                <MoreButton limit={limit} setLimit={setLimit} loading={loading} totalPages={data?.totalPages} />
            </div>
        </div>
    )
}