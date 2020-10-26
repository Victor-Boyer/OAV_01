const path = require('path');
var fs = require('fs');

const regex = /^[a-zA-Z].*/gm

//INI
function parseINI(dataFound, date) {
    let newFile = 'php' + date + '.json';
    fs.open(newFile, 'w+', (err, f) => {
        if(err) {
            console.error('ERROR !' + err);
            throw err
        }
    })

    fs.writeFile(newFile, JSON.stringify(dataFound, null, '\t'), (err)=> {
        if(err) {
            console.error('ERROR ! ' + err);
            throw err;
        }
    })
}   

//ENV
function parseENV(dataFound, date) {
    let newFile = date + '.env';
    fs.open(newFile, 'w+', (err, f) => {
        if(err) {
            console.error('ERROR !' + err);
            throw err
        }
    })

    fs.writeFile(newFile, JSON.stringify(dataFound, null, '\t'), (err)=> {
        if(err) {
            console.error('ERROR ! ' + err);
            throw err;
        }
    })
}

//MAIN function
function generateJSON(file) {
    let date = Date.now();
    let data = fs.readFileSync(file, 'utf8');
    data = data.replace(/=/gm, ':') ;
    let dataFound = data.match(regex);
    
    if(path.extname(file) == '.ini') {
        parseINI(dataFound, date);
    }
    else if (path.basename(file) == 'env') {
        parseENV(dataFound, date);
    }
    else console.error('File\'s type is not support');
}

generateJSON('./src/php.ini')