import React, { useState } from 'react';

// Design System
const colors = {
  primary: '#4A7C7E',
  primaryLight: '#6B9B9D',
  primaryDark: '#3A6365',
  accent: '#D4896A',
  accentLight: '#E9A88A',
  success: '#5B9A6F',
  warning: '#D4A84A',
  alert: '#C75D5D',
  surface: '#FAFBFC',
  card: '#FFFFFF',
  text: '#2D3142',
  textMuted: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  divider: '#F3F4F6',
};

const healthSystems = {
  hormones: { icon: '🌸', name: 'Hormones & Cycles', status: 'insight', statusText: 'New insight available', completion: 75, color: colors.accent },
  mindbody: { icon: '🧠', name: 'Mind & Mood', status: 'good', statusText: 'Stable', completion: 85, color: colors.primary },
  cardiovascular: { icon: '❤️', name: 'Heart Health', status: 'good', statusText: 'On track', completion: 90, color: colors.success },
  musculoskeletal: { icon: '🦴', name: 'Bones & Joints', status: 'attention', statusText: 'Check-in needed', completion: 60, color: colors.warning },
  digestion: { icon: '🌿', name: 'Digestion', status: 'good', statusText: 'Normal', completion: 88, color: colors.success },
  activity: { icon: '⚡', name: 'Activity & Rest', status: 'good', statusText: 'Meeting goals', completion: 72, color: colors.primary },
};

const hormoneData = [
  { month: 'Jun', estrogen: 145, progesterone: 12 },
  { month: 'Jul', estrogen: 138, progesterone: 10 },
  { month: 'Aug', estrogen: 125, progesterone: 8 },
  { month: 'Sep', estrogen: 118, progesterone: 7 },
  { month: 'Oct', estrogen: 108, progesterone: 6 },
  { month: 'Nov', estrogen: 95, progesterone: 5 },
];

const differentialDiagnosis = [
  { name: 'Perimenopause', confidence: 87, criteria: ['Age 40-55', 'Cycle changes', 'Estrogen decline pattern', 'Symptom cluster match'], color: colors.primary },
  { name: 'Thyroid Dysfunction', confidence: 42, criteria: ['Fatigue', 'Mood changes', 'Weight changes'], needsRuleOut: true, color: colors.warning },
  { name: 'Vitamin D Deficiency', confidence: 35, criteria: ['Fatigue', 'Mood changes', 'Joint discomfort'], color: colors.textMuted },
  { name: 'Iron Deficiency Anemia', confidence: 28, criteria: ['Fatigue', 'Brain fog'], color: colors.textMuted },
  { name: 'Primary Ovarian Insufficiency', confidence: 15, criteria: ['Hormone pattern'], needsRuleOut: true, color: colors.alert },
];

const SCREENS = {
  DASHBOARD: 'dashboard',
  INSIGHT: 'insight',
  APPOINTMENT: 'appointment',
  ADD_CONCERNS: 'add_concerns',
  DIAGNOSIS_PREVIEW: 'diagnosis_preview',
  PLAN_OF_CARE: 'plan_of_care',
  HEALTH_SYSTEM_DETAIL: 'health_system_detail'
};

