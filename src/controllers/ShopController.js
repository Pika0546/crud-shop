const util = require('../util/Utility');

class ShopController{

    //[GET] /
    shop(req, res, next){
        res.render('shop/shop');
    }

// ====== Mấy hàm này hồi đó t code để ra giao diện thôi
// ====== CODE LẠI HẾT NHA, ĐỌC TỪ DỮ LIỆU RA
//Dùng cái muốn lấy cái gì thì dùng service tương ứng
//Tạo thêm service trong thư mục Sercices nha
// t có commet trên mỗi hàm cái dòng:
//[GET] /:brand/:gender/:category/:id
//Sau dấu hai chấm chính là request á
//muốn lấy thì dùng req.params

    //Xem chi tiết sản phẩm
     //[GET] /:brand/:gender/:category/:id
    fullview(req, res, next){
        res.render("shop/fullview");
    }

    //Mấy giá trị brand, gender, category dưới này có thể là all nha
    //Khi brand là all tức là brand nào cũng lấy, tương tự với cate với gender
    //Nếu tất cả là all hết thì là ra trang shop - hiển thị tất cả sản phẩm
    //khi giá trị của brand, gender, category không phải là all á, thì nó chính là
    //cái cột slug trong cơ sở dữ liệu, dựa vào cái slug đó mà truy vấn

     //Hàm này để render ra tất cả sản phẩm trong :category 
     //Và thuộc :brand giới tính là :gender
     //Nhớ kiểm tra vụ all nói ở trên nha
     //[GET] /:brand/:gender/:category/
    shopByCategory(req, res, next){
        const brand = req.params.brand;
        const gender = req.params.gender;
        const category = req.params.category;
        if(brand !== "crazy-bunny" &&
            brand !== "crazy-rockpanda" &&
            brand !== "moustache-monster" &&
            brand !== "zombie-popsicle" &&
            brand !== "all"){
            next();
        }
        else if(gender !== "women" &&
                gender !== "men"&&
                gender !== "unisex" &&
                gender !== "all"){
            next();
        }else if(category !== "t-shirt"&&
                category !== "cap" &&
                category !== "backpack"&&
                category !== "sneaker" &&
                category !== "all"){
            next();
        }else{
            let brandUI = "";
            let genderUI = "";
            let categoryUI = "";
            
           if(category === "all"){
               if(gender === "all"){
                   if(brand === "all"){
                       res.redirect("/shop");
                   }else{
                    res.redirect("/shop/" + brand);
                   }
               }
               else{
                    res.redirect("/shop/" + brand + "/" + gender);
               }
           }
           else{
                if(brand === "all"){
                    brandUI = null;
                }else{
                    brandUI = util.getUIBrandName(brand);
                }

                if(gender === "all"){
                    genderUI = null;
                }else{
                    genderUI = util.getUIgender(gender);
                }
                categoryUI = util.getUICategory(category);
                res.render("shop/category",{
                    brand: brandUI,
                    gender: genderUI,
                    category: categoryUI,
                    link: "/shop/" +brand + "/" +gender + "/" + category
                })
           }
        }
            
    }

     //Hàm này để render ra tất cả sản phẩm giới tính :gender 
     //Và thuộc :brand
     //Nhớ kiểm tra vụ all nói ở trên nha
    //[GET] /:brand/:gender
    shopByGender(req, res, next){
        const brand = req.params.brand;
        const gender = req.params.gender;
        if(brand !== "crazy-bunny" &&
        brand !== "crazy-rockpanda" &&
        brand !== "moustache-monster" &&
        brand !== "zombie-popsicle" &&
        brand !== "all"){
        next();
    }
    else if(gender !== "women" &&
            gender !== "men"&&
            gender !== "unisex" &&
            gender !== "all"){
        next();
    }else{
            if(brand === 'all'){
                if(gender === 'all'){
                    res.redirect("/shop");
                }
                else{
                    res.render('shop/'+ gender,{
                        brand: null,
                        gender: util.getUIgender(gender),
                        link: "/shop/" +brand + "/" +gender
                    });
                }
            }
            else{
                if(gender === 'all'){
                    res.redirect("/shop/" + brand);
                }
                else{
                    res.render('shop/' + gender,{
                        brand : util.getUIBrandName(brand),
                        gender : util.getUIgender(gender),
                        link: "/shop/" +brand + "/" +gender
                    });
                }
            }
        }
    }

    //Hàm này render ra tất cả sản phẩm của một :brand
    //[GET] /:brand
    shopByBrand(req, res, next){
        const brand = req.params.brand;
        if(brand !== "crazy-bunny" &&
        brand !== "crazy-rockpanda" &&
        brand !== "moustache-monster" &&
        brand !== "zombie-popsicle" &&
        brand !== "all"){
            next();
        }
        else{
            if(brand === "all"){
                res.redirect("/shop");
            }
            res.render('shop/brand', {
                brand : util.getUIBrandName(brand),
                link: "/shop/" + brand
            });
        }
    }
}

module.exports = new ShopController;