
import { DB } from "../db.connection.js";


export const logsmodel  = DB.collection("logs" , {
    capped : true,
    size: 1048576
})