// Detailed health system data
const healthSystemDetails = {
  hormones: {
    recentVisits: [
      { date: 'Nov 15, 2025', type: 'Lab Results', provider: 'Quest Diagnostics', summary: 'Hormone panel showed declining estrogen/progesterone trend' },
      { date: 'Aug 10, 2025', type: 'Annual Exam', provider: 'Dr. Chen', summary: 'Discussed cycle irregularity, ordered comprehensive hormone panel' },
      { date: 'May 3, 2025', type: 'Lab Results', provider: 'Quest Diagnostics', summary: 'FSH levels within normal range for age' }
    ],
    labResults: [
      { 
        test: 'Estradiol', 
        value: '95 pg/mL', 
        date: 'Nov 15, 2025', 
        populationRange: '15-350 pg/mL (premenopausal)', 
        yourBaseline: '140-160 pg/mL (your typical range)',
        status: 'insight',
        interpretation: 'While still within normal population range, this is notably lower than your personal baseline. The 6-month declining trend may explain recent symptoms.'
      },
      { 
        test: 'Progesterone', 
        value: '5 ng/mL', 
        date: 'Nov 15, 2025', 
        populationRange: '5-20 ng/mL (luteal phase)', 
        yourBaseline: '10-14 ng/mL (your typical)',
        status: 'insight',
        interpretation: 'Lower end of normal range and below your usual levels. Consistent with perimenopause transition.'
      },
      { 
        test: 'FSH', 
        value: '28 mIU/mL', 
        date: 'Aug 10, 2025', 
        populationRange: '25-134 mIU/mL (perimenopause)', 
        yourBaseline: 'First measurement at this level',
        status: 'insight',
        interpretation: 'Elevated compared to reproductive years (normal <10), consistent with perimenopause. We\'ll track this over time to establish your pattern.'
      },
      { 
        test: 'TSH', 
        value: '2.1 mIU/L', 
        date: 'Aug 10, 2025', 
        populationRange: '0.4-4.0 mIU/L', 
        yourBaseline: '2.0-2.3 mIU/L (stable for 5 years)',
        status: 'good',
        interpretation: 'Right in your normal range. Thyroid function stable and not contributing to symptoms.'
      }
    ],
    complaints: [
      { date: 'Aug 10, 2025', issue: 'Irregular cycles - varying from 24-38 days' },
      { date: 'Aug 10, 2025', issue: 'Night sweats 2-3x per week' },
      { date: 'May 3, 2025', issue: 'Brain fog and difficulty concentrating' }
    ],
    aiInsights: [
      {
        type: 'pattern',
        title: 'Cross-System Pattern Detected',
        description: 'Your reported sleep disruptions (Activity system) began around the same time as hormone level changes. Night sweats may be interrupting sleep architecture, contributing to daytime fatigue and brain fog.',
        action: 'Addressing vasomotor symptoms may improve sleep quality and cognitive function simultaneously.'
      }
    ],
    ageRelatedInsights: [
      {
        title: 'Perimenopause Transition',
        likelihood: 'High',
        description: 'Women in their 40s commonly experience hormonal fluctuations as ovarian function naturally declines.',
        prevention: 'While perimenopause is a natural process, you can manage symptoms through hormone therapy (if appropriate), regular exercise, stress management, and maintaining a healthy weight.',
        management: 'Track your symptoms to identify patterns. Consider low-dose hormone therapy, lifestyle modifications, and regular check-ins with your provider to adjust treatment as needed.'
      },
      {
        title: 'Bone Density Changes',
        likelihood: 'Moderate',
        description: 'Declining estrogen during perimenopause can affect bone density, potentially increasing osteoporosis risk later.',
        prevention: 'Weight-bearing exercise (walking, strength training), adequate calcium (1200mg/day) and vitamin D (800-1000 IU/day), and avoiding smoking can help maintain bone health.',
        management: 'Consider a baseline bone density scan (DEXA) to establish your current status and guide prevention strategies.'
      }
    ]
  },
  mindbody: {
    recentVisits: [
      { date: 'Oct 20, 2025', type: 'Telehealth Visit', provider: 'Dr. Chen', summary: 'Check-in on mood symptoms, sleep quality stable' },
      { date: 'Jun 5, 2025', type: 'Lab Results', provider: 'LabCorp', summary: 'Thyroid and B12 levels normal' },
      { date: 'Feb 12, 2025', type: 'Therapy Session', provider: 'Lisa Morrison, LCSW', summary: 'CBT session focused on stress management techniques' }
    ],
    labResults: [
      { 
        test: 'Vitamin B12', 
        value: '485 pg/mL', 
        date: 'Jun 5, 2025', 
        populationRange: '200-900 pg/mL', 
        yourBaseline: '450-520 pg/mL (consistent)',
        status: 'good',
        interpretation: 'Right in your typical range. B12 levels are stable and adequate for cognitive function.'
      },
      { 
        test: 'Vitamin D', 
        value: '38 ng/mL', 
        date: 'Jun 5, 2025', 
        populationRange: '30-100 ng/mL', 
        yourBaseline: '35-42 ng/mL (with supplementation)',
        status: 'good',
        interpretation: 'Maintaining adequate levels with current supplementation strategy. Continue current dose.'
      },
      { 
        test: 'TSH', 
        value: '2.1 mIU/L', 
        date: 'Jun 5, 2025', 
        populationRange: '0.4-4.0 mIU/L', 
        yourBaseline: '2.0-2.3 mIU/L',
        status: 'good',
        interpretation: 'Stable and in your normal range. Thyroid not contributing to mood or cognitive symptoms.'
      }
    ],
    complaints: [
      { date: 'Oct 20, 2025', issue: 'Occasional anxiety, particularly around cycle' },
      { date: 'Aug 10, 2025', issue: 'Increased irritability and emotional sensitivity' },
      { date: 'Feb 12, 2025', issue: 'Work stress affecting mood and sleep' }
    ],
    aiInsights: [
      {
        type: 'pattern',
        title: 'Cyclical Mood Pattern',
        description: 'Your anxiety and irritability reports consistently occur in the luteal phase of your cycle (days 18-28), when progesterone should be highest but is currently lower than your baseline.',
        action: 'This hormonal link suggests mood symptoms may improve with hormone stabilization. Track mood alongside cycle to confirm pattern.'
      },
      {
        type: 'connection',
        title: 'Multi-System Connection',
        description: 'Brain fog (reported in Hormone system) overlaps with periods of poor sleep (Activity system). Sleep disruption from night sweats may be affecting cognitive function and mood resilience.',
        action: 'Improving sleep quality through vasomotor symptom management may have cascading benefits for mood and cognition.'
      }
    ],
    ageRelatedInsights: [
      {
        title: 'Hormonal Mood Changes',
        likelihood: 'Moderate',
        description: 'Fluctuating hormones during perimenopause can impact neurotransmitter function, affecting mood stability.',
        prevention: 'Regular exercise (especially aerobic activity), stress reduction techniques like meditation or yoga, maintaining social connections, and adequate sleep can help stabilize mood.',
        management: 'Track mood patterns in relation to your cycle. Cognitive behavioral therapy (CBT) has strong evidence for managing perimenopausal mood symptoms. Hormone therapy may also help if mood changes are significantly impacting quality of life.'
      },
      {
        title: 'Cognitive Function',
        likelihood: 'Low to Moderate',
        description: 'Some women experience temporary changes in memory and focus during perimenopause, often called "brain fog."',
        prevention: 'Mental stimulation, regular physical activity, quality sleep, stress management, and staying socially engaged support cognitive health.',
        management: 'Most cognitive changes are temporary and resolve after menopause. If concerns persist, cognitive screening can rule out other causes.'
      }
    ]
  },
  cardiovascular: {
    recentVisits: [
      { date: 'Nov 15, 2025', type: 'Routine Blood Pressure Check', provider: 'Dr. Chen (in-office)', summary: 'BP stable at 118/76 - consistent with baseline' },
      { date: 'Sep 12, 2025', type: 'Annual Physical', provider: 'Dr. Chen', summary: 'Comprehensive metabolic panel and lipids ordered' },
      { date: 'Sep 12, 2025', type: 'Lab Results', provider: 'Quest Diagnostics', summary: 'Lipid panel within normal limits' },
      { date: 'Mar 22, 2025', type: 'Urgent Care Visit', provider: 'Dr. Patel', summary: 'Respiratory infection - BP noted as 122/78 (normal)' }
    ],
    labResults: [
      { 
        test: 'Total Cholesterol', 
        value: '185 mg/dL', 
        date: 'Sep 12, 2025', 
        populationRange: '<200 mg/dL desirable', 
        yourBaseline: '175-190 mg/dL (stable)',
        status: 'good',
        interpretation: 'Excellent and stable. No change needed in current diet/exercise routine.'
      },
      { 
        test: 'LDL (Bad Cholesterol)', 
        value: '105 mg/dL', 
        date: 'Sep 12, 2025', 
        populationRange: '<130 mg/dL near optimal', 
        yourBaseline: '95-110 mg/dL',
        status: 'good',
        interpretation: 'In your typical range and well-controlled. Continue current lifestyle habits.'
      },
      { 
        test: 'HDL (Good Cholesterol)', 
        value: '62 mg/dL', 
        date: 'Sep 12, 2025', 
        populationRange: '>60 mg/dL protective', 
        yourBaseline: '58-65 mg/dL',
        status: 'good',
        interpretation: 'Protective level maintained through regular exercise. Keep up current activity level.'
      },
      { 
        test: 'Triglycerides', 
        value: '90 mg/dL', 
        date: 'Sep 12, 2025', 
        populationRange: '<150 mg/dL normal', 
        yourBaseline: '85-105 mg/dL',
        status: 'good',
        interpretation: 'Well within your normal range. Diet and exercise routine working well.'
      },
      { 
        test: 'Resting Heart Rate', 
        value: '52 bpm', 
        date: 'Nov 15, 2025', 
        populationRange: '60-100 bpm', 
        yourBaseline: '48-54 bpm (athletic baseline)',
        status: 'good',
        interpretation: 'Below population "normal" but this is YOUR normal due to regular aerobic exercise over 20+ years. This indicates excellent cardiovascular fitness. A rise to 65-70 bpm would be worth investigating for YOU.'
      },
      { 
        test: 'Blood Pressure', 
        value: '118/76 mmHg', 
        date: 'Nov 15, 2025', 
        populationRange: '<120/80 mmHg normal', 
        yourBaseline: '115/72 - 122/78 mmHg',
        status: 'good',
        interpretation: 'Stable in your typical range. Continue monitoring as you move through perimenopause, as BP can increase with hormonal changes.'
      }
    ],
    complaints: [],
    aiInsights: [
      {
        type: 'protective',
        title: 'Strong Cardiovascular Foundation',
        description: 'Your athletic baseline (HR 48-54 bpm, stable lipids) indicates excellent cardiovascular fitness from long-term exercise habits. This protective effect is especially valuable as you transition through perimenopause.',
        action: 'Maintain current activity level. Your exercise routine is providing significant protective benefit against age-related cardiovascular changes.'
      }
    ],
    ageRelatedInsights: [
      {
        title: 'Cardiovascular Risk After Menopause',
        likelihood: 'Moderate (Future)',
        description: 'Estrogen provides cardiovascular protection. As levels decline through menopause, heart disease risk increases, eventually matching men\'s risk by age 70.',
        prevention: 'Regular aerobic exercise (150 min/week), maintaining healthy weight, not smoking, managing stress, eating a Mediterranean-style diet rich in fruits, vegetables, whole grains, and healthy fats.',
        management: 'Annual lipid screening, blood pressure monitoring, and discussing cardiovascular risk assessment with your provider. Some women may benefit from low-dose aspirin or statins based on individual risk factors. Your current exercise routine provides significant protection.'
      },
      {
        title: 'Blood Pressure Changes',
        likelihood: 'Moderate',
        description: 'Women often see blood pressure increase during and after menopause due to hormonal changes and aging of blood vessels.',
        prevention: 'Limit sodium intake (<2300mg/day), maintain healthy weight, regular exercise, limit alcohol, and manage stress.',
        management: 'Home blood pressure monitoring can help track trends. For you, watch for readings consistently above 125/80, which would be outside YOUR normal range. Early intervention with lifestyle changes or medication prevents complications.'
      }
    ]
  },
  musculoskeletal: {
    recentVisits: [
      { date: 'Nov 1, 2025', type: 'Office Visit', provider: 'Dr. Chen', summary: 'Reported increased joint stiffness in mornings, especially hands' },
      { date: 'Oct 8, 2025', type: 'Physical Therapy', provider: 'Alex Rivera, PT', summary: 'Evaluation for knee pain, started strengthening program' },
      { date: 'Sep 12, 2025', type: 'Annual Physical', provider: 'Dr. Chen', summary: 'Discussed bone health, vitamin D adequate, considering DEXA scan' },
      { date: 'Jul 18, 2025', type: 'Orthopedic Consult', provider: 'Dr. Martinez', summary: 'Left knee pain - no structural damage, recommended PT and weight management' }
    ],
    labResults: [
      { 
        test: 'Vitamin D', 
        value: '38 ng/mL', 
        date: 'Sep 12, 2025', 
        populationRange: '30-100 ng/mL', 
        yourBaseline: '35-42 ng/mL (with 2000 IU daily)',
        status: 'good',
        interpretation: 'Optimal for bone health. Current supplementation dose is working well.'
      },
      { 
        test: 'Calcium', 
        value: '9.4 mg/dL', 
        date: 'Sep 12, 2025', 
        populationRange: '8.5-10.2 mg/dL', 
        yourBaseline: '9.2-9.6 mg/dL',
        status: 'good',
        interpretation: 'Stable in your normal range. Dietary calcium intake appears adequate.'
      }
    ],
    complaints: [
      { date: 'Nov 1, 2025', issue: 'Joint stiffness in hands and knees, especially in morning (new within 3 months)' },
      { date: 'Oct 8, 2025', issue: 'Left knee pain with stairs and after sitting (ongoing 6 months)' },
      { date: 'Aug 10, 2025', issue: 'Occasional lower back discomfort' },
      { date: 'Jul 18, 2025', issue: 'Knee pain worsened, difficulty with exercise' }
    ],
    aiInsights: [
      {
        type: 'pattern',
        title: 'Timeline Correlation Detected',
        description: 'Your joint stiffness complaints began ~3 months ago (August), coinciding with: (1) documented decline in estrogen levels, (2) reduced exercise frequency due to knee pain, and (3) reported 8-lb weight gain (noted in PT visit).',
        action: 'Multiple factors may be contributing: hormonal changes can cause joint inflammation, reduced activity affects joint health, and increased weight adds stress to weight-bearing joints. A multi-pronged approach addressing all three may be most effective.'
      },
      {
        type: 'connection',
        title: 'Exercise-Pain Cycle',
        description: 'PT notes indicate knee pain led to reduced walking/exercise → weight gain → increased knee stress → more pain. Breaking this cycle is important for both joint and overall health.',
        action: 'PT-guided low-impact exercise (swimming, cycling, gentle yoga) can maintain activity without aggravating knee pain. This supports weight management and joint mobility.'
      }
    ],
    ageRelatedInsights: [
      {
        title: 'Bone Density Decline',
        likelihood: 'High',
        description: 'Estrogen decline during perimenopause and menopause accelerates bone loss. Women can lose up to 20% of bone density in the 5-7 years after menopause.',
        prevention: 'Weight-bearing exercise (walking, dancing, strength training) 3-4x/week, adequate calcium (1200mg/day from food and supplements), vitamin D (800-1000 IU/day), avoid smoking and excessive alcohol.',
        management: 'Baseline DEXA scan recommended now (age 45+  with declining estrogen) rather than waiting until 65. Early measurement establishes your baseline and guides prevention strategies. Medications like bisphosphonates are available if bone loss is significant.'
      },
      {
        title: 'Joint Health and Arthritis',
        likelihood: 'Moderate to High',
        description: 'Hormonal changes can affect joint health. Many women first experience joint pain and stiffness during perimenopause. The timing of your symptoms suggests a hormonal component.',
        prevention: 'Maintain healthy weight (reduces stress on joints), low-impact exercise (swimming, cycling, yoga), anti-inflammatory diet rich in omega-3 fatty acids.',
        management: 'Distinguish between hormonal joint pain and osteoarthritis through physical exam and possibly imaging if symptoms persist. Anti-inflammatory strategies, physical therapy, and sometimes hormone therapy can help. Regular movement prevents stiffness. Some women find joint symptoms improve significantly with HRT.'
      },
      {
        title: 'Muscle Mass Changes',
        likelihood: 'Moderate',
        description: 'Declining estrogen and natural aging contribute to gradual muscle loss (sarcopenia), affecting strength and metabolism.',
        prevention: 'Resistance training 2-3x/week, adequate protein intake (1.0-1.2g per kg body weight), staying active throughout the day.',
        management: 'Strength training is the most effective intervention. Working with your PT Alex to develop a knee-friendly strength program can help maintain muscle mass while protecting your joint.'
      }
    ]
  },
  digestion: {
    recentVisits: [
      { date: 'Sep 12, 2025', type: 'Annual Physical', provider: 'Dr. Chen', summary: 'Digestive health stable, no concerns reported' },
      { date: 'Jan 8, 2025', type: 'Urgent Care', provider: 'Dr. Lee', summary: 'Stomach flu - resolved with supportive care' }
    ],
    labResults: [
      { 
        test: 'H. pylori Antibody', 
        value: 'Negative', 
        date: 'Mar 15, 2024', 
        populationRange: 'Negative', 
        yourBaseline: 'Negative (tested once)',
        status: 'good',
        interpretation: 'No evidence of H. pylori infection, which can cause ulcers and gastritis.'
      }
    ],
    complaints: [
      { date: 'May 3, 2025', issue: 'Occasional bloating, seems worse before period' },
      { date: 'Jan 8, 2025', issue: 'Acute gastroenteritis symptoms' }
    ],
    aiInsights: [
      {
        type: 'pattern',
        title: 'Hormonal Digestive Pattern',
        description: 'Bloating reports correlate with luteal phase (pre-menstrual), when progesterone peaks. Progesterone slows gut motility, which can cause bloating and constipation.',
        action: 'This cyclical pattern is hormonally-driven. Tracking symptoms with cycle can help predict and manage. Symptoms may improve as you transition through menopause and cycles become less regular.'
      }
    ],
    ageRelatedInsights: [
      {
        title: 'Digestive Changes with Hormones',
        likelihood: 'Low to Moderate',
        description: 'Hormonal fluctuations can affect gut motility and may contribute to bloating, constipation, or digestive discomfort, especially around menstrual cycles.',
        prevention: 'High-fiber diet (25-30g/day), adequate hydration, regular meal times, stress management, regular physical activity.',
        management: 'Track digestive symptoms in relation to your cycle. Probiotics may help some women. Discuss persistent symptoms with your provider to rule out other conditions like IBS or food sensitivities.'
      },
      {
        title: 'Metabolism and Weight Changes',
        likelihood: 'Moderate to High',
        description: 'Declining estrogen and age-related muscle loss can slow metabolism, making weight management more challenging during perimenopause.',
        prevention: 'Strength training to maintain muscle mass, portion awareness, focusing on whole foods, limiting processed foods and added sugars, staying active.',
        management: 'Small, sustainable changes work better than restrictive diets. Focus on nutrient-dense foods and building muscle through resistance exercise. Consider working with a registered dietitian familiar with perimenopause.'
      }
    ]
  },
  activity: {
    recentVisits: [
      { date: 'Oct 20, 2025', type: 'Telehealth Visit', provider: 'Dr. Chen', summary: 'Discussed sleep disruption strategies, exercise routine modified due to knee pain' },
      { date: 'Oct 8, 2025', type: 'Physical Therapy', provider: 'Alex Rivera, PT', summary: 'Noted reduced activity over past 6 months due to knee pain, weight up 8 lbs' },
      { date: 'Sep 12, 2025', type: 'Annual Physical', provider: 'Dr. Chen', summary: 'Was meeting activity guidelines before knee injury, encouraged modified activities' }
    ],
    labResults: [],
    complaints: [
      { date: 'Oct 20, 2025', issue: 'Sleep disruption - waking at 3am almost nightly, difficulty returning to sleep' },
      { date: 'Aug 10, 2025', issue: 'Feeling more fatigued than usual, hard to motivate for exercise' },
      { date: 'Jul 18, 2025', issue: 'Reduced exercise due to knee pain' }
    ],
    aiInsights: [
      {
        type: 'pattern',
        title: 'Sleep-Hormone-Activity Triangle',
        description: 'Three interconnected issues emerged simultaneously: (1) Night sweats disrupting sleep at 3am (Hormone system), (2) Declining estrogen (Hormone labs), and (3) Daytime fatigue reducing exercise motivation. Each affects the others.',
        action: 'Addressing vasomotor symptoms (night sweats) may be the key leverage point - better sleep could improve energy for exercise, and more activity can help sleep quality. This is a cycle worth breaking at the hormone level.'
      },
      {
        type: 'connection',
        title: 'Knee Pain Cascade Effect',
        description: 'Knee pain (July) → reduced activity → weight gain (8 lbs over 6 months per PT notes) → more knee stress + sleep disruption from night sweats → fatigue → less exercise motivation. Multiple systems affected.',
        action: 'Low-impact exercise alternatives (swimming, cycling, water aerobics) can maintain activity without worsening knee pain. PT working on knee strength. Breaking the inactivity cycle is important for sleep, mood, weight, and joint health.'
      }
    ],
    ageRelatedInsights: [
      {
        title: 'Sleep Quality Changes',
        likelihood: 'High',
        description: 'Up to 60% of perimenopausal women experience sleep disturbances due to night sweats, hormonal fluctuations affecting sleep architecture, and increased stress.',
        prevention: 'Consistent sleep schedule, cool bedroom (60-67°F), limit caffeine after 2pm, avoid alcohol close to bedtime, regular exercise (but not within 3 hours of bed), relaxation techniques.',
        management: 'Track sleep patterns and triggers. Cognitive behavioral therapy for insomnia (CBT-I) is highly effective. Hormone therapy may help if night sweats are disrupting sleep - this may be worth discussing given your pattern. Short-term sleep aids can be discussed if sleep deprivation is severe.'
      },
      {
        title: 'Energy and Fatigue Patterns',
        likelihood: 'Moderate',
        description: 'Hormonal changes, sleep disruption, and the demands of this life stage can contribute to increased fatigue.',
        prevention: 'Prioritize sleep, regular moderate exercise (which paradoxically increases energy), balanced nutrition, stress management, staying socially connected.',
        management: 'Rule out other causes like thyroid issues, anemia, vitamin deficiencies (your labs look good). Pacing activities, strategic rest, and addressing underlying sleep issues often help. Energy often improves post-menopause.'
      },
      {
        title: 'Exercise Adaptation Needs',
        likelihood: 'Moderate',
        description: 'Recovery may take longer, and previous exercise routines might need adjustment during perimenopause.',
        prevention: 'Mix of activities: aerobic exercise for heart health, strength training for muscle/bone, flexibility work, and rest days for recovery.',
        management: 'Listen to your body and adjust intensity/volume as needed. Focus on consistency over intensity. Your knee situation is pushing this adaptation. Work with PT to find sustainable alternatives that keep you active without pain.'
      }
    ]
  }
};


