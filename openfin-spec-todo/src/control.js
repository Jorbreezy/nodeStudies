const express = require('express');
const path = require("path");
const router = express.Router();
const moment = require('moment');
const multer = require('multer');

const level = require('level');

const db = level('./db', {
    valueEncoding: 'json'
});


db.get('ids', (error) => {
    if(error){
        db.put('ids', [], (error) => {
            if(error){
                console.log(error);
                return;
            }
        })
    }
})


router.get("/todo/link/:link", (req, res, next) => {
    const link = req.params.link;

    db.get(`link:${link}`, (err, data) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json(data);
    });
});

//GETTING TODO LIST
router.get('/todo/list', (req, res) => {
    const collection = [];
    
    db.get("ids", (error, ids) => {
        if(error){
            return res.status(200).json([]);
        }

        ids.forEach((id, index) => {
            db.get(id, (error, todos) => {
                if (!error) {
                    collection.push(todos);
                }
                
                if (index === ids.length - 1) {
                    return res.status(200).json({ collection });
                }
            });
        });
    });


});

//ROUTES FOR CREATE
router.post('/todo/create', (req, res) => {
    const todo = req.body;

    todo.time = moment().format('MMMM Do YYYY, h:mm:ss a')
    todo.id = Math.random().toString(16).slice(2);

    if (todo.title === "") {
        return res.status(200).json({ message: 'Title of todo is empty' });
    }
    
    db.put(todo.id, todo, (err) => {
        if (err) {
            console.error(err, 'err 1')
            return res.status(500).json({ message: err.message });
        } 
        
        db.get('ids', (error, data) => {
            if (error) {
                console.error(error, 'err2')
                return res.status(500).json({ message: error.message })
            }

            if (!data) {
                db.put("ids", [id], error => {
                    if (error) {
                        console.error(err)
                        res.status(500).json({ message: error.message })
                    }
                })
                return;
            }
            
            data.push(todo.id);
            db.put("ids", data, error => {
                if (error) {
                    return res.status(500).json({ message: error.message });
                }

                res.status(200).json(todo);
            });
        });
    })
});

router.post("/todo/shareable", (req, res, nest) => {
    const id = req.query.id;
    const short = Math.random().toString(16).slice(2);

    db.get(id, (err, data) => {
        if (!err) {
            db.put(`link:${short}`, data, (err) => {
                if (!err) {
                    res.status(200).json({ link: req.headers.host + "/" + short });
                }
            });
        } else {
            res.status(400).json({ msg: error });
        }
    });
});

//TODO:ID ROUTE
router.get('/todo/get/:id', (req, res, next) => {

    db.get(req.params.id, (error, data) => {
        if (!error) {
            res.status(200).json(data);
        } else {
            res.status(400).json(error);
        }
    });
});

//UPDATE ROUTE
router.put('/todo/update/:id', (req, res) => {
    var id = req.params.id;
    var item = req.body;

    db.put(id, item, (err) => {
        if (!err) {
            res.status(200).json({ message: "Updated" });
        } else {
            return console.log('Ooops!', err);
            res.status(400).json('Ooops!', err);
        }

        db.get(id, function (err, value) {
            if (err) return console.log('Ooops!', err)
        });

    });
});

//DELETE ROUTE
router.delete('/todo/delete/:id', (req, res) => {
    var id = req.params.id;

    db.del(id, (err) => {
        if (err) {
            return console.log(`error: ${err.message}`);
            res.status(400).json({ message: err.message });
        } else {
            console.log(`Deleted ${id}`);
            res.status(202).json({ message: "Deleted" });
        }

    });
});

//SEARCH ROUTE
router.get('/todo/search', (req, res) => {
    const q = req.query.q;

    const collection = [];

    db.get("ids", (error, ids) => {
        for (let i = 0; i < ids.length; i++) {
            db.get(ids[i], (error, todo) => {
                todo = Array.isArray(todo) ? todo[0] : todo;

                if (error) {
                    //res.status(400).json(error);
                } else if (todo.title.includes(q)) {
                    collection.push(todo);
                }

                if (i === (ids.length - 1)) {
                    res.status(200).json(collection);
                }
            });
        }
    });
});

// function collect(ids, cb) {
//     const collection = []

//     for (let i = 0; i < ids.length; i++) {
//         db.get(ids[i], (err, document) => {
//             if (err) return cb(err, undefined)

//             if (i === (ids.length - 1)) {
//                 return cb(null, collection)
//             }
//             collection.push(document)
//         })
//     }
// }

//FOR UPLOADING FILES
// const storage = multer.diskStorage({
//     destination: './upload/',
//     filename: function(req, file, cb){
//         cb(null, file.fieldname + 
//         '-' + 
//         Date.now() + 
//         path.extname(file.originalname));
//     }
// });

// //Init Upload
// const upload = multer({
//     storage: storage,
//     limits: {filesize: 1000000},
//     fileFilter: (req, file, cb) => {
//         checkFileType(file, cb);
//     }
// }).single('myImage');

// //Checking file type
// function checkFileType(file, cb){
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname)); 
//     const mimetype = filetypes.test(file.mimetype);

//     if(mimetype && extname){
//         return cb(null, true) 
//     } else {
//         cb('Error: Images Only!');
//     }

// };


// //Uploading Image Route
// router.post('/todo/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if(err){
//             res.status(400).json({msg: err});
//         } else {
//            res.status(200).json({file:`uploads/${req.file.fieldname}`});
//         }
//     });
// });

// var uploads = multer({ dest: './uploads' });

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploads)
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

router.post('/todo/upload', function (req, res, next) {

    var upload = multer({ storage: storage }).single('img');

    upload(req, res, function (err) {
        if (err) {
            res.json({ success: false, message: err });
        }
        else {
            res.json({ success: true, message: "Photo was updated !", file: req.file });
        }
    });
});



module.exports = router;