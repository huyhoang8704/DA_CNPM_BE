const Dish = require("../../models/dish.model");

const index = (req , res) => {
    res.send("Dish") 
}
// Hien cac mon an
const getDishes = async (req, res) => {
    try {
        const dishes = await Dish.find({
            deleted : false
        })
        res.json({
            code : 200,
            message : "Success!",
            data : dishes
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Error!",
            error : error.message
        })
    } 
}

const getDish = async (req, res) => {
    try {
        const dishname = req.params.name; 
        const dish = await Dish.findOne({
            name: dishname
        }).select("name description like price")

        res.json({
            code : 200,
            message : "Success!",
            data : dish
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Error!",
            error: error.message
        })
    }
}

// addDish
const createDish = async (req, res) => {
    try {
        const existDish = await Dish.findOne({
            name : req.body.name,
            deleted : false
        })
        if(existDish) {
            res.status(400).json({
                message : "Món ăn đã tồn tại",
            })
        } else {

            const dish = new Dish({
                name : req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                imageUrl: req.body.imageUrl,
                like: req.body.like,
            });
            const data = await dish.save();
            const name = data.name
            // res.cookie("name", name) //!


            res.status(201).json({
                message : "Món ăn được thêm thành công!",
                data : data,
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Thêm món ăn thất bại!",
            error : error.message
        })
    } 
}

const updateDish = async (req, res) => {
    try {
        const dishname = req.params.name;
        const updateInf = req.body;

        const existingDish = await Dish.findOne({
            name: dishname
        });
        if (!existingDish) {
            return res.status(404).json({
                message: "Món ăn không tồn tại!",
            });
        }

        const updatedDish = await Dish.findOneAndUpdate(
            { name: dishname },
            { $set: updateInf },
            { new: true, fields: '-name' }
        );

        res.status(200).json({
            message: "Cập nhật món ăn thành công!",
            dish: updatedDish,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error!",
            error: error.message,
        });
    }
};





module.exports = {
    index,
    getDishes,
    createDish,
    getDish,
    updateDish
}