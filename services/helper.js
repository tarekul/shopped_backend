const createSqlCommandForUpdate2 = (arr,arrString,tableName,whereColumn)=>{
    let sqlStr = `UPDATE ${tableName} SET `   
    for(let i=0; i < arr.length;i++){
        if(arr[i]){
            sqlStr += arrString[i] + '=${' + arrString[i] + '},'
        }
    }

    sqlStr = sqlStr.slice(0,sqlStr.length-1)
    sqlStr = sqlStr + ' WHERE ' + whereColumn + '=${' + whereColumn + '}'
    console.log(sqlStr)
    return sqlStr
}

module.exports = {createSqlCommandForUpdate2}