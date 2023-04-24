const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Ad = require('./models/ads-Schema');

const cors = require("cors");


const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://pragati:Highline10@cluster0.rg8c8ce.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to MongoDB: ${mongoUri}`))
  .catch(error => console.error('MongoDB connection error:', error.message));



app.get('/api/ads', async (req, res) => {
  const searchTerm = req.query.searchTerm;
  console.log(searchTerm)

  
  const ads = await Ad.aggregate([
    {
      $match: {
        $or: [
          { company_Name: { $regex: searchTerm, $options: 'i' } },
          { primaryText: { $regex: searchTerm, $options: 'i' } },
          { headline: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
        ]
      }
    },
    { $project: { companyId: 1, primaryText: 1, headline: 1, description: 1, imageUrl: 1,Company_link:1,CTA:1,company_Name:1} }
     
  ]);
   console.log(ads)
  res.json(ads);

 
});

app.listen(port, () => console.log(`Server listening on port ${port}`));


