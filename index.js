const fs = require("fs");

//  Synchronus =>  Blocking

//  const Textin = fs.readFileSync('./text.txt','utf-8');
//  console.log(Textin)

//  const textWrite=fs.writeFileSync('./output.txt',`I can read & write Files from one file ${Textin}+ ${Date.now()}`);
//  console.log("done");

//  Asynchronus =>  Non Blocking Callback

const AsyncTextin = fs.readFile("./input.txt", "utf-8", (err, data) => {
  fs.readFile("./FS/output.txt", "utf-8", (err, text) => {
    fs.readFile("./FS/text.txt", "utf-8", (err, text2) => {
      console.log("third File inside Callback", text2);
    });
    console.log("Second File inside Callback", text);
  });

  console.log("First File", data);
});
console.log("Reading File...");
