import { getDB } from '../config/db.js';
import CryptoJS from 'crypto-js'; 

const usersCollection = () => getDB().collection('users');

const generateSalt = () => CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);

const hashPassword = (password, salt) => {
    return CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32, iterations: 10000 }).toString();
};

const verifyPassword = (password, hashedPassword, salt) => {
    const hash = hashPassword(password, salt);
    return hash === hashedPassword;
};

export const findUserByUsername = async (username) => {
    return usersCollection().findOne({ username });
};

export const createUser = async (username, password) => {
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    await usersCollection().insertOne({
        username,
        password: hashedPassword,
        salt
    });
};

export const verifyUserPassword = async (username, password) => {
    const user = await findUserByUsername(username);
    if (user) {
        return verifyPassword(password, user.password, user.salt);
    }
    return false;
};