// Reusable Components (defined outside main component)
const StatusBadge = ({ status, text }) => {
  const statusColors = {
    good: { bg: `${colors.success}15`, text: colors.success },
    insight: { bg: `${colors.accent}15`, text: colors.accent },
    attention: { bg: `${colors.warning}15`, text: colors.warning },
  };
  const style = statusColors[status] || statusColors.good;
  
  return (
    <span style={{
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '500',
      backgroundColor: style.bg,
      color: style.text
    }}>
      {text}
    </span>
  );
};

const ProgressRing = ({ progress, color, size = 44 }) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={colors.divider} strokeWidth={strokeWidth} />
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      <text x={size/2} y={size/2} textAnchor="middle" dy="4px" style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fontSize: '11px', fontWeight: '600', fill: colors.text }}>{progress}%</text>
    </svg>
  );
};

const HormoneChart = () => {
  const width = 320, height = 160;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxEstrogen = 160, maxProgesterone = 15;
  
  const estrogenPoints = hormoneData.map((d, i) => ({
    x: padding.left + (i / (hormoneData.length - 1)) * chartWidth,
    y: padding.top + chartHeight - (d.estrogen / maxEstrogen) * chartHeight
  }));
  
  const progesteronePoints = hormoneData.map((d, i) => ({
    x: padding.left + (i / (hormoneData.length - 1)) * chartWidth,
    y: padding.top + chartHeight - (d.progesterone / maxProgesterone) * chartHeight
  }));
  
  const pathFromPoints = (points) => points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {[0, 0.5, 1].map((ratio, i) => (
        <line key={i} x1={padding.left} y1={padding.top + ratio * chartHeight} x2={width - padding.right} y2={padding.top + ratio * chartHeight} stroke={colors.divider} strokeDasharray="4,4" />
      ))}
      <path d={pathFromPoints(estrogenPoints)} fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={pathFromPoints(progesteronePoints)} fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {estrogenPoints.map((p, i) => <circle key={`e-${i}`} cx={p.x} cy={p.y} r="4" fill={colors.accent} />)}
      {progesteronePoints.map((p, i) => <circle key={`p-${i}`} cx={p.x} cy={p.y} r="4" fill={colors.primary} />)}
      {hormoneData.map((d, i) => (
        <text key={i} x={padding.left + (i / (hormoneData.length - 1)) * chartWidth} y={height - 8} textAnchor="middle" style={{ fontSize: '10px', fill: colors.textMuted }}>{d.month}</text>
      ))}
      <circle cx={padding.left} cy={8} r="4" fill={colors.accent} />
      <text x={padding.left + 10} y={12} style={{ fontSize: '10px', fill: colors.text }}>Estrogen</text>
      <circle cx={padding.left + 80} cy={8} r="4" fill={colors.primary} />
      <text x={padding.left + 90} y={12} style={{ fontSize: '10px', fill: colors.text }}>Progesterone</text>
    </svg>
  );
};

