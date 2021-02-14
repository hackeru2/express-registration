const fs = require("fs");
let file = fs.readFileSync("read.txt", "utf8");
let arr = file.split(/\r?\n/);
let newArr = []
arr.forEach((line, idx) => {
  let newLine = line;
  if (line.includes("The")) {
    console.log('\x1b[36m%s\x1b[0m', 'replacing "The"💨');  //cyan
    console.log((idx + 1) + ':' + line);
    newLine = line.replace("The", 11111111)
  }
  if (line.includes("quick")) {
    console.log('\x1b[33m%s\x1b[0m', 'replacing "quick"💨');  //yellow
    console.log()
    console.log((idx + 1) + ':' + line);

    newLine = line.replace("The", 222222222)
  }
  newArr.push(newLine)
});

fs.writeFile(`file_${new Date().getTime()}.txt`, newArr.join("\n"), 'utf8', function (err) {
  if (err) return console.log(err);
});
