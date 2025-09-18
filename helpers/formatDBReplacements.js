
module.exports = {
  formatJsonArray (datas) {
    let dataFormatted = '';

    for (const data of datas) {
      dataFormatted += `"${JSON.stringify(data).replace(/"/g, '\\"')}",`;
    }

    dataFormatted = `{${dataFormatted.substring(0,dataFormatted.length - 1)}}`

    return dataFormatted;
  },

  formatIntArray (datas) {
    return `{${datas.join(',')}}`;
  },

  formatTextArray (datas) {
    return `{${datas.join(',')}}`;
  },
}
