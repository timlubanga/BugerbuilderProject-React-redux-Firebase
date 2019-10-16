

export const ingreSumation=(ingre)=>{
    let summation=0
        if(ingre){
        summation=Object.values(ingre).reduce((acc,init)=>{
        return acc+init
                },0) 
            }
    return summation;
}


