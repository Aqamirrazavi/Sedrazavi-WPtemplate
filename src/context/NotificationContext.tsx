import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface LeadSubmission {
  id: string;
  clientName: string;
  phone: string;
  subject: string;
  service: string;
  amount?: string;
  timestamp: string;
  read: boolean;
  source: 'consultation_form' | 'quick_callback' | 'case_tracker' | 'contract_request' | 'system_alert';
  priority: 'high' | 'medium' | 'normal';
}

interface NotificationContextType {
  submissions: LeadSubmission[];
  unreadCount: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteSubmission: (id: string) => void;
  notifyNewSubmission: (data: Omit<LeadSubmission, 'id' | 'timestamp' | 'read'>) => void;
  triggerDemoLead: () => void;
}

const STORAGE_KEY = 'sedrazavi_admin_leads_notifications';

const INITIAL_SUBMISSIONS: LeadSubmission[] = [
  {
    id: 'sub-101',
    clientName: 'دکتر محمدرضا سهرابی',
    phone: '09121112233',
    subject: 'درخواست مشاوره فوری دعاوی تجاری و بانکی',
    service: 'دعاوی بازرگانی بین‌الملل',
    amount: '۲,۵۰۰,۰۰۰ تومان',
    timestamp: '۱۰ دقیقه پیش',
    read: false,
    source: 'consultation_form',
    priority: 'high'
  },
  {
    id: 'sub-102',
    clientName: 'مهندس مریم پیروزیان',
    phone: '09359876543',
    subject: 'ثبت استعلام وضعیت قرارداد استارتاپ و سهام تشویقی',
    service: 'مالکیت فکری و فناوری',
    amount: '۱,۸۰۰,۰۰۰ تومان',
    timestamp: '۴۵ دقیقه پیش',
    read: false,
    source: 'contract_request',
    priority: 'medium'
  },
  {
    id: 'sub-103',
    clientName: 'حاج کاظم شریفی',
    phone: '09153334455',
    subject: 'استعلام پرونده دیوان عدالت اداری (کد پیگیری SD-849)',
    service: 'امور اراضی و مالیات',
    timestamp: '۲ ساعت پیش',
    read: true,
    source: 'case_tracker',
    priority: 'normal'
  }
];

// Crystal-clear subtle chime synthesizer using Web Audio API (Zero external audio file dependency)
const playChimeTone = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const now = ctx.currentTime;
    
    // Primary Tone (D5: 587.33 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Harmonic Bell Tone (A5: 880 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0.2, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.65);
  } catch {
    // Audio autoplay restrictions gracefully handled
  }
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [submissions, setSubmissions] = useState<LeadSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SUBMISSIONS;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('sedrazavi_sound_enabled');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch {
      // storage error handled
    }
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('sedrazavi_sound_enabled', String(soundEnabled));
  }, [soundEnabled]);

  const unreadCount = submissions.filter(s => !s.read).length;

  const markAsRead = (id: string) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, read: true } : s));
  };

  const markAllAsRead = () => {
    setSubmissions(prev => prev.map(s => ({ ...s, read: true })));
  };

  const deleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const notifyNewSubmission = (data: Omit<LeadSubmission, 'id' | 'timestamp' | 'read'>) => {
    const newSub: LeadSubmission = {
      ...data,
      id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: 'همین الان',
      read: false
    };

    setSubmissions(prev => [newSub, ...prev]);

    if (soundEnabled) {
      playChimeTone();
    }
  };

  const triggerDemoLead = () => {
    const sampleNames = ['مهندس علیرضا راد', 'دکتر فاطمه کریمی', 'سرمایه‌گذار سهند تابان', 'خانم نیلوفر سپهری'];
    const sampleServices = ['مشاوره تخصصی دعاوی ملکی', 'تنظیم قرارداد بین‌المللی ارزی', 'حل اختلاف آنلاین تجاری', 'رسیدگی مالیاتی سامانه مودیان'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomService = sampleServices[Math.floor(Math.random() * sampleServices.length)];

    notifyNewSubmission({
      clientName: randomName,
      phone: `0912${Math.floor(1000000 + Math.random() * 9000000)}`,
      subject: `درخواست فوری ثبت پرونده و مشاوره آنلاین (${randomService})`,
      service: randomService,
      amount: '۳,۲۰۰,۰۰۰ تومان',
      source: 'consultation_form',
      priority: 'high'
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        submissions,
        unreadCount,
        soundEnabled,
        setSoundEnabled,
        markAsRead,
        markAllAsRead,
        deleteSubmission,
        notifyNewSubmission,
        triggerDemoLead
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useAdminNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    return {
      submissions: [],
      unreadCount: 0,
      soundEnabled: true,
      setSoundEnabled: () => {},
      markAsRead: () => {},
      markAllAsRead: () => {},
      deleteSubmission: () => {},
      notifyNewSubmission: () => {},
      triggerDemoLead: () => {}
    };
  }
  return context;
};