const ConfidenceBar = ({ confidence, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div style={{ flex: 1, height: '8px', backgroundColor: colors.divider, borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ width: `${confidence}%`, height: '100%', backgroundColor: color, borderRadius: '4px', transition: 'width 0.5s ease' }} />
    </div>
    <span style={{ fontSize: '13px', fontWeight: '600', color: color, minWidth: '40px' }}>{confidence}%</span>
  </div>
);

const Header = ({ title, subtitle, showBack, onBack }) => (
  <div style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, padding: showBack ? '16px 20px 20px' : '24px 20px 28px', color: 'white' }}>
    {showBack && (
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'white', fontSize: '14px', cursor: 'pointer', padding: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.9 }}>← Back</button>
    )}
    <h1 style={{ margin: 0, fontSize: showBack ? '20px' : '24px', fontWeight: '600' }}>{title}</h1>
    {subtitle && <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.85 }}>{subtitle}</p>}
  </div>
);

const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{ backgroundColor: colors.card, borderRadius: '16px', border: `1px solid ${colors.border}`, padding: '16px', cursor: onClick ? 'pointer' : 'default', transition: 'box-shadow 0.2s ease', ...style }}>{children}</div>
);

const Button = ({ children, variant = 'primary', onClick, style = {}, disabled }) => {
  const variants = {
    primary: { bg: colors.primary, color: 'white' },
    accent: { bg: colors.accent, color: 'white' },
    outline: { bg: 'transparent', color: colors.primary, border: `2px solid ${colors.primary}` },
    ghost: { bg: colors.divider, color: colors.text }
  };
  const v = variants[variant];
  
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: '100%', padding: '14px 20px', backgroundColor: disabled ? colors.divider : v.bg, color: disabled ? colors.textMuted : v.color, border: v.border || 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>{children}</button>
  );
};

