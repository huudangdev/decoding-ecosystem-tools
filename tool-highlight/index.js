const nlp = require("compromise");
const fs = require("fs");
const chalk = require('chalk');
const path = "./data.txt";
const vntk = require('vntk');
const posTag = vntk.posTag();
const chunking = vntk.chunking();

const readText = path => {
  fs.readFile(path, "utf8", (err, data) => {
    console.log(nlp(data).out('tags'));
  });
};

const testvntk = path => {
  fs.readFile(path, "utf8", (err, data) => {
    const res = posTag.tag(data);
    var s = '';
    for (let i =0; i<res.length; i++) {
      console.log(res[i][0] + res[i][1]);
      if (res[i][1] === 'N' || res[i][1] === 'Np' || res[i][1] === 'V' || res[i][1]=== 'A' || res[i][1] === 'M' || res[i][1] === 'R') {
        s += chalk.yellow(res[i][0] + ' ');
      }
      else s+=res[i][0] + ' ';
    }
    console.log(s);
  })
}
//testvntk(path);
//readText(path);

const testChunking = path => {
  fs.readFile(path, "utf8", (err, data) => {
    const res = chunking.tag(data);
    var s = '';
    for (let i =0; i<res.length; i++) {
      console.log(res[i][0] + res[i][1]);
      if (res[i][1] === 'N' || res[i][1] === 'Np' || res[i][1] === 'V' || res[i][1]=== 'A' || res[i][1] === 'M' || res[i][1] === 'R') {
        s += chalk.yellow(res[i][0] + ' ');
      }
      else s+=res[i][0] + ' ';
    }
    console.log(res);
  })
}

testChunking(path);
