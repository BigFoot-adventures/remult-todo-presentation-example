import express, { Router } from "express";
import { User } from "../shared/User";
export const auth = Router();
import {remult} from 'remult';
import { api } from "./api";

auth.use(express.json());


auth.post("/api/signIn", api.withRemult, async (req, res) => {
    const userRepo = remult.repo(User);
    const user = await userRepo.findFirst({id: req.body.username, password: req.body.password})
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
