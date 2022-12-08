import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI!;

    export const connect = () => {
        mongoose.connect(
            DB_URI,
            {
                keepAlive: true
            },
            (err) => {
                if(err) {
                    console.log('❌ Error with MongoDB . . .')
                }else {
                    console.log('💾 MongoDB conection successfully!')
                }
            }
        )
    };
