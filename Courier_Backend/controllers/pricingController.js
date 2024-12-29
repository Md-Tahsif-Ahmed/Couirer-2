const Price = require('../models/Price');
 
exports.addPrice = async (req, res) => {
    try {
        const { weight, from, destination, category, serviceType } = req.body;

        let priceData = await Price.findOne({ from, destination, category, serviceType });
        if (!priceData) {
            return res.json({ error: "No pricing rule found" });
        }

        let price = priceData.basePrice;
        if (weight > 1.0) {
            let extraWeight = weight - 1.0;
            let extraCost = Math.ceil(extraWeight) * priceData.extraWeightPrice;
            price += extraCost;
        }

        res.json({ price });
    } catch (error) {
        console.error("Error calculating price:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.setPrice = async (req, res) => {
    try {
      
        const { from, destination, category, serviceType, basePrice, extraWeightPrice } = req.body;
        const updatedPrice = await Price.findOneAndUpdate(
            { from, destination, category, serviceType },
            { basePrice, extraWeightPrice, updatedAt: new Date() },
            { new: true, upsert: true }
        );

        res.json({ message: "Price updated successfully", updatedPrice });
    } catch (error) {
        console.error("Error updating price:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getPricing = async (req, res) => {
    try {
        const pricing = await Price.find({});
        res.status(200).json(pricing);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching pricing',
            error: error.message,
        });
    }
}
 
exports.addPricing = async (req, res) => {
    try {
      const PricingAll = req.body; // Array of pricing objects
      console.log(`Received chunk with ${PricingAll.length} records`);
      
      // Validate each object to ensure required fields are present
      const isValidData = PricingAll.every(pricing => 
        pricing.from && pricing.destination && pricing.category && 
        pricing.serviceType && pricing.basePrice && pricing.extraWeightPrice
      );
  
      if (!isValidData) {
        return res.status(400).json({ error: 'Invalid data format in one or more records' });
      }
  
      // Assign unique IDs and insert records
      const PricingsWith6DigitId = PricingAll.map(Pricing => ({
        ...Pricing,
        // _id: generate6DigitId(),
      }));
  
      await Price.insertMany(PricingsWith6DigitId);
  
      res.status(200).json({ message: 'Chunk uploaded successfully' });
    } catch (error) {
      console.error('Error processing pricing chunk:', error.message);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  };
  