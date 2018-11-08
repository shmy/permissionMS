import xlsx from "xlsx";

export default (columns, content, name, type) => {
  const headers = {};
  // 解析header
  columns.forEach((item, index) => {
    headers[(String.fromCharCode(65 + index)) + 1] = {
      t: "s",
      v: item.label,
    };
  });
  const body = {};
  // 记录最后一个key
  let lastKey = "";
  // 循环数组
  content.forEach((item, index) => {
    // 循环key
    columns.forEach((col, i) => {
      lastKey = (String.fromCharCode(65 + i)) + (index + 2);
      let v = "";
      // 自定义列
      if (typeof col.format === "function") {
        v = col.format(item, index);
      } else if (col.value) {
        v = item[col.value];
      }
      body[lastKey] = {
        t: "s",
        v,
      };
    });
  });
  const wb = {
    SheetNames: ["sheet1"],
    Sheets: {
      sheet1: Object.assign({}, {
        '!cols': columns.map(item => {
          return {
            wch: item.width || 10};
        }),
        '!ref': `A1:${lastKey}`
      }, headers, body)
    }
  };
  xlsx.writeFile(wb, `${name}.${type}`, {
    bookType: type
  });
};
