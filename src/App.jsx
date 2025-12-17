import React, { useState } from 'react';
import { 
  Home, Calendar, FileText, MessageSquare, ChevronLeft,
  TrendingUp, Brain, Heart, Bone, Zap, Lock, RotateCcw, X, CheckCircle
} from 'lucide-react';

// Import Design System
import { colors, typography } from './theme';
import { Button, Card, Icon, Header } from './components/UI';

// Health systems data
const healthSystems = {
  hormones: { icon: 'TrendingUp', name: 'Hormones & Gut Health', needsReview: true, reviewReason: 'New pattern detected' },
  wellbeing: { icon: 'Brain', name: 'Wellbeing', needsReview: false },
  cardiovascular: { icon: 'Heart', name: 'Cardiovascular Health', needsReview: false },
  orthopedic: { icon: 'Bone', name: 'Orthopedic Health', needsReview: true, reviewReason: 'Check-in needed' },
  participation: { icon: 'Zap', name: 'Participation Goals', needsReview: false },
};

const renderIcon = (iconName, size = 22, color = colors.primary, strokeWidth = 2) => {
  const icons = {
    'TrendingUp': <TrendingUp size={size} color={color} strokeWidth={strokeWidth} />,
    'Brain': <Brain size={size} color={color} strokeWidth={strokeWidth} />,
    'Heart': <Heart size={size} color={color} strokeWidth={strokeWidth} />,
    'Bone': <Bone size={size} color={color} strokeWidth={strokeWidth} />,
    'Zap': <Zap size={size} color={color} strokeWidth={strokeWidth} />,
    'Calendar': <Calendar size={size} color={color} strokeWidth={strokeWidth} />,
  };
  return icons[iconName] || null;
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
  { name: 'Vitamin D Deficiency', confidence: 35, criteria: ['Fatigue', 'Mood changes', 'Joint discomfort'], color: colors.text.secondary },
  { name: 'Iron Deficiency Anemia', confidence: 28, criteria: ['Fatigue', 'Brain fog'], color: colors.text.secondary },
  { name: 'Primary Ovarian Insufficiency', confidence: 15, criteria: ['Hormone pattern'], needsRuleOut: true, color: colors.error },
];

const SCREENS = {
  DASHBOARD: 'dashboard',
  INSIGHT: 'insight',
  APPOINTMENT: 'appointment',
  ADD_CONCERNS: 'add_concerns',
  DIAGNOSIS_PREVIEW: 'diagnosis_preview',
  PLAN_OF_CARE: 'plan_of_care',
  HEALTH_SYSTEM_DETAIL: 'health_system_detail',
  SYMPTOM_INTAKE: 'symptom_intake',
  GENERATE_DIAGNOSIS: 'generate_diagnosis',
  SCHEDULE_VISIT: 'schedule_visit',
  MESSAGES: 'messages'
};

