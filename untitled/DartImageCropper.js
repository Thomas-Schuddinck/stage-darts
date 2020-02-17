const sharp = require('sharp');

process.argv.forEach(function (value, index, array) {
    if(index> 1){
        sharp(value).extract({ width: 290, height: 290, left: 290, top: 225 }).toFile("clean" + value)
            .then(function(new_file_info) {
                console.log("Image cropped and saved");
            })
            .catch(function(err) {
                console.log(err);
            });
    }

});