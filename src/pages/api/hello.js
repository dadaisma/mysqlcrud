// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {pool} from '../../config/db'



export default async function handler(req, res) {

const [rows] = await pool.query('SELECT NOW()')
console.log(rows)
return res.status(200).json('DATA E ORA: ' + rows[0]['NOW()'])
 // res.status(200).json({ name: 'Hello muchacosss' })
}