// COMPLETE health system details - all the data from your original file
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
        interpretation: 'Elevated compared to reproductive years (normal <10), consistent with perimenopause.'
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
  wellbeing: {
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
      }
    ],
    complaints: [
      { date: 'Oct 20, 2025', issue: 'Occasional anxiety, particularly around cycle' },
      { date: 'Aug 10, 2025', issue: 'Increased irritability and emotional sensitivity' }
    ],
    aiInsights: [
      {
        type: 'pattern',
        title: 'Cyclical Mood Pattern',
        description: 'Your anxiety and irritability reports consistently occur in the luteal phase of your cycle (days 18-28).',
        action: 'This hormonal link suggests mood symptoms may improve with hormone stabilization.'
      }
    ],
    ageRelatedInsights: [
      {
        title: 'Hormonal Mood Changes',
        likelihood: 'Moderate',
        description: 'Fluctuating hormones during perimenopause can impact neurotransmitter function, affecting mood stability.',
        prevention: 'Regular exercise, stress reduction techniques, maintaining social connections, and adequate sleep.',
        management: 'Track mood patterns. CBT has strong evidence for managing perimenopausal mood symptoms.'
      }
    ]
  },
  cardiovascular: {
    recentVisits: [
      { date: 'Sep 15, 2025', type: 'Annual Physical', provider: 'Dr. Martinez', summary: 'Blood pressure 118/76, heart rate 68 bpm. Cardiovascular health excellent for age.' },
      { date: 'Mar 20, 2025', type: 'Lab Results', provider: 'LabCorp', summary: 'Lipid panel shows optimal cholesterol levels, no intervention needed' },
      { date: 'Sep 15, 2024', type: 'Annual Physical', provider: 'Dr. Martinez', summary: 'Baseline EKG normal, blood pressure stable' }
    ],
    labResults: [
      {
        test: 'Total Cholesterol',
        value: '185 mg/dL',
        date: 'Mar 20, 2025',
        populationRange: '<200 mg/dL (desirable)',
        yourBaseline: '175-190 mg/dL (consistent)',
        status: 'good',
        interpretation: 'Optimal level. Your diet and exercise routine are working well.'
      },
      {
        test: 'LDL Cholesterol',
        value: '105 mg/dL',
        date: 'Mar 20, 2025',
        populationRange: '<100 mg/dL (optimal)',
        yourBaseline: '100-115 mg/dL',
        status: 'good',
        interpretation: 'Just slightly above optimal but still in healthy range. Continue current lifestyle.'
      },
      {
        test: 'HDL Cholesterol',
        value: '62 mg/dL',
        date: 'Mar 20, 2025',
        populationRange: '>60 mg/dL (optimal for women)',
        yourBaseline: '58-65 mg/dL',
        status: 'good',
        interpretation: 'Excellent protective HDL levels. Regular exercise is maintaining this well.'
      },
      {
        test: 'Triglycerides',
        value: '88 mg/dL',
        date: 'Mar 20, 2025',
        populationRange: '<150 mg/dL (normal)',
        yourBaseline: '80-95 mg/dL',
        status: 'good',
        interpretation: 'Well within healthy range. Diet and activity level are optimal.'
      },
      {
        test: 'Blood Pressure',
        value: '118/76 mmHg',
        date: 'Sep 15, 2025',
        populationRange: '<120/80 mmHg (normal)',
        yourBaseline: '115-122 / 74-78 mmHg',
        status: 'good',
        interpretation: 'Perfect blood pressure. No hypertension risk detected.'
      }
    ],
    complaints: [],
    aiInsights: [
      {
        type: 'pattern',
        title: 'Cardiovascular Risk Remains Low',
        description: 'Your consistent exercise routine (logged in Participation system) correlates with excellent cardiovascular markers. Your aerobic fitness is likely in the top 25% for your age group.',
        action: 'Continue current activity level of 150+ minutes moderate exercise per week.'
      }
    ],
    ageRelatedInsights: [
      {
        title: 'Heart Disease Prevention',
        likelihood: 'Low Risk',
        description: 'Women face increased cardiovascular risk after menopause due to declining estrogen. However, your current cardiovascular health is excellent.',
        prevention: 'Maintain regular aerobic exercise (150+ min/week), Mediterranean-style diet, stress management, and monitor blood pressure annually.',
        management: 'Continue current lifestyle. Consider discussing estrogen therapy with your doctor—it may provide additional cardiovascular protection during perimenopause transition.'
      },
      {
        title: 'Metabolic Syndrome Screening',
        likelihood: 'Low Risk',
        description: 'Metabolic changes during perimenopause can affect cholesterol, blood sugar, and weight. Your current metabolic health is optimal.',
        prevention: 'Maintain healthy weight, limit processed foods, regular physical activity, adequate sleep.',
        management: 'Annual metabolic panel to catch any changes early. Current trajectory is excellent.'
      }
    ]
  },
  orthopedic: {
    recentVisits: [
      { date: 'Oct 5, 2025', type: 'Sports Medicine', provider: 'Dr. Patel', summary: 'Evaluation for left knee discomfort after running. No structural damage, likely overuse.' },
      { date: 'Jul 12, 2025', type: 'Physical Therapy', provider: 'Sarah Johnson, PT', summary: 'Initial evaluation for knee pain. Started strengthening program.' },
      { date: 'Apr 8, 2025', type: 'Annual Checkup', provider: 'Dr. Chen', summary: 'Reported occasional joint stiffness in mornings, resolved with movement' }
    ],
    labResults: [
      {
        test: 'Vitamin D',
        value: '38 ng/mL',
        date: 'Apr 8, 2025',
        populationRange: '30-100 ng/mL (sufficient)',
        yourBaseline: '35-42 ng/mL (with supplementation)',
        status: 'good',
        interpretation: 'Adequate for bone health. Continue current 2000 IU daily supplementation.'
      },
      {
        test: 'Calcium',
        value: '9.4 mg/dL',
        date: 'Apr 8, 2025',
        populationRange: '8.5-10.5 mg/dL',
        yourBaseline: '9.2-9.6 mg/dL',
        status: 'good',
        interpretation: 'Normal calcium metabolism. Dietary intake appears adequate.'
      }
    ],
    complaints: [
      { date: 'Oct 5, 2025', issue: 'Left knee pain after long runs (>5 miles)' },
      { date: 'Jul 12, 2025', issue: 'General joint stiffness in morning, improves within 30 minutes' },
      { date: 'Apr 8, 2025', issue: 'Occasional lower back discomfort after sitting for extended periods' }
    ],
    aiInsights: [
      {
        type: 'pattern',
        title: 'Exercise-Related Discomfort Pattern',
        description: 'Your reported knee pain correlates with increased running volume in your activity logs. The 2-week gap before symptoms suggests cumulative overuse rather than acute injury.',
        action: 'Consider cross-training (swimming, cycling) to maintain fitness while reducing impact. PT exercises for hip and glute strengthening can prevent recurrence.'
      },
      {
        type: 'pattern',
        title: 'Morning Stiffness and Hormones',
        description: 'Morning joint stiffness that improves with movement is common during perimenopause. Declining estrogen can affect joint lubrication and inflammation regulation.',
        action: 'Gentle morning stretching, maintaining physical activity, and addressing hormonal changes may all help. Mention this pattern to Dr. Chen—hormone therapy could help if other symptoms warrant it.'
      }
    ],
    ageRelatedInsights: [
      {
        title: 'Bone Density Preservation',
        likelihood: 'Moderate Priority',
        description: 'Women begin losing bone density at ~1% per year starting in perimenopause, accelerating to 2-3% annually in the first 5 years after menopause.',
        prevention: 'Weight-bearing exercise (walking, running, resistance training), adequate calcium (1200mg/day total from diet + supplements), vitamin D (2000 IU/day), avoid smoking, limit alcohol.',
        management: 'Consider baseline DEXA scan now to establish your bone density. This helps predict future osteoporosis risk and guides prevention strategies.'
      },
      {
        title: 'Arthritis Prevention',
        likelihood: 'Low-Moderate',
        description: 'Risk of osteoarthritis increases with age, particularly in weight-bearing joints. Your active lifestyle is protective, but also increases wear-and-tear risk if not managed properly.',
        prevention: 'Maintain healthy weight, cross-train to vary impact, strengthen muscles around joints, proper footwear, listen to pain signals.',
        management: 'Your PT program for knee strengthening is excellent prevention. Continue hip and glute work to protect knees long-term.'
      }
    ]
  },
  participation: {
    recentVisits: [
      { date: 'Nov 1, 2025', type: 'Health Coaching', provider: 'Marcus Lee, Health Coach', summary: 'Check-in on activity goals. On track with strength training 3x/week.' },
      { date: 'Aug 15, 2025', type: 'Nutrition Consultation', provider: 'Dr. Emma Richards, RD', summary: 'Discussed protein intake for perimenopause. Recommended 1.2g/kg body weight.' },
      { date: 'Jun 10, 2025', type: 'Health Coaching', provider: 'Marcus Lee, Health Coach', summary: 'Set goals: maintain 150 min/week cardio + 2-3x strength training' }
    ],
    labResults: [],
    complaints: [
      { date: 'Oct 20, 2025', issue: 'Energy dips in afternoon making it hard to exercise after work' },
      { date: 'Aug 15, 2025', issue: 'Difficulty meeting protein goals on busy days' }
    ],
    aiInsights: [
      {
        type: 'pattern',
        title: 'Activity Timing and Energy Patterns',
        description: 'Your activity logs show you successfully complete morning workouts 90% of the time, but only 40% of evening workouts. This correlates with your reported afternoon energy dips (likely related to hormonal changes).',
        action: 'Consider shifting all workouts to morning when energy is highest. If evening exercise is necessary, try a 10-15 minute power nap or light snack 30 minutes before.'
      },
      {
        type: 'pattern',
        title: 'Strength Training Benefits for Bone Health',
        description: 'Your consistent 3x/week strength training is excellent for maintaining bone density during perimenopause. This is one of the most effective interventions for preventing osteoporosis.',
        action: 'Continue current routine. Focus on progressive overload—gradually increasing weights ensures continued bone-building stimulus.'
      }
    ],
    ageRelatedInsights: [
      {
        title: 'Muscle Mass Preservation',
        likelihood: 'Moderate',
        description: 'Women lose 3-5% of muscle mass per decade starting in their 30s, accelerating during perimenopause due to declining hormones. This affects metabolism, strength, and bone health.',
        prevention: 'Resistance training 2-3x/week (you\'re doing great!), adequate protein (1.2-1.6g/kg body weight), compound movements (squats, deadlifts, presses).',
        management: 'Your current strength training routine is excellent. Consider tracking progressive overload to ensure continued adaptation. Protein intake could be optimized—aim for 25-30g per meal.'
      },
      {
        title: 'Exercise for Symptom Management',
        likelihood: 'High',
        description: 'Regular exercise reduces severity of perimenopausal symptoms including mood changes, sleep disruption, and hot flashes. It also reduces long-term risks of heart disease and diabetes.',
        prevention: 'Current activity level (150+ min/week cardio + strength training) is ideal. Consistency is more important than intensity.',
        management: 'You\'re already doing everything right. Your activity level likely explains why your cardiovascular health is excellent despite hormonal changes.'
      },
      {
        title: 'Social Connection Through Movement',
        likelihood: 'Moderate',
        description: 'Social isolation can increase during midlife transitions. Group exercise provides both physical and mental health benefits.',
        prevention: 'Consider group fitness classes, running clubs, or workout partners to enhance social connection alongside physical activity.',
        management: 'If you notice decreased motivation to exercise, social accountability (group classes, training partners) can help maintain consistency.'
      }
    ]
  }
};

