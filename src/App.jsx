import React, { useState } from 'react';
import { Home, Calendar, FileText, MessageSquare } from 'lucide-react';

// Simplified Design System - Clean & Trustworthy
const colors = {
  // Primary - trustworthy blue-purple
  primary: '#5B4FE8',
  primaryDark: '#4A3FD1',
  primaryLight: '#8B82F2',
  
  // Secondary - calming green for success/stable
  secondary: '#10B981',
  secondaryLight: '#34D399',
  
  // Neutrals - shades of black
  text: {
    primary: '#000000',
    secondary: '#4B5563',
    tertiary: '#9CA3AF',
  },
  
  // Surfaces
  background: '#F9FAFB',
  card: '#FFFFFF',
  
  // Semantic
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Borders
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
};

const healthSystems = {
  hormones: { 
    name: 'Reproductive Health', 
    needsReview: true,
    reviewReason: 'New pattern detected'
  },
  mindbody: { 
    name: 'Mental Wellness', 
    needsReview: false,
  },
  cardiovascular: { 
    name: 'Cardiovascular', 
    needsReview: false,
  },
  musculoskeletal: { 
    name: 'Musculoskeletal', 
    needsReview: true,
    reviewReason: 'Check-in needed'
  },
  digestion: { 
    name: 'Digestive Health', 
    needsReview: false,
  },
  activity: { 
    name: 'Activity & Sleep', 
    needsReview: false,
  },
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
  { 
    name: 'Perimenopause', 
    confidence: 87, 
    criteria: ['Age 40-55', 'Cycle changes', 'Estrogen decline', 'Symptom cluster'], 
  },
  { 
    name: 'Thyroid Dysfunction', 
    confidence: 42, 
    criteria: ['Fatigue', 'Mood changes', 'Weight fluctuation'], 
    needsRuleOut: true, 
  },
  { 
    name: 'Vitamin D Deficiency', 
    confidence: 35, 
    criteria: ['Fatigue', 'Mood changes', 'Joint discomfort'], 
  },
  { 
    name: 'Iron Deficiency Anemia', 
    confidence: 28, 
    criteria: ['Fatigue', 'Brain fog'], 
  },
];

const SCREENS = {
  DASHBOARD: 'dashboard',
  INSIGHT: 'insight',
  APPOINTMENT: 'appointment',
  ADD_CONCERNS: 'add_concerns',
  DIAGNOSIS_PREVIEW: 'diagnosis_preview',
  HEALTH_SYSTEM_DETAIL: 'health_system_detail',
  SYMPTOM_INTAKE: 'symptom_intake',
  SCHEDULE_VISIT: 'schedule_visit',
  MESSAGES: 'messages'
};

const healthSystemDetails = {
  hormones: {
    recentVisits: [
      { date: 'Nov 15, 2025', type: 'Lab Results', provider: 'Quest Diagnostics', summary: 'Hormone panel showed declining estrogen/progesterone trend' },
      { date: 'Aug 10, 2025', type: 'Annual Exam', provider: 'Dr. Chen', summary: 'Discussed cycle irregularity, ordered comprehensive hormone panel' },
    ],
    labResults: [
      { 
        test: 'Estradiol', 
        value: '95 pg/mL', 
        date: 'Nov 15, 2025', 
        populationRange: '15-350 pg/mL', 
        yourBaseline: '140-160 pg/mL',
        needsReview: true,
        interpretation: 'Lower than personal baseline. The 6-month declining trend may explain recent symptoms.'
      },
      { 
        test: 'Progesterone', 
        value: '5 ng/mL', 
        date: 'Nov 15, 2025', 
        populationRange: '5-20 ng/mL', 
        yourBaseline: '10-14 ng/mL',
        needsReview: true,
        interpretation: 'Lower end of normal range. Consistent with perimenopause transition.'
      },
    ],
    complaints: [
      { date: 'Aug 10, 2025', issue: 'Irregular cycles - varying from 24-38 days' },
      { date: 'Aug 10, 2025', issue: 'Night sweats 2-3x per week' },
    ],
    insights: [
      {
        title: 'Cross-System Pattern Detected',
        description: 'Sleep disruptions began around the same time as hormone changes. Night sweats may be interrupting sleep, contributing to fatigue.',
        action: 'Addressing vasomotor symptoms may improve sleep quality and cognitive function.'
      }
    ],
  }
};

// Typography
const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", sans-serif',
  h1: { fontSize: '24px', fontWeight: 600, lineHeight: 1.3, color: colors.text.primary },
  h2: { fontSize: '20px', fontWeight: 600, lineHeight: 1.3, color: colors.text.primary },
  h3: { fontSize: '16px', fontWeight: 600, lineHeight: 1.4, color: colors.text.primary },
  body: { fontSize: '15px', fontWeight: 400, lineHeight: 1.6, color: colors.text.primary },
  bodySmall: { fontSize: '14px', fontWeight: 400, lineHeight: 1.5, color: colors.text.secondary },
  caption: { fontSize: '12px', fontWeight: 500, lineHeight: 1.4, color: colors.text.tertiary },
};

// Icon component - simple colored circle
const Icon = ({ needsAttention }) => (
  <div style={{
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: needsAttention ? colors.primary : colors.secondary,
  }} />
);

// Action badge - only shown when action needed
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

const HormoneChart = () => {
  const width = 340;
  const height = 180;
  const padding = { top: 30, right: 24, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxEstrogen = 160;
  const maxProgesterone = 15;
  
  const estrogenPoints = hormoneData.map((d, i) => ({
    x: padding.left + (i / (hormoneData.length - 1)) * chartWidth,
    y: padding.top + chartHeight - (d.estrogen / maxEstrogen) * chartHeight
  }));
  
  const progesteronePoints = hormoneData.map((d, i) => ({
    x: padding.left + (i / (hormoneData.length - 1)) * chartWidth,
    y: padding.top + chartHeight - (d.progesterone / maxProgesterone) * chartHeight
  }));
  
  const pathFromPoints = (points) => {
    if (points.length < 2) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };
  
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
        <line 
          key={i} 
          x1={padding.left} 
          y1={padding.top + ratio * chartHeight} 
          x2={width - padding.right} 
          y2={padding.top + ratio * chartHeight} 
          stroke={colors.border} 
          strokeWidth="1"
        />
      ))}
      
      {/* Lines */}
      <path 
        d={pathFromPoints(estrogenPoints)} 
        fill="none" 
        stroke={colors.primary} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d={pathFromPoints(progesteronePoints)} 
        fill="none" 
        stroke={colors.secondary} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Points */}
      {estrogenPoints.map((p, i) => (
        <circle key={`e-${i}`} cx={p.x} cy={p.y} r="4" fill={colors.primary} />
      ))}
      {progesteronePoints.map((p, i) => (
        <circle key={`p-${i}`} cx={p.x} cy={p.y} r="4" fill={colors.secondary} />
      ))}
      
      {/* X-axis labels */}
      {hormoneData.map((d, i) => (
        <text 
          key={i} 
          x={padding.left + (i / (hormoneData.length - 1)) * chartWidth} 
          y={height - 12} 
          textAnchor="middle" 
          style={{ fontSize: '11px', fill: colors.text.tertiary }}
        >
          {d.month}
        </text>
      ))}
      
      {/* Legend */}
      <g transform={`translate(${padding.left}, 10)`}>
        <circle cx={0} cy={0} r="4" fill={colors.primary} />
        <text x={12} y={4} style={{ fontSize: '12px', fill: colors.text.secondary }}>Estrogen</text>
        
        <circle cx={90} cy={0} r="4" fill={colors.secondary} />
        <text x={102} y={4} style={{ fontSize: '12px', fill: colors.text.secondary }}>Progesterone</text>
      </g>
    </svg>
  );
};

