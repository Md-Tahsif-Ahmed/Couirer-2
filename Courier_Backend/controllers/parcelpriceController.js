exports.parcelPrice = async (req, res) => {
    try {
        const { weight, sdistrict, rdistrict} = req.body;

        let price = 50; // Default base price

        // Logic for Dhaka to Dhaka  
        if (sdistrict === "Dhaka City" && rdistrict === "Dhaka City") {
            if (weight >= 0.2 && weight <= 0.5) {
                price = 60;
            } else if (weight >= 0.6 && weight <= 1.0) {
                price = 70;
            } else if (weight >= 1.1) {
                let extraWeight = weight - 1.0;
                let extraCost = Math.ceil(extraWeight) * 20;
                price = 70 + extraCost;
            }
        }
       
        
 
        
        // Logic for Dhaka to other cities  
        else if (sdistrict === "Dhaka City" && rdistrict !== "Dhaka City") {
         
                price = 60; // Base price for Dhaka to other cities
       

            if (weight >= 0.2 && weight <= 0.5) {
                price += 10;
            } else if (weight >= 0.6 && weight <= 1.0) {
                price += 20;
            } else if (weight >= 1.1) {
                let extraWeight = weight - 1.0;
                let extraCost = Math.ceil(extraWeight) * 20;
                price += 20 + extraCost;
            }
        }
        // Logic for other cities to Dhaka (Regular or Book)
        else if (sdistrict !== "Dhaka City" && rdistrict === "Dhaka City") {
       
                price = 100; // Base price for other cities to Dhaka
           

            if (weight >= 0.2 && weight <= 0.5) {
                price += 10;
            } else if (weight >= 0.6 && weight <= 1.0) {
                price += 20;
            } else if (weight >= 1.1) {
                let extraWeight = weight - 1.0;
                let extraCost = Math.ceil(extraWeight) * 20;
                price += 20 + extraCost;
            }
        }
        // Logic for other city to other city (Regular or Book)
        else {
             

            if (weight >= 0.2 && weight <= 0.5) {
                price += 10;
            } else if (weight >= 0.6 && weight <= 1.0) {
                price += 20;
            } else if (weight >= 1.1) {
                let extraWeight = weight - 1.0;
                let extraCost = Math.ceil(extraWeight) * 20;
                price += 20 + extraCost;
            }
        }

        // Respond with the calculated price
        res.json({ price });
    } catch (error) {
        console.error("Error calculating price:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
