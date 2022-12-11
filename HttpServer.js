 const Http = require('http');
 const url = require('url');
 const fs = require('fs');



 const replaceTemplate = (temp,product)=> {
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    output = output.replace(/{%ID%}/g,product.id);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
      return output;
    
 }

 const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
 const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
 const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

 const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
    const dataObj =  JSON.parse(data);
    



 const server = Http.createServer((req,res) => {
    // const pathName = req.url;

const {query, pathname}=url.parse(req.url,true)
    if(pathname === "/" || pathname === "/overview"){
        res.writeHead(200, {
            "Content-type": "text/html"});
            
const cardsHtml = dataObj.map(item =>replaceTemplate(templateCard,item)).join('')
console.log(':>> ', cardsHtml);
const output = templateOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        res.end(output);


      
    } 


    else if( pathname === "/product"){ 
          res.writeHead(200, {"Content-type": "text/html"});
            const product = dataObj[query.id];
            const output = replaceTemplate(templateProduct,product);
            console.log(output)
            res.end(output);
        }
    else if( pathname === "/api"){ 
     fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8',(err,data)=>{
             res.writeHead(200, { "Content-type": "application/json", });
     res.end(data);
     } )
  
    }
 else{
        const newLocal = "text/html";
        const myHeader = "my-new-header";
    res.writeHead(404, {
        "Content-type": newLocal,
        "my-own-header":myHeader


    });

    res.end('<h1>Page Not Found </h1>');
 }
 
 });

 const port = 8000;

server.listen(`${port}`,'127.0.0.1',()=>{
    console.log("Listening to request on port 8000");
})
