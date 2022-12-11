 const fs = require('fs');

 const Textin = fs.readFileSync('./text.txt','utf-8');
 console.log(Textin)

 const textWrite=fs.writeFileSync('./output.txt',`I can read & write Files from one file ${Textin}+ ${Date.now()}`);
 console.log("done");