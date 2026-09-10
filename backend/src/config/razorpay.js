import Razorpay from 'razorpay'
import {logger} from './logger.js'


const key_id = process.env.RAZORPAY_API_ID || process.env.RAZORPAY_API_KEY || process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_API_SECRET;

if(!key_id || !key_secret){
    logger.warn("Razorpay KEY_ID or KEY_SECRET is missing in environment variables")
}

export const razorpayInstance = new Razorpay({
    key_id:key_id || "dummy_key",
    key_secret:key_secret || "dummy_secret",
});