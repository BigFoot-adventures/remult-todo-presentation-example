import express, { Router } from "express";
import { User } from "../shared/User";
import { TasksController } from "../shared/TasksController";
export const auth = Router();

auth.use(express.json());

const haha = new TasksController;
export const validUsers: User[] = [
    {
        "userName": "Ukudood",
        "firstName": "Brendon",
        "lastName": "",
        "password": "music",
        "lists": [
            "61a325f6-a533-4007-b3ff-7eb2575a85f2",
            "235b63d9-9816-477e-bdd5-66c28ab753fa"
        ]
    },
    {
        "userName": "creature",
        "firstName": "Big",
        "lastName": "Foot",
        "password": "jerky",
        "lists": [
            "eb46e722-8dc5-4fc2-88e0-3266d1eab670",
            "a4d98950-9991-40c0-9619-4414d1e40750",
            "8f106758-aba3-4b55-a3d3-906c32f53ac2"
        ]
    }
];

auth.post("/api/signIn", (req, res) => {
    const user = validUsers.find((user: User) => user.userName === req.body.username && user.password === req.body.password);
    if (user) {
        req.session!['user'] = user;
        res.json(user);
    } else {
        res.status(404).json("Invalid user");
    }
});

auth.post("/api/signOut", (req, res) => {
    req.session!['user'] = null;
    res.json("signed out");
});

auth.get("/api/currentUser", (req, res) =>
    res.json(req.session!['user'])
);
