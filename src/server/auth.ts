import express, { Router } from "express";
import { User } from "../shared/User";
export const auth = Router();

auth.use(express.json());

export const validUsers: User[] = [
    {
        "id": "Ukudood",
        "firstName": "Brendon",
        "lastName": "",
        "password": "music"
    },
    {
        "id": "creature",
        "firstName": "Big",
        "lastName": "Foot",
        "password": "jerky"
    }
];

auth.post("/api/signIn", (req, res) => {
    const user = validUsers.find((user: User) => user.id === req.body.username && user.password === req.body.password);
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
