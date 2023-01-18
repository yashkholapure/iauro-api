const express=require('express');
require("./db/conn");
const dab=require("./db/database");
const app=express();
const port = process.env.PORT || 3000;
const Student=require("./models/userSchema");
const Product=require("./models/productuserSchema");
app.use(express.json());

app.get('/', (req,res)=>{
res.send("hello");
})


app.post('/users', (req,res)=>{
    console.log(req.body);
    const user=new Student(req.body)
    user.save().then(()=>{
        res.send(user);
    }).catch((e)=>{
        res.send(e);
    })
        res.send("hello users");
        })


        //async-await

     app.post("/customer",async(req,res)=>{
        try{
            const user=new Student(req.body);
            const createUser = await user.save();
            res.status(201).send(createUser);
        }catch(e){
             res.status(400).send(e);
        }
        

     })   

    
     app.get("/customers",async(req,res)=>{
        try{
            const customersData=await Student.find();
            res.send(customersData);
        }catch(e){
             res.status(400).send(e);
        }
        

     }) 
     
     //get indivisual customer

     app.get("/customer/:firstName",async(req,res)=>{
        try{
            const customer_name=req.params.firstName;
            console.log("yk");
            console.log(req.params);
            console.log("pk");
            const customerData = await Student.findOne({firstName:customer_name});
            console.log(customerData);

            if(!customerData){
                return res.status(404).send();
            }
            else{
                res.send(customerData);
            }
            
        }catch(e){
             res.status(500).send(e);
        }
        
     })

     //update customer 

     app.patch("/customer/:firstName",async(req,res)=>{
        try{
           const customer_id = req.params.firstName;
          
           const updateCustomer = await Student.findOneAndUpdate({firstName : customer_id},req.body);
           res.send(updateCustomer);
        }catch(e){
            res.status(400).send(e);
        }
     })

     app.delete("/customer/:id",async(req,res)=>{
        try{
            const customer_id = req.params.id;
            const deleteCustomer = await Student.findByIdAndDelete({_id : customer_id},req.body);
            res.send(deleteCustomer);
        }
        catch(e){
            res.status(500).send(e);
        }
     })




     //// for products



     app.get("/products",async(req,res)=>{
        try{
            const productsData=await Product.find();
            res.send(productsData);
        }catch(e){
             res.status(400).send(e);
        }
        

     }) 


     app.post("/product",async(req,res)=>{
        try{
            const detail=new Product(req.body);
            const createNewUser = await detail.save();
            res.status(201).send(createNewUser);
        }catch(e){
             res.status(400).send(e);
        }
        

     })   

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


     //update customer 

     app.post("/product/:id",async(req,res)=>{
        try{
           const product_id = req.params.id;
          
           const updateProduct = await Product.findByIdAndUpdate({_id : product_id},req.body);
           res.send(updateProduct);
        }catch(e){
            res.status(400).send(e);
        }
     })

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
       // console.log(req.body);
       const pname=req.body.name;
       //const pid=req.body.id;
       const ptech=req.body.technology;
       const plap=req.body.laptop;
       const page=req.body.age;
       console.log(plap);

       dab.query(`INSERT INTO new_employees (name,age,technology,laptop) VALUES ('${pname}','${page}','${ptech}','${plap}')`,(err,results)=>{
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
                 const result = await dab.promise().query(`select * from new_employees`)
                 console.log(result[0]);
                    res.status(200).send(result[0]);
                }catch(e){
                    console.log(e);
                }
        

     }) 


     //get single user

     app.get("/employee/:id",async(req,res)=>{
        const temp=req.params.id;

       try{
        const result=await dab.promise().query(`select * from new_employees where id='${temp}'`)
           
                res.status(200).send(result[0]);
                res.send("got it")
            }
        catch(e){
            console.log(e);
       }
           
                 
        

     }) 

     //update
     
     app.post("/employee/:id",(req,res)=>{
        const temp=req.params.id;


        const upname=req.body.name;
        const upage=req.body.age;
        const uptech=req.body.technology;
        const uplaptop=req.body.laptop;
        

        dab.query(`UPDATE new_employees SET name='${upname}',age='${upage}',technology='${uptech}',laptop='${uplaptop}' WHERE id='${temp}'`,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("updated")
            }
        })
        
     })


     //delete

     app.delete("/employee/:name",(req,res)=>{
        const temp=req.params.name;



        dab.query(`DELETE FROM new_employees WHERE name='${temp}'`,(err,result)=>{
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
