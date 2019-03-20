const createSqlCommandForUpdate = (id,arr,arrString)=>{
    let sqlStr = 'UPDATE users SET ' + arr.reduce((acc,element,i)=>{
        if(element){
            acc += arrString[i] + '=${' + arrString[i] + '},'
            //console.log(acc)
            return acc 
            
        }
        return acc
    },'') 
    
    sqlStr = sqlStr.slice(0,sqlStr.length-1)
    sqlStr = sqlStr + ` WHERE id=${id}`
    console.log(sqlStr)
    return sqlStr
}

module.exports = {createSqlCommandForUpdate}