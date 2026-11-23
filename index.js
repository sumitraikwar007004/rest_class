const express = require("express");
const app = express();
const port = 8080;

const { v4 : uuidv4 } = require('uuid'); //for unique id 

const methodOverride = require("method-override");
app.use(methodOverride("_method")); //for method-override

app.use(express.urlencoded({extended: true})); //post req

app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts =[
    {
        id:uuidv4(),
        username : "apnacollege",
        content : "I love coding",
    },
    {
        id:uuidv4(),
        username : "shradhakhapra",
        content : "hard work is important to achieve success",
    },
    {
        id:uuidv4(),
        username : "rahulkumar",
        content : "i got selected for my 1st internship",
    },

];

app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts});
});


app.get("/posts/new", (req, res) =>{
    res.render("new.ejs");
});
app.post("/posts", (req, res) =>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");//bydefault send and redirect to get request of route /posts
});

app.get("/posts/:id", (req, res) =>{

      let {id} = req.params;
      let post = posts.find((post) => id === post.id); //if match then return the post obj
      //console.log(post);
      res.render("show.ejs",{post});
    
});

app.patch("/posts/:id",(req, res) =>{

    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((post) => id === post.id); //if match then return the post obj
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");//bydefault send and redirect to get request of route /posts
});
app.get("/posts/:id/edit", (req, res) => {

    let {id} = req.params;
    let post = posts.find((post) => id === post.id); //if match then return the post obj
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res) =>{

    let {id} = req.params;
    posts = posts.filter((post) => id !== post.id); //store all posts which is not = to id
    res.redirect("/posts");//bydefault send and redirect to get request of route /posts

});

app.listen(port, () =>{
    console.log("listening to port : 8080");
});