const mongoose = require('mongoose')
//define scheme
const filmSchema = mongoose.Schema({
    film_name:{
        type:String
    },
    film_type:{
        type:String
    },
    film_year:{
        type:String
    },
    film_link:{
        type:String
    }
})

//map to mongoose collection name and export
module.exports = mongoose.model('collection_films',filmSchema)