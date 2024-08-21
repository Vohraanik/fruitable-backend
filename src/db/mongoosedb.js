const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        .then(()=> console.log("connected to mongodb"))
        .catch((error)=>{
            console.log("error", error);
    });
    
} catch (error) {
    // console.log("error", error);
    console.log(error);
    
    }
}

module.exports = connectdb;