const ConfidenceBar = ({ confidence }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
    <div style={{ 
      flex: 1, 
      height: '4px', 
      backgroundColor: colors.borderLight, 
      borderRadius: '2px', 
      overflow: 'hidden' 
    }}>
      <div style={{ 
        width: `${confidence}%`, 
        height: '100%', 
        backgroundColor: colors.primary, 
        borderRadius: '2px', 
        transition: 'width 0.6s ease' 
      }} />
    </div>
    <span style={{ 
      fontSize: '13px',
      fontWeight: 600, 
      color: colors.text.primary, 
      minWidth: '50px',
      textAlign: 'right'
    }}>
      {confidence}%
    </span>
  </div>
);

const Header = ({ title, subtitle, showBack, onBack }) => (
  <div style={{ 
    backgroundColor: colors.primary,
    padding: showBack ? '20px 24px 24px' : '28px 24px 32px', 
    color: 'white',
  }}>
    {showBack && (
      <button 
        onClick={onBack} 
        style={{ 
          background: 'rgba(255,255,255,0.2)', 
          border: 'none', 
          color: 'white', 
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer', 
          padding: '8px 16px', 
          marginBottom: '16px',
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px',
          borderRadius: '8px',
        }}
      >
        ← Back
      </button>
    )}
    <h1 style={{ margin: 0, ...typography.h1, fontSize: showBack ? '22px' : '26px', color: 'white' }}>
      {title}
    </h1>
    {subtitle && (
      <p style={{ margin: '6px 0 0', fontSize: '14px', opacity: 0.9, color: 'white' }}>
        {subtitle}
      </p>
    )}
  </div>
);

const Card = ({ children, style = {}, onClick }) => (
  <div 
    onClick={onClick} 
    style={{ 
      backgroundColor: colors.card, 
      borderRadius: '12px', 
      border: `1px solid ${colors.border}`, 
      padding: '20px', 
      cursor: onClick ? 'pointer' : 'default',
      transition: 'border-color 0.2s ease',
      ...style 
    }}
    onMouseEnter={(e) => {
      if (onClick) e.currentTarget.style.borderColor = colors.primary;
    }}
    onMouseLeave={(e) => {
      if (onClick) e.currentTarget.style.borderColor = colors.border;
    }}
  >
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', onClick, style = {}, disabled }) => {
  const variants = {
    primary: { 
      bg: colors.primary, 
      color: 'white',
      border: 'none',
    },
    outline: { 
      bg: 'transparent', 
      color: colors.text.primary,
      border: `2px solid ${colors.primary}`,
    },
    ghost: { 
      bg: colors.background, 
      color: colors.text.primary,
      border: `1px solid ${colors.border}`,
    }
  };
  const v = variants[variant];
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      style={{ 
        width: '100%', 
        padding: '14px 24px', 
        backgroundColor: disabled ? colors.background : v.bg, 
        color: disabled ? colors.text.tertiary : v.color, 
        border: disabled ? `1px solid ${colors.border}` : v.border, 
        borderRadius: '8px', 
        fontSize: '15px',
        fontWeight: 600, 
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minHeight: '48px',
        transition: 'all 0.2s ease',
        ...style 
      }}
    >
      {children}
    </button>
  );
};

