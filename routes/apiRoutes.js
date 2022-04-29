const router = require('express').Router();
// const Store = require('../db/store');
var path= require('path');
var fs= require('fs')
const { v4: uuidv4 } = require('uuid');



router.post('/notes', (req, res)=>{
   userInput= req.body;
   let dbInfo = fs.readFileSync('./db/db.json', 'utf-8')
   let newDbInfo = JSON.parse(dbInfo)
   userInput.id = uuidv4()
   newDbInfo.push(userInput)
   fs.writeFile("./db/db.json",JSON.stringify(newDbInfo),function(err){
    if(err){
      console.log(err)
    }
})
res.end()
})

router.get('/notes', (req, res)=>{
    fs.readFile("./db/db.json", "utf-8", function(err, data){
        let dbObj= JSON.parse(data)
        res.json(dbObj)
    })
});

router.delete('/notes/:id', (req, res)=>{
let num = req.params.id
let fileData = fs.readFileSync('./db/db.json', 'utf-8')
let parseData = JSON.parse(fileData)
let newData = parseData.filter(item=> {
    if (num != item.id){ 
        return item
    }
})

fs.writeFile('./db/db.json', JSON.stringify(newData), function(err){
    if (err) throw err;
    console.log('Data Deleted!')
    res.end()
})

})

module.exports = router;