// api/analyze-symptoms.js
// Backend API endpoint for symptom analysis
// This can be deployed as a serverless function (Vercel, Netlify, AWS Lambda)
// or as an Express.js route

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { narrative } = req.body;

    // Validate input
    if (!narrative || typeof narrative !== 'string' || narrative.length < 20) {
      return res.status(400).json({ 
        error: 'Invalid input. Please provide a narrative with at least 20 characters.' 
      });
    }

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `You are a medical AI assistant helping to generate a differential diagnosis based on a patient's narrative. Analyze the following patient narrative and provide:

1. A differential diagnosis with 3-5 possible conditions
2. Confidence levels (0-100) for each
3. Supporting criteria from the narrative
4. Recommended tests to confirm or rule out each condition
5. Any red flags that need immediate attention

Patient Narrative:
${narrative}

Please respond ONLY with valid JSON in this exact format:
{
  "differentialDiagnosis": [
    {
      "condition": "Condition Name",
      "confidence": 85,
      "likelihood": "high",
      "explanation": "Brief explanation of why this fits",
      "supportingCriteria": ["Criterion 1", "Criterion 2"],
      "recommendedTests": ["Test 1", "Test 2"],
      "clinicalGuideline": "Brief reference to clinical guidelines if applicable"
    }
  ],
  "ruleOutConditions": [
    {
      "condition": "Serious Condition to Rule Out",
      "urgency": "immediate" or "routine",
      "reason": "Why this needs to be ruled out"
    }
  ],
  "ageRelatedScreening": [
    {
      "screening": "Screening Name",
      "reason": "Why recommended",
      "frequency": "How often"
    }
  ],
  "crossSystemPatterns": [
    {
      "pattern": "Pattern description",
      "implications": "What this means",
      "action": "Recommended action"
    }
  ]
}

Important:
- Be evidence-based and cite medical literature when possible
- Rank conditions by likelihood based on the narrative
- Always include red flags or urgent conditions in ruleOutConditions if applicable
- Do not provide medical advice, only diagnostic possibilities
- Response must be valid JSON only, no markdown formatting`
        }]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Anthropic API Error:', error);
      return res.status(response.status).json({ 
        error: 'Failed to generate analysis', 
        details: error 
      });
    }

    const data = await response.json();
    
    // Extract the JSON from Claude's response
    const content = data.content[0].text;
    
    // Parse the JSON response
    let diagnosis;
    try {
      // Remove any markdown code fences if present
      const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
      diagnosis = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Content:', content);
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        details: 'The AI response was not in valid JSON format'
      });
    }

    // Return the diagnosis
    return res.status(200).json(diagnosis);

  } catch (error) {
    console.error('Error in analyze-symptoms:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
}

// For Express.js usage (alternative to serverless):
// 
// const express = require('express');
// const router = express.Router();
// 
// router.post('/analyze-symptoms', async (req, res) => {
//   // Use the same handler logic above
//   return handler(req, res);
// });
// 
// module.exports = router;
