const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        minLength: 3,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        uniq:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
    },
    age:{
        type:Number,
        required:true,
        trim:true,
        min:18,
        max:60
    },
    gender:{
        type:String,
        required:true,
        trim:true,
        enum:['Male','Female']
    },
    address:{
        city:{
            type:String,
            trim:true,
            maxLength: 20,
            lowercase:true,
        },
        country:{
            type:String,
            trim:true,
            maxLength: 50,
            lowercase:true,
        }
    }
    ,
    phone:{
        type:String,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('Invalid phone number');
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        // match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
    },
    tokens:[{
        token:{
            type:String
        }
    }
    ],
    image:{
        type:String,
        default:'https://static.storyweaver.org.in/illustrations/48563/large/unknown-clip-art-4.jpg'
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    bookedTrips:[{
        tripId:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Trip'
        }
    }
    ],
    favorites:[{
        tripId:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Trip'
        }
    }
    ],
},{
    timestamps:true
})
userSchema.virtual("myTrips",{
    ref:"Trip",
    localField:"bookedTrips._id",
    foreignField:"_id"
})
userSchema.virtual("myFavorites",{
    ref:"Trip",
    localField:"favorites._id",
    foreignField:"_id"
})
userSchema.pre("save", async function(){
    if(this.isModified("password"))
    this.password = await bcrypt.hash(this.password,12)
})
userSchema.statics.loginMe=async (email,password)=>{
    const user = await userModel.findOne({email:email})
    if(!user) throw new Error("invalid email")
    const match = await bcrypt.compare(password,user.password)
    if(!match) throw new Error("invalid password")
   return user
}
userSchema.methods.generateToken= async function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

const userModel = mongoose.model('User',userSchema)

module.exports = userModel