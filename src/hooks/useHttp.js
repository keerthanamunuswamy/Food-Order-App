import { useCallback, useEffect, useState } from "react"


export async function sendHttpRequest(url,config){
    const response = await fetch(url,config)
    const resData = await response.json()
  
    if(!response.ok){
        throw new Error(resData.message || 'Oops!! Something went wrong')
    }
    return resData
}

export function useHttp(url,config,initialValue){
    const [data,setData] = useState(initialValue)
    const [ error,setError]=useState()
    const [isLoading,setIsLoading]=useState(false)

    function clearData(){
        setData(initialValue)
    }
    
    const sendHttp = useCallback( async function sendHttp(data){
        setIsLoading(true)
        try{
            const resData = await sendHttpRequest(url,{...config,body:data})
            setData(resData)
            setError()
        }catch(error){
            setError(error.message||'Error occured!!')
        }
        setIsLoading(false)
       
    },[url,config])

    useEffect(()=>{
        if(config && (config.method==='GET' || !config.method) ||!config){
            sendHttp()
        }
    },[sendHttp,config])
    return {data,error,isLoading,sendHttp,clearData}

}