import prisma from '../../helpers/prisma'

export default async function handler(req, res) {
    console.log("in api route itself!");
    console.log(req.body)
    if (req.method != 'GET') {
        // Process a GET request
        console.log(req.body);
        res.status(405).json({ message: 'needs to be a get request!' })
    } 

    // Handle any other HTTP method
    try {
        console.log("in try")
        console.log(req)
        const swatches = await prisma.ColorPickerCollection.findMany()
        res.status(200).json({message: "Success!", swatches: swatches})
      } catch(e) {
        console.log("catch")
        console.log(e.message)
        res.status(500).send({message: e.message})
      }
}