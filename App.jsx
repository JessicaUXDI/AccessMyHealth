import React, { useState } from 'react';

// Design System
const colors = {
  // Primary palette - calming, medical, trustworthy
  primary: '#4A7C7E',
  primaryLight: '#6B9B9D',
  primaryDark: '#3A6365',
  
  // Accent - warm, action-oriented
  accent: '#D4896A',
  accentLight: '#E9A88A',
  
  // Semantic colors
  success: '#5B9A6F',
  warning: '#D4A84A',
  alert: '#C75D5D',
  
  // Neutrals
  surface: '#FAFBFC',
  card: '#FFFFFF',
  text: '#2D3142',
  textMuted: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  divider: '#F3F4F6',
};

// Health System Icons & Data
const healthSystems = {
  hormones: { 
    icon: '🌸', 
    name: 'Hormones & Cycles', 
    status: 'insight',
    statusText: 'New insight available',
    completion: 75,
    color: colors.accent
  },
  mindbody: { 
    icon: '🧠', 
    name: 'Mind & Mood', 
    status: 'good',
    statusText: 'Stable',
    completion: 85,
    color: colors.primary
  },
  cardiovascular: { 
    icon: '❤️', 
    name: 'Heart Health', 
    status: 'good',
    statusText: 'On track',
    completion: 90,
    color: colors.success
  },
  musculoskeletal: { 
    icon: '🦴', 
    name: 'Bones & Joints', 
    status: 'attention',
    statusText: 'Check-in needed',
    completion: 60,
    color: colors.warning
  },
  digestion: { 
    icon: '🌿', 
    name: 'Digestion', 
    status: 'good',
    statusText: 'Normal',
    completion: 88,
    color: colors.success
  },
  activity: { 
    icon: '⚡', 
    name: 'Activity & Rest', 
    status: 'good',
    statusText: 'Meeting goals',
    completion: 72,
    color: colors.primary
  },
};

// Sample hormone data
const hormoneData = [
  { month: 'Jun', estrogen: 145, progesterone: 12 },
  { month: 'Jul', estrogen: 138, progesterone: 10 },
  { month: 'Aug', estrogen: 125, progesterone: 8 },
  { month: 'Sep', estrogen: 118, progesterone: 7 },
  { month: 'Oct', estrogen: 108, progesterone: 6 },
  { month: 'Nov', estrogen: 95, progesterone: 5 },
];

// Differential diagnosis data
const differentialDiagnosis = [
  { 
    name: 'Perimenopause', 
    confidence: 87, 
    criteria: ['Age 40-55', 'Cycle changes', 'Estrogen decline pattern', 'Symptom cluster match'],
    color: colors.primary
  },
  { 
    name: 'Thyroid Dysfunction', 
    confidence: 42, 
    criteria: ['Fatigue', 'Mood changes', 'Weight changes'],
    needsRuleOut: true,
    color: colors.warning
  },
  { 
    name: 'Vitamin D Deficiency', 
    confidence: 35, 
    criteria: ['Fatigue', 'Mood changes', 'Joint discomfort'],
    color: colors.textMuted
  },
  { 
    name: 'Iron Deficiency Anemia', 
    confidence: 28, 
    criteria: ['Fatigue', 'Brain fog'],
    color: colors.textMuted
  },
  { 
    name: 'Primary Ovarian Insufficiency', 
    confidence: 15, 
    criteria: ['Hormone pattern'],
    needsRuleOut: true,
    color: colors.alert
  },
];

// Screens
const SCREENS = {
  DASHBOARD: 'dashboard',
  INSIGHT: 'insight',
  APPOINTMENT: 'appointment',
  ADD_CONCERNS: 'add_concerns',
  DIAGNOSIS_PREVIEW: 'diagnosis_preview',
  PLAN_OF_CARE: 'plan_of_care'
};

