import express, {Request, Response} from "express"
import data from "./static.json"


const PORT = 8080

const app = express()

const router = express.Router()

router.get("/admin/descriptions/:name", async (req: Request, res: Response) => {
  const typeName = req.params.name
  data.forEach((element) => {
    if (element.type === typeName) {
      return res.status(200).json(element)
    }
  })

  return res.status(404)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
