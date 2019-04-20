

// This is returned to route!


// index page
exports.index = (req, res) =>{
    // render html + data
    res.render('index.ejs', {
 
    }),
    console.log('entered index');
   // console.log(data)
}

// detail page
exports.detail = (req, res) =>{
    // render html + data
    res.render('detail.ejs', {data: req.params.id})
    console.log('entered detail of ' + req.params.id)
}


// ADD PROFILE ROUTES
// profile route

// exports.profile = (req, res) =>{
//     res.render('profile.ejs', {
//         name: req.user,

//     })
// }
