const express = require("express");

const app = express();

let tasks = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// Dashboard
app.get("/", (req, res) => {

    let total = tasks.length;

    let pending = tasks.filter(
        task => task.status === "Pending"
    ).length;

    let completed = tasks.filter(
        task => task.status === "Completed"
    ).length;

    res.render("dashboard", {
        tasks,
        total,
        pending,
        completed
    });

});

// Add Task Page
app.get("/add-task", (req, res) => {
    res.render("add-task");
});

// Add Task
app.post("/add-task", (req, res) => {

    let newTask = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: "Pending"
    };

    tasks.push(newTask);

    res.redirect("/");
});

// Edit Page
app.get("/edit/:id", (req, res) => {

    let id = Number(req.params.id);

    let task = tasks.find(
        task => task.id === id
    );

    res.render("edit-task", { task });
});

// Update Task
app.post("/update/:id", (req, res) => {

    let id = Number(req.params.id);

    let task = tasks.find(
        task => task.id === id
    );

    task.title = req.body.title;
    task.description = req.body.description;
    task.priority = req.body.priority;

    res.redirect("/");
});

// Delete Task
app.get("/delete/:id", (req, res) => {

    let id = Number(req.params.id);

    tasks = tasks.filter(
        task => task.id !== id
    );

    res.redirect("/");
});

// Change Status
app.get("/status/:id", (req, res) => {

    let id = Number(req.params.id);

    let task = tasks.find(
        task => task.id === id
    );

    if (task.status === "Pending") {
        task.status = "In Progress";
    }
    else if (task.status === "In Progress") {
        task.status = "Completed";
    }

    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});