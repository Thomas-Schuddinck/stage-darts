const sharp = require('sharp');
const width = 400,
    r = width / 2

const arr = ["M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z",
    "M0 0-21-140A60 50 0 0 1 21-140Z"]
//DOOR ALLE INPUT AFBEELDINGEN LOPEN
process.argv.forEach(function (value, index, array) {
    if (index > 1) {
        //20 KEER DRAAIEN VOOR ALLE VAKKEN
        for (var teller = 0; teller < 20; teller++) {

            circleShape = Buffer.from(`<svg width="290" height="290" >
            <g transform="translate(145,145) rotate(${teller * 18})" stroke="#000" stroke-width="2">
            <path d="M0 15-21-140A60 50 0 0 1 21-140Z" fill="#080"/>
            </g>
            </svg>`);
            var img = sharp(value).extract({width: 290, height: 290, left: 290, top: 225})
                .composite([{
                    input: circleShape,
                    blend: 'dest-in'
                }])
                .webp()
                .toFile('output' + teller + '.webp ', (err, info) => err ?
                    console.error(err.message) :
                    console.log(info)
                );
            console.log(teller * 18);
        }


    }

});