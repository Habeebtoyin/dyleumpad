import { ActivePools } from "../../../data/PoolsData";

export default function handler(req : any, res : any){
    res.status(200).json(ActivePools)
    console.log(res)
}