export default function PeriHealthApp() {
  const [screen, setScreen] = useState(SCREENS.DASHBOARD);
  const [selectedHealthSystem, setSelectedHealthSystem] = useState(null);
  const [userConcerns, setUserConcerns] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);
  const [newConcern, setNewConcern] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [planItems, setPlanItems] = useState([
    { id: 1, text: 'Begin low-dose estrogen patch (0.025mg)', approved: true, type: 'medication' },
    { id: 2, text: 'Thyroid panel to rule out dysfunction', approved: true, type: 'test' },
    { id: 3, text: 'Follow up in 6 weeks to assess response', approved: true, type: 'followup' },
    { id: 4, text: 'Consider progesterone if symptoms persist', approved: false, type: 'medication' },
  ]);

  const upcomingAppointment = {
    date: 'Dec 3, 2025',
    time: '10:30 AM',
    provider: 'Dr. Sarah Chen',
    type: 'Hormone Panel Review',
    prepared: userConcerns.length > 0 || userQuestions.length > 0
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: colors.surface, minHeight: '100vh', maxWidth: '420px', margin: '0 auto', boxShadow: '0 0 40px rgba(0,0,0,0.1)' }}>
      {screen === SCREENS.DASHBOARD && (
        <div>
          <Header title="Good morning, Jessica" subtitle="Your wellbeing at a glance" />
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px', background: `linear-gradient(135deg, ${colors.success}10 0%, ${colors.primary}10 100%)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: `${colors.success}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>✨</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: colors.text }}>Overall: Good Health</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>1 new insight to optimize your wellbeing</p>
                </div>
              </div>
            </Card>

            <Card onClick={() => setScreen(SCREENS.APPOINTMENT)} style={{ marginBottom: '20px', border: `2px solid ${colors.accent}`, background: `${colors.accent}08` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', color: colors.accent, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Upcoming Appointment</p>
                  <h3 style={{ margin: 0, fontSize: '17px', color: colors.text }}>{upcomingAppointment.type}</h3>
                </div>
                <span style={{ fontSize: '24px' }}>📅</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: colors.textMuted }}>Date</p>
                  <p style={{ margin: '2px 0 0', fontSize: '14px', color: colors.text, fontWeight: '500' }}>{upcomingAppointment.date}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: colors.textMuted }}>Time</p>
                  <p style={{ margin: '2px 0 0', fontSize: '14px', color: colors.text, fontWeight: '500' }}>{upcomingAppointment.time}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: colors.textMuted }}>Provider</p>
                  <p style={{ margin: '2px 0 0', fontSize: '14px', color: colors.text, fontWeight: '500' }}>{upcomingAppointment.provider}</p>
                </div>
              </div>
              <div style={{ backgroundColor: upcomingAppointment.prepared ? `${colors.success}15` : `${colors.warning}15`, padding: '10px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: upcomingAppointment.prepared ? colors.success : colors.warning, fontWeight: '500' }}>
                  {upcomingAppointment.prepared ? '✓ Visit prepared' : '⚡ Tap to prepare for your visit'}
                </span>
                <span style={{ color: colors.accent }}>→</span>
              </div>
            </Card>

            <Card onClick={() => setScreen(SCREENS.INSIGHT)} style={{ marginBottom: '20px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: `${colors.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>💡</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '15px', color: colors.text }}>New Insight: Hormone Trends</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>Changes detected in your estrogen and progesterone</p>
                </div>
                <span style={{ color: colors.accent, fontSize: '18px' }}>→</span>
              </div>
            </Card>

            <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>Your Health Systems</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {Object.entries(healthSystems).map(([key, system]) => (
                <Card 
                  key={key} 
                  style={{ padding: '14px', cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedHealthSystem(key);
                    setScreen(SCREENS.HEALTH_SYSTEM_DETAIL);
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{system.icon}</span>
                    <ProgressRing progress={system.completion} color={system.color} size={38} />
                  </div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '13px', color: colors.text, fontWeight: '600' }}>{system.name}</h4>
                  <StatusBadge status={system.status} text={system.statusText} />
                </Card>
              ))}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <Button variant="outline" style={{ flex: 1 }}>📨 Message Doctor</Button>
              <Button variant="ghost" style={{ flex: 1 }}>📆 Schedule Visit</Button>
            </div>
          </div>
        </div>
      )}

      {screen === SCREENS.INSIGHT && (
        <div>
          <Header title="Hormone Insight" subtitle="Based on your recent lab results" showBack onBack={() => setScreen(SCREENS.DASHBOARD)} />
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 4px', fontSize: '15px', color: colors.text }}>6-Month Hormone Trend</h3>
              <p style={{ margin: '0 0 16px', fontSize: '12px', color: colors.textMuted }}>Both values within normal limits, but declining</p>
              <HormoneChart />
              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: `${colors.warning}10`, borderRadius: '8px', borderLeft: `3px solid ${colors.warning}` }}>
                <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.5' }}><strong>What this means:</strong> Your hormone levels are still within normal range, but the declining pattern over 6 months may explain some of your recent symptoms.</p>
              </div>
            </Card>

            <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>Options to Discuss with Your Doctor</h3>
            
            <Card style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>💊</span>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: colors.text }}>Hormone Replacement Therapy</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted, lineHeight: '1.5' }}>Low-dose estrogen may help with sleep, mood, and cognitive symptoms. Options include patches, pills, or gels.</p>
                </div>
              </div>
            </Card>

            <Card style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🥗</span>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: colors.text }}>Nutrition Optimization</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted, lineHeight: '1.5' }}>Phytoestrogen-rich foods and specific nutrients may support hormone balance naturally.</p>
                </div>
              </div>
            </Card>

            <Card style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🏃‍♀️</span>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: colors.text }}>Activity Adjustments</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted, lineHeight: '1.5' }}>Strength training and specific exercise patterns can influence hormone levels and symptom management.</p>
                </div>
              </div>
            </Card>

            <p style={{ fontSize: '12px', color: colors.textMuted, textAlign: 'center', marginBottom: '16px' }}>A note has been sent to Dr. Chen about these findings</p>
            <Button onClick={() => setScreen(SCREENS.APPOINTMENT)}>Prepare for Your Appointment →</Button>
          </div>
        </div>
      )}

      {screen === SCREENS.APPOINTMENT && (
        <div>
          <Header title="Appointment Prep" subtitle={`${upcomingAppointment.type} • ${upcomingAppointment.date}`} showBack onBack={() => setScreen(SCREENS.DASHBOARD)} />
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: '600' }}>SC</div>
                <div>
                  <h3 style={{ margin: '0 0 2px', fontSize: '16px', color: colors.text }}>{upcomingAppointment.provider}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>OB-GYN, Menopause Specialist</p>
                </div>
              </div>
            </Card>

            <Card style={{ marginBottom: '16px', backgroundColor: `${colors.primary}08` }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: colors.primary }}>What to Expect</h4>
              <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>Dr. Chen will review your hormone panel results, discuss the patterns we've identified, and work with you to create a personalized care plan. <strong>This is a partnership—your input matters.</strong></p>
            </Card>

            {userConcerns.length > 0 && (
              <Card style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', color: colors.text }}>Your Symptoms & Concerns</h4>
                  <span style={{ fontSize: '12px', color: colors.textMuted }}>{userConcerns.length} added</span>
                </div>
                {userConcerns.map((concern, i) => (
                  <div key={i} style={{ padding: '10px 12px', backgroundColor: colors.divider, borderRadius: '8px', marginBottom: '8px', fontSize: '13px', color: colors.text }}>{concern}</div>
                ))}
              </Card>
            )}

            {userQuestions.length > 0 && (
              <Card style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', color: colors.text }}>Your Questions</h4>
                  <span style={{ fontSize: '12px', color: colors.textMuted }}>{userQuestions.length} added</span>
                </div>
                {userQuestions.map((q, i) => (
                  <div key={i} style={{ padding: '10px 12px', backgroundColor: colors.divider, borderRadius: '8px', marginBottom: '8px', fontSize: '13px', color: colors.text }}>{q}</div>
                ))}
              </Card>
            )}

            <Button variant="accent" onClick={() => setScreen(SCREENS.ADD_CONCERNS)} style={{ marginBottom: '12px' }}>+ Add Symptoms, Concerns & Questions</Button>
            {(userConcerns.length > 0 || userQuestions.length > 0) && (
              <Button variant="primary" onClick={() => setScreen(SCREENS.DIAGNOSIS_PREVIEW)}>See Potential Diagnoses →</Button>
            )}
          </div>
        </div>
      )}

      {screen === SCREENS.ADD_CONCERNS && (
        <div>
          <Header title="Share Your Concerns" subtitle="Help your doctor understand what you're experiencing" showBack onBack={() => setScreen(SCREENS.APPOINTMENT)} />
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text }}>Symptoms & Concerns</h4>
              <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textMuted }}>What have you been experiencing? Be specific about when symptoms occur and how they affect your daily life.</p>
              
              <textarea
                value={newConcern}
                onChange={(e) => setNewConcern(e.target.value)}
                placeholder="e.g., Waking up at 3am most nights, can't fall back asleep. Brain fog is affecting my work..."
                style={{ width: '100%', minHeight: '100px', padding: '12px', border: `1px solid ${colors.border}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
              />
              
              <button
                onClick={() => {
                  if (newConcern.trim()) {
                    setUserConcerns([...userConcerns, newConcern.trim()]);
                    setNewConcern('');
                  }
                }}
                disabled={!newConcern.trim()}
                style={{ marginTop: '10px', padding: '10px 16px', backgroundColor: newConcern.trim() ? colors.accent : colors.divider, color: newConcern.trim() ? 'white' : colors.textMuted, border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: newConcern.trim() ? 'pointer' : 'not-allowed' }}
              >+ Add Concern</button>
              
              {userConcerns.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  {userConcerns.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px', backgroundColor: colors.divider, borderRadius: '8px', marginBottom: '8px' }}>
                      <span style={{ color: colors.success }}>✓</span>
                      <span style={{ flex: 1, fontSize: '13px', color: colors.text }}>{c}</span>
                      <button onClick={() => setUserConcerns(userConcerns.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer', fontSize: '16px' }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text }}>Questions for Your Doctor</h4>
              <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textMuted }}>What do you want to understand better? What options do you want to explore?</p>
              
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="e.g., Is this perimenopause? What are my treatment options?"
                style={{ width: '100%', minHeight: '80px', padding: '12px', border: `1px solid ${colors.border}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
              />
              
              <button
                onClick={() => {
                  if (newQuestion.trim()) {
                    setUserQuestions([...userQuestions, newQuestion.trim()]);
                    setNewQuestion('');
                  }
                }}
                disabled={!newQuestion.trim()}
                style={{ marginTop: '10px', padding: '10px 16px', backgroundColor: newQuestion.trim() ? colors.primary : colors.divider, color: newQuestion.trim() ? 'white' : colors.textMuted, border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: newQuestion.trim() ? 'pointer' : 'not-allowed' }}
              >+ Add Question</button>
              
              {userQuestions.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  {userQuestions.map((q, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px', backgroundColor: colors.divider, borderRadius: '8px', marginBottom: '8px' }}>
                      <span style={{ color: colors.primary }}>?</span>
                      <span style={{ flex: 1, fontSize: '13px', color: colors.text }}>{q}</span>
                      <button onClick={() => setUserQuestions(userQuestions.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer', fontSize: '16px' }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Button onClick={() => setScreen(SCREENS.DIAGNOSIS_PREVIEW)} disabled={userConcerns.length === 0 && userQuestions.length === 0}>Confirm & View Potential Diagnoses</Button>
          </div>
        </div>
      )}

      {screen === SCREENS.DIAGNOSIS_PREVIEW && (
        <div>
          <Header title="Potential Diagnoses" subtitle="AI-assisted analysis based on your profile" showBack onBack={() => setScreen(SCREENS.ADD_CONCERNS)} />
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px', backgroundColor: `${colors.warning}10`, border: `1px solid ${colors.warning}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>⚠️</span>
                <p style={{ margin: 0, fontSize: '12px', color: colors.text, lineHeight: '1.5' }}><strong>Important:</strong> This is not a diagnosis. These are potential conditions to discuss with Dr. Chen, who has received this same analysis with clinical decision-making criteria.</p>
              </div>
            </Card>

            <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text }}>Ranked by Likelihood</h3>
            
            {differentialDiagnosis.map((dx, i) => (
              <Card key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: i === 0 ? colors.primary : colors.divider, color: i === 0 ? 'white' : colors.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>{i + 1}</span>
                    <h4 style={{ margin: 0, fontSize: '15px', color: colors.text }}>{dx.name}</h4>
                  </div>
                  {dx.needsRuleOut && (
                    <span style={{ padding: '3px 8px', backgroundColor: `${colors.alert}15`, color: colors.alert, borderRadius: '4px', fontSize: '10px', fontWeight: '600' }}>RULE OUT</span>
                  )}
                </div>
                
                <ConfidenceBar confidence={dx.confidence} color={dx.color} />
                
                <div style={{ marginTop: '10px' }}>
                  <p style={{ margin: '0 0 6px', fontSize: '11px', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Supporting Criteria</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {dx.criteria.map((c, j) => (
                      <span key={j} style={{ padding: '4px 10px', backgroundColor: colors.divider, borderRadius: '12px', fontSize: '11px', color: colors.text }}>{c}</span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            <div style={{ padding: '16px', backgroundColor: `${colors.primary}08`, borderRadius: '12px', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}><strong>Your doctor will see:</strong> The same ranked list, plus clinical decision-making criteria, screening protocols, and assessment questions to confirm or rule out each condition.</p>
            </div>

            <Button onClick={() => setScreen(SCREENS.PLAN_OF_CARE)}>View Sample Plan of Care →</Button>
          </div>
        </div>
      )}

      {screen === SCREENS.PLAN_OF_CARE && (
        <div>
          <Header title="Plan of Care" subtitle="Developed in partnership with Dr. Chen" showBack onBack={() => setScreen(SCREENS.DIAGNOSIS_PREVIEW)} />
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px', backgroundColor: `${colors.success}08`, border: `1px solid ${colors.success}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '20px' }}>✓</span>
                <h4 style={{ margin: 0, fontSize: '15px', color: colors.text }}>Working Diagnosis: Perimenopause</h4>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted, lineHeight: '1.5' }}>Based on: Age, symptom pattern, hormone levels, and ruling out other conditions</p>
            </Card>

            <Card style={{ marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: colors.text }}>Evidence Summary</h4>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ margin: '0 0 6px', fontSize: '12px', color: colors.success, fontWeight: '600' }}>✓ Inclusion Criteria Met:</p>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
                  <li>Irregular cycle patterns in last 6 months</li>
                  <li>Declining estrogen trend (within normal)</li>
                  <li>Vasomotor symptoms (night sweats)</li>
                  <li>Cognitive changes (brain fog)</li>
                </ul>
              </div>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: '12px', color: colors.textMuted, fontWeight: '600' }}>− Exclusion Criteria:</p>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: colors.textMuted, lineHeight: '1.6' }}>
                  <li>Thyroid dysfunction (pending confirmation)</li>
                  <li>Primary ovarian insufficiency (age, FSH levels)</li>
                </ul>
              </div>
            </Card>

            <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text }}>Treatment Plan</h3>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textMuted }}>Review each item. Toggle off any you want to discuss further.</p>

            {planItems.map((item) => (
              <Card key={item.id} style={{ marginBottom: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <button
                    onClick={() => setPlanItems(planItems.map(p => p.id === item.id ? { ...p, approved: !p.approved } : p))}
                    style={{ width: '24px', height: '24px', borderRadius: '6px', border: item.approved ? 'none' : `2px solid ${colors.border}`, backgroundColor: item.approved ? colors.success : 'white', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}
                  >{item.approved ? '✓' : ''}</button>
                  <div>
                    <span style={{ display: 'inline-block', padding: '2px 8px', backgroundColor: colors.divider, borderRadius: '4px', fontSize: '10px', color: colors.textMuted, marginBottom: '6px', textTransform: 'uppercase' }}>{item.type}</span>
                    <p style={{ margin: 0, fontSize: '14px', color: item.approved ? colors.text : colors.textMuted, textDecoration: item.approved ? 'none' : 'line-through' }}>{item.text}</p>
                  </div>
                </div>
              </Card>
            ))}

            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <Button variant="outline" style={{ flex: 1 }} onClick={() => setScreen(SCREENS.DASHBOARD)}>Save Draft</Button>
              <Button style={{ flex: 1 }} onClick={() => { alert('Plan confirmed! This would save to your record and send to Dr. Chen.'); setScreen(SCREENS.DASHBOARD); }}>Confirm Plan</Button>
            </div>

            <p style={{ margin: '16px 0 0', fontSize: '11px', color: colors.textMuted, textAlign: 'center' }}>You can modify this plan at any time. Your preferences are documented.</p>
          </div>
        </div>
      )}

      {screen === SCREENS.HEALTH_SYSTEM_DETAIL && selectedHealthSystem && (
        <div>
          <Header 
            title={healthSystems[selectedHealthSystem].name}
            subtitle="Your health history and insights"
            showBack
            onBack={() => setScreen(SCREENS.DASHBOARD)}
          />
          
          <div style={{ padding: '20px' }}>
            {/* Current Status Card */}
            <Card style={{ marginBottom: '16px', background: `linear-gradient(135deg, ${healthSystems[selectedHealthSystem].color}15 0%, ${healthSystems[selectedHealthSystem].color}05 100%)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: `${healthSystems[selectedHealthSystem].color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px'
                }}>{healthSystems[selectedHealthSystem].icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: colors.text }}>Current Status</h3>
                  <StatusBadge status={healthSystems[selectedHealthSystem].status} text={healthSystems[selectedHealthSystem].statusText} />
                </div>
                <ProgressRing progress={healthSystems[selectedHealthSystem].completion} color={healthSystems[selectedHealthSystem].color} size={52} />
              </div>
            </Card>

            {/* Recent Lab Results */}
            {healthSystemDetails[selectedHealthSystem].labResults.length > 0 && (
              <>
                <h3 style={{ margin: '20px 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>Recent Lab Results</h3>
                {healthSystemDetails[selectedHealthSystem].labResults.map((lab, i) => (
                  <Card key={i} style={{ marginBottom: '12px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 2px', fontSize: '14px', color: colors.text, fontWeight: '600' }}>{lab.test}</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: colors.textMuted }}>{lab.date}</p>
                      </div>
                      <StatusBadge status={lab.status} text={lab.status === 'good' ? 'In range' : 'Insight'} />
                    </div>
                    <p style={{ margin: '8px 0 0', fontSize: '18px', color: colors.text, fontWeight: '600' }}>{lab.value}</p>
                    
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: colors.textMuted, minWidth: '80px' }}>Population:</span>
                        <span style={{ fontSize: '12px', color: colors.text }}>{lab.populationRange}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: colors.primary, fontWeight: '600', minWidth: '80px' }}>Your Normal:</span>
                        <span style={{ fontSize: '12px', color: colors.text, fontWeight: '500' }}>{lab.yourBaseline}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '10px', padding: '10px', backgroundColor: `${colors.primary}08`, borderRadius: '8px', borderLeft: `3px solid ${lab.status === 'good' ? colors.success : colors.accent}` }}>
                      <p style={{ margin: 0, fontSize: '12px', color: colors.text, lineHeight: '1.5' }}>
                        <strong>What this means for you:</strong> {lab.interpretation}
                      </p>
                    </div>
                  </Card>
                ))}
              </>
            )}

            {/* Recent Visits */}
            {healthSystemDetails[selectedHealthSystem].recentVisits.length > 0 && (
              <>
                <h3 style={{ margin: '20px 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>Recent Visits</h3>
                {healthSystemDetails[selectedHealthSystem].recentVisits.map((visit, i) => (
                  <Card key={i} style={{ marginBottom: '10px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 2px', fontSize: '14px', color: colors.text, fontWeight: '600' }}>{visit.type}</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: colors.textMuted }}>{visit.provider} • {visit.date}</p>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.5' }}>{visit.summary}</p>
                  </Card>
                ))}
              </>
            )}

            {/* Past Complaints */}
            {healthSystemDetails[selectedHealthSystem].complaints.length > 0 && (
              <>
                <h3 style={{ margin: '20px 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>History of Concerns</h3>
                {healthSystemDetails[selectedHealthSystem].complaints.map((complaint, i) => (
                  <Card key={i} style={{ marginBottom: '10px', padding: '12px 14px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ color: colors.textMuted, fontSize: '12px', minWidth: '80px' }}>{complaint.date}</span>
                      <p style={{ margin: 0, fontSize: '13px', color: colors.text }}>{complaint.issue}</p>
                    </div>
                  </Card>
                ))}
              </>
            )}

            {/* AI-Powered Pattern Insights */}
            {healthSystemDetails[selectedHealthSystem].aiInsights && healthSystemDetails[selectedHealthSystem].aiInsights.length > 0 && (
              <>
                <h3 style={{ margin: '20px 0 8px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                  <span style={{ marginRight: '8px' }}>✨</span>
                  Patterns We've Noticed
                </h3>
                <p style={{ margin: '0 0 16px', fontSize: '13px', color: colors.textMuted }}>
                  AI-assisted analysis connecting your health data across visits and systems
                </p>

                {healthSystemDetails[selectedHealthSystem].aiInsights.map((insight, i) => (
                  <Card key={i} style={{ 
                    marginBottom: '16px', 
                    border: `2px solid ${insight.type === 'protective' ? colors.success : colors.accent}`,
                    background: `linear-gradient(135deg, ${insight.type === 'protective' ? colors.success : colors.accent}08 0%, ${insight.type === 'protective' ? colors.success : colors.accent}02 100%)`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '20px' }}>
                        {insight.type === 'pattern' ? '🔍' : insight.type === 'connection' ? '🔗' : '🛡️'}
                      </span>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 2px', fontSize: '14px', color: colors.text, fontWeight: '600' }}>{insight.title}</h4>
                        <span style={{ 
                          fontSize: '10px', 
                          color: insight.type === 'protective' ? colors.success : colors.accent,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: '600'
                        }}>
                          {insight.type === 'pattern' ? 'Pattern detected' : insight.type === 'connection' ? 'Cross-system connection' : 'Protective factor'}
                        </span>
                      </div>
                    </div>

                    <div style={{ 
                      padding: '12px', 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      marginBottom: '10px'
                    }}>
                      <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
                        {insight.description}
                      </p>
                    </div>

                    <div style={{ 
                      padding: '10px 12px', 
                      backgroundColor: `${insight.type === 'protective' ? colors.success : colors.primary}10`, 
                      borderRadius: '8px',
                      borderLeft: `3px solid ${insight.type === 'protective' ? colors.success : colors.primary}`
                    }}>
                      <p style={{ margin: 0, fontSize: '12px', color: colors.text, lineHeight: '1.5' }}>
                        <strong>Recommendation:</strong> {insight.action}
                      </p>
                    </div>
                  </Card>
                ))}
              </>
            )}

            {/* Age-Related Insights */}
            <h3 style={{ margin: '20px 0 8px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>Health Insights for You</h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: colors.textMuted }}>
              Based on your age and health profile, here are some conditions to be aware of and how you can stay healthy.
            </p>

            {healthSystemDetails[selectedHealthSystem].ageRelatedInsights.map((insight, i) => (
              <Card key={i} style={{ marginBottom: '16px', border: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', color: colors.text, fontWeight: '600' }}>{insight.title}</h4>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backgroundColor: insight.likelihood.includes('High') ? `${colors.warning}15` : 
                                    insight.likelihood.includes('Moderate') ? `${colors.accent}15` : 
                                    `${colors.primary}15`,
                    color: insight.likelihood.includes('High') ? colors.warning : 
                           insight.likelihood.includes('Moderate') ? colors.accent : 
                           colors.primary
                  }}>
                    {insight.likelihood} likelihood
                  </span>
                </div>

                <div style={{ 
                  padding: '12px', 
                  backgroundColor: `${colors.primary}08`, 
                  borderRadius: '8px', 
                  marginBottom: '12px',
                  borderLeft: `3px solid ${colors.primary}`
                }}>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
                    <strong>What this means:</strong> {insight.description}
                  </p>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <p style={{ margin: '0 0 6px', fontSize: '12px', color: colors.success, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ✓ How to reduce your risk
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
                    {insight.prevention}
                  </p>
                </div>

                <div>
                  <p style={{ margin: '0 0 6px', fontSize: '12px', color: colors.primary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    → Best practices for managing
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
                    {insight.management}
                  </p>
                </div>
              </Card>
            ))}

            {/* Action Buttons */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <Button variant="outline" style={{ flex: 1 }}>📨 Message Dr. Chen</Button>
              <Button variant="accent" style={{ flex: 1 }}>📆 Schedule Visit</Button>
            </div>

            <p style={{ margin: '16px 0 0', fontSize: '11px', color: colors.textMuted, textAlign: 'center' }}>
              Have questions about these insights? Your care team is here to help.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
