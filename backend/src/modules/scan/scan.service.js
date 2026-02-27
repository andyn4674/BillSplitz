const openai = require("../../config/openai");

// scans a receipt and prompts OpenAI to return the items and prices in JSON format
exports.scanReceipt = async (base64Image) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:image/jpeg;base64,${base64Image}`,
                        },
                    },
                    {
                        type: "text",
                        text: 
                            `You are a receipt scanner. Extract all line items and pricing from this receipt.
                            Return ONLY a valid JSON object in exactly this format, nothing else:
                            {
                                "restaurant_name": "name of restaurant or null if not found",
                                "items": [
                                    { "description": "item name", "price": 0.00 }
                                ],
                                "subtotal": 0.00,
                                "tax": 0.00,
                                "total": 0.00
                            }
                            Rules:
                                - All prices must be numbers, not strings
                                - If you cannot find subtotal or tax, calculate or set to 0
                                - Do not include tip in the items or subtotal
                                - Do not include any explanation or text outside the JSON`,
                    },
                ],
            },
        ],
        max_tokens: 1000,
    });

    // extract text response
    const content = response.choices[0].message.content;

    // parse JSON and strip accidental backticks
    const clean = content.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return parsed;
}