export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { patientProfile } = req.body;

    // Validate input
    if (!patientProfile || !patientProfile.symptoms || patientProfile.symptoms.length === 0) {
      return res.status(400).json({ error: 'Invalid patient data - symptoms required' });
    }

    const prompt = `You are a clinical decision support system. Based on the following patient presentation, generate a differential diagnosis following current clinical diagnositc practice guidelines and validated medical research.

Patient Demographics:
- Age: ${patientProfile.age}
- Sex: ${patientProfile.sex}

Current Symptoms:
${patientProfile.symptoms.map(s => `- ${s.description} (Started: ${s.started}, Severity of impact (0-1): ${s.severity})`).join('\n')}

${patientProfile.pmh ? `Past Medical History:\n${patientProfile.pmh}` : ''}

${patientProfile.medications ? `Current Medications:\n${patientProfile.medications}` : ''}

${patientProfile.familyHistory ? `Family History:\n${patientProfile.familyHistory}` : ''}

Provide a comprehensive clinical analysis:
1. Top 5-7 differential diagnoses ranked by likelihood, based on signs, symptoms and patient demographic against clinical decision-making and assessment guidelines
2. For each diagnosis, explain the supporting criteria
3. Recommended diagnostic tests and assessments to become familiar with and discuss with MD, on the medical basis that the could rule a condition in or out
4. Identify symptoms that MUST be further evaluated for more accurate diagnosis 
5. Age-appropriate, sex-appropriate screening, and PMH appropirate screening
6. Cross-system and visit patterns that may explain multiple symptoms

CRITICAL: Your entire response MUST be ONLY valid JSON in this exact structure with no additional text, explanations, or markdown formatting:

{
  "differentialDiagnosis": [
    {
      "condition": "condition name",
      "likelihood": "high|moderate|low",
      "confidence": 85,
      "supportingCriteria": ["criterion 1", "criterion 2"],
      "explanation": "brief explanation of why this diagnosis fits",
      "recommendedTests": ["test 1", "test 2"],
      "clinicalGuideline": "reference to relevant clinical guideline"
    }
  ],
  "ruleOutConditions": [
    {
      "condition": "serious condition to exclude",
      "reason": "why it must be ruled out",
      "urgency": "immediate|soon|routine"
    }
  ],
  "ageRelatedScreening": [
    {
      "screening": "screening name",
      "reason": "why recommended for this age/sex",
      "frequency": "how often"
    }
  ],
  "crossSystemPatterns": [
    {
      "pattern": "description of pattern across symptoms",
      "implications": "what this pattern suggests",
      "action": "recommended next steps"
    }
  ]
}

DO NOT include any text outside the JSON structure. DO NOT use markdown code blocks. Return ONLY the JSON object.`;

    // Call Claude API
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20241022",
        max_tokens: 4000,
        messages: [{
          role: "user",
          content: prompt
        }]
      })
    });

    // Handle API errors
    if (!anthropicResponse.ok) {
      const errorData = await anthropicResponse.json().catch(() => ({}));
      console.error("Claude API error:", {
        status: anthropicResponse.status,
        statusText: anthropicResponse.statusText,
        error: errorData,
        modelUsed: "claude-sonnet-4-20241022"
      });
      return res.status(anthropicResponse.status).json({ 
        error: 'Claude API request failed',
        details: errorData,
        status: anthropicResponse.status
      });
    }

    // Parse response
    const data = await anthropicResponse.json();
    let responseText = data.content[0].text;
    
    // Clean up any markdown formatting if present
    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    // Parse JSON
    const diagnosis = JSON.parse(responseText);
    
    // Return to frontend
    return res.status(200).json(diagnosis);

  } catch (error) {
    console.error("Error in analyze-symptoms:", error);
    return res.status(500).json({ 
      error: 'Failed to generate medical analysis',
      message: error.message
    });
  }
}
