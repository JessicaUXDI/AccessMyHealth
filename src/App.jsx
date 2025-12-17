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
