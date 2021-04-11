const express = require('express'); // funkcia a potrebujem ju zavolat aby sa vytvorila aplikacia  , len ju nacitam do express frameworku
const bp = require('body-parser')
const app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const routerGet = express.Router();

routerGet.route('/book/tags')
  .get((req, res) => {
    let tagsBook = [];

  
    for (const iterator of library) {
      let oneTag = iterator.tags
       
        tagsBook = tagsBook.concat(oneTag);
    }
    let uniqueArray = Array.from(new Set(tagsBook))
    //  console.log(typeof(uniqueArray)  + " " + typeof(tagsBook));
    res.send(uniqueArray)
    res.status(200)
  });

routerGet.route('/book')
  .get((req, res) => {
    console.log("som v routri");
    res.send(library)
    res.status(200)
  })
  .post((req, res) => {
    let data =
    {
      "title": req.body.title,
      "author": req.body.author,
      "pages": req.body.pages,
      "tags": req.body.tags,
      "id": library.length
    };
let validationTitle = schema1.validate(req.body.title)
let validationAuthor = schema1.validate(req.body.author)
// let validationTags = schema1.validate(req.body.tags)
let validationPages = schema2.validate(req.body.pages)
console.log(req.body.tags)
console.log(req.body.tags.length)
if(validationTitle.error || validationAuthor.error || req.body.tags.length < 1 || validationPages.error ) {
  console.log("ZLE NAPISANE ")
  res.status(405)
  res.send("New book not valid in JSON format")
}

    else  {
      library.push(data)
      console.log(library);
      res.send(library[library.length - 1])
      res.status(200)
    }
  });

app.use(routerGet)

const Joi = require('joi')
const schema1 = Joi.string().min(5).uppercase()
const schema2= Joi.number().integer();

// app.get('/book/tags', (req , res) => {
//   let tagsBook=[];

//   for (var i = 0; i < library.length; i++) {
//     tagsBook.push(library[i].tags)
//   }
//   res.send(tagsBook)
//   res.status(200)

// }); 




app.get('/book/:id', (req, res) => {
  let intValue = parseInt(req.params.id, 10);
  let stringValue = intValue.toString();


  for (var i = 0; i < library.length; i++) {

    if (library[i].id == req.params.id) {
      res.status(200)
      res.send(library.find(item => item.id == req.params.id))
      break;
    }
      else if (stringValue.length != req.params.id.length) {
        res.status(400)
        res.send('Invalid ID format: ' + req.params.id);
        break;
      }
      else if (i==library.length-1) {
        res.status(404)
        res.send('Book with ID: ' + req.params.id + " not found in library!"); 
       break;}
  }


});



app.delete('/book/:id', (req, res) => {

  let intValue = parseInt(req.params.id, 10);
  let stringValue = intValue.toString();

  for (var i = 0; i < library.length; i++) {

    if (library[i].id == req.params.id) {
      res.send(library.splice(i, 1));
      res.status(200)
      console.log(library)
      break;
    }
      else if (stringValue.length != req.params.id.length) {
        res.status(400)
        res.send('Invalid ID format: ' + req.params.id);
        break;
      }
      else if (i==library.length-1) {
        res.status(404)
        res.send('Book with ID: ' + req.params.id + " not found in library!"); 
       break;}
  }
});



app.put('/book/:id', (req, res) => {
  var putNachadzaSa = false;
  for (var i = 0; i < library.length; i++) {

    if (library[i].id == req.params.id) {

      putNachadzaSa = true;
      break;
    }
    else {

      putNachadzaSa = false;
    }
  }
  let intValue = parseInt(req.params.id, 10);
  let stringValue = intValue.toString();
  if (putNachadzaSa == true) {
    res.status(200)

    library[i] = (req.body)
    item = req.params.id;
    var data = [
      {
        "title": req.body.title,
        "author": req.body.author,
        "pages": req.body.pages,
        "tags": req.body.tags,
        "id": req.params.id
      }
    ];

    if (req.body.title.length > 0 && req.body.author.length > 0 && Number.isInteger(req.body.pages) && req.body.tags.length > 0) {
      // console.log(req.body.title.length + " " + req.body.author.length + " " + Number.isInteger(req.body.pages) + " " + req.body.tags.length + " " )

      library[i] = data
      res.send(library[i]);
      res.status(200)
      //console.log((library[i])) 

    }
    else {
      res.send("New book not valid");
      res.status(405)


    }

  }

  else if (stringValue.length != req.params.id.length) {

    res.status(400)
    res.send('Invalid ID format: ' + req.params.id);

  }

  else {
    res.status(404)
    res.send('Kniha s id: ' + req.params.id + " sa nenachdza v kniznici!");

  }

});

const library = [
  {
    "title": "Robinson Crusoe",
    "author": "Daniel Defoe",
    "pages": 300,
    "tags": [
      "adventure",
      "history"
    ],
    "id": 0
  },
  {
    "title": "The Unbearable Lightness of Being",
    "author": "Milan Kundera",
    "pages": 250,
    "tags": [
      "philosophical",
      "novel"
    ],
    "id": 1
  },
  {
    "title": "Nausea",
    "author": "Jean-Paul Sartre",
    "pages": 120,
    "tags": [
      "philosophical",
      "existentialism",
      "novel"
    ],
    "id": 2
  },
]


app.listen(3005, () => console.log('server is running'));

