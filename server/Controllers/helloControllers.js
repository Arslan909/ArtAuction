import Test2 from "../Models/testModel.js"



export function helloAll(req, res) {
  res.send("<h1>hello from flask to all</h1>")
}

export function saveDataMongo(req, res) {
  const test2 = new Test2(req.body)

  test2.save()
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((error) => {
      res.send(error);
    })
}

export function helloUser(req, res) {
  let id = req.params.id
  res.send(`<h1>hello from flask to ${id}</h1>`)

}