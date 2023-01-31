const express=require('express');
require("./db/conn");
const dab=require("./db/database");
const app=express();
const port = process.env.PORT || 5000;
//const Student=require("./models/userSchema");
const Product=require("./models/productuserSchema");
app.use(express.json());

app.get('/', (req,res)=>{
res.send("hello docker");
})


// app.post('/users', (req,res)=>{
//     console.log(req.body);
//     const user=new Student(req.body)
//     user.save().then(()=>{
//         res.send(user);
//     }).catch((e)=>{
//         res.send(e);
//     })
//         res.send("hello users");
//         })


//         //async-await

//      app.post("/customer",async(req,res)=>{
//         try{
//             const user=new Student(req.body);
//             const createUser = await user.save();
//             res.status(201).send(createUser);
//         }catch(e){
//              res.status(400).send(e);
//         }
        

//      })   

    
//      app.get("/customers",async(req,res)=>{
//         try{
//             const customersData=await Student.find();
//             res.send(customersData);
//         }catch(e){
//              res.status(400).send(e);
//         }
        

//      }) 
     
//      //get indivisual customer

//      app.get("/customer/:firstName",async(req,res)=>{
//         try{
//             const customer_name=req.params.firstName;
//             console.log("yk");
//             console.log(req.params);
//             console.log("pk");
//             const customerData = await Student.findOne({firstName:customer_name});
//             console.log(customerData);

//             if(!customerData){
//                 return res.status(404).send();
//             }
//             else{
//                 res.send(customerData);
//             }
            
//         }catch(e){
//              res.status(500).send(e);
//         }
        
//      })

//      //update customer 

//      app.patch("/customer/:firstName",async(req,res)=>{
//         try{
//            const customer_id = req.params.firstName;
          
//            const updateCustomer = await Student.findOneAndUpdate({firstName : customer_id},req.body);
//            res.send(updateCustomer);
//         }catch(e){
//             res.status(400).send(e);
//         }
//      })

//      app.delete("/customer/:id",async(req,res)=>{
//         try{
//             const customer_id = req.params.id;
//             const deleteCustomer = await Student.findByIdAndDelete({_id : customer_id},req.body);
//             res.send(deleteCustomer);
//         }
//         catch(e){
//             res.status(500).send(e);
//         }
//      })




     //// for products

     //all products

     app.get("/products",async(req,res)=>{
        try{
            const productsData=await Product.find();
            res.send(productsData);
        }catch(e){
             res.status(400).send(e);
        }
        

     }) 
     

     //create new product

     app.post("/product",async(req,res)=>{
        try{
            const detail=new Product(req.body);
            const createNewUser = await detail.save();
            res.status(201).send(createNewUser);
        }catch(e){
             res.status(400).send(e);
        }
        

     })  
     
     
     //get single product

     app.get("/product/:id",async(req,res)=>{
        try{
            const product_id=req.params.id;
            console.log("yk");
            console.log(req.params);
            console.log("pk");
            const productData = await Product.findById({_id:product_id});
            console.log(productData);

            if(!productData){
                return res.status(404).send();
            }
            else{
                res.send(productData);
            }
            
        }catch(e){
             res.status(500).send(e);
        }
        
     })


     //update product 

     app.post("/product/:id",async(req,res)=>{
        try{
           const product_id = req.params.id;
          
           const updateProduct = await Product.findByIdAndUpdate({_id : product_id},req.body);
           res.send(updateProduct);
        }catch(e){
            res.status(400).send(e);
        }
     })


     //delete product 

     app.delete("/product/:id",async(req,res)=>{
        try{
            const product_id = req.params.id;
            const deleteProduct = await Product.findByIdAndDelete({_id : product_id},req.body);
            res.send(deleteProduct);
        }
        catch(e){
            res.status(500).send(e);
        }
     })


     //mysql


     app.post("/employees",(req,res)=>{
      
       const postname=req.body.name;
       const postlaptop=req.body.laptop;
       const postage=req.body.age;
       
       dab.query(`INSERT INTO new_employee (id,name,age,laptop) VALUES (unix_timestamp(now()),'${postname}','${postage}','${postlaptop}')`,(err,results)=>{
        if(err){
            console.log(err)
        }else{
            console.log("connected sql");
            res.status(201).send({msg:'Created User'});
        }
       })

         
       

     })   


     //get all

     app.get("/employee",async(req,res)=>{
        console.log(req.body);

        try{
                 const result = await dab.promise().query(`select * from new_employee`)
                 console.log(result[0]);
                    res.status(200).send(result[0]);
                }catch(e){
                    console.log(e);
                }
        

     }) 


     //get single user

     app.get("/employee/:id",async(req,res)=>{
        const temp_id=req.params.id;

       try{
        const result=await dab.promise().query(`select * from new_employee where id='${temp_id}'`)
           
                res.status(200).send(result[0]);
                res.send("got it")
            }
        catch(e){
            console.log(e);
       }
           
                 
        

     }) 

     //update
     
     app.post("/employee/:id",(req,res)=>{
        const temp_id=req.params.id;


        const updatename=req.body.name;
        const updateage=req.body.age;
        const updatelaptop=req.body.laptop;
        

        dab.query(`UPDATE new_employee SET name='${updatename}',age='${updateage}',laptop='${updatelaptop}' WHERE id='${temp_id}'`,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("updated")
            }
        })
        
     })


     //delete

     app.delete("/employee/:name",(req,res)=>{
        const temp_id=req.params.name;



        dab.query(`DELETE FROM new_employee WHERE name='${temp_id}'`,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("DELETED")
            }
        })
        
     })





     

app.listen(port,()=>{
    console.log(`listing at ${port}`);
})
