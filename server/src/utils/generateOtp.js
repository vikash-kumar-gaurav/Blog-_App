import otpGenerator from 'otp-generator'

export async function generateOtp(){
    const otp = otpGenerator.generate(6,{
        upperCaseAlphabets:true,
        lowerCaseA1phabets:true,
        specialChars:false
    })
    return otp
}



