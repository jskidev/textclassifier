require('dotenv').config();
//require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
var express = require('express');
const toxicity = require('@tensorflow-models/toxicity');
const { parse } = require('fast-csv')
const multer = require('multer')
const CONNECTION = process.env.NODE_ENV;
var router = express.Router();
const fileStorage = multer.memoryStorage();
const { EOL } = require('os');
const upload = multer({ storage: fileStorage, limits: {fileSize: 100000} }).single("dataFile");

router.get('/api/', async (req, res) => {
    res.json('test get')
});

router.post('/api/', async (req, res) => {
    const threshold = req.body.threshold;
    
    //const labelsToInclude = ['identity_attack', 'insult', 'threat'];

    const sentences = sanitizeString(req.body.text);

    await toxicity.load(threshold).then(model => {

        model.classify(sentences).then(predictions => {
            res.json(predictions);
        });
    });
});

router.post('/api/multi', upload, async (req, res) => {
    const file = req.file;
    let sentences = [];
    if(file != undefined){
        if(file['originalname'].indexOf('.csv') > -1){
            const csvData = file.buffer.toString().split('\r\n');
            const csvString = csvData.join(EOL);
            const stream = parse({ ignoreEmpty: true, headers: true})
                .on('error', error => console.error(error))
                .on('data', row => {
                    console.log(row)
                    sentences.push(sanitizeString(row['text']));
                })
                .on('end', rowCount => {
                    console.log(`Parsed ${rowCount} rows`);

                })
            stream.write(csvString);
            stream.end();

            await toxicity.load(0.8).then(model => {
                model.classify(sentences).then(predictions => {
                    //res.json(predictions);
                    res.status(200).send({message:'File successfully uploaded',data:predictions});
                });
            });
            //res.status(200).send({message:'File successfully uploaded'});

        } else {
            res.status(400).send({message: 'Please upload a csv file'});
        }
    }
});

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim().toLowerCase();
}

module.exports = router;