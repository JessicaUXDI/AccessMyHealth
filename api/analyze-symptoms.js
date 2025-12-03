export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { patientProfile } = req.body;

    if (!patientProfile || !patientProfile.symptoms || patientProfile.symptoms.length === 0) {
      return res.status(400).json({ error: 'Invalid patient data' });
    }

    const prompt = `You are a clinical decision support system. Based on the following patient presentation, generate a differential diagnosis following current clinical practice guidelines.

Patient Demographics:
- Age: ${patientProfile.age}
- Sex: ${patientProfile.sex}

Current Symptoms:
${patientProfile.symptoms.map(s => `- ${s.description} (Duration: ${s.duration}, Severity: ${s.severity})`).join('\n')}

${patientProfile.pmh.length > 0 ? `Past Medical History:\n${patientProfile.pmh.join(', ')}` : ''}

${patientProfile.medications.length > 0 ? `Current Medications:\n${patientProfile.medications.join(', ')}` : ''}

${patientProfile.familyHistory.length > 0 ? `Family History:\n${patientProfile.familyHistory.join(', ')}` : ''}

Provide a comprehensive clinical analysis:
1. Top 5-7 differential diagnoses ranked by likelihood
2. For each diagnosis, explain the supporting criteria
3. Recommended diagnostic tests
4. Conditions that MUST be ruled out due to severity/urgency
5. Age-appropriate and sex-appropriate screening
6. Cross-system patterns

Return ONLY valid JSON with no markdown:

{
  "differentialDiagnosis": [
    {
      "condition": "condition name",
      "likelihood": "high|moderate|low",
      "confidence": 85,
      "supportingCriteria": ["criterion 1", "criterion 2"],
      "explanation": "why this diagnosis fits",
      "recommendedTests": ["test 1", "test 2"],
      "clinicalGuideline": "reference"
    }
  ],
  "ruleOutConditions": [
    {
      "condition": "serious condition",
      "reason": "why rule out",
      "urgency": "immediate|soon|routine"
    }
  ],
  "ageRelatedScreening": [
    {
      "screening": "name",
      "reason": "why recommended",
      "frequency": "how often"
    }
  ],
  "crossSystemPatterns": [
    {
      "pattern": "description",
      "implications": "what this suggests",
      "action": "next steps"
    }
  ]
}`;

    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{
          role: "user",
          content: prompt
        }]
      })
    });

    if (!anthropicResponse.ok) {
      const errorData = await anthropicResponse.json().catch(() => ({}));
      console.error("Claude API error:", anthropicResponse.status, errorData);
      return res.status(anthropicResponse.status).json({ 
        error: 'Claude API request failed',
        details: errorData 
      });
    }

    const data = await anthropicResponse.json();
    let responseText = data.content[0].text;
    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const diagnosis = JSON.parse(responseText);
    
    return res.status(200).json(diagnosis);

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ 
      error: 'Failed to generate analysis',
      message: error.message
    });
  }
}
