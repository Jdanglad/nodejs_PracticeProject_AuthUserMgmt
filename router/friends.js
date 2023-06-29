const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/", (req, res) => {
    res.send(friends);
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", function (req, res) {
    const email = req.params.email;
    res.send(friends[email])
});


// POST request: Add a new friend
router.post("/", (req,res) => {
    if (req.body.email) {
        friends[req.body.email] = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "DOB": req.body.DOB
        }
    }
    res.send("The user" + (' ') + (req.body.firstName) + " Has been added!");
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
    const email = req.params.email;
    let friend = friends[email]
    if (friend) {                                        //cheks if friend exist.
       let firstName = req.body.firstName;
       let lastName = req.body.lastName;
       let DOB = req.body.DOB;

       if (firstName) {
           friend["firstName"] = firstName
       }
       if (lastName) {
           friend["lastName"] = lastName
       }
       if (DOB) {
           friend["DOB"] = DOB
       }
       friends[email] = friend;
       res.send(`Friend with email ${email} updated.`);
    }
    else {
        res.send("Unable to find friend!");
    }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
    const email = req.params.email;
     if (email) [
         delete friends[email]
     ]
    res.send(`Friend with the email ${email} was deleted`);
});

module.exports=router;
