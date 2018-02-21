const router = require('express').Router();
const Image = require('../models/images-model');

//check if user is logged in
const authCheck = (req, res, next) =>{
  if (!req.isAuthenticated()) {
    //if user is not logged in
    res.redirect('/');
  }else {
    //if user logged in
    next();
  }
};

//display images to everyone
router.get('/', (req, res) => {
  Image.find({}, function( err, data ){
    if (err) throw err;
    res.render('index', {
                          user: req.user,
                          images: data
                        });
  });

});

router.get('/cloneboard', authCheck, (req, res) => {
  //get current users images only
  Image.find({owner: req.user.username}, function( err, data ){
    if (err) throw err;
    res.render('cloneBoard', {
                              user: req.user,
                              images: data
                            });
  })
});

// handle post request
router.post('/cloneBoard', (req, res)=>{
  //save img and title to db
  const newImage = {
    title: req.body.title,
    url: req.body.url,
    owner: req.user.username,
    likes: 0,
    voters: []
  };
  Image.create(newImage).then( (image) => {
    res.send(image);
  });
});

//handle delete request
router.delete('/cloneBoard/:title', (req, res) => {

  const title = req.params.title.trim();
  const owner= req.user.username;
  //delete the current users selected picture
  Image.findOne({title: title, owner: owner}).remove( (err, data) =>{
    if(err) throw err;
    res.send(data);
  });
});

//handle updating the likes
router.put('/cloneBoard', (req, res) => {
  const title = req.body.title.trim();
  const owner = req.body.owner.trim();

  //this checks if user already voted if not it adds the vote
  Image.findOne({title: title, owner: owner}).exec((err, data) => {
    
    if(data.voters.includes(req.user.username)){
      res.send('already voted');
    }else{
      //update the current image likes by adding 1 and adding the voter
      Image.findOneAndUpdate({title: title, owner: owner}, {$inc : {likes: 1}, $push: {voters: req.user.username}}, {new: true}).exec((err, data) => {
        if(err) throw err;

        res.send('Done');
      })
    }
  })
})

module.exports = router;
