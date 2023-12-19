const Promotion = require("../Models/Promotion")

const PostRequest = async (req, res) => { 
  const { Speciality, Year, Email, Password ,TeacherName} = req.body
  const Request = await Promotion.create({ Speciality, Year, Email, Password,TeacherName,Accepted: False })
  if (!Request)
    return res.status(404).json({ err: "Error sending Request" })

  return res.status(201).json(Request)
}

const AccepteRequest = async (req, res) => {
  const { _id } = req.params._id
  const promotion = await Promotion.updateOne({ _id }, {Accepted:True})
  if (!promotion)
    return res.status(402).json({ err: "Error Accepting a Promotion" })

  return res.status(201).json(promotion)
}
const getPromotions = async (req, res) => {
  const Promotions = await Task.find({Accepted:True})

  if (!Promotions)
    return res.status(401).json({ err: "Error getting Promotions" })
  
  return res.status(201).json(Promotions)
  
}


module.exports = { AccepteRequest, getPromotions,PostRequest }