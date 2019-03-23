const createSqlCommandForUpdate = (a,b,arr,arrString,tableName,firstcolumnname,secondcolumnname)=>{
    let sqlStr = `UPDATE ${tableName} SET `
    for(let i=0; i < arr.length;i++){
        if(arr[i]){
            sqlStr += arrString[i] + '=${' + arrString[i] + '},'
        }
    }

    sqlStr = sqlStr.slice(0,sqlStr.length-1)
    sqlStr = sqlStr + ` WHERE ${firstcolumnname}=${a} AND ${secondcolumnname}=${b}`
    console.log(sqlStr)
    return sqlStr
}

const createSqlCommandForUpdate2 = (a,arr,arrString,tableName,firstcolumnname)=>{
    let sqlStr = `UPDATE ${tableName} SET `
    for(let i=0; i < arr.length;i++){
        if(arr[i]){
            sqlStr += arrString[i] + '=${' + arrString[i] + '},'
        }
    }

    sqlStr = sqlStr.slice(0,sqlStr.length-1)
    sqlStr = sqlStr + ` WHERE ${firstcolumnname}=${a}`
    console.log(sqlStr)
    return sqlStr
}

module.exports = {createSqlCommandForUpdate,createSqlCommandForUpdate2}