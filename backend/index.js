//1.DEFINE THE PORT NUMBER THAT ON THIS PORT
//OUR EXPRESS PORT WILL BE RUNNING
const PORT = 4000;
//2.IMPORT THE EXPRESS
const express = require("express");
//3.CREATE AN INSTANCE OF EXPRESS
const app = express();
//4.IMPORT THE MONGOOSE
const mongoose = require("mongoose");
//5.IMPORT THE JSON WEB TOKEN
const jwt = require("jsonwebtoken");
//6.IMPORT THE MULTER WHERE WE ARE GOING TO STORE OUR
//IMAGES ETC LIKE CLOUDINARY
const multer = require("multer");
//7.IMPORT THE PATH TO GET ACCESS TO OUR BACKEND DIRECTORY
//IN  OUR EXPRESS APP
const path = require("path");
//8.IMPORT THE CORS
const cors = require("cors");
const { type } = require("os");
const e = require("express");

//THROUGH APP.USE WHATEVER REQUEST WE WILL GET FROM
//RESPONSE THAT REQUEST WILL AUTOMATICALLY GET PASSED
//THROUGH JSON
app.use(express.json());

//USING THIS OUR REACT JS FRONTEND WILL CONNECT TO
//EXPRESS APP ON 4000 PORT NUMBER
app.use(cors());

//DATABASE CONNECTION WITH OUR MONGODB
mongoose.connect(
  "mongodb+srv://amansingh20032511:FPWVCd6AemTnSUdI@cluster0.vv59wvt.mongodb.net/E-commerce"
);

//API CREATION FOR TESTING
app.get("/", (req, res) => {
  res.send("Express app is running");
});

//IMAGE STORAGE ENGINE
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

app.use("/images", express.static("upload/images"));

/**************************************** SCHEMAS CREATION STARTS *********************************************************/

// 1.SCHEMA FOR CREATING PRODUCTS
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// 2.SCHEMA FOR CREATING USER MODEL
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

/**************************************** SCHEMAS CREATION ENDS *********************************************************/

/**************************************** MIDDLEWARES CREATION STARTS *********************************************************/

//1. MIDDLEWARE TO FETCH USER
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({
      errors: "Please authenticate using valid token!!!",
    });
  } else {
    try {
      const data = jwt.verify(token,"secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({
        errors: "Please authenticate using a valid token!!!",
      });
    }
  }
};

/**************************************** MIDDLEWARES CREATION ENDS *********************************************************/

/**************************************** API ENDPOINTS CREATION STARTS *********************************************************/

//1. CREATING UPLOAD ENDPOINT FOR IMAGES
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  });
});

//2. ADD PRODUCT API ENDPOINT:
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//3. DELETE PRODUCT API ENDPOINT
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product Removed!!!");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//4. CREATING API ENDPOINT FOR GETTING ALL PRODUCTS
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched!!!");
  res.send(products);
});

//5. CREATING API ENDPOINT FOR REGISTERING THE USER (SIGN UP)
app.post("/signup", async (req, res) => {
  //checking if the user email and password is already present in the database:
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "User already exists",
    });
  }

  //if the user is not already present in the database:
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  //using json web tokens (jwt) for cookies:
  const data = {
    user: {
      id: user.id,
    },
  };

  //creating the token:
  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token,
  });
});

//6. CREATING API ENDPOINT FOR LOGGING IN THE USER (LOGIN)
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        errors: "Wrong Password!!!",
      });
    }
  } else {
    res.json({
      success: false,
      errors: "User not Found!!!",
    });
  }
});

//7. CREATING API ENDPOINT FOR NEW COLLECTION DATA
app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New collection fetched");
  res.send(newcollection);
});

//8. CREATING API ENDPOINT FOR POPULAR IN WOMEN SECTION
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("Popular in women fetched!!!");
  res.send(popular_in_women);
});

//9. CREATING API ENDPOINT FOR ADDING PRODUCTS IN CART DATA
app.post("/addtocart",fetchUser, async (req, res) => {
  let userData = await Users.findOne({
    _id: req.user.id,
  });

  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.status(200).json({
    success:true,
    message:"Product added successfully to the cart!!"
  })
});

//10. CREATING API ENDPOINT FOR REMOVING PRODUCT FROM CART DATA
app.post("/removefromcart",fetchUser, async (req, res) => {
  let userData = await Users.findOne({
    _id: req.user.id,
  });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.status(200).json({
    success:true,
    message:"Product removed successfully from the cart!!"
  })
});


//11. CREATING API ENDPOINT TO GET CART DATA
app.post("/getcart",fetchUser,async(req,res)=>{
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);
})


/**************************************** API ENDPOINTS CREATION ENDS *********************************************************/

//LISTENING ON THE PORT NUMBER
app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server running on port " + PORT);
  } else {
    console.log("DB connection failed with error " + error);
  }
});
