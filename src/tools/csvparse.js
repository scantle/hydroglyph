import { detectLineDelimiter } from "dygraphs/src/dygraph-utils";

function raven_csvDate_parse(csvstring) {
  const delim = detectLineDelimiter(csvstring)
  // Separate by line, then by comma
  csvstring = csvstring.split(delim);
  // Get Header
  let header = ['Date'].concat(csvstring.shift().split(',').slice(3));
  // Loop over lines adding to data array
  let data = []
  for (let line=0; line < csvstring.length; line++) {
    let thisline = csvstring[line].split(',');
    if (thisline.length > 1) {
      let date = new Date(thisline[1] + ' ' + thisline[2]);
      let meat = [date].concat(thisline.slice(3).map(parseFloat));
      data.push(meat);
    }
  }
  // Return an object
  return {header : header,
          data : data};
}


export default raven_csvDate_parse;