// Custom components
const ActionBadge = ({ text }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: colors.primary,
    color: 'white',
  }}>
    {text}
  </span>
);

const StatusBadge = ({ status, text }) => {
  const statusColors = {
    good: { bg: `${colors.success}15`, text: colors.success },
    insight: { bg: `${colors.primary}15`, text: colors.primary },
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
        <line key={i} x1={padding.left} y1={padding.top + ratio * chartHeight} x2={width - padding.right} y2={padding.top + ratio * chartHeight} stroke={colors.borderLight} strokeDasharray="4,4" />
      ))}
      <path d={pathFromPoints(estrogenPoints)} fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={pathFromPoints(progesteronePoints)} fill="none" stroke={colors.secondary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {estrogenPoints.map((p, i) => <circle key={`e-${i}`} cx={p.x} cy={p.y} r="4" fill={colors.primary} />)}
      {progesteronePoints.map((p, i) => <circle key={`p-${i}`} cx={p.x} cy={p.y} r="4" fill={colors.secondary} />)}
      {hormoneData.map((d, i) => (
        <text key={i} x={padding.left + (i / (hormoneData.length - 1)) * chartWidth} y={height - 8} textAnchor="middle" style={{ fontSize: '10px', fill: colors.text.secondary }}>{d.month}</text>
      ))}
      <circle cx={padding.left} cy={8} r="4" fill={colors.primary} />
      <text x={padding.left + 10} y={12} style={{ fontSize: '10px', fill: colors.text.primary }}>Estrogen</text>
      <circle cx={padding.left + 80} cy={8} r="4" fill={colors.secondary} />
      <text x={padding.left + 90} y={12} style={{ fontSize: '10px', fill: colors.text.primary }}>Progesterone</text>
    </svg>
  );
};

