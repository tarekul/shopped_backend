const createSqlCommandForUpdate = (id,arr,arrString,tableName,firstcolumnname)=>{
    let sqlStr = `UPDATE ${tableName} SET `
    for(let i=0; i < arr.length;i++){
        if(arr[i]){
            sqlStr += arrString[i] + '=${' + arrString[i] + '},'
        }
    }

    sqlStr = sqlStr.slice(0,sqlStr.length-1)
    sqlStr = sqlStr + ` WHERE ${firstcolumnname}=${id}`
    console.log(sqlStr)
    return sqlStr
}

module.exports = {createSqlCommandForUpdate}