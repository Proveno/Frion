import mongoose, { mongo } from 'mongoose';

const connection ={};
async function dbConnect(){
    if(connection.isConnected){
        return;
    }
    const db = await mongoose.connect(
    "mongodb+srv://adminUser:M9RasTmoLg35N8AV@cluster0.qhuao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(db);

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;