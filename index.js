console.log("Hello World")
const fs = require("fs");
const path = require('path');
const readline = require('linebyline');
const shell = require('shelljs');
const { stripVTControlCharacters, getSystemErrorMap } = require("util");
var searchString = "CustomError(";
var searchComment = "//Customer Action Please make sure either of the Track, Page, Screen, Identify events are passed.";
var filePath = path.join(__dirname, 'rudder-transformer/v0/destinations');

if (fs.existsSync('rudder-transformer') == false){
  console.log('File does not exist, cloning the rudder-transformer code');
  const path = process.cwd;
  shell.cd(path);
  //shell.exec('git clone https://github.com/rudderlabs/rudder-transformer.git');
}
else{
  console.log('File does exist, pulling the most recent rudder-transformer build');
  shell.cd('rudder-transformer');
  //shell.exec('git pull');
}

console.log('----------- Processing Errors -----------');
fs.readdir(filePath, function(_err, files){
  files.forEach(function(file){
    const filedirectoryPath = path.join(file, 'transform.js');
    const temp = path.join(filePath, filedirectoryPath);
    const rl = readline(temp);
    var doubleLine = ""; 
    var Flag = 0; 
    var commentString = "test"
    var double = false

    rl.on('line', function (line, lineCount, byteCount) {
      if (line.includes(searchString) || Flag == 1) {
        Flag = 1

        if (line.includes(searchComment)){
          commentString = line
        }
        if (line[line.length-1] != ';'){
          //This code block is if the Custom Error is in multiple lines
          doubleLine = doubleLine + line;
          double = true
        }
        else if (line[line.length-1] == ';'){
          //This code block appends the Custom Error notification to the files (this also includes any and all single line Errors)
          doubleLine = doubleLine + line;
          let end = ');';
          var resultLine = doubleLine.split(searchString)[1].split(end)[0]; 
        
          if(double){
            fs.appendFileSync('/Users/shreyayaduvanshi/Desktop/RudderStack/Codes/rudder-customErrors/Error/'+file+'.txt', "Line number " + lineCount + ":" + resultLine.trim() +  '\n');
          }
          else{
            fs.appendFileSync('/Users/shreyayaduvanshi/Desktop/RudderStack/Codes/rudder-customErrors/Error/'+file+'.txt', "Line number " + lineCount + ":" + resultLine.trim() + " " + commentString + '\n');
          }
          
          Flag = 0;    
          double = false   
          commentString = ""
          doubleLine = ""
        }
      }
    });
  })
}); 

/*
Example 1: 
throw new CustomError(
  "Unable to fetch events. Aborting",
  res.response.status || 400
);
Example 2: 
throw new CustomError( "Unable to fetch events. Aborting", res.response.status || 400);
//Customer Action
*/

//Example: 
// < ... > is not a valid type
// Things to consider: $, ( and )