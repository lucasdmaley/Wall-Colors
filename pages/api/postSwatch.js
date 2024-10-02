import prisma from '../../helpers/prisma'

export default async function handler(req, res) {
    console.log("in api route itself!");
    console.log(req.body)
    if (req.method != 'POST') {
        // Process a POST request
        console.log(req.body);
        res.status(405).json({ message: 'needs to be a post request!' })
    } 

    // Handle any other HTTP method
    try {
        console.log("in try")
        console.log(req)
        const newSwatch = await prisma.ColorPickerCollection.create({
            data: {
              username: req.body.username,
              color: req.body.color
            },
        })
        res.status(200).json({message: "Success!", newSwatch: newSwatch})
      } catch(e) {
        console.log("catch")
        console.log(e.message)
        res.status(500).send({message: e.message})
      }
}