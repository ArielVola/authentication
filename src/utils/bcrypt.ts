import bcrypt from 'bcrypt';

export const hashText = (text: string) => bcrypt.hash(text, 10);

export const compare = (inputText: string, hashedText: string) => bcrypt.compare(inputText, hashedText);