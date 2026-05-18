const item = require('express').Router();
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const uuid = require('uuid');

item.get('/list', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

item.get('/list/:id', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        const parsedData = JSON.parse(data);
        const result = parsedData.filter(note => note.id === req.params.id);
        return result.length > 0
            ? res.json(result)
            : res.json('No note with that ID');
    });
});

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
      err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content)
        writeToFile(file, parsedData);
      }
    });
};

item.post('/list', (req, res) => {
    
    const { text } = req.body;
    
    if (req.body) {
      const newItem = {
        id: uuid.v4(),
        text,
      };
      readAndAppend(newItem, './db/db.json');
      res.json(newItem);
    } else {
      res.error('Error in adding note');
    }
});

item.delete("/list/:id", function(req, res) {
    fs.readFile('./db/db.json', 'utf-8',(err,data)=>{
      if(err){
        console.error(err)
      }else{
        let parsedData = JSON.parse(data)
        parsedData = parsedData.filter(({ id }) => id !== req.params.id);
        fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
        err ? console.error(err) : res.json('writeFile'))
      }
    });
});

module.exports = item;