let zlib = require('zlib');
var fs = require('fs');
const uncompressedFilePath = '../../../metadata/uncompressed/';
const compressedFilePath = '../../../metadata/compressed/';

fs.readdir(uncompressedFilePath, function (err, files) {
    files.forEach(function (fileName) {
        let metaJSON = require(uncompressedFilePath + fileName);
        zlib.gzip(JSON.stringify(metaJSON), function (error, result) {
            if (error) throw error;
            
            let buf = Buffer.from(result);
            let encodedData = buf.toString('base64');
        
            var content = {"content": encodedData};

            fs.writeFile(compressedFilePath + fileName, JSON.stringify(content), function (err) {
                if (err) throw err;
                console.log('Generated ' + compressedFilePath + fileName + ' successfully!!!');
            });
        });
    });
});