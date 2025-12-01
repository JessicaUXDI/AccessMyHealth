# PeriHealth - Women's Health Partner

A patient-centered health tracking application demonstrating AI-assisted healthcare insights and personalized baseline tracking.

## Features

- **Health System Tracking**: Monitor 6 key health systems (Hormones, Mind & Mood, Cardiovascular, Musculoskeletal, Digestion, Activity)
- **Personalized Baselines**: Track YOUR normal vs. population norms
- **AI Pattern Recognition**: Cross-system insights connecting health data across visits
- **Appointment Preparation**: Organize symptoms, concerns, and questions for provider visits
- **Collaborative Diagnosis**: Shared differential diagnosis view for patients and providers
- **Plan of Care**: Partnership-based treatment planning

## Tech Stack

- React 18
- Vite
- Pure CSS (inline styles)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

This app is configured for Vercel deployment. Simply push to GitHub and Vercel will automatically build and deploy.

## Project Structure

```
├── index.html          # Entry HTML file
├── main.jsx           # React entry point
├── App.jsx            # Main application component
├── package.json       # Dependencies and scripts
└── vite.config.js     # Vite configuration
```

## Concept

This is a prototype demonstrating intelligent healthcare tracking that:
- Distinguishes between population norms and individual baselines
- Uses AI to detect patterns across different healthcare visits
- Connects symptoms and lab results across multiple health systems
- Empowers patients with age-appropriate health insights
- Positions healthcare as a partnership between patient and provider

## Design Philosophy

- **Your Normal vs. Normal**: Recognizes that individual baselines matter (e.g., athletic HR of 50 bpm is healthy for that person)
- **Timeline Intelligence**: Connects events across time (knee pain → reduced activity → weight gain → more symptoms)
- **Cross-System Thinking**: Links related issues across different health domains
- **Insight, Not Alarm**: Educates about possibilities while empowering prevention and management


## Clinical Logic

### Personal Baseline System

The system tracks each patient's historical values and calculates deviation:

```javascript
{
  name: 'Estradiol',
  value: 95,           // Current
  refRange: '30-400',  // Population normal
  baseline: 145,       // This patient's normal
  deviation: -34,      // 34% below THEIR baseline
}
```

### AI Pattern Recognition

Cross-visit analysis identifies clusters:
- Musculoskeletal (frozen shoulder + plantar fasciitis + joint pain → estrogen decline)
- Cardiovascular (palpitations + HR elevation → hormone fluctuation)
- Metabolic (LDL rise + weight gain → menopausal transition)

## License

Proprietary - All rights reserved

## Contact

Jessica Poole (creator/designer)
iamjessicapoole@gmail.com
