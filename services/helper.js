const createSqlCommandForUpdate = (id,arr,arrString)=>{
    let sqlStr = 'UPDATE users SET '
    for(let i=0; i < arr.length;i++){
        if(arr[i]){
            sqlStr += arrString[i] + '=${' + arrString[i] + '},'
        }
    }

    sqlStr = sqlStr.slice(0,sqlStr.length-1)
    sqlStr = sqlStr + ` WHERE id=${id}`
    console.log(sqlStr)
    return sqlStr
}

module.exports = {createSqlCommandForUpdate}