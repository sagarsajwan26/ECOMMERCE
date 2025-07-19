import { Admin } from "../models/admin.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const generateAccessToken = async (id) => {
    if (!id) throw new Error('Error while generating token, please try after few minutes');
    const admin = await Admin.findById(id);
    if (!admin) throw new Error('Admin not found');
    return admin.generateAuthToken();
};

export const signupAdmin = AsyncHandler(async (req, res) => {
    const { username, email, password, contactNumber } = req.body;
    console.log(req.body);
    
    const checkExistingAccount = await Admin.findOne({ email });
    if (checkExistingAccount) return res.status(409).json({ message: "Admin already exists" });

    if (
        !username?.firstName?.trim() ||
        !username?.lastName?.trim() ||
        !email?.trim() ||
        !password?.trim() ||
        !contactNumber
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newAdmin = await Admin.create({
        username: {
            firstName: username.firstName,
            lastName: username.lastName,
        },
        email,
        password,
        contactNumber,
    });

    if (!newAdmin) return res.status(500).json({ message: "Internal server error while creating your admin account" });

    const token = await generateAccessToken(newAdmin._id);

    return res
        .status(201)
        .cookie("adminToken", token, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "strict",
        })
        .json(new ApiResponse(201, { newAdmin, token }, "Successfully created admin account"));
});

export const loginAdmin = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingAdmin = await Admin.findOne({ email }).select("+password");
    if (!existingAdmin) return res.status(401).json({ message: "Admin not found" });

    const isPasswordMatch = await existingAdmin.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: "You are not authorized" });
    }
    const token = await generateAccessToken(existingAdmin._id);
    return res.status(200).cookie("adminToken", token, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "strict",
    }).json({ existingAdmin, token });
});

export const logoutAdmin = AsyncHandler(async (req, res) => {
    return res.status(200).cookie("adminToken", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
    }).json({ message: "Successfully logged out" });
});

