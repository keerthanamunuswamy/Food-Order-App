export async function fetchAvailableMeals(){
    const response = await fetch("http://localhost:3000/meals");
    const resData = await response.json();
    if (!response.ok) {
        throw new Error("An error occured while fetching available meals");
      }
    return resData

}

export async function placeOrder(order){
    const response  = await fetch('http://localhost:3000/orders',{
        method:'POST',
        body:JSON.stringify({order:order}),
        headers:{
            'Content-Type':'application/json'
        }
    })

    const resData = await response.json()
    if(!response.ok){
        throw new Error(resData.message ||'An error occured while placing order!!!')
    }
    return resData
}