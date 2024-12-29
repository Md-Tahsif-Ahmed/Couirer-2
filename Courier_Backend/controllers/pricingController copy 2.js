const Price = require('../models/Price');
function generate6DigitId() {
    // Take the current timestamp in seconds, then take the last 6 digits
    const timestamp = Math.floor(Date.now() / 1000);
    const randomPart = Math.floor(Math.random() * 1000); // Generate a random number up to 999
    const uniqueId = (timestamp + randomPart) % 1000000; // Ensure it's a 6-digit number
    return uniqueId.toString().padStart(6, '0'); // Pad with leading zeros if needed
  }
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
        const shortId = generate6DigitId();
        const { from, destination, category, serviceType, basePrice, extraWeightPrice } = req.body;
        const updatedPrice = await Price.findOneAndUpdate(
            { _id:shortId, from, destination, category, serviceType },
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
      const PricingAll = req.body; // Array of Pricing objects
      console.log(PricingAll);
  
      // Assign a unique 6-digit ID to each Pricing object
      const PricingsWith6DigitId = PricingAll.map(Pricing => ({
        ...Pricing,
        _id: generate6DigitId(),
      }));
  
      // Use insertMany to add multiple Pricing records at once
      await Price.insertMany(PricingsWith6DigitId);
  
      res.status(200).json({ message: 'Pricing data uploaded successfully' });
    } catch (error) {
      console.error('Error processing Pricing data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };