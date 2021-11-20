const util = require('../util/Utility');

class ShopController{

    //[GET] /
    shop(req, res, next){
        res.render('shop/shop');
    }

     //[GET] /:brand/:gender/:category/:id
    fullview(req, res, next){
        res.render("shop/fullview");
    }

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
                link: "/shop/" +brand
            });
        }
        
    }
}

module.exports = new ShopController;