export default function PeriHealthApp() {
  const [screen, setScreen] = useState(SCREENS.DASHBOARD);
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

  // Status badge component
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

  // Progress ring component
  const ProgressRing = ({ progress, color, size = 44 }) => {
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;
    
    return (
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          fill="none"
          stroke={colors.divider}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <text
          x={size/2}
          y={size/2}
          textAnchor="middle"
          dy="4px"
          style={{ 
            transform: 'rotate(90deg)', 
            transformOrigin: 'center',
            fontSize: '11px',
            fontWeight: '600',
            fill: colors.text
          }}
        >
          {progress}%
        </text>
      </svg>
    );
  };

  // Simple line chart for hormones
  const HormoneChart = () => {
    const width = 320;
    const height = 160;
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
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
      return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    };
    
    return (
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {[0, 0.5, 1].map((ratio, i) => (
          <line
            key={i}
            x1={padding.left}
            y1={padding.top + ratio * chartHeight}
            x2={width - padding.right}
            y2={padding.top + ratio * chartHeight}
            stroke={colors.divider}
            strokeDasharray="4,4"
          />
        ))}
        
        {/* Estrogen line */}
        <path
          d={pathFromPoints(estrogenPoints)}
          fill="none"
          stroke={colors.accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Progesterone line */}
        <path
          d={pathFromPoints(progesteronePoints)}
          fill="none"
          stroke={colors.primary}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {estrogenPoints.map((p, i) => (
          <circle key={`e-${i}`} cx={p.x} cy={p.y} r="4" fill={colors.accent} />
        ))}
        {progesteronePoints.map((p, i) => (
          <circle key={`p-${i}`} cx={p.x} cy={p.y} r="4" fill={colors.primary} />
        ))}
        
        {/* X-axis labels */}
        {hormoneData.map((d, i) => (
          <text
            key={i}
            x={padding.left + (i / (hormoneData.length - 1)) * chartWidth}
            y={height - 8}
            textAnchor="middle"
            style={{ fontSize: '10px', fill: colors.textMuted }}
          >
            {d.month}
          </text>
        ))}
        
        {/* Legend */}
        <circle cx={padding.left} cy={8} r="4" fill={colors.accent} />
        <text x={padding.left + 10} y={12} style={{ fontSize: '10px', fill: colors.text }}>Estrogen</text>
        <circle cx={padding.left + 80} cy={8} r="4" fill={colors.primary} />
        <text x={padding.left + 90} y={12} style={{ fontSize: '10px', fill: colors.text }}>Progesterone</text>
      </svg>
    );
  };

  // Confidence bar component
  const ConfidenceBar = ({ confidence, color }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        flex: 1,
        height: '8px',
        backgroundColor: colors.divider,
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${confidence}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: '4px',
          transition: 'width 0.5s ease'
        }} />
      </div>
      <span style={{ 
        fontSize: '13px', 
        fontWeight: '600', 
        color: color,
        minWidth: '40px'
      }}>{confidence}%</span>
    </div>
  );

  // Header component
  const Header = ({ title, subtitle, showBack, onBack }) => (
    <div style={{
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      padding: showBack ? '16px 20px 20px' : '24px 20px 28px',
      color: 'white'
    }}>
      {showBack && (
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '14px',
            cursor: 'pointer',
            padding: '0 0 12px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.9
          }}
        >
          ← Back
        </button>
      )}
      <h1 style={{ margin: 0, fontSize: showBack ? '20px' : '24px', fontWeight: '600' }}>{title}</h1>
      {subtitle && <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.85 }}>{subtitle}</p>}
    </div>
  );

  // Card component
  const Card = ({ children, style = {}, onClick }) => (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors.card,
        borderRadius: '16px',
        border: `1px solid ${colors.border}`,
        padding: '16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s ease',
        ...style
      }}
    >
      {children}
    </div>
  );

  // Button component
  const Button = ({ children, variant = 'primary', onClick, style = {}, disabled }) => {
    const variants = {
      primary: { bg: colors.primary, color: 'white' },
      accent: { bg: colors.accent, color: 'white' },
      outline: { bg: 'transparent', color: colors.primary, border: `2px solid ${colors.primary}` },
      ghost: { bg: colors.divider, color: colors.text }
    };
    const v = variants[variant];
    
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '14px 20px',
          backgroundColor: disabled ? colors.divider : v.bg,
          color: disabled ? colors.textMuted : v.color,
          border: v.border || 'none',
          borderRadius: '12px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...style
        }}
      >
        {children}
      </button>
    );
  };

  // ============ SCREENS ============

  // DASHBOARD SCREEN
  const DashboardScreen = () => (
    <div>
      <Header 
        title={`Good morning, Jessica`}
        subtitle="Your wellbeing at a glance"
      />
      
      <div style={{ padding: '20px' }}>
        {/* Overall Status */}
        <Card style={{ marginBottom: '16px', background: `linear-gradient(135deg, ${colors.success}10 0%, ${colors.primary}10 100%)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: `${colors.success}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>✨</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: colors.text }}>Overall: Good Health</h3>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>1 new insight to optimize your wellbeing</p>
            </div>
          </div>
        </Card>

        {/* Upcoming Appointment - PROMINENT */}
        <Card 
          onClick={() => setScreen(SCREENS.APPOINTMENT)}
          style={{ 
            marginBottom: '20px', 
            border: `2px solid ${colors.accent}`,
            background: `${colors.accent}08`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: '12px', color: colors.accent, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Upcoming Appointment
              </p>
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
          
          <div style={{
            backgroundColor: upcomingAppointment.prepared ? `${colors.success}15` : `${colors.warning}15`,
            padding: '10px 14px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ 
              fontSize: '13px', 
              color: upcomingAppointment.prepared ? colors.success : colors.warning,
              fontWeight: '500'
            }}>
              {upcomingAppointment.prepared ? '✓ Visit prepared' : '⚡ Tap to prepare for your visit'}
            </span>
            <span style={{ color: colors.accent }}>→</span>
          </div>
        </Card>

        {/* New Insight Banner */}
        <Card 
          onClick={() => setScreen(SCREENS.INSIGHT)}
          style={{ marginBottom: '20px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: `${colors.accent}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>💡</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px', fontSize: '15px', color: colors.text }}>New Insight: Hormone Trends</h4>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>Changes detected in your estrogen and progesterone</p>
            </div>
            <span style={{ color: colors.accent, fontSize: '18px' }}>→</span>
          </div>
        </Card>

        {/* Health Systems Grid */}
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>Your Health Systems</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {Object.entries(healthSystems).map(([key, system]) => (
            <Card key={key} style={{ padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>{system.icon}</span>
                <ProgressRing progress={system.completion} color={system.color} size={38} />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '13px', color: colors.text, fontWeight: '600' }}>{system.name}</h4>
              <StatusBadge status={system.status} text={system.statusText} />
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
          <Button variant="outline" style={{ flex: 1 }}>
            📨 Message Doctor
          </Button>
          <Button variant="ghost" style={{ flex: 1 }}>
            📆 Schedule Visit
          </Button>
        </div>
      </div>
    </div>
  );

  // INSIGHT SCREEN
  const InsightScreen = () => (
    <div>
      <Header 
        title="Hormone Insight"
        subtitle="Based on your recent lab results"
        showBack
        onBack={() => setScreen(SCREENS.DASHBOARD)}
      />
      
      <div style={{ padding: '20px' }}>
        {/* Trend Visualization */}
        <Card style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', color: colors.text }}>6-Month Hormone Trend</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: colors.textMuted }}>Both values within normal limits, but declining</p>
          
          <HormoneChart />
          
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            backgroundColor: `${colors.warning}10`, 
            borderRadius: '8px',
            borderLeft: `3px solid ${colors.warning}`
          }}>
            <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.5' }}>
              <strong>What this means:</strong> Your hormone levels are still within normal range, but the declining pattern over 6 months may explain some of your recent symptoms.
            </p>
          </div>
        </Card>

        {/* Recommendations */}
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text, fontWeight: '600' }}>Options to Discuss with Your Doctor</h3>
        
        <Card style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>💊</span>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: colors.text }}>Hormone Replacement Therapy</h4>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted, lineHeight: '1.5' }}>
                Low-dose estrogen may help with sleep, mood, and cognitive symptoms. Options include patches, pills, or gels.
              </p>
            </div>
          </div>
        </Card>

        <Card style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>🥗</span>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: colors.text }}>Nutrition Optimization</h4>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted, lineHeight: '1.5' }}>
                Phytoestrogen-rich foods and specific nutrients may support hormone balance naturally.
              </p>
            </div>
          </div>
        </Card>

        <Card style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>🏃‍♀️</span>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: colors.text }}>Activity Adjustments</h4>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted, lineHeight: '1.5' }}>
                Strength training and specific exercise patterns can influence hormone levels and symptom management.
              </p>
            </div>
          </div>
        </Card>

        <p style={{ fontSize: '12px', color: colors.textMuted, textAlign: 'center', marginBottom: '16px' }}>
          A note has been sent to Dr. Chen about these findings
        </p>

        <Button onClick={() => setScreen(SCREENS.APPOINTMENT)}>
          Prepare for Your Appointment →
        </Button>
      </div>
    </div>
  );

  // APPOINTMENT SCREEN
  const AppointmentScreen = () => (
    <div>
      <Header 
        title="Appointment Prep"
        subtitle={`${upcomingAppointment.type} • ${upcomingAppointment.date}`}
        showBack
        onBack={() => setScreen(SCREENS.DASHBOARD)}
      />
      
      <div style={{ padding: '20px' }}>
        {/* Provider Card */}
        <Card style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: colors.primaryLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: '600'
            }}>SC</div>
            <div>
              <h3 style={{ margin: '0 0 2px', fontSize: '16px', color: colors.text }}>{upcomingAppointment.provider}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>OB-GYN, Menopause Specialist</p>
            </div>
          </div>
        </Card>

        {/* What to Expect */}
        <Card style={{ marginBottom: '16px', backgroundColor: `${colors.primary}08` }}>
          <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: colors.primary }}>What to Expect</h4>
          <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
            Dr. Chen will review your hormone panel results, discuss the patterns we've identified, and work with you to create a personalized care plan. <strong>This is a partnership—your input matters.</strong>
          </p>
        </Card>

        {/* Concerns Added */}
        {userConcerns.length > 0 && (
          <Card style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', color: colors.text }}>Your Symptoms & Concerns</h4>
              <span style={{ fontSize: '12px', color: colors.textMuted }}>{userConcerns.length} added</span>
            </div>
            {userConcerns.map((concern, i) => (
              <div key={i} style={{
                padding: '10px 12px',
                backgroundColor: colors.divider,
                borderRadius: '8px',
                marginBottom: '8px',
                fontSize: '13px',
                color: colors.text
              }}>
                {concern}
              </div>
            ))}
          </Card>
        )}

        {/* Questions Added */}
        {userQuestions.length > 0 && (
          <Card style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', color: colors.text }}>Your Questions</h4>
              <span style={{ fontSize: '12px', color: colors.textMuted }}>{userQuestions.length} added</span>
            </div>
            {userQuestions.map((q, i) => (
              <div key={i} style={{
                padding: '10px 12px',
                backgroundColor: colors.divider,
                borderRadius: '8px',
                marginBottom: '8px',
                fontSize: '13px',
                color: colors.text
              }}>
                {q}
              </div>
            ))}
          </Card>
        )}

        {/* Add Info CTA */}
        <Button 
          variant="accent" 
          onClick={() => setScreen(SCREENS.ADD_CONCERNS)}
          style={{ marginBottom: '12px' }}
        >
          + Add Symptoms, Concerns & Questions
        </Button>

        {(userConcerns.length > 0 || userQuestions.length > 0) && (
          <Button 
            variant="primary" 
            onClick={() => setScreen(SCREENS.DIAGNOSIS_PREVIEW)}
          >
            See Potential Diagnoses →
          </Button>
        )}
      </div>
    </div>
  );

  // ADD CONCERNS SCREEN
  const AddConcernsScreen = () => (
    <div>
      <Header 
        title="Share Your Concerns"
        subtitle="Help your doctor understand what you're experiencing"
        showBack
        onBack={() => setScreen(SCREENS.APPOINTMENT)}
      />
      
      <div style={{ padding: '20px' }}>
        {/* Symptoms Section */}
        <Card style={{ marginBottom: '16px' }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text }}>Symptoms & Concerns</h4>
          <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textMuted }}>
            What have you been experiencing? Be specific about when symptoms occur and how they affect your daily life.
          </p>
          
          <textarea
            value={newConcern}
            onChange={(e) => setNewConcern(e.target.value)}
            placeholder="e.g., Waking up at 3am most nights, can't fall back asleep. Brain fog is affecting my work..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              border: `1px solid ${colors.border}`,
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
          
          <button
            onClick={() => {
              if (newConcern.trim()) {
                setUserConcerns([...userConcerns, newConcern.trim()]);
                setNewConcern('');
              }
            }}
            disabled={!newConcern.trim()}
            style={{
              marginTop: '10px',
              padding: '10px 16px',
              backgroundColor: newConcern.trim() ? colors.accent : colors.divider,
              color: newConcern.trim() ? 'white' : colors.textMuted,
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: newConcern.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            + Add Concern
          </button>
          
          {userConcerns.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              {userConcerns.map((c, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  padding: '10px',
                  backgroundColor: colors.divider,
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: colors.success }}>✓</span>
                  <span style={{ flex: 1, fontSize: '13px', color: colors.text }}>{c}</span>
                  <button
                    onClick={() => setUserConcerns(userConcerns.filter((_, idx) => idx !== i))}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: colors.textMuted,
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >×</button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Questions Section */}
        <Card style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text }}>Questions for Your Doctor</h4>
          <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textMuted }}>
            What do you want to understand better? What options do you want to explore?
          </p>
          
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="e.g., Is this perimenopause? What are my treatment options?"
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '12px',
              border: `1px solid ${colors.border}`,
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
          
          <button
            onClick={() => {
              if (newQuestion.trim()) {
                setUserQuestions([...userQuestions, newQuestion.trim()]);
                setNewQuestion('');
              }
            }}
            disabled={!newQuestion.trim()}
            style={{
              marginTop: '10px',
              padding: '10px 16px',
              backgroundColor: newQuestion.trim() ? colors.primary : colors.divider,
              color: newQuestion.trim() ? 'white' : colors.textMuted,
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: newQuestion.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            + Add Question
          </button>
          
          {userQuestions.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              {userQuestions.map((q, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  padding: '10px',
                  backgroundColor: colors.divider,
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: colors.primary }}>?</span>
                  <span style={{ flex: 1, fontSize: '13px', color: colors.text }}>{q}</span>
                  <button
                    onClick={() => setUserQuestions(userQuestions.filter((_, idx) => idx !== i))}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: colors.textMuted,
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >×</button>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Button 
          onClick={() => setScreen(SCREENS.DIAGNOSIS_PREVIEW)}
          disabled={userConcerns.length === 0 && userQuestions.length === 0}
        >
          Confirm & View Potential Diagnoses
        </Button>
      </div>
    </div>
  );

  // DIAGNOSIS PREVIEW SCREEN
  const DiagnosisPreviewScreen = () => (
    <div>
      <Header 
        title="Potential Diagnoses"
        subtitle="AI-assisted analysis based on your profile"
        showBack
        onBack={() => setScreen(SCREENS.ADD_CONCERNS)}
      />
      
      <div style={{ padding: '20px' }}>
        {/* Disclaimer */}
        <Card style={{ 
          marginBottom: '16px', 
          backgroundColor: `${colors.warning}10`,
          border: `1px solid ${colors.warning}`
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <p style={{ margin: 0, fontSize: '12px', color: colors.text, lineHeight: '1.5' }}>
              <strong>Important:</strong> This is not a diagnosis. These are potential conditions to discuss with Dr. Chen, who has received this same analysis with clinical decision-making criteria.
            </p>
          </div>
        </Card>

        {/* Diagnosis List */}
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text }}>Ranked by Likelihood</h3>
        
        {differentialDiagnosis.map((dx, i) => (
          <Card key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: i === 0 ? colors.primary : colors.divider,
                  color: i === 0 ? 'white' : colors.textMuted,
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
              <p style={{ margin: '0 0 6px', fontSize: '11px', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Supporting Criteria
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {dx.criteria.map((c, j) => (
                  <span key={j} style={{
                    padding: '4px 10px',
                    backgroundColor: colors.divider,
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: colors.text
                  }}>{c}</span>
                ))}
              </div>
            </div>
          </Card>
        ))}

        <div style={{ 
          padding: '16px', 
          backgroundColor: `${colors.primary}08`, 
          borderRadius: '12px',
          marginBottom: '16px'
        }}>
          <p style={{ margin: 0, fontSize: '13px', color: colors.text, lineHeight: '1.6' }}>
            <strong>Your doctor will see:</strong> The same ranked list, plus clinical decision-making criteria, screening protocols, and assessment questions to confirm or rule out each condition.
          </p>
        </div>

        <Button onClick={() => setScreen(SCREENS.PLAN_OF_CARE)}>
          View Sample Plan of Care →
        </Button>
      </div>
    </div>
  );

  // PLAN OF CARE SCREEN
  const PlanOfCareScreen = () => (
    <div>
      <Header 
        title="Plan of Care"
        subtitle="Developed in partnership with Dr. Chen"
        showBack
        onBack={() => setScreen(SCREENS.DIAGNOSIS_PREVIEW)}
      />
      
      <div style={{ padding: '20px' }}>
        {/* Diagnosis Summary */}
        <Card style={{ marginBottom: '16px', backgroundColor: `${colors.success}08`, border: `1px solid ${colors.success}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '20px' }}>✓</span>
            <h4 style={{ margin: 0, fontSize: '15px', color: colors.text }}>Working Diagnosis: Perimenopause</h4>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted, lineHeight: '1.5' }}>
            Based on: Age, symptom pattern, hormone levels, and ruling out other conditions
          </p>
        </Card>

        {/* Evidence Documentation */}
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

        {/* Plan Items */}
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: colors.text }}>Treatment Plan</h3>
        <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textMuted }}>
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
                  backgroundColor: colors.divider,
                  borderRadius: '4px',
                  fontSize: '10px',
                  color: colors.textMuted,
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>{item.type}</span>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  color: item.approved ? colors.text : colors.textMuted,
                  textDecoration: item.approved ? 'none' : 'line-through'
                }}>{item.text}</p>
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

        <p style={{ margin: '16px 0 0', fontSize: '11px', color: colors.textMuted, textAlign: 'center' }}>
          You can modify this plan at any time. Your preferences are documented.
        </p>
      </div>
    </div>
  );

  // Render current screen
  const renderScreen = () => {
    switch (screen) {
      case SCREENS.DASHBOARD: return <DashboardScreen />;
      case SCREENS.INSIGHT: return <InsightScreen />;
      case SCREENS.APPOINTMENT: return <AppointmentScreen />;
      case SCREENS.ADD_CONCERNS: return <AddConcernsScreen />;
      case SCREENS.DIAGNOSIS_PREVIEW: return <DiagnosisPreviewScreen />;
      case SCREENS.PLAN_OF_CARE: return <PlanOfCareScreen />;
      default: return <DashboardScreen />;
    }
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: colors.surface,
      minHeight: '100vh',
      maxWidth: '420px',
      margin: '0 auto',
      boxShadow: '0 0 40px rgba(0,0,0,0.1)'
    }}>
      {renderScreen()}
    </div>
  );
}
