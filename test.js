console.log("Hello World")
const fs = require("fs");
const path = require('path');
const readline = require("linebyline");
//const readline = require('readline');
const shell = require('shelljs')
var searchString = "CustomError";
var filePath = path.join(__dirname, 'rudder-transformer/v0/destinations');

var Flag = fs.existsSync('rudder-transformer');
const rl = readline(filePath);

if (fs.existsSync('rudder-transformer') == false){
  console.log('File does not exist, cloning the rudder-transformer code');
  const path = process.cwd;
  shell.cd(path);
  shell.exec('git clone https://github.com/rudderlabs/rudder-transformer.git');
}
//fs.appendFileSync('/Users/shreyayaduvanshi/Desktop/RudderStack/Codes/rudder-customErrors/Error/'+file+'.txt', file + ":" + line.trim() + '\n');

//else 

//rl.on('error', function(e) {
  // something went wrong
//});

//Example: 
// < ... > is not a valid type
// Things to consider: $, ( and ) 

//const directoryPath = path.join(__dirname, 'rudder-transformer/v0/destinations');

rl.on('line', function (line, lineCount, byteCount) {
  while (line){
    if (line.includes(searchString)) {
      console.log("Found match");
      fs.appendFileSync('modified.txt', file + ":" + line.trim() + '\n');
    }
  }
});

fs.readdir(filePath, function(err, files){
  files.forEach(function(file){
    const filedirectoryPath = path.join(file, 'transform.js');
    fs.readFile(filePath, function(err, content){
      console.log(content.indexOf(searchString)>-1 ? "has string" : "No string found");
    });
    rl.on('line', function (line, lineCount, byteCount) {
      if (line.includes(searchString)) {
          console.log("Found match");
          fs.appendFileSync('modified.txt', file + ":" + line.trim() + '\n');
      }
    });
  })
});
//fs.readFile(filedirectoryPath, function(_err, content){
      //console.log(content.indexOf(searchString)>-1 ? "has string" : "No string found");
    //});
    
//passsing directoryPath and callback function
/*fs.readdir(filePath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function(file){
      const filedirectoryPath = path.join(file, 'transform.js');
      console.log(filedirectoryPath);
      fs.readFile(file, function(err, content){
        //const rline = readline(filePath); 
        rl.on('line', function(line, lineCount, byteCount){
          //while(line){
          if (line.includes(searchString)) {
            fs.appendFileSync('modified.txt', file + ":" + line.trim() + '\n');
            fs.writeFile('modified.txt', 'test' , err);
            }
          //}
        })
      });
    });*/
    /*files.forEach(function (file) {
      const filedirectoryPath = path.join(file, 'transform.js');

      fs.readFile(filePath, function(err, content) {
        console.log(content.indexOf(searchString)>-1 ? "has string" : "does not have string");
      });
        console.log(filedirectoryPath); 
    });*/
//});
/*
console.log("Hello World")
const fs = require("fs");
const path = require('path');
const readline = require('linebyline');
const shell = require('shelljs')
var searchString = "CustomError(";
var filePath = path.join(__dirname, 'rudder-transformer/v0/destinations');

fs.readdir(filePath, function(_err, files){
  files.forEach(function(file){
    const filedirectoryPath = path.join(file, 'transform.js');
    const temp = path.join(filePath, filedirectoryPath);
    const rl = readline(temp);
    let doubleLine = []; 

    rl.on('line', function (line, lineCount, byteCount) {
      if (line[line.length-1]){
        console.log(line[line.length-1]);
      }
      if lncoming line.last char != ");"
      complete_line += line 
      else:
      process complete_line

      if (line.includes(searchString) || doubleLine.length > 1) {
        doubleLine = line;
        let end = ');';
        var singleLine = line.split(searchString)[1].split(end)[0];
        if (doubleLine[doubleLine.length-1] == '('){
          //console.log(doubleLine + '\n' + line);
          //let end = ',';
          //var singleLine = doubleLine.split(searchString)[1].split(end)[0];
          fs.appendFileSync('/Users/shreyayaduvanshi/Desktop/RudderStack/Codes/rudder-customErrors/Error/'+file+'.txt', "Line number " + lineCount + ":" + doubleLine + '\n');
          doubleLine = [];
        }
        else {
          fs.appendFileSync('/Users/shreyayaduvanshi/Desktop/RudderStack/Codes/rudder-customErrors/Error/'+file+'.txt', "Line number " + lineCount + ":" + singleLine + '\n');
          doubleLine = [];
        }
      }
    });
  })
}); */

/*
Example 1: 
throw new CustomError(
  "Unable to fetch events. Aborting",
  res.response.status || 400
);
Example 2: 
throw new CustomError( "Unable to fetch events. Aborting", res.response.status || 400);
*/