export default function MyAccessApp() {
  const [screen, setScreen] = useState(SCREENS.DASHBOARD);
  const [selectedHealthSystem, setSelectedHealthSystem] = useState(null);
  const [userConcerns, setUserConcerns] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);
  const [newConcern, setNewConcern] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  const [patientProfile, setPatientProfile] = useState({
    age: '45',
    sex: 'female',
    symptoms: [],
    pmh: '',
    medications: '',
    familyHistory: ''
  });
  const [currentSymptom, setCurrentSymptom] = useState({ description: '', duration: '', severity: 'not_interfering' });
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

  // Count items needing review
  const itemsNeedingReview = Object.values(healthSystems).filter(s => s.needsReview).length;

  return (
    <div style={{ 
      fontFamily: typography.fontFamily, 
      backgroundColor: colors.background, 
      minHeight: '100vh', 
      maxWidth: '430px', 
      margin: '0 auto', 
    }}>
      {screen === SCREENS.DASHBOARD && (
        <div>
          <Header title="Good morning, Jessica" subtitle="Your health overview" />
          <div style={{ padding: '24px' }}>
            
            {/* Summary Card */}
            <Card style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px', ...typography.h3 }}>
                    Health Overview
                  </h3>
                  <p style={{ margin: 0, ...typography.bodySmall }}>
                    {itemsNeedingReview === 0 ? 'All systems normal' : `${itemsNeedingReview} ${itemsNeedingReview === 1 ? 'area needs' : 'areas need'} review`}
                  </p>
                </div>
                <Icon needsAttention={itemsNeedingReview > 0} />
              </div>
              {itemsNeedingReview > 0 && (
                <ActionBadge text={`${itemsNeedingReview} new ${itemsNeedingReview === 1 ? 'pattern' : 'patterns'}`} />
              )}
            </Card>

            {/* Upcoming Appointment */}
            <Card 
              onClick={() => setScreen(SCREENS.APPOINTMENT)} 
              style={{ marginBottom: '24px' }}
            >
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
                  <p style={{ margin: '4px 0 0', ...typography.bodySmall, fontWeight: 600, color: colors.text.primary }}>
                    {bookedAppointment ? bookedAppointment.date : upcomingAppointment.date}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, ...typography.caption }}>Time</p>
                  <p style={{ margin: '4px 0 0', ...typography.bodySmall, fontWeight: 600, color: colors.text.primary }}>
                    {bookedAppointment ? bookedAppointment.time : upcomingAppointment.time}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, ...typography.caption }}>Provider</p>
                  <p style={{ margin: '4px 0 0', ...typography.bodySmall, fontWeight: 600, color: colors.text.primary }}>
                    {bookedAppointment ? bookedAppointment.provider : upcomingAppointment.provider}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {!upcomingAppointment.prepared && (
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setScreen(SCREENS.APPOINTMENT);
                    }}
                    style={{ padding: '10px 16px', minHeight: '40px', fontSize: '14px' }}
                  >
                    Prepare
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setScreen(SCREENS.SCHEDULE_VISIT);
                  }}
                  style={{ padding: '10px 16px', minHeight: '40px', fontSize: '14px' }}
                >
                  Reschedule
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCancelModal(true);
                  }}
                  style={{ padding: '10px 16px', minHeight: '40px', fontSize: '14px' }}
                >
                  Cancel
                </Button>
              </div>
            </Card>

            {/* New Insight - only if there are patterns to review */}
            {itemsNeedingReview > 0 && (
              <Card 
                onClick={() => setScreen(SCREENS.INSIGHT)} 
                style={{ marginBottom: '28px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px', ...typography.h3, fontSize: '15px' }}>
                      New Health Pattern
                    </h4>
                    <p style={{ margin: 0, ...typography.bodySmall }}>
                      Changes detected in hormone levels
                    </p>
                  </div>
                  <span style={{ color: colors.primary, fontSize: '20px' }}>→</span>
                </div>
              </Card>
            )}

            <h3 style={{ margin: '0 0 16px', ...typography.h3 }}>
              Health Systems
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              {Object.entries(healthSystems).map(([key, system]) => (
                <Card 
                  key={key} 
                  onClick={() => {
                    setSelectedHealthSystem(key);
                    setScreen(SCREENS.HEALTH_SYSTEM_DETAIL);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Icon needsAttention={system.needsReview} />
                      <div>
                        <h4 style={{ margin: 0, ...typography.h3, fontSize: '15px' }}>
                          {system.name}
                        </h4>
                        {system.needsReview && (
                          <p style={{ margin: '4px 0 0', ...typography.caption, color: colors.primary }}>
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

      {screen === SCREENS.INSIGHT && (
        <div>
          <Header title="Health Pattern" subtitle="Based on your recent lab results" showBack onBack={() => setScreen(SCREENS.DASHBOARD)} />
          <div style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 6px', ...typography.h3 }}>
                6-Month Hormone Trend
              </h3>
              <p style={{ margin: '0 0 20px', ...typography.bodySmall }}>
                Both values within normal limits, but declining
              </p>
              <HormoneChart />
              <div style={{ 
                marginTop: '20px', 
                padding: '16px', 
                backgroundColor: colors.background, 
                borderRadius: '8px', 
                borderLeft: `3px solid ${colors.primary}` 
              }}>
                <p style={{ margin: 0, ...typography.bodySmall, lineHeight: 1.6 }}>
                  <strong>What this means:</strong> Your hormone levels are within normal range, but the declining pattern over 6 months may explain some recent symptoms.
                </p>
              </div>
            </Card>

            <h3 style={{ margin: '0 0 16px', ...typography.h3 }}>
              Discussion Points for Your Doctor
            </h3>
            
            {[
              { title: 'Hormone Replacement Therapy', desc: 'Low-dose estrogen may help with sleep, mood, and cognitive symptoms.' },
              { title: 'Nutrition Optimization', desc: 'Certain foods and nutrients may support hormone balance naturally.' },
              { title: 'Activity Adjustments', desc: 'Specific exercise patterns can influence hormone levels and symptoms.' },
            ].map((option, i) => (
              <Card key={i} style={{ marginBottom: '12px' }}>
                <h4 style={{ margin: '0 0 6px', ...typography.h3, fontSize: '15px' }}>
                  {option.title}
                </h4>
                <p style={{ margin: 0, ...typography.bodySmall, lineHeight: 1.6 }}>
                  {option.desc}
                </p>
              </Card>
            ))}

            <p style={{ ...typography.caption, textAlign: 'center', margin: '20px 0' }}>
              Dr. Chen has been notified of these findings
            </p>
            <Button onClick={() => setScreen(SCREENS.APPOINTMENT)}>
              Prepare for Appointment
            </Button>
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
          
          <div style={{ padding: '24px' }}>
            {/* Current Status */}
            <Card style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon needsAttention={healthSystems[selectedHealthSystem].needsReview} />
                  <div>
                    <h3 style={{ margin: 0, ...typography.h3 }}>Current Status</h3>
                    {healthSystems[selectedHealthSystem].needsReview ? (
                      <p style={{ margin: '4px 0 0', ...typography.bodySmall, color: colors.primary }}>
                        {healthSystems[selectedHealthSystem].reviewReason}
                      </p>
                    ) : (
                      <p style={{ margin: '4px 0 0', ...typography.bodySmall }}>
                        No issues detected
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Lab Results */}
            {healthSystemDetails[selectedHealthSystem]?.labResults?.length > 0 && (
              <>
                <h3 style={{ margin: '24px 0 16px', ...typography.h3 }}>
                  Recent Lab Results
                </h3>
                {healthSystemDetails[selectedHealthSystem].labResults.map((lab, i) => (
                  <Card key={i} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px', ...typography.h3, fontSize: '15px' }}>
                          {lab.test}
                        </h4>
                        <p style={{ margin: 0, ...typography.caption }}>
                          {lab.date}
                        </p>
                      </div>
                      {lab.needsReview && <ActionBadge text="Review" />}
                    </div>
                    <p style={{ margin: '10px 0', fontSize: '22px', fontWeight: 600, color: colors.text.primary }}>
                      {lab.value}
                    </p>
                    
                    <div style={{ 
                      marginTop: '14px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px',
                      padding: '12px',
                      backgroundColor: colors.background,
                      borderRadius: '8px',
                    }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ ...typography.caption, minWidth: '90px' }}>
                          Population:
                        </span>
                        <span style={{ ...typography.bodySmall }}>
                          {lab.populationRange}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ ...typography.caption, minWidth: '90px' }}>
                          Your Normal:
                        </span>
                        <span style={{ ...typography.bodySmall, fontWeight: 600 }}>
                          {lab.yourBaseline}
                        </span>
                      </div>
                    </div>

                    {lab.needsReview && (
                      <div style={{ 
                        marginTop: '14px', 
                        padding: '14px', 
                        backgroundColor: colors.background,
                        borderRadius: '8px', 
                        borderLeft: `3px solid ${colors.primary}` 
                      }}>
                        <p style={{ margin: 0, ...typography.bodySmall, lineHeight: 1.6 }}>
                          <strong>What this means:</strong> {lab.interpretation}
                        </p>
                      </div>
                    )}
                  </Card>
                ))}
              </>
            )}

            {/* Insights - only if present */}
            {healthSystemDetails[selectedHealthSystem]?.insights && (
              <>
                <h3 style={{ margin: '28px 0 12px', ...typography.h3 }}>
                  Detected Patterns
                </h3>
                <p style={{ margin: '0 0 16px', ...typography.bodySmall }}>
                  AI-assisted analysis of your health data
                </p>

                {healthSystemDetails[selectedHealthSystem].insights.map((insight, i) => (
                  <Card key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                      <Icon needsAttention={true} />
                      <h4 style={{ margin: 0, ...typography.h3, fontSize: '15px', flex: 1 }}>
                        {insight.title}
                      </h4>
                    </div>

                    <div style={{ 
                      padding: '14px', 
                      backgroundColor: colors.background,
                      borderRadius: '8px', 
                      marginBottom: '12px',
                    }}>
                      <p style={{ margin: 0, ...typography.bodySmall, lineHeight: 1.6 }}>
                        {insight.description}
                      </p>
                    </div>

                    <div style={{ 
                      padding: '12px 14px', 
                      backgroundColor: colors.background,
                      borderRadius: '8px',
                      borderLeft: `3px solid ${colors.primary}`,
                    }}>
                      <p style={{ margin: 0, ...typography.bodySmall, lineHeight: 1.5 }}>
                        <strong>Recommendation:</strong> {insight.action}
                      </p>
                    </div>
                  </Card>
                ))}
              </>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button variant="primary">
                Message Dr. Chen
              </Button>
              <Button variant="outline">
                Schedule Visit
              </Button>
            </div>
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
              <span style={{ 
                fontSize: '12px', 
                fontWeight: screen === item.screen ? 600 : 500,
              }}>
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

      {/* ADD PADDING AT BOTTOM FOR NAV */}
      <div style={{ height: '80px' }}></div>

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
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '380px',
            width: '100%',
          }}>
            <h3 style={{ margin: '0 0 12px', ...typography.h2 }}>
              Cancel Appointment?
            </h3>
            <p style={{ margin: '0 0 20px', ...typography.body, lineHeight: 1.6 }}>
              Are you sure you want to cancel your appointment with Dr. Chen on {bookedAppointment ? bookedAppointment.date : upcomingAppointment.date}?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button 
                variant="ghost" 
                style={{ flex: 1 }}
                onClick={() => setShowCancelModal(false)}
              >
                Keep
              </Button>
              <Button 
                variant="primary"
                style={{ flex: 1, backgroundColor: colors.error }}
                onClick={() => {
                  setBookedAppointment(null);
                  setShowCancelModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

<span style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        backgroundColor: i === 0 ? colors.primary : colors.borderLight, 
                        color: i === 0 ? 'white' : colors.textSecondary, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '12px', 
                        fontWeight: '600' 
                      }}>{i + 1}</span>
                      <h4 style={{ margin: 0, fontSize: '15px', color: colors.text }}>{dx.name}</h4>
                    </div>
                    {dx.needsRuleOut && (
                      <span style={{ 
                        padding: '3px 8px', 
                        backgroundColor: `${colors.alert}15`, 
                        color: colors.alert, 
                        borderRadius: '4px', 
                        fontSize: '10px', 
                        fontWeight: '600' 
                      }}>RULE OUT</span>
                    )}
                  </div>
                  
                  <ConfidenceBar confidence={dx.confidence} color={dx.color} />
                  
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ 
                      margin: '0 0 6px', 
                      fontSize: '11px', 
                      color: colors.textSecondary, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.5px' 
                    }}>Supporting Criteria</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {dx.criteria.map((c, j) => (
                        <span key={j} style={{ 
                          padding: '4px 10px', 
                          backgroundColor: colors.borderLight, 
                          borderRadius: '12px', 
                          fontSize: '11px', 
                          color: colors.text 
                        }}>{c}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}

              <div style={{ padding: '20px', backgroundColor: `${colors.primary}08`, borderRadius: '12px', marginBottom: '16px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
                  <strong>Your doctor will see:</strong> The same ranked list, plus clinical decision-making criteria, screening protocols, and assessment questions to confirm or rule out each condition.
                </p>
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
                <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, lineHeight: '1.5' }}>
                  Based on: Age, symptom pattern, hormone levels, and ruling out other conditions
                </p>
              </Card>

              <Card style={{ marginBottom: '16px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: colors.text }}>Evidence Summary</h4>
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ margin: '0 0 6px', fontSize: '12px', color: colors.success, fontWeight: '600' }}>
                    ✓ Inclusion Criteria Met:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
                    <li>Irregular cycle patterns in last 6 months</li>
                    <li>Declining estrogen trend (within normal)</li>
                    <li>Vasomotor symptoms (night sweats)</li>
                    <li>Cognitive changes (brain fog)</li>
                  </ul>
                </div>
                <div>
                  <p style={{ margin: '0 0 6px', fontSize: '12px', color: colors.textSecondary, fontWeight: '600' }}>
                    − Exclusion Criteria:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: colors.textSecondary, lineHeight: '1.6' }}>
                    <li>Thyroid dysfunction (pending confirmation)</li>
                    <li>Primary ovarian insufficiency (age, FSH levels)</li>
                  </ul>
                </div>
              </Card>

              <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text }}>Treatment Plan</h3>
              <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textSecondary }}>
                Review each item. Toggle off any you want to discuss further.
              </p>

              {planItems.map((item) => (
                <Card key={item.id} style={{ marginBottom: '10px', padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <button
                      onClick={() => setPlanItems(planItems.map(p => 
                        p.id === item.id ? { ...p, approved: !p.approved } : p
                      ))}
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '6px', 
                        border: item.approved ? 'none' : `2px solid ${colors.border}`, 
                        backgroundColor: item.approved ? colors.success : 'white', 
                        color: 'white', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '14px', 
                        flexShrink: 0 
                      }}
                    >
                      {item.approved ? '✓' : ''}
                    </button>
                    <div>
                      <span style={{ 
                        display: 'inline-block', 
                        padding: '2px 8px', 
                        backgroundColor: colors.borderLight, 
                        borderRadius: '4px', 
                        fontSize: '10px', 
                        color: colors.textSecondary, 
                        marginBottom: '6px', 
                        textTransform: 'uppercase' 
                      }}>
                        {item.type}
                      </span>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '14px', 
                        color: item.approved ? colors.text : colors.textSecondary, 
                        textDecoration: item.approved ? 'none' : 'line-through' 
                      }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                <Button variant="outline" style={{ flex: 1 }} onClick={() => setScreen(SCREENS.DASHBOARD)}>
                  Save Draft
                </Button>
                <Button style={{ flex: 1 }} onClick={() => { 
                  alert('Plan confirmed! This would save to your record and send to Dr. Chen.'); 
                  setScreen(SCREENS.DASHBOARD); 
                }}>
                  Confirm Plan
                </Button>
              </div>

              <p style={{ margin: '16px 0 0', fontSize: '11px', color: colors.textSecondary, textAlign: 'center' }}>
                You can modify this plan at any time. Your preferences are documented.
              </p>
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
              <Card style={{ 
                marginBottom: '16px', 
                background: `linear-gradient(135deg, ${healthSystems[selectedHealthSystem].color}15 0%, ${healthSystems[selectedHealthSystem].color}05 100%)` 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: `${healthSystems[selectedHealthSystem].color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {renderIcon(healthSystems[selectedHealthSystem].icon, 32, healthSystems[selectedHealthSystem].color)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: colors.text }}>Current Status</h3>
                    <StatusBadge 
                      status={healthSystems[selectedHealthSystem].status} 
                      text={healthSystems[selectedHealthSystem].statusText} 
                    />
                  </div>
                  <ProgressRing 
                    progress={healthSystems[selectedHealthSystem].completion} 
                    color={healthSystems[selectedHealthSystem].color} 
                    size={52} 
                  />
                </div>
              </Card>

              {/* Recent Lab Results */}
              {healthSystemDetails[selectedHealthSystem].labResults.length > 0 && (
                <>
                  <h3 style={{ margin: '20px 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                    Recent Lab Results
                  </h3>
                  {healthSystemDetails[selectedHealthSystem].labResults.map((lab, i) => (
                    <Card key={i} style={{ marginBottom: '12px', padding: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h4 style={{ margin: '0 0 2px', fontSize: '14px', color: colors.text, fontWeight: '600' }}>
                            {lab.test}
                          </h4>
                          <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary }}>{lab.date}</p>
                        </div>
                        <StatusBadge 
                          status={lab.status} 
                          text={lab.status === 'good' ? 'In range' : 'Insight'} 
                        />
                      </div>
                      <p style={{ margin: '8px 0 0', fontSize: '18px', color: colors.text, fontWeight: '600' }}>
                        {lab.value}
                      </p>
                      
                      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <span style={{ fontSize: '11px', color: colors.textSecondary, minWidth: '80px' }}>
                            Population:
                          </span>
                          <span style={{ fontSize: '12px', color: colors.text }}>{lab.populationRange}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <span style={{ fontSize: '11px', color: colors.primary, fontWeight: '600', minWidth: '80px' }}>
                            Your Normal:
                          </span>
                          <span style={{ fontSize: '12px', color: colors.text, fontWeight: '500' }}>
                            {lab.yourBaseline}
                          </span>
                        </div>
                      </div>

                      <div style={{ 
                        marginTop: '10px', 
                        padding: '10px', 
                        backgroundColor: `${colors.primary}08`, 
                        borderRadius: '8px', 
                        borderLeft: `3px solid ${lab.status === 'good' ? colors.success : colors.primary}` 
                      }}>
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
                  <h3 style={{ margin: '20px 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                    Recent Visits
                  </h3>
                  {healthSystemDetails[selectedHealthSystem].recentVisits.map((visit, i) => (
                    <Card key={i} style={{ marginBottom: '10px', padding: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h4 style={{ margin: '0 0 2px', fontSize: '14px', color: colors.text, fontWeight: '600' }}>
                            {visit.type}
                          </h4>
                          <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary }}>
                            {visit.provider} • {visit.date}
                          </p>
                        </div>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.5' }}>
                        {visit.summary}
                      </p>
                    </Card>
                  ))}
                </>
              )}

              {/* Past Complaints */}
              {healthSystemDetails[selectedHealthSystem].complaints.length > 0 && (
                <>
                  <h3 style={{ margin: '20px 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                    History of Concerns
                  </h3>
                  {healthSystemDetails[selectedHealthSystem].complaints.map((complaint, i) => (
                    <Card key={i} style={{ marginBottom: '10px', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ color: colors.textSecondary, fontSize: '12px', minWidth: '80px' }}>
                          {complaint.date}
                        </span>
                        <p style={{ margin: 0, fontSize: '13px', color: colors.text }}>{complaint.issue}</p>
                      </div>
                    </Card>
                  ))}
                </>
              )}

              {/* AI-Powered Pattern Insights */}
              {healthSystemDetails[selectedHealthSystem].aiInsights && 
               healthSystemDetails[selectedHealthSystem].aiInsights.length > 0 && (
                <>
                  <h3 style={{ margin: '20px 0 8px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                    <span style={{ marginRight: '8px' }}>🔍</span>
                    Patterns We've Noticed
                  </h3>
                  <p style={{ margin: '0 0 16px', fontSize: '13px', color: colors.textSecondary }}>
                    AI-assisted analysis connecting your health data across visits and systems
                  </p>

                  {healthSystemDetails[selectedHealthSystem].aiInsights.map((insight, i) => (
                    <Card key={i} style={{ 
                      marginBottom: '16px', 
                      border: `2px solid ${insight.type === 'protective' ? colors.success : colors.primary}`,
                      background: `linear-gradient(135deg, ${insight.type === 'protective' ? colors.success : colors.primary}08 0%, ${insight.type === 'protective' ? colors.success : colors.primary}02 100%)`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '20px' }}>
                          {insight.type === 'pattern' ? '🔍' : insight.type === 'connection' ? '🔗' : '🛡️'}
                        </span>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 2px', fontSize: '14px', color: colors.text, fontWeight: '600' }}>
                            {insight.title}
                          </h4>
                          <span style={{ 
                            fontSize: '10px', 
                            color: insight.type === 'protective' ? colors.success : colors.primary,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: '600'
                          }}>
                            {insight.type === 'pattern' ? 'Pattern detected' : 
                             insight.type === 'connection' ? 'Cross-system connection' : 'Protective factor'}
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
              <h3 style={{ margin: '20px 0 8px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                Health Insights for You
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: colors.textSecondary }}>
                Based on your age and health profile, here are some conditions to be aware of and how you can stay healthy.
              </p>

              {healthSystemDetails[selectedHealthSystem].ageRelatedInsights.map((insight, i) => (
                <Card key={i} style={{ marginBottom: '16px', border: `1px solid ${colors.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                      {insight.title}
                    </h4>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '600',
                      backgroundColor: insight.likelihood.includes('High') ? `${colors.warning}15` : 
                                      insight.likelihood.includes('Moderate') ? `${colors.primary}15` : 
                                      `${colors.primary}15`,
                      color: insight.likelihood.includes('High') ? colors.warning : 
                             insight.likelihood.includes('Moderate') ? colors.primary : 
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
                    <p style={{ 
                      margin: '0 0 6px', 
                      fontSize: '12px', 
                      color: colors.success, 
                      fontWeight: '600', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.5px' 
                    }}>
                      ✓ How to reduce your risk
                    </p>
                    <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
                      {insight.prevention}
                    </p>
                  </div>

                  <div>
                    <p style={{ 
                      margin: '0 0 6px', 
                      fontSize: '12px', 
                      color: colors.primary, 
                      fontWeight: '600', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.5px' 
                    }}>
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
                <Button variant="outline" style={{ flex: 1 }} onClick={() => setScreen(SCREENS.MESSAGES)}>
                  📨 Message Dr. Chen
                </Button>
                <Button variant="accent" style={{ flex: 1 }} onClick={() => setScreen(SCREENS.SCHEDULE_VISIT)}>
                  📆 Schedule Visit
                </Button>
              </div>

              <p style={{ margin: '16px 0 0', fontSize: '11px', color: colors.textSecondary, textAlign: 'center' }}>
                Have questions about these insights? Your care team is here to help.
              </p>
            </div>
          </div>
        )}

        {/* SYMPTOM INTAKE SCREEN */}
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
                <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
                  <strong>How this works:</strong> Share your symptoms and health information. Our AI will analyze patterns across medical literature and clinical guidelines to suggest possible conditions and next steps. This is not a diagnosis—it's a tool to help you have more informed conversations with your doctor.
                </p>
              </Card>

              {/* Basic Demographics */}
              <Card style={{ marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                  Basic Information
                </h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', color: colors.textSecondary, marginBottom: '6px' }}>
                      Age
                    </label>
                    <input
                      type="number"
                      value={patientProfile.age}
                      onChange={(e) => setPatientProfile({...patientProfile, age: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '10px', 
                        border: `1px solid ${colors.border}`, 
                        borderRadius: '8px', 
                        fontSize: '14px', 
                        boxSizing: 'border-box' 
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', color: colors.textSecondary, marginBottom: '6px' }}>
                      Sex
                    </label>
                    <select
                      value={patientProfile.sex}
                      onChange={(e) => setPatientProfile({...patientProfile, sex: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '10px', 
                        border: `1px solid ${colors.border}`, 
                        borderRadius: '8px', 
                        fontSize: '14px', 
                        boxSizing: 'border-box' 
                      }}
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="transgender_female">Transgender Female</option>
                      <option value="transgender_male">Transgender Male</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Symptoms */}
              <Card style={{ marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                  Current Symptoms
                </h3>
                
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textSecondary, marginBottom: '6px' }}>
                    Primary Complaint
                  </label>
                  <input
                    type="text"
                    value={currentSymptom.description}
                    onChange={(e) => setCurrentSymptom({...currentSymptom, description: e.target.value})}
                    placeholder="e.g., Night sweats, Joint pain, Fatigue"
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      border: `1px solid ${colors.border}`, 
                      borderRadius: '8px', 
                      fontSize: '14px', 
                      boxSizing: 'border-box' 
                    }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textSecondary, marginBottom: '6px' }}>
                    When did you first notice this symptom?
                  </label>
                  <input
                    type="text"
                    value={currentSymptom.duration}
                    onChange={(e) => setCurrentSymptom({...currentSymptom, duration: e.target.value})}
                    placeholder="e.g., 3 months ago, last week"
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      border: `1px solid ${colors.border}`, 
                      borderRadius: '8px', 
                      fontSize: '14px', 
                      boxSizing: 'border-box' 
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: colors.textSecondary, marginBottom: '6px' }}>
                    Intensity
                  </label>
                  <select
                    value={currentSymptom.severity}
                    onChange={(e) => setCurrentSymptom({...currentSymptom, severity: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      border: `1px solid ${colors.border}`, 
                      borderRadius: '8px', 
                      fontSize: '14px', 
                      boxSizing: 'border-box' 
                    }}
                  >
                    {SEVERITY_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </Card>

              {/* Past Medical History */}
              <Card style={{ marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                  Past Medical History <span style={{ fontWeight: '400', color: colors.textSecondary }}>(Optional)</span>
                </h3>
                <input
                  type="text"
                  value={patientProfile.pmh}
                  onChange={(e) => setPatientProfile({...patientProfile, pmh: e.target.value})}
                  placeholder="e.g., Diabetes, Hypertension, Thyroid disease"
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: `1px solid ${colors.border}`, 
                    borderRadius: '8px', 
                    fontSize: '14px', 
                    boxSizing: 'border-box' 
                  }}
                />
              </Card>

              {/* Medications */}
              <Card style={{ marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                  Current Medications <span style={{ fontWeight: '400', color: colors.textSecondary }}>(Optional)</span>
                </h3>
                <input
                  type="text"
                  value={patientProfile.medications}
                  onChange={(e) => setPatientProfile({...patientProfile, medications: e.target.value})}
                  placeholder="e.g., Metformin, Lisinopril, Levothyroxine"
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: `1px solid ${colors.border}`, 
                    borderRadius: '8px', 
                    fontSize: '14px', 
                    boxSizing: 'border-box' 
                  }}
                />
              </Card>

              {/* Family History */}
              <Card style={{ marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                  Family History <span style={{ fontWeight: '400', color: colors.textSecondary }}>(Optional)</span>
                </h3>
                <input
                  type="text"
                  value={patientProfile.familyHistory}
                  onChange={(e) => setPatientProfile({...patientProfile, familyHistory: e.target.value})}
                  placeholder="e.g., Mother: breast cancer, Father: heart disease"
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: `1px solid ${colors.border}`, 
                    borderRadius: '8px', 
                    fontSize: '14px', 
                    boxSizing: 'border-box' 
                  }}
                />
              </Card>

              <Button 
                onClick={generateDifferentialDiagnosis}
                disabled={!currentSymptom.description || !currentSymptom.duration || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RotateCcw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Analyzing...
                  </>
                ) : (
                  '🔍 Get AI Health Insights'
                )}
              </Button>

              <p style={{ margin: '12px 0 0', fontSize: '11px', color: colors.textSecondary, textAlign: 'center' }}>
                This analysis is based on clinical guidelines and medical literature. Always consult a healthcare provider for medical advice.
              </p>
            </div>
          </div>
        )}

        {/* GENERATED DIAGNOSIS SCREEN */}
        {screen === SCREENS.GENERATE_DIAGNOSIS && generatedDiagnosis && (
          <div>
            <Header 
              title="Health Analysis"
              subtitle="AI-assisted insights based on your symptoms"
              showBack
              onBack={() => setScreen(SCREENS.SYMPTOM_INTAKE)}
            />
            
            <div style={{ padding: '20px' }}>
              <Card style={{ marginBottom: '16px', backgroundColor: `${colors.warning}10`, border: `1px solid ${colors.warning}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>⚠️</span>
                  <p style={{ margin: 0, fontSize: '12px', color: colors.text, lineHeight: '1.5' }}>
                    <strong>Important:</strong> This is not a medical diagnosis. These are possible conditions based on your symptoms. Share this with your doctor to have an informed conversation about next steps.
                  </p>
                </div>
              </Card>

              {/* Differential Diagnosis */}
              <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                Possible Conditions
              </h3>
              
              {generatedDiagnosis.differentialDiagnosis.map((dx, i) => (
                <Card key={i} style={{ marginBottom: '16px', border: `2px solid ${i === 0 ? colors.primary : colors.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ 
                        width: '28px', 
                        height: '28px', 
                        borderRadius: '50%', 
                        backgroundColor: i === 0 ? colors.primary : colors.borderLight, 
                        color: i === 0 ? 'white' : colors.textSecondary, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '13px', 
                        fontWeight: '600' 
                      }}>{i + 1}</span>
                      <h4 style={{ margin: 0, fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                        {dx.condition}
                      </h4>
                    </div>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      fontSize: '11px', 
                      fontWeight: '600', 
                      backgroundColor: dx.likelihood === 'high' ? `${colors.primary}15` : 
                                      dx.likelihood === 'moderate' ? `${colors.warning}15` : 
                                      `${colors.primary}15`, 
                      color: dx.likelihood === 'high' ? colors.primary : 
                             dx.likelihood === 'moderate' ? colors.warning : 
                             colors.primary 
                    }}>
                      {dx.likelihood.toUpperCase()}
                    </span>
                  </div>
                  
                  <ConfidenceBar 
                    confidence={dx.confidence} 
                    color={dx.likelihood === 'high' ? colors.primary : 
                           dx.likelihood === 'moderate' ? colors.warning : 
                           colors.primary} 
                  />
                  
                  <div style={{ 
                    marginTop: '12px', 
                    padding: '12px', 
                    backgroundColor: `${colors.primary}08`, 
                    borderRadius: '8px' 
                  }}>
                    <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
                      <strong>Why this fits:</strong> {dx.explanation}
                    </p>
                  </div>

                  <div style={{ marginTop: '12px' }}>
                    <p style={{ margin: '0 0 6px', fontSize: '12px', color: colors.textSecondary, fontWeight: '600' }}>
                      Supporting Criteria:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {dx.supportingCriteria.map((criterion, j) => (
                        <span key={j} style={{ 
                          padding: '4px 10px', 
                          backgroundColor: colors.borderLight, 
                          borderRadius: '12px', 
                          fontSize: '11px', 
                          color: colors.text 
                        }}>{criterion}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '12px' }}>
                    <p style={{ margin: '0 0 6px', fontSize: '12px', color: colors.success, fontWeight: '600' }}>
                      Recommended Tests:
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: colors.text, lineHeight: '1.6' }}>
                      {dx.recommendedTests.map((test, j) => (
                        <li key={j}>{test}</li>
                      ))}
                    </ul>
                  </div>

                  {dx.clinicalGuideline && (
                    <div style={{ 
                      marginTop: '12px', 
                      padding: '10px', 
                      backgroundColor: `${colors.primary}10`, 
                      borderRadius: '8px', 
                      borderLeft: `3px solid ${colors.primary}` 
                    }}>
                      <p style={{ margin: 0, fontSize: '11px', color: colors.text, lineHeight: '1.5' }}>
                        <strong>Clinical Reference:</strong> {dx.clinicalGuideline}
                      </p>
                    </div>
                  )}
                </Card>
              ))}

              {/* Rule Out Conditions */}
              {generatedDiagnosis.ruleOutConditions && generatedDiagnosis.ruleOutConditions.length > 0 && (
                <>
                  <h3 style={{ margin: '20px 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                    Conditions to Rule Out
                  </h3>
                  <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textSecondary }}>
                    These conditions should be evaluated to ensure they're not causing your symptoms
                  </p>
                  
                  {generatedDiagnosis.ruleOutConditions.map((condition, i) => (
                    <Card key={i} style={{ 
                      marginBottom: '12px', 
                      border: `2px solid ${condition.urgency === 'immediate' ? colors.alert : colors.warning}` 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h4 style={{ margin: 0, fontSize: '14px', color: colors.text, fontWeight: '600' }}>
                          {condition.condition}
                        </h4>
                        <span style={{ 
                          padding: '4px 8px', 
                          backgroundColor: condition.urgency === 'immediate' ? `${colors.alert}15` : `${colors.warning}15`, 
                          color: condition.urgency === 'immediate' ? colors.alert : colors.warning, 
                          borderRadius: '6px', 
                          fontSize: '10px', 
                          fontWeight: '600', 
                          textTransform: 'uppercase' 
                        }}>
                          {condition.urgency}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.5' }}>
                        {condition.reason}
                      </p>
                    </Card>
                  ))}
                </>
              )}

              {/* Cross-System Patterns */}
              {generatedDiagnosis.crossSystemPatterns && generatedDiagnosis.crossSystemPatterns.length > 0 && (
                <>
                  <h3 style={{ margin: '20px 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                    <span style={{ marginRight: '8px' }}>🔗</span>
                    Patterns Detected
                  </h3>
                  
                  {generatedDiagnosis.crossSystemPatterns.map((pattern, i) => (
                    <Card key={i} style={{ 
                      marginBottom: '12px', 
                      border: `2px solid ${colors.primary}`, 
                      background: `${colors.primary}05` 
                    }}>
                      <p style={{ margin: '0 0 8px', fontSize: '14px', color: colors.text, fontWeight: '600' }}>
                        {pattern.pattern}
                      </p>
                      <p style={{ margin: '0 0 10px', fontSize: '13px', color: colors.text, lineHeight: '1.5' }}>
                        {pattern.implications}
                      </p>
                      <div style={{ 
                        padding: '10px', 
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        borderLeft: `3px solid ${colors.primary}` 
                      }}>
                        <p style={{ margin: 0, fontSize: '12px', color: colors.text }}>
                          <strong>Recommendation:</strong> {pattern.action}
                        </p>
                      </div>
                    </Card>
                  ))}
                </>
              )}

              {/* Age-Related Screening */}
              {generatedDiagnosis.ageRelatedScreening && generatedDiagnosis.ageRelatedScreening.length > 0 && (
                <>
                  <h3 style={{ margin: '20px 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                    Recommended Screenings
                  </h3>
                  <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textSecondary }}>
                    Based on your age and sex
                  </p>
                  
                  {generatedDiagnosis.ageRelatedScreening.map((screening, i) => (
                    <Card key={i} style={{ marginBottom: '12px' }}>
                      <h4 style={{ margin: '0 0 6px', fontSize: '14px', color: colors.text, fontWeight: '600' }}>
                        {screening.screening}
                      </h4>
                      <p style={{ margin: '0 0 8px', fontSize: '13px', color: colors.text }}>
                        {screening.reason}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary }}>
                        <strong>Frequency:</strong> {screening.frequency}
                      </p>
                    </Card>
                  ))}
                </>
              )}

              {/* Action Buttons */}
              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button variant="primary" onClick={() => {
                  alert('In a production version, this would send these insights to your doctor with your permission.');
                }}>
                  📤 Share with My Doctor
                </Button>
                <Button variant="outline" onClick={() => setScreen(SCREENS.SYMPTOM_INTAKE)}>
                  ← Modify Symptoms
                </Button>
                <Button variant="ghost" onClick={() => {
                  setScreen(SCREENS.DASHBOARD);
                  setGeneratedDiagnosis(null);
                }}>
                  Back to Dashboard
                </Button>
              </div>

              <p style={{ margin: '16px 0 0', fontSize: '11px', color: colors.textSecondary, textAlign: 'center' }}>
                Analysis generated by AI based on current medical literature and clinical guidelines. Always consult a licensed healthcare provider for diagnosis and treatment.
              </p>
            </div>
          </div>
        )}

        {/* SCHEDULE VISIT SCREEN */}
        {screen === SCREENS.SCHEDULE_VISIT && (
          <div>
            <Header 
              title="Schedule Visit"
              subtitle="Book appointment with Dr. Chen"
              showBack
              onBack={() => setScreen(SCREENS.DASHBOARD)}
            />
            
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                Next Available Appointments
              </h3>
              
              {/* Dec 9 - Soonest */}
              <Card style={{ 
                marginBottom: '16px', 
                border: bookedAppointment?.id === 'dec9' ? `2px solid ${colors.success}` : `2px solid ${colors.primary}`,
                backgroundColor: bookedAppointment?.id === 'dec9' ? `${colors.success}08` : 'white',
                opacity: bookedAppointment && bookedAppointment.id !== 'dec9' ? 0.5 : 1
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '600', color: colors.text }}>
                      Monday, December 9
                    </p>
                    <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>2:30 PM - 3:00 PM</p>
                  </div>
                  {bookedAppointment?.id === 'dec9' ? (
                    <StatusBadge status="good" text="Booked" />
                  ) : (
                    <StatusBadge status="insight" text="Soonest" />
                  )}
                </div>
                <p style={{ margin: '12px 0', fontSize: '13px', color: colors.text }}>In-Person Visit</p>
                <p style={{ margin: '0 0 12px', fontSize: '12px', color: colors.textSecondary }}>
                  450 Serra Mall, Stanford, CA 94305
                </p>
                {bookedAppointment?.id === 'dec9' ? (
                  <p style={{ margin: 0, fontSize: '13px', color: colors.success, fontWeight: '600' }}>
                    ✓ This is your scheduled appointment
                  </p>
                ) : (
                  <Button 
                    variant="accent" 
                    style={{ width: '100%' }}
                    disabled={bookedAppointment !== null}
                    onClick={() => {
                      setPendingBooking({
                        id: 'dec9',
                        date: 'Dec 9, 2025',
                        time: '2:30 PM',
                        provider: 'Dr. Sarah Chen',
                        type: 'In-Person Visit',
                        location: '450 Serra Mall, Stanford, CA'
                      });
                      setShowBookingModal(true);
                    }}
                  >
                    {bookedAppointment ? 'Already Booked' : 'Book This Appointment'}
                  </Button>
                )}
              </Card>

              {/* Dec 10 - Telehealth */}
              <Card style={{ 
                marginBottom: '16px',
                border: bookedAppointment?.id === 'dec10' ? `2px solid ${colors.success}` : `1px solid ${colors.border}`,
                backgroundColor: bookedAppointment?.id === 'dec10' ? `${colors.success}08` : 'white',
                opacity: bookedAppointment && bookedAppointment.id !== 'dec10' ? 0.5 : 1
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '600', color: colors.text }}>
                      Tuesday, December 10
                    </p>
                    <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>9:00 AM - 9:30 AM</p>
                  </div>
                  {bookedAppointment?.id === 'dec10' && (
                    <StatusBadge status="good" text="Booked" />
                  )}
                </div>
                <p style={{ margin: '12px 0', fontSize: '13px', color: colors.text }}>Telehealth Visit</p>
                <p style={{ margin: '0 0 12px', fontSize: '12px', color: colors.textSecondary }}>
                  Video call via secure patient portal
                </p>
                {bookedAppointment?.id === 'dec10' ? (
                  <p style={{ margin: 0, fontSize: '13px', color: colors.success, fontWeight: '600' }}>
                    ✓ This is your scheduled appointment
                  </p>
                ) : (
                  <Button 
                    variant="outline" 
                    style={{ width: '100%' }}
                    disabled={bookedAppointment !== null}
                    onClick={() => {
                      setPendingBooking({
                        id: 'dec10',
                        date: 'Dec 10, 2025',
                        time: '9:00 AM',
                        provider: 'Dr. Sarah Chen',
                        type: 'Telehealth Visit',
                        location: 'Video call'
                      });
                      setShowBookingModal(true);
                    }}
                  >
                    {bookedAppointment ? 'Already Booked' : 'Book This Appointment'}
                  </Button>
                )}
              </Card>

              {/* Dec 11 - In-Person */}
              <Card style={{ 
                marginBottom: '16px',
                border: bookedAppointment?.id === 'dec11' ? `2px solid ${colors.success}` : `1px solid ${colors.border}`,
                backgroundColor: bookedAppointment?.id === 'dec11' ? `${colors.success}08` : 'white',
                opacity: bookedAppointment && bookedAppointment.id !== 'dec11' ? 0.5 : 1
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '600', color: colors.text }}>
                      Wednesday, December 11
                    </p>
                    <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>4:00 PM - 4:30 PM</p>
                  </div>
                  {bookedAppointment?.id === 'dec11' && (
                    <StatusBadge status="good" text="Booked" />
                  )}
                </div>
                <p style={{ margin: '12px 0', fontSize: '13px', color: colors.text }}>In-Person Visit</p>
                <p style={{ margin: '0 0 12px', fontSize: '12px', color: colors.textSecondary }}>
                  450 Serra Mall, Stanford, CA 94305
                </p>
                {bookedAppointment?.id === 'dec11' ? (
                  <p style={{ margin: 0, fontSize: '13px', color: colors.success, fontWeight: '600' }}>
                    ✓ This is your scheduled appointment
                  </p>
                ) : (
                  <Button 
                    variant="outline" 
                    style={{ width: '100%' }}
                    disabled={bookedAppointment !== null}
                    onClick={() => {
                      setPendingBooking({
                        id: 'dec11',
                        date: 'Dec 11, 2025',
                        time: '4:00 PM',
                        provider: 'Dr. Sarah Chen',
                        type: 'In-Person Visit',
                        location: '450 Serra Mall, Stanford, CA'
                      });
                      setShowBookingModal(true);
                    }}
                  >
                    {bookedAppointment ? 'Already Booked' : 'Book This Appointment'}
                  </Button>
                )}
              </Card>

              {/* Date Picker Option */}
              <Card style={{ marginBottom: '16px', backgroundColor: `${colors.primary}08` }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '600', color: colors.text }}>
                  Don't see a time that works?
                </h4>
                <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.text }}>
                  Select a preferred date and we'll find available times
                </p>
                <input
                  type="date"
                  min="2025-12-06"
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: `1px solid ${colors.border}`, 
                    borderRadius: '8px', 
                    fontSize: '14px', 
                    boxSizing: 'border-box',
                    marginBottom: '12px'
                  }}
                />
                <Button 
                  variant="outline" 
                  style={{ width: '100%' }} 
                  onClick={() => alert('In a production version, this would show available times for your selected date.')}
                >
                  Search This Date
                </Button>
              </Card>

              {/* Urgent Care Info */}
              <Card style={{ backgroundColor: `${colors.warning}10`, border: `1px solid ${colors.warning}` }}>
                <p style={{ margin: 0, fontSize: '12px', color: colors.text, lineHeight: '1.6' }}>
                  <strong>Need urgent care?</strong> For urgent medical concerns, call our clinic at (650) 123-4567 or visit the nearest emergency department.
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* MESSAGES SCREEN */}
        {screen === SCREENS.MESSAGES && (
          <div>
            <Header 
              title="Messages"
              subtitle="Secure communication with your care team"
              showBack
              onBack={() => setScreen(SCREENS.DASHBOARD)}
            />
            
            <div style={{ padding: '20px' }}>
              <Card style={{ marginBottom: '16px', backgroundColor: `${colors.success}08`, border: `1px solid ${colors.success}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Lock size={16} />
                  <p style={{ margin: 0, fontSize: '12px', color: colors.text, lineHeight: '1.5' }}>
                    <strong>End-to-end encrypted</strong> - Your messages are private and secure. Only you and your care team can read them.
                  </p>
                </div>
              </Card>

              <h3 style={{ margin: '0 0 16px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>
                Recent Conversations
              </h3>

              <Card style={{ marginBottom: '12px', cursor: 'pointer' }} onClick={() => alert('Message thread would open here')}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: colors.primary, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'white', 
                    fontWeight: '600', 
                    fontSize: '16px' 
                  }}>
                    SC
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>
                        Dr. Sarah Chen
                      </p>
                      <p style={{ margin: 0, fontSize: '11px', color: colors.textSecondary }}>2 hours ago</p>
                    </div>
                    <p style={{ margin: '0 0 6px', fontSize: '13px', color: colors.text }}>
                      Lab results look good. Let's discuss at your next...
                    </p>
                    <div style={{ display: 'inline-block' }}>
                      <StatusBadge status="attention" text="1 New" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card style={{ marginBottom: '12px', cursor: 'pointer' }} onClick={() => alert('Message thread would open here')}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: colors.primaryLight, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'white', 
                    fontWeight: '600', 
                    fontSize: '16px' 
                  }}>
                    AR
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>
                        Alex Rivera, PT
                      </p>
                      <p style={{ margin: 0, fontSize: '11px', color: colors.textSecondary }}>Yesterday</p>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>
                      Here are your home exercise instructions...
                    </p>
                  </div>
                </div>
              </Card>

              <Card style={{ marginBottom: '16px', cursor: 'pointer' }} onClick={() => alert('Message thread would open here')}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: colors.borderLight, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: colors.textSecondary, 
                    fontWeight: '600', 
                    fontSize: '16px' 
                  }}>
                    CS
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>
                        Care Scheduler
                      </p>
                      <p style={{ margin: 0, fontSize: '11px', color: colors.textSecondary }}>Dec 1</p>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>
                      Appointment confirmed for Dec 3 at 10:30 AM
                    </p>
                  </div>
                </div>
              </Card>

              <Button variant="accent" style={{ width: '100%' }}>
                ✉️ New Message
              </Button>
            </div>
          </div>
        )}

        {/* CANCEL APPOINTMENT MODAL */}
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
              <h3 style={{ margin: '0 0 12px', fontSize: '18px', color: colors.text, fontWeight: '600' }}>
                Cancel Appointment?
              </h3>
              <p style={{ margin: '0 0 20px', fontSize: '14px', color: colors.textSecondary, lineHeight: '1.5' }}>
                Are you sure you want to cancel your appointment with Dr. Chen on{' '}
                {bookedAppointment ? bookedAppointment.date : upcomingAppointment.date} at{' '}
                {bookedAppointment ? bookedAppointment.time : upcomingAppointment.time}?
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
                  style={{ flex: 1, backgroundColor: colors.alert, border: 'none' }}
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

        {/* BOOKING CONFIRMATION MODAL */}
        {showBookingModal && pendingBooking && (
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
              <h3 style={{ margin: '0 0 16px', fontSize: '18px', color: colors.text, fontWeight: '600' }}>
                Confirm Appointment
              </h3>
              
              <Card style={{ marginBottom: '20px', backgroundColor: `${colors.primary}08` }}>
                <p style={{ margin: '0 0 8px', fontSize: '13px', color: colors.textSecondary, fontWeight: '500' }}>
                  {pendingBooking.type}
                </p>
                <p style={{ margin: '0 0 4px', fontSize: '16px', color: colors.text, fontWeight: '600' }}>
                  {pendingBooking.date}
                </p>
                <p style={{ margin: '0 0 4px', fontSize: '14px', color: colors.text }}>
                  {pendingBooking.time}
                </p>
                <p style={{ margin: '0 0 8px', fontSize: '13px', color: colors.textSecondary }}>
                  {pendingBooking.provider}
                </p>
                <p style={{ margin: 0, fontSize: '13px', color: colors.text }}>
                  {pendingBooking.location}
                </p>
              </Card>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button 
                  variant="accent"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setBookedAppointment(pendingBooking);
                    setShowBookingModal(false);
                    setPendingBooking(null);
                    setScreen(SCREENS.DASHBOARD);
                  }}
                >
                  Confirm Booking
                </Button>
                <Button 
                  variant="outline" 
                  style={{ width: '100%' }}
                  onClick={() => {
                    setShowBookingModal(false);
                    setPendingBooking(null);
                  }}
                >
                  Choose Another Date
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '420px',
          width: '100%',
          backgroundColor: 'white',
          borderTop: `1px solid ${colors.border}`,
          padding: '8px 0',
          display: 'flex',
          justifyContent: 'space-around',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
        }}>
          <button
            onClick={() => setScreen(SCREENS.DASHBOARD)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 16px',
              cursor: 'pointer',
              color: screen === SCREENS.DASHBOARD ? colors.primary : colors.textSecondary
            }}
          >
            <Home size={22} strokeWidth={screen === SCREENS.DASHBOARD ? 2.5 : 2} />
            <span style={{ fontSize: '11px', fontWeight: screen === SCREENS.DASHBOARD ? '600' : '400' }}>Home</span>
          </button>

          <button
            onClick={() => setScreen(SCREENS.SCHEDULE_VISIT)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 16px',
              cursor: 'pointer',
              color: screen === SCREENS.SCHEDULE_VISIT ? colors.primary : colors.textSecondary
            }}
          >
            <Calendar size={22} strokeWidth={screen === SCREENS.SCHEDULE_VISIT ? 2.5 : 2} />
            <span style={{ fontSize: '11px', fontWeight: screen === SCREENS.SCHEDULE_VISIT ? '600' : '400' }}>Schedule</span>
          </button>

          <button
            onClick={() => setScreen(SCREENS.SYMPTOM_INTAKE)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 16px',
              cursor: 'pointer',
              color: screen === SCREENS.SYMPTOM_INTAKE ? colors.primary : colors.textSecondary
            }}
          >
            <FileText size={22} strokeWidth={screen === SCREENS.SYMPTOM_INTAKE ? 2.5 : 2} />
            <span style={{ fontSize: '11px', fontWeight: screen === SCREENS.SYMPTOM_INTAKE ? '600' : '400' }}>Symptoms</span>
          </button>

          <button
            onClick={() => setScreen(SCREENS.MESSAGES)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 16px',
              cursor: 'pointer',
              color: screen === SCREENS.MESSAGES ? colors.primary : colors.textSecondary,
              position: 'relative'
            }}
          >
            <MessageSquare size={22} strokeWidth={screen === SCREENS.MESSAGES ? 2.5 : 2} />
            <span style={{ fontSize: '11px', fontWeight: screen === SCREENS.MESSAGES ? '600' : '400' }}>Messages</span>
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '10px',
              width: '8px',
              height: '8px',
              backgroundColor: colors.alert,
              borderRadius: '50%'
            }}></span>
          </button>
        </div>

        {/* ADD PADDING AT BOTTOM FOR NAV */}
        <div style={{ height: '80px' }}></div>

        {/* CSS for spin animation */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
                }
