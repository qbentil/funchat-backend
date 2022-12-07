import bcrypt from "bcryptjs";

/**
 * 
 * @param l length of the PIN 
 * @returns  an object with the PIN and the hash
 */
export const GeneratePIN = async (l?: number): Promise<{ PIN: string; HASH: string; }> => {
    const len = l || 6;
    // generate a random number with len digits
    const random = Math.floor(Math.random() * Math.pow(10, len));
    // pad the number with 0s to make it len digits long
    const PIN = random.toString().padStart(len, "0");

    // encrypt the PIN
    const HASH = await bcrypt.hash(PIN, 10);

    return { PIN, HASH }

}


export const verifyPIN = async (PIN: string, HASH: string) => {
    return await bcrypt.compare(PIN, HASH);
}

export const sendMail = async (to: string, subject: string, html: string) => {
    // send email

}