const ConfidenceBar = ({ confidence, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div style={{ flex: 1, height: '8px', backgroundColor: colors.borderLight, borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ width: `${confidence}%`, height: '100%', backgroundColor: color, borderRadius: '4px', transition: 'width 0.5s ease' }} />
    </div>
    <span style={{ fontSize: '13px', fontWeight: '600', color: color, minWidth: '40px' }}>{confidence}%</span>
  </div>
);

export default function App() {
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

  const [currentSymptom, setCurrentSymptom] = useState({ description: '' });
  const [generatedDiagnosis, setGeneratedDiagnosis] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState(null);

  const upcomingAppointment = {
    date: 'Dec 3, 2025',
    time: '10:30 AM',
    provider: 'Dr. Sarah Chen',
    type: 'Hormone Panel Review',
    prepared: userConcerns.length > 0 || userQuestions.length > 0
  };

  const generateDifferentialDiagnosis = async () => {
    setIsGenerating(true);
    
    try {
      if (!currentSymptom.description || currentSymptom.description.length < 20) {
        alert('Please provide more details about your concern (at least 20 characters).');
        setIsGenerating(false);
        return;
      }

      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          narrative: currentSymptom.description
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `API request failed: ${response.status}`);
      }

      const diagnosis = await response.json();
      setGeneratedDiagnosis(diagnosis);
      setScreen(SCREENS.GENERATE_DIAGNOSIS);
      
    } catch (error) {
      console.error("Error generating diagnosis:", error);
      alert(`Sorry, there was an error generating the analysis.\n\nError: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ fontFamily: typography.fontFamily, backgroundColor: colors.background, minHeight: '100vh', maxWidth: '430px', margin: '0 auto', boxShadow: '0 0 40px rgba(0,0,0,0.1)', paddingBottom: '80px' }}>
      {/* DASHBOARD SCREEN */}
      {screen === SCREENS.DASHBOARD && (
        <div>
          <Header title="Good morning, Jessica" subtitle="Your wellbeing at a glance" />
          <div style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '16px', background: `linear-gradient(135deg, ${colors.secondary}10 0%, ${colors.primary}10 100%)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: `${colors.secondary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>✓</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px', ...typography.h3 }}>Overall: Good Health</h3>
                  <p style={{ margin: 0, ...typography.bodySmall }}>1 new insight to optimize your wellbeing</p>
                </div>
              </div>
            </Card>

            <Card onClick={() => setScreen(SCREENS.APPOINTMENT)} style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ margin: '0 0 4px', ...typography.caption, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Upcoming Appointment
                </p>
                <h3 style={{ margin: 0, ...typography.h3, fontSize: '17px' }}>
                  {bookedAppointment ? bookedAppointment.type : upcomingAppointment.type}
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <p style={{ margin: 0, ...typography.caption }}>Date</p>
                  <p style={{ margin: '4px 0 0', ...typography.bodySmall, fontWeight: 600 }}>
                    {bookedAppointment ? bookedAppointment.date : upcomingAppointment.date}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, ...typography.caption }}>Time</p>
                  <p style={{ margin: '4px 0 0', ...typography.bodySmall, fontWeight: 600 }}>
                    {bookedAppointment ? bookedAppointment.time : upcomingAppointment.time}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, ...typography.caption }}>Provider</p>
                  <p style={{ margin: '4px 0 0', ...typography.bodySmall, fontWeight: 600 }}>
                    {bookedAppointment ? bookedAppointment.provider : upcomingAppointment.provider}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {!upcomingAppointment.prepared && (
                  <Button variant="primary" onClick={(e) => { e.stopPropagation(); setScreen(SCREENS.APPOINTMENT); }} style={{ padding: '10px 16px', minHeight: '40px', fontSize: '14px' }}>
                    Prepare
                  </Button>
                )}
                <Button variant="outline" onClick={(e) => { e.stopPropagation(); setScreen(SCREENS.SCHEDULE_VISIT); }} style={{ padding: '10px 16px', minHeight: '40px', fontSize: '14px' }}>
                  Reschedule
                </Button>
                <Button variant="outline" onClick={(e) => { e.stopPropagation(); setShowCancelModal(true); }} style={{ padding: '10px 16px', minHeight: '40px', fontSize: '14px' }}>
                  Cancel
                </Button>
              </div>
            </Card>

            <Card onClick={() => setScreen(SCREENS.INSIGHT)} style={{ marginBottom: '20px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: `${colors.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>💡</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', ...typography.h3, fontSize: '15px' }}>New Insight: Hormone Trends</h4>
                  <p style={{ margin: 0, ...typography.bodySmall }}>Changes detected in your estrogen and progesterone</p>
                </div>
                <span style={{ color: colors.primary, fontSize: '18px' }}>→</span>
              </div>
            </Card>

            <h3 style={{ margin: '0 0 16px', ...typography.h3 }}>Health Systems</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              {Object.entries(healthSystems).map(([key, system]) => (
                <Card key={key} onClick={() => { setSelectedHealthSystem(key); setScreen(SCREENS.HEALTH_SYSTEM_DETAIL); }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Icon needsAttention={system.needsReview} />
                      <div>
                        <h4 style={{ margin: 0, ...typography.h3, fontSize: '15px' }}>{system.name}</h4>
                        {system.needsReview && (
                          <p style={{ margin: '4px 0 0', fontSize: '12px', fontWeight: 500, color: colors.primary }}>
                            {system.reviewReason}
                          </p>
                        )}
                      </div>
                    </div>
                    <span style={{ color: colors.text.tertiary, fontSize: '18px' }}>→</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INSIGHT SCREEN */}
      {screen === SCREENS.INSIGHT && (
        <div>
          <Header title="Hormone Insight" subtitle="Based on your recent lab results" showBack onBack={() => setScreen(SCREENS.DASHBOARD)} />
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 4px', ...typography.h3, fontSize: '15px' }}>6-Month Hormone Trend</h3>
              <p style={{ margin: '0 0 16px', ...typography.caption }}>Both values within normal limits, but declining</p>
              <HormoneChart />
              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: `${colors.warning}10`, borderRadius: '8px', borderLeft: `3px solid ${colors.warning}` }}>
                <p style={{ margin: 0, ...typography.bodySmall, lineHeight: '1.5' }}><strong>What this means:</strong> Your hormone levels are still within normal range, but the declining pattern over 6 months may explain some of your recent symptoms.</p>
              </div>
            </Card>

            <h3 style={{ margin: '0 0 12px', ...typography.h3 }}>Options to Discuss with Your Doctor</h3>
            
            <Card style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>💊</span>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600 }}>Hormone Replacement Therapy</h4>
                  <p style={{ margin: 0, ...typography.bodySmall, lineHeight: '1.5' }}>Low-dose estrogen may help with sleep, mood, and cognitive symptoms.</p>
                </div>
              </div>
            </Card>

            <Card style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🥗</span>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600 }}>Nutrition Optimization</h4>
                  <p style={{ margin: 0, ...typography.bodySmall, lineHeight: '1.5' }}>Phytoestrogen-rich foods may support hormone balance naturally.</p>
                </div>
              </div>
            </Card>

            <Card style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🏃‍♀️</span>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600 }}>Activity Adjustments</h4>
                  <p style={{ margin: 0, ...typography.bodySmall, lineHeight: '1.5' }}>Strength training can influence hormone levels.</p>
                </div>
              </div>
            </Card>

            <p style={{ ...typography.caption, textAlign: 'center', marginBottom: '16px' }}>A note has been sent to Dr. Chen about these findings</p>
            <Button onClick={() => setScreen(SCREENS.APPOINTMENT)}>Prepare for Your Appointment →</Button>
          </div>
        </div>
      )}

      {/* APPOINTMENT SCREEN */}
      {screen === SCREENS.APPOINTMENT && (
        <div>
          <Header title="Appointment Prep" subtitle={`${upcomingAppointment.type} • ${upcomingAppointment.date}`} showBack onBack={() => setScreen(SCREENS.DASHBOARD)} />
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: '600' }}>SC</div>
                <div>
                  <h3 style={{ margin: '0 0 2px', fontSize: '16px' }}>{upcomingAppointment.provider}</h3>
                  <p style={{ margin: 0, ...typography.bodySmall }}>OB-GYN, Menopause Specialist</p>
                </div>
              </div>
            </Card>

            <Card style={{ marginBottom: '16px', backgroundColor: `${colors.primary}08` }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: colors.primary }}>What to Expect</h4>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6' }}>Dr. Chen will review your hormone panel results and work with you to create a personalized care plan.</p>
            </Card>

            {userConcerns.length > 0 && (
              <Card style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px' }}>Your Symptoms & Concerns</h4>
                  <span style={{ fontSize: '12px', color: colors.text.secondary }}>{userConcerns.length} added</span>
                </div>
                {userConcerns.map((concern, i) => (
                  <div key={i} style={{ padding: '10px 12px', backgroundColor: colors.borderLight, borderRadius: '8px', marginBottom: '8px', fontSize: '13px' }}>{concern}</div>
                ))}
              </Card>
            )}

            {userQuestions.length > 0 && (
              <Card style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px' }}>Your Questions</h4>
                  <span style={{ fontSize: '12px', color: colors.text.secondary }}>{userQuestions.length} added</span>
                </div>
                {userQuestions.map((q, i) => (
                  <div key={i} style={{ padding: '10px 12px', backgroundColor: colors.borderLight, borderRadius: '8px', marginBottom: '8px', fontSize: '13px' }}>{q}</div>
                ))}
              </Card>
            )}

            <Button variant="primary" onClick={() => setScreen(SCREENS.ADD_CONCERNS)} style={{ marginBottom: '12px' }}>+ Add Symptoms, Concerns & Questions</Button>
            {(userConcerns.length > 0 || userQuestions.length > 0) && (
              <Button onClick={() => setScreen(SCREENS.DIAGNOSIS_PREVIEW)}>See Potential Diagnoses →</Button>
            )}
          </div>
        </div>
      )}

      {/* ADD CONCERNS SCREEN */}
      {screen === SCREENS.ADD_CONCERNS && (
        <div>
          <Header title="Add Details" subtitle="Help Dr. Chen prepare for your visit" showBack onBack={() => setScreen(SCREENS.APPOINTMENT)} />
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px' }}>Symptoms or Concerns</h4>
              <textarea
                value={newConcern}
                onChange={(e) => setNewConcern(e.target.value)}
                placeholder="E.g., night sweats waking me 2-3 times per night"
                style={{ width: '100%', minHeight: '80px', padding: '12px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
              />
              <Button 
                variant="outline" 
                onClick={() => {
                  if (newConcern.trim()) {
                    setUserConcerns([...userConcerns, newConcern.trim()]);
                    setNewConcern('');
                  }
                }}
                style={{ marginTop: '12px', width: '100%' }}
                disabled={!newConcern.trim()}
              >
                Add Concern
              </Button>
            </Card>

            <Card style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px' }}>Questions for Dr. Chen</h4>
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="E.g., Should I consider hormone therapy?"
                style={{ width: '100%', minHeight: '80px', padding: '12px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
              />
              <Button 
                variant="outline" 
                onClick={() => {
                  if (newQuestion.trim()) {
                    setUserQuestions([...userQuestions, newQuestion.trim()]);
                    setNewQuestion('');
                  }
                }}
                style={{ marginTop: '12px', width: '100%' }}
                disabled={!newQuestion.trim()}
              >
                Add Question
              </Button>
            </Card>

            <Button onClick={() => setScreen(SCREENS.APPOINTMENT)}>Done</Button>
          </div>
        </div>
      )}

      {/* DIAGNOSIS PREVIEW SCREEN */}
      {screen === SCREENS.DIAGNOSIS_PREVIEW && (
        <div>
          <Header title="Potential Diagnoses" subtitle="Based on your symptoms" showBack onBack={() => setScreen(SCREENS.APPOINTMENT)} />
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px', backgroundColor: `${colors.warning}10`, border: `1px solid ${colors.warning}` }}>
              <p style={{ margin: 0, fontSize: '12px' }}><strong>Note:</strong> This is for discussion purposes only. Dr. Chen will provide an official diagnosis.</p>
            </Card>

            {differentialDiagnosis.map((dx, i) => (
              <Card key={i} style={{ marginBottom: '16px', border: i === 0 ? `2px solid ${colors.primary}` : `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '15px' }}>{dx.name}</h4>
                  {dx.needsRuleOut && <StatusBadge status="attention" text="RULE OUT" />}
                </div>
                <ConfidenceBar confidence={dx.confidence} color={dx.color} />
                <div style={{ marginTop: '12px' }}>
                  <p style={{ margin: '0 0 6px', fontSize: '12px', color: colors.text.secondary }}>Supporting Criteria:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {dx.criteria.map((c, j) => (
                      <span key={j} style={{ padding: '4px 10px', backgroundColor: colors.borderLight, borderRadius: '12px', fontSize: '11px' }}>{c}</span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            <Button onClick={() => setScreen(SCREENS.PLAN_OF_CARE)}>Review Proposed Plan →</Button>
          </div>
        </div>
      )}

      {/* PLAN OF CARE SCREEN */}
      {screen === SCREENS.PLAN_OF_CARE && (
        <div>
          <Header title="Proposed Care Plan" subtitle="Review and customize with Dr. Chen" showBack onBack={() => setScreen(SCREENS.DIAGNOSIS_PREVIEW)} />
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px', backgroundColor: `${colors.primary}08` }}>
              <p style={{ margin: 0, fontSize: '13px' }}>These are suggestions based on your symptoms. You'll finalize this plan with Dr. Chen.</p>
            </Card>

            {planItems.map((item) => (
              <Card key={item.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <button
                    onClick={() => setPlanItems(planItems.map(p => p.id === item.id ? {...p, approved: !p.approved} : p))}
                    style={{ width: '24px', height: '24px', borderRadius: '6px', border: `2px solid ${item.approved ? colors.primary : colors.border}`, backgroundColor: item.approved ? colors.primary : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                  >
                    {item.approved && <CheckCircle size={16} color="white" />}
                  </button>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '14px', color: colors.text.primary }}>{item.text}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: colors.text.tertiary, textTransform: 'uppercase' }}>{item.type}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Button onClick={() => alert('Plan saved to discuss at appointment!')}>Save Plan for Discussion</Button>
          </div>
        </div>
      )}

      {/* HEALTH SYSTEM DETAIL SCREEN */}
      {screen === SCREENS.HEALTH_SYSTEM_DETAIL && selectedHealthSystem && (
        <div>
          <Header 
            title={healthSystems[selectedHealthSystem].name} 
            subtitle="Complete health record"
            showBack 
            onBack={() => setScreen(SCREENS.DASHBOARD)} 
          />
          <div style={{ padding: '20px' }}>
            {/* Recent Visits */}
            {healthSystemDetails[selectedHealthSystem].recentVisits.length > 0 && (
              <>
                <h3 style={{ margin: '0 0 12px', fontSize: '15px' }}>Recent Visits</h3>
                {healthSystemDetails[selectedHealthSystem].recentVisits.map((visit, i) => (
                  <Card key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{visit.type}</h4>
                      <span style={{ fontSize: '12px', color: colors.text.tertiary }}>{visit.date}</span>
                    </div>
                    <p style={{ margin: '0 0 4px', fontSize: '12px', color: colors.text.secondary }}>{visit.provider}</p>
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5' }}>{visit.summary}</p>
                  </Card>
                ))}
              </>
            )}

            {/* Lab Results */}
            {healthSystemDetails[selectedHealthSystem].labResults.length > 0 && (
              <>
                <h3 style={{ margin: '20px 0 12px', fontSize: '15px' }}>Lab Results</h3>
                {healthSystemDetails[selectedHealthSystem].labResults.map((lab, i) => (
                  <Card key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{lab.test}</h4>
                      <StatusBadge status={lab.status} text={lab.status === 'good' ? 'GOOD' : 'INSIGHT'} />
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 600, color: colors.text.primary }}>{lab.value}</span>
                      <span style={{ fontSize: '11px', color: colors.text.tertiary, marginLeft: '8px' }}>{lab.date}</span>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: colors.borderLight, borderRadius: '6px', marginBottom: '8px' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '11px', color: colors.text.secondary }}>Population Range</p>
                      <p style={{ margin: 0, fontSize: '12px' }}>{lab.populationRange}</p>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: `${colors.primary}08`, borderRadius: '6px', marginBottom: '8px' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '11px', color: colors.text.secondary }}>Your Baseline</p>
                      <p style={{ margin: 0, fontSize: '12px' }}>{lab.yourBaseline}</p>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: `${colors.warning}10`, borderRadius: '8px', borderLeft: `3px solid ${colors.warning}` }}>
                      <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5' }}>{lab.interpretation}</p>
                    </div>
                  </Card>
                ))}
              </>
            )}

            {/* Complaints */}
            {healthSystemDetails[selectedHealthSystem].complaints.length > 0 && (
              <>
                <h3 style={{ margin: '20px 0 12px', fontSize: '15px' }}>Reported Concerns</h3>
                {healthSystemDetails[selectedHealthSystem].complaints.map((complaint, i) => (
                  <Card key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: colors.text.tertiary }}>{complaint.date}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '14px' }}>{complaint.issue}</p>
                  </Card>
                ))}
              </>
            )}

            {/* AI Insights */}
            {healthSystemDetails[selectedHealthSystem].aiInsights.length > 0 && (
              <>
                <h3 style={{ margin: '20px 0 12px', fontSize: '15px' }}>AI-Detected Patterns</h3>
                {healthSystemDetails[selectedHealthSystem].aiInsights.map((insight, i) => (
                  <Card key={i} style={{ marginBottom: '12px', backgroundColor: `${colors.primary}08`, border: `1px solid ${colors.primary}30` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '18px' }}>🤖</span>
                      <h4 style={{ margin: 0, fontSize: '14px', color: colors.primary }}>{insight.title}</h4>
                    </div>
                    <p style={{ margin: '0 0 12px', fontSize: '13px', lineHeight: '1.6' }}>{insight.description}</p>
                    <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '6px' }}>
                      <p style={{ margin: 0, fontSize: '12px', color: colors.text.secondary }}><strong>Action:</strong> {insight.action}</p>
                    </div>
                  </Card>
                ))}
              </>
            )}

            {/* Age-Related Insights */}
            {healthSystemDetails[selectedHealthSystem].ageRelatedInsights.length > 0 && (
              <>
                <h3 style={{ margin: '20px 0 12px', fontSize: '15px' }}>Age-Related Screening & Prevention</h3>
                {healthSystemDetails[selectedHealthSystem].ageRelatedInsights.map((insight, i) => (
                  <Card key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{insight.title}</h4>
                      <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, backgroundColor: `${colors.secondary}15`, color: colors.secondary }}>
                        {insight.likelihood.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 12px', fontSize: '13px', lineHeight: '1.6', color: colors.text.secondary }}>{insight.description}</p>
                    <div style={{ padding: '10px', backgroundColor: colors.borderLight, borderRadius: '6px', marginBottom: '8px' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '11px', color: colors.text.secondary, fontWeight: 600 }}>Prevention</p>
                      <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.5' }}>{insight.prevention}</p>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: `${colors.primary}08`, borderRadius: '6px' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '11px', color: colors.text.secondary, fontWeight: 600 }}>Management</p>
                      <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.5' }}>{insight.management}</p>
                    </div>
                  </Card>
                ))}
              </>
            )}

            <Button onClick={() => setScreen(SCREENS.DASHBOARD)} style={{ marginTop: '20px' }}>Back to Dashboard</Button>
          </div>
        </div>
      )}

      {/* SYMPTOM INTAKE SCREEN - WITH VOICE INPUT */}
      {screen === SCREENS.SYMPTOM_INTAKE && (
        <div>
          <Header 
            title="Symptom Checker"
            subtitle="Get AI-assisted health insights"
            showBack
            onBack={() => setScreen(SCREENS.DASHBOARD)}
          />
          
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px', backgroundColor: `${colors.primary}08` }}>
              <p style={{ margin: 0, fontSize: '13px', color: colors.text.primary, lineHeight: '1.6' }}>
                <strong>How this works:</strong> Share your health concerns in your own words. Our AI will analyze patterns across medical literature to suggest possible conditions and next steps. This is not a diagnosis—it's a tool to help you have more informed conversations with your doctor.
              </p>
            </Card>

            <Card style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '12px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: '600' }}>
                  Patient Narrative
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: colors.text.secondary, lineHeight: '1.5' }}>
                  Tell me what your concern is. Include when you first noticed symptoms, how they affect your daily life, and any relevant health history.
                </p>
              </div>

              <div style={{ position: 'relative' }}>
                <textarea
                  value={currentSymptom.description}
                  onChange={(e) => setCurrentSymptom({...currentSymptom, description: e.target.value})}
                  placeholder="Example: I've been having night sweats for about 3 months now, waking up 2-3 times per night. My cycles have also become irregular, ranging from 24 to 38 days. I'm 45 years old and wondering if this could be perimenopause..."
                  style={{ 
                    width: '100%', 
                    minHeight: '200px',
                    padding: '14px', 
                    border: `1px solid ${colors.border}`, 
                    borderRadius: '10px', 
                    fontSize: '15px', 
                    fontFamily: 'inherit', 
                    resize: 'vertical', 
                    boxSizing: 'border-box',
                    lineHeight: '1.6'
                  }}
                />
                
                <button
                  onClick={() => {
                    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                      const recognition = new SpeechRecognition();
                      
                      recognition.continuous = true;
                      recognition.interimResults = true;
                      recognition.lang = 'en-US';

                      recognition.onstart = () => {
                        document.querySelector('#voice-indicator').style.display = 'flex';
                      };

                      recognition.onresult = (event) => {
                        let transcript = '';
                        for (let i = event.resultIndex; i < event.results.length; i++) {
                          transcript += event.results[i][0].transcript;
                        }
                        setCurrentSymptom({
                          ...currentSymptom, 
                          description: currentSymptom.description + ' ' + transcript
                        });
                      };

                      recognition.onerror = (event) => {
                        console.error('Speech recognition error:', event.error);
                        alert('Voice input error: ' + event.error);
                        document.querySelector('#voice-indicator').style.display = 'none';
                      };

                      recognition.onend = () => {
                        document.querySelector('#voice-indicator').style.display = 'none';
                      };

                      recognition.start();
                    } else {
                      alert('Voice input is not supported in your browser. Please use Chrome, Safari, or Edge.');
                    }
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: `2px solid ${colors.primary}`,
                    backgroundColor: colors.card,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.primary}10`;
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.card;
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  title="Click to use voice input"
                >
                  🎤
                </button>

                <div 
                  id="voice-indicator"
                  style={{
                    display: 'none',
                    position: 'absolute',
                    bottom: '64px',
                    right: '12px',
                    padding: '8px 14px',
                    backgroundColor: colors.error,
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  <span style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}></span>
                  Recording...
                </div>
              </div>

              <p style={{ margin: '12px 0 0', fontSize: '11px', color: colors.text.tertiary, textAlign: 'right' }}>
                {currentSymptom.description.length} characters
              </p>
            </Card>

            <Button 
              onClick={generateDifferentialDiagnosis}
              disabled={!currentSymptom.description || currentSymptom.description.length < 20 || isGenerating}
            >
              {isGenerating ? '🔄 Analyzing...' : '🔍 Get AI Health Insights'}
            </Button>

            <p style={{ margin: '12px 0 0', fontSize: '11px', color: colors.text.tertiary, textAlign: 'center' }}>
              This analysis is based on clinical guidelines. Always consult a healthcare provider.
            </p>

            <style>{`
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
              }
            `}</style>
          </div>
        </div>
      )}

      {/* GENERATED DIAGNOSIS SCREEN */}
      {screen === SCREENS.GENERATE_DIAGNOSIS && generatedDiagnosis && (
        <div>
          <Header 
            title="Health Analysis"
            subtitle="AI-assisted insights"
            showBack
            onBack={() => setScreen(SCREENS.SYMPTOM_INTAKE)}
          />
          
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px', backgroundColor: `${colors.warning}10`, border: `1px solid ${colors.warning}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>⚠️</span>
                <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.5' }}>
                  <strong>Important:</strong> This is not a medical diagnosis. Share with your doctor.
                </p>
              </div>
            </Card>

            <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: '600' }}>Possible Conditions</h3>
            
            {generatedDiagnosis.differentialDiagnosis?.map((dx, i) => (
              <Card key={i} style={{ marginBottom: '16px', border: `2px solid ${i === 0 ? colors.primary : colors.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: i === 0 ? colors.primary : colors.borderLight, color: i === 0 ? 'white' : colors.text.tertiary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600' }}>{i + 1}</span>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>{dx.condition}</h4>
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                    {dx.likelihood?.toUpperCase() || 'MODERATE'}
                  </span>
                </div>
                
                <ConfidenceBar confidence={dx.confidence} color={colors.primary} />
                
                <div style={{ marginTop: '12px', padding: '12px', backgroundColor: `${colors.primary}08`, borderRadius: '8px' }}>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6' }}>
                    <strong>Why this fits:</strong> {dx.explanation}
                  </p>
                </div>

                {dx.supportingCriteria && (
                  <div style={{ marginTop: '12px' }}>
                    <p style={{ margin: '0 0 6px', fontSize: '12px', color: colors.text.secondary, fontWeight: '600' }}>Supporting Criteria:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {dx.supportingCriteria.map((criterion, j) => (
                        <span key={j} style={{ padding: '4px 10px', backgroundColor: colors.borderLight, borderRadius: '12px', fontSize: '11px' }}>{criterion}</span>
                      ))}
                    </div>
                  </div>
                )}

                {dx.recommendedTests && (
                  <div style={{ marginTop: '12px' }}>
                    <p style={{ margin: '0 0 6px', fontSize: '12px', color: colors.success, fontWeight: '600' }}>Recommended Tests:</p>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', lineHeight: '1.6' }}>
                      {dx.recommendedTests.map((test, j) => (
                        <li key={j}>{test}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button variant="primary" onClick={() => alert('In production, this would share with your doctor.')}>
                📤 Share with My Doctor
              </Button>
              <Button variant="outline" onClick={() => setScreen(SCREENS.SYMPTOM_INTAKE)}>
                ← Modify Symptoms
              </Button>
            </div>

            <p style={{ margin: '16px 0 0', fontSize: '11px', color: colors.text.tertiary, textAlign: 'center' }}>
              Analysis generated by AI. Always consult a licensed healthcare provider.
            </p>
          </div>
        </div>
      )}

      {/* SCHEDULE VISIT SCREEN */}
      {screen === SCREENS.SCHEDULE_VISIT && (
        <div>
          <Header 
            title="Schedule Visit"
            subtitle="Book with Dr. Chen"
            showBack
            onBack={() => setScreen(SCREENS.DASHBOARD)}
          />
          
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600' }}>Next Available Appointments</h3>
            
            <Card style={{ marginBottom: '16px', border: `2px solid ${colors.primary}` }}>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '600' }}>Monday, December 9</p>
                <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>2:30 PM - 3:00 PM</p>
              </div>
              <p style={{ margin: '12px 0', fontSize: '13px' }}>In-Person Visit</p>
              <p style={{ margin: '0 0 12px', fontSize: '12px', color: colors.text.secondary }}>450 Serra Mall, Stanford, CA</p>
              <Button 
                variant="primary" 
                style={{ width: '100%' }}
                onClick={() => {
                  setBookedAppointment({
                    date: 'Dec 9, 2025',
                    time: '2:30 PM',
                    provider: 'Dr. Sarah Chen',
                    type: 'Hormone Panel Review'
                  });
                  setScreen(SCREENS.DASHBOARD);
                }}
              >
                Book This Appointment
              </Button>
            </Card>

            <Card style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '600' }}>Tuesday, December 10</p>
                <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>9:00 AM - 9:30 AM</p>
              </div>
              <p style={{ margin: '12px 0', fontSize: '13px' }}>Telehealth Visit</p>
              <p style={{ margin: '0 0 12px', fontSize: '12px', color: colors.text.secondary }}>Video call via patient portal</p>
              <Button 
                variant="outline" 
                style={{ width: '100%' }}
                onClick={() => {
                  setBookedAppointment({
                    date: 'Dec 10, 2025',
                    time: '9:00 AM',
                    provider: 'Dr. Sarah Chen',
                    type: 'Telehealth Follow-up'
                  });
                  setScreen(SCREENS.DASHBOARD);
                }}
              >
                Book This Appointment
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* MESSAGES SCREEN */}
      {screen === SCREENS.MESSAGES && (
        <div>
          <Header 
            title="Messages"
            subtitle="Secure communication"
            showBack
            onBack={() => setScreen(SCREENS.DASHBOARD)}
          />
          
          <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '16px', backgroundColor: `${colors.success}08`, border: `1px solid ${colors.success}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Lock size={16} />
                <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.5' }}>
                  <strong>End-to-end encrypted</strong> - Your messages are private and secure.
                </p>
              </div>
            </Card>

            <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600' }}>Recent Conversations</h3>

            <Card style={{ marginBottom: '12px', cursor: 'pointer' }} onClick={() => alert('Message thread would open')}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  SC
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>Dr. Sarah Chen</p>
                    <p style={{ margin: 0, fontSize: '11px', color: colors.text.tertiary }}>2 hours ago</p>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px' }}>Lab results look good. Let's discuss at your next...</p>
                </div>
              </div>
            </Card>

            <Button variant="primary" style={{ width: '100%' }}>
              ✉️ New Message
            </Button>
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '430px',
        width: '100%',
        backgroundColor: 'white',
        borderTop: `1px solid ${colors.border}`,
        padding: '12px 0',
        display: 'flex',
        justifyContent: 'space-around',
        zIndex: 100,
      }}>
        {[
          { label: 'Home', screen: SCREENS.DASHBOARD, icon: Home },
          { label: 'Schedule', screen: SCREENS.SCHEDULE_VISIT, icon: Calendar },
          { label: 'Symptoms', screen: SCREENS.SYMPTOM_INTAKE, icon: FileText },
          { label: 'Messages', screen: SCREENS.MESSAGES, icon: MessageSquare, badge: true },
        ].map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.screen}
              onClick={() => setScreen(item.screen)}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 16px',
                cursor: 'pointer',
                color: screen === item.screen ? colors.primary : colors.text.tertiary,
                position: 'relative',
                minWidth: '72px',
              }}
            >
              <IconComponent size={22} strokeWidth={screen === item.screen ? 2.5 : 2} />
              <span style={{ fontSize: '12px', fontWeight: screen === item.screen ? 600 : 500 }}>
                {item.label}
              </span>
              {item.badge && (
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  right: '16px',
                  width: '6px',
                  height: '6px',
                  backgroundColor: colors.error,
                  borderRadius: '50%',
                }}></span>
              )}
            </button>
          );
        })}
      </div>

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '380px',
            width: '100%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: '600' }}>
              Cancel Appointment?
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: '14px', color: colors.text.secondary, lineHeight: '1.5' }}>
              Are you sure you want to cancel your appointment with Dr. Chen on {bookedAppointment ? bookedAppointment.date : upcomingAppointment.date}?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button 
                variant="outline" 
                style={{ flex: 1 }}
                onClick={() => setShowCancelModal(false)}
              >
                Keep Appointment
              </Button>
              <Button 
                variant="primary"
                style={{ flex: 1, backgroundColor: colors.error }}
                onClick={() => {
                  setBookedAppointment(null);
                  setShowCancelModal(false);
                }}
              >
                Cancel It
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
