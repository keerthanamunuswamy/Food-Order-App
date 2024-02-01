import { useState,useEffect } from "react";
export function useFetch(fetchFn,initialValue){
    const [fetchedData, setFetchedData] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    useEffect(()=>{
        async function fetchData(){
            setIsLoading(true);
    
            try {
          
                const data = await fetchFn();
                setFetchedData(data);
              
              } catch (error) {
                setError({
                  message:
                    error.message ||
                    "Oops!! Something went wrong.Please try again later...",
                });
              }
              setIsLoading(false);
    
           }
           fetchData();
    },[fetchFn])
    return {fetchedData,isLoading,error,setFetchedData}
}