import React from 'react';



const Data = () => {
  function csvToJSON(csv_string) {
    const rows = csv_string.split("\r\n");
    const jsonArray = []
    const header = rows[0].split(",")
    for (let i = 1; i < rows.length; i++) {
      let obj = {}
      let row = rows[i].split(",")
      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = row[j];

        jsonArray.push(obj)
      }
      return jsonArray;
    }

  }
  const fs = require('fs');
  const string_csv = `KORLIQUOR_ID,KORLIQUOR_NM,KORLIQUOR_CTGRY,KORLIQUOR_PRC`;
  const file_csv = fs.readFileSync('./RT_KOREAN_LIQUOR_INFO_202407.csv');
  const arr_json = csvToJSON(string_csv);

const string_json = JSON.stringify(arr_json);

fs.writeFileSync('data.json', string_json);

  return (
    <div>


    </div>
  );
};

export default Data;