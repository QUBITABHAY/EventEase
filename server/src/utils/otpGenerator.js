import crypto from 'crypto'

/**
* @return {otp}
*/
export const otpGenerator = () => {
    const otp = crypto.randomInt(100000, 1000000).toString()
    return otp
}