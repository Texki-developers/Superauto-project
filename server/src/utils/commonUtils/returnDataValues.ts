const returnDataValues = (queryResult: any[]) => {
    return queryResult.map(result => result.dataValues)
}

export default returnDataValues