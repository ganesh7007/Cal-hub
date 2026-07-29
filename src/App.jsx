
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useParams, useNavigate } from 'react-router-dom';
import logoImg from './assets/images/logo.jpg';
import heroHackerImg from './assets/images/hero-hacker.png';
import { traditionalDetails } from './data/traditionalDetails';
import { trendingDetails } from './data/trendingDetails';
import { impactDetailsData } from './data/impactDetails';
import { blogContents } from './data/blogContent';
import './App.css';
import './CardNav.css';
import CardNav from './CardNav';
import { Activity, AlertOctagon, AlertTriangle, ArrowDownCircle, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Briefcase, Bug, Calendar, CheckCircle, ChevronDown, ChevronRight, ChevronUp, Clock, Cloud, CloudLightning, Code, Coins, Cpu, Crosshair, Database, DollarSign, FileText, Fingerprint, Gavel, Globe, Home as HomeIcon, Info, Key, Link2, Lock, LockKeyhole, MailWarning, MonitorOff, RefreshCcw, Search, Shield, ShieldAlert, ShieldCheck, Skull, Smartphone, Star, Target, Terminal, TrendingDown, UserX, Users, WifiOff, X, ZoomIn, ZoomOut } from 'lucide-react';


const CyberLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 3500; // 3.5 seconds total loading time
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="cyber-loader-container">
      <div className="loader-background-grid"></div>

      <div className="simple-loader-card">
        <div className="simple-loader-ring" aria-label="Loading" />
        <h2 className="loading-title text-neon glow-text">LOADING</h2>
        <p className="loading-subtitle">Preparing your secure experience</p>

        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">{progress}%</span>
      </div>
    </div>
  );
};



const Navbar = () => {
  const navItems = [
    {
      label: 'Explore',
      bgColor: '#0f1712',
      textColor: '#e0ffe0',
      links: [
        { label: 'Home', href: '/', ariaLabel: 'Go to home page' },
        { label: 'Traditional Attacks', href: '/traditional', ariaLabel: 'View traditional attacks' },
        { label: 'Trending Attacks', href: '/trending', ariaLabel: 'View trending attacks' }
      ]
    },
    {
      label: 'Impact',
      bgColor: '#16231a',
      textColor: '#e0ffe0',
      links: [
        { label: 'Impact Overview', href: '/impact', ariaLabel: 'View impact overview' },
        { label: 'Global Statistics', href: '/impact', ariaLabel: 'See cyber impact statistics' },
        { label: 'Case Studies', href: '/impact', ariaLabel: 'See impact case studies' }
      ]
    },
    {
      label: 'Learn',
      bgColor: '#1d2d22',
      textColor: '#e0ffe0',
      links: [
        { label: 'Cyber Blogs', href: '/blogs', ariaLabel: 'Read cyber blogs' },
        { label: 'Threat Feed', href: '/', ariaLabel: 'View live threat feed' },
        { label: 'Security Tips', href: '/blogs', ariaLabel: 'Read security tips' }
      ]
    }
  ];

  return (
    <header className="navbar-shell">
      <CardNav
        logo={logoImg}
        logoAlt="CAL Hub Logo"
        items={navItems}
        baseColor="#030a05"
        menuColor="#00ff41"
        buttonBgColor="#00ff41"
        buttonTextColor="#030a05"
        ease="power3.out"
      />
    </header>
  );
};



const OfflinePopup = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="offline-popup-overlay">
      <div className="offline-popup-box neon-box danger-glow">
        <div className="offline-header">
          <AlertTriangle className="text-danger" size={28} />
          <h3 className="text-danger glow-text-danger">CONNECTION LOST</h3>
        </div>
        <div className="offline-body">
          <WifiOff size={48} className="text-danger mb-3" style={{ margin: '0 auto', display: 'block' }} />
          <p>Network not connected. Please check your internet connection to continue accessing the Cyber Attack Learning Hub.</p>
          <div className="offline-scanning">
            <span>Attempting to reconnect</span>
            <div className="loading-dots danger">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const ZoomableImage = ({ src, alt, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const openModal = () => {
    setIsOpen(true);
    setScale(1);
  };

  const closeModal = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
  };

  const zoomIn = (e) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 4)); // Max scale 4
  };

  const zoomOut = (e) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.5, 0.5)); // Min scale 0.5
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`zoomable-trigger ${className || ''}`}
        onClick={openModal}
        title="Click to zoom"
      />

      {isOpen && (
        <div className="zoomable-modal" onClick={closeModal}>
          <div className="zoomable-controls" onClick={e => e.stopPropagation()}>
            <button onClick={zoomIn} title="Zoom In"><ZoomIn size={24} /></button>
            <button onClick={zoomOut} title="Zoom Out"><ZoomOut size={24} /></button>
            <button onClick={closeModal} title="Close"><X size={24} /></button>
          </div>
          <div className="zoomable-image-container" onClick={e => e.stopPropagation()}>
            <img
              src={src}
              alt={alt}
              style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease' }}
              className="zoomed-image"
            />
          </div>
        </div>
      )}
    </>
  );
};



const OverviewCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="overview-card neon-box" style={{ marginTop: '2rem', marginBottom: '2rem', transition: 'all 0.3s ease' }}>
      <div
        className="overview-header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info className="text-neon" size={24} />
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>CYBER ATTACK OVERVIEW</h3>
        </div>
        <button className="btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', pointerEvents: 'none' }}>
          LEARN MORE {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {isExpanded && (
        <div className="overview-content" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', animation: 'fadeIn 0.5s ease-in-out' }}>
          <h4 className="text-neon" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Cyber attack: Meaning & definition</h4>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>A cyber attack is the process of attempting to steal data or gaining unauthorized access to computers and networks using one or more computers. A cyber attack is often the first step an attacker takes in gaining unauthorized access to individual or business computers or networks before carrying out a data breach.</p>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>The goal of a cyber attack is either to disable the target computer and take it offline or gain access to the computer’s data and infiltrate connected networks and systems. Cyber attacks also differ broadly in their sophistication, with cyber criminals launching both random and targeted attacks on businesses. Attackers deploy a wide range of methods to begin a cyber attack, such as denial of service, malware, phishing, and ransomware.</p>
          <p style={{ marginBottom: '2rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>An example is CMA CGM, one of the largest container shipping companies in the world. The firm suffered a cyber attack that originally targeted its servers, which then led to a data breach. The September 2020 attack occurred as malware was used to target the firm’s peripheral servers, which led to CMA CGM taking down access to its online services.</p>

          <h4 className="text-neon" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Evolution of cyber attacks</h4>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>From ransomware to AI-driven threats, cyber attacks are surging. Attackers are using advanced tactics to exploit sensitive data. Here’s the timeline of how it evolved over the years.</p>

          <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '2rem' }}>
            <li style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--color-warning)' }}><strong className="text-warning">2009-2012:</strong> Advanced Persistent Threats (APTs) focused on long-term, stealthy data theft. Operation Aurora in 2010, which targeted Google and other companies, is proof.</li>
            <li style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--color-warning)' }}><strong className="text-warning">2013-2016:</strong> Ransomware became widespread, with attackers encrypting files and demanding ransoms. WannaCry ransomware (2017) spread rapidly across 150+ countries, impacting hospitals, businesses, and government systems.</li>
            <li style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--color-warning)' }}><strong className="text-warning">2017-2020:</strong> IoT and AI-powered threats increased during this time. The Mirai Botnet infected IoT devices using weak credentials, bringing down services like Twitter and Netflix.</li>
            <li style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--color-warning)' }}><strong className="text-warning">2021-2022:</strong> Supply chain and Ransomware-as-a-Service (RaaS) attacks increased. SolarWinds attackers compromised software updates, infiltrating corporate networks.</li>
            <li style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--color-warning)' }}><strong className="text-warning">2022-Present:</strong> At present, deepfake and synthetic identity fraud have grown as threats. Attackers are misusing data to create false identities and commit financial fraud. Learning from recent major cyber attacks on global enterprises also highlights how these evolving tactics are reshaping security priorities across industries.</li>
          </ul>

          <h4 className="text-neon" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>What are examples of a cyber attack?</h4>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>What is a cyber attack within the context of a business’s daily operations? The prevailing cyber attack definition can be very broad, depending on the kind of assault criminals decide to launch. Here are a couple of example scenarios:</p>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}><strong className="text-primary" style={{ color: '#e0ffe0' }}>Malware:</strong> A company does not take the appropriate cyber attack prevention steps and allows its employees to visit any website they like. An employee goes to a fake site that automatically downloads malware onto their computer. The malware sets up a backdoor for a future ransomware attack.</li>
            <li style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}><strong className="text-primary" style={{ color: '#e0ffe0' }}>Phishing:</strong> A phishing email, one of the most common cyber attack types, gets sent to an employee telling them they need to update their bank account password. They are led to a fake site, and a hacker collects all the information they put in.</li>
          </ul>
          <p style={{ lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>These cyber attack examples are fairly simple—not the sophisticated types some criminal syndicates unleash—but they are still some of the most common methods malicious actors use to exploit companies and their employees.</p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <div className="page-container home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="title-main text-neon glow-text">
            KNOW THE THREATS.<br />
            STAY SECURE.
          </h1>
          <p className="hero-description">
            Explore common traditional and trending cyber attacks, viruses, and their real-world impact. Learn. Protect. Stay ahead.
          </p>
          <div className="hero-actions">
            <Link to="/traditional" className="btn-primary">
              EXPLORE ATTACKS <ArrowRight size={18} />
            </Link>
            <a href="https://cyberwolf.pro" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>
              LEARN MORE <AlertTriangle size={16} />
            </a>
          </div>
        </div>

        <div className="hero-graphic">
          <img src={heroHackerImg} alt="System Compromised" className="hero-img-graphic" />
        </div>

        <div className="live-threat-feed neon-box">
          <h3 className="section-title text-neon">LIVE THREAT FEED</h3>
          <ul className="threat-list">
            <li className="threat-item">
              <Bug className="threat-icon danger" />
              <div className="threat-info">
                <h4>RANSOMWARE ATTACK</h4>
                <span>Target: Healthcare Sector</span>
                <span>Location: USA</span>
              </div>
              <span className="threat-time">2m ago</span>
            </li>
            <li className="threat-item">
              <AlertTriangle className="threat-icon warning" />
              <div className="threat-info">
                <h4>PHISHING CAMPAIGN</h4>
                <span>Target: Financial Sector</span>
                <span>Location: UK</span>
              </div>
              <span className="threat-time">5m ago</span>
            </li>
            <li className="threat-item">
              <Activity className="threat-icon danger" />
              <div className="threat-info">
                <h4>MALWARE DETECTED</h4>
                <span>Type: Info Stealer</span>
                <span>Location: India</span>
              </div>
              <span className="threat-time">8m ago</span>
            </li>
          </ul>
          <Link to="/trending" className="view-all-link">VIEW ALL <ArrowRight size={14} /></Link>
        </div>
      </div>

      <div className="categories-grid grid-4">
        <Link to="/traditional" className="category-card neon-box">
          <Bug size={40} className="category-icon" />
          <h3>TRADITIONAL ATTACKS</h3>
          <p>Viruses, Worms, Trojans, Phishing, DoS & more.</p>
          <span className="explore-link">Explore <ArrowRight size={14} /></span>
        </Link>
        <Link to="/trending" className="category-card neon-box">
          <Activity size={40} className="category-icon" />
          <h3>TRENDING ATTACKS</h3>
          <p>Ransomware, AI Attacks, Deepfakes, Supply Chain & more.</p>
          <span className="explore-link">Explore <ArrowRight size={14} /></span>
        </Link>
        <Link to="/traditional" className="category-card neon-box">
          <ShieldAlert size={40} className="category-icon" />
          <h3>VIRUSES & MALWARE</h3>
          <p>Explore different types of malware and how they work.</p>
          <span className="explore-link">Explore <ArrowRight size={14} /></span>
        </Link>
        <Link to="/impact" className="category-card neon-box">
          <Globe size={40} className="category-icon" />
          <h3>IMPACT & STATISTICS</h3>
          <p>Real-world impact, global stats and case studies.</p>
          <span className="explore-link">Explore <ArrowRight size={14} /></span>
        </Link>
      </div>

      <OverviewCard />

      <div className="bottom-section grid-sidebar">
        <div className="stats-section neon-box">
          <h3 className="section-title"><Activity size={20} /> CYBER THREAT STATISTICS</h3>
          <div className="grid-4 stats-grid">
            <div className="stat-item">
              <Globe className="stat-icon" />
              <div className="stat-value">8.4B+</div>
              <div className="stat-label">Malware Attacks in 2024</div>
            </div>
            <div className="stat-item">
              <AlertTriangle className="stat-icon" />
              <div className="stat-value">2.8M+</div>
              <div className="stat-label">Phishing Sites Detected</div>
            </div>
            <div className="stat-item">
              <Lock className="stat-icon" />
              <div className="stat-value">$9.5T</div>
              <div className="stat-label">Cybercrime Damage by 2025</div>
            </div>
            <div className="stat-item">
              <Shield className="stat-icon" />
              <div className="stat-value">70%</div>
              <div className="stat-label">Attacks Targeting Small Businesses</div>
            </div>
          </div>
        </div>

        <div className="how-it-works neon-box">
          <h3 className="section-title">HOW IT WORKS</h3>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon-wrapper"><Activity size={24} /></div>
              <div className="step-text">
                <h4>1. EXPLORE</h4>
                <p>Browse different types of attacks and threats.</p>
              </div>
            </div>
            {/* We'd map out the rest of the steps here */}
          </div>
        </div>
      </div>

      <footer className="footer-quote text-neon mono-font glow-text">
        "CYBER SECURITY IS NOT JUST AN IT ISSUE, IT'S A BUSINESS ISSUE."
      </footer>
    </div>
  );
};


Bug,
  Database,
  Terminal,
  Globe,
  ShieldAlert,
  MonitorOff,
  Lock,
  Key,
  BookOpen,
  CheckCircle,
  Clock,
  Skull,
  DollarSign,
  ArrowDownCircle,
  AlertOctagon,
  Gavel,
  ShieldCheck,
  Activity,
  X,
  ChevronRight

const attackTypes = [
  { id: 1, name: 'VIRUS', icon: <Bug size={32} />, desc: 'Malicious programs that attach to files and spread when the infected file is executed.' },
  { id: 2, name: 'WORM', icon: <Terminal size={32} />, desc: 'Self-replicating malware that spreads across networks without user interaction.' },
  { id: 3, name: 'TROJAN HORSE', icon: <Globe size={32} />, desc: 'Disguised as legitimate software to gain unauthorized access and steal data.' },
  { id: 4, name: 'PHISHING', icon: <ShieldAlert size={32} />, desc: 'Deceptive attempts to steal sensitive information using fake emails or websites.' },
  { id: 5, name: 'DOS ATTACK', icon: <MonitorOff size={32} />, desc: 'Overwhelms a system or network with traffic to make it unavailable.' },
  { id: 6, name: 'SQL INJECTION', icon: <Database size={32} />, desc: 'Exploits vulnerabilities in databases to access, modify or delete data.' },
  { id: 7, name: 'XSS ATTACK', icon: <Terminal size={32} />, desc: 'Injects malicious scripts into websites viewed by other users.' },
  { id: 8, name: 'PASSWORD ATTACKS', icon: <Key size={32} />, desc: 'Attempts to gain access by guessing, brute forcing or stealing passwords.' },
];

const TraditionalAttacks = () => {
  const [selectedAttack, setSelectedAttack] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedAttack(null);
      setIsClosing(false);
    }, 700); // Wait for the hand pull animation
  };

  const renderModal = () => {
    if (!selectedAttack && !isClosing) return null;
    const details = traditionalDetails[selectedAttack];
    if (!details && !isClosing) return null;

    return (
      <div className={`attack-modal-overlay ${isClosing ? 'overlay-closing' : ''}`} onClick={closeModal}>
        {isClosing && (
          <div className="robotic-hand">
            🦾
          </div>
        )}
        <div className={`attack-modal-content neon-box ${isClosing ? 'modal-pulled-away' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="text-neon glow-text">{details.title}</h2>
            <button className="close-btn" onClick={closeModal}><X size={24} /></button>
          </div>
          <div className="modal-body custom-scrollbar">
            <div className="modal-section">
              <h3 className="section-title"><Bug size={18} /> Types</h3>
              <ul>{details.types.map((item, i) => <li key={i}><ChevronRight size={14} className="text-neon inline-icon" /> {item}</li>)}</ul>
            </div>
            <div className="modal-section">
              <h3 className="section-title"><Clock size={18} /> History</h3>
              <ul>{details.history.map((item, i) => <li key={i}><ChevronRight size={14} className="text-neon inline-icon" /> {item}</li>)}</ul>
            </div>
            <div className="modal-section">
              <h3 className="section-title"><Activity size={18} /> Impact</h3>
              <ul>{details.impact.map((item, i) => <li key={i}><ChevronRight size={14} className="text-neon inline-icon" /> {item}</li>)}</ul>
            </div>
            <div className="modal-section">
              <h3 className="section-title"><ShieldCheck size={18} /> Prevention</h3>
              <ul>{details.prevention.map((item, i) => <li key={i}><ChevronRight size={14} className="text-neon inline-icon" /> {item}</li>)}</ul>
            </div>
            <div className="modal-section">
              <h3 className="section-title"><Terminal size={18} /> Programming / Techniques</h3>
              <ul>{details.programming.map((item, i) => <li key={i}><ChevronRight size={14} className="text-neon inline-icon" /> {item}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-container ta-page">
      {renderModal()}
      <div className="ta-header grid-sidebar">
        <div className="ta-main-intro">
          <div className="breadcrumb">Home &gt; Traditional Attacks</div>
          <h1 className="title-main text-neon glow-text">
            TRADITIONAL<br />CYBER ATTACKS
          </h1>
          <p className="subtitle-desc">
            Explore the most common and traditional types of cyber attacks that have been used by attackers for years to exploit systems, steal data, and disrupt operations.
          </p>

          <div className="ta-stats-row">
            <div className="ta-stat-badge neon-box">
              <BookOpen className="text-neon" size={24} />
              <div>
                <span className="ta-stat-num">8</span> Types of Attacks Covered
              </div>
            </div>
            <div className="ta-stat-badge neon-box">
              <CheckCircle className="text-neon" size={24} />
              <div>
                <span className="ta-stat-num">100+</span> Real World Examples Included
              </div>
            </div>
          </div>
        </div>

        <div className="ta-about-box neon-box">
          <h3 className="section-title">ABOUT TRADITIONAL ATTACKS <InfoIcon /></h3>
          <p>Traditional attacks are the foundation of modern cyber threats. Understanding these attacks helps in building strong defenses and staying secure.</p>
          <ul className="custom-list">
            <li>Easy to execute</li>
            <li>Widely used by attackers</li>
            <li>High impact on systems</li>
            <li>Evolving in modern ways</li>
          </ul>
        </div>
      </div>

      <div className="ta-content-layout">
        <div className="ta-attacks-grid">
          <h3 className="section-title"><Lock size={20} /> TYPES OF TRADITIONAL ATTACKS</h3>
          <div className="grid-4">
            {attackTypes.map((attack) => (
              <div key={attack.id} className="attack-card neon-box">
                <div className="attack-card-header">
                  <span className="attack-num">{attack.id}. {attack.name}</span>
                </div>
                <div className="attack-card-body">
                  <div className="attack-icon-wrapper">{attack.icon}</div>
                  <p>{attack.desc}</p>
                </div>
                <div className="attack-card-footer">
                  <button className="explore-link explore-btn" onClick={() => setSelectedAttack(attack.id)}>
                    Learn More &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ta-sidebar">
          <div className="timeline-box neon-box">
            <h3 className="section-title"><Clock size={20} /> ATTACK TIMELINE</h3>
            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-year">1980s</span>
                <span className="timeline-desc">Virus & Worms emerged</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-year">1990s</span>
                <span className="timeline-desc">Trojans became popular</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-year">2000s</span>
                <span className="timeline-desc">Phishing & DoS attacks rise</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-year">2010s</span>
                <span className="timeline-desc">SQL Injection & XSS grow</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-year">2020s</span>
                <span className="timeline-desc">Advanced & automated attacks</span>
              </div>
            </div>
            <a href="#" className="explore-link right-align">View Evolution &rarr;</a>
          </div>

          <div className="incidents-box neon-box">
            <h3 className="section-title"><Globe size={20} /> REAL WORLD INCIDENTS</h3>
            <ul className="incident-list">
              <li><span>ILOVEYOU Virus Outbreak</span> <span className="incident-year text-neon">2000</span></li>
              <li><span>MyDoom Email Worm</span> <span className="incident-year text-neon">2004</span></li>
              <li><span>Conficker Worm</span> <span className="incident-year text-neon">2008</span></li>
              <li><span>Sony PSN Outage (DoS)</span> <span className="incident-year text-neon">2011</span></li>
              <li><span>Yahoo Data Breach (Phishing)</span> <span className="incident-year text-neon">2014</span></li>
            </ul>
            <a href="#" className="explore-link right-align">View All Incidents &rarr;</a>
          </div>
        </div>
      </div>

      <div className="ta-bottom-row grid-sidebar">
        <div className="impact-section neon-box">
          <h3 className="section-title"><Activity size={20} /> IMPACT OF TRADITIONAL ATTACKS</h3>
          <div className="grid-5-icons">
            <div className="impact-item">
              <Skull className="impact-icon text-danger" size={32} />
              <h4>Data Theft</h4>
              <p>Loss of sensitive information</p>
            </div>
            <div className="impact-item">
              <DollarSign className="impact-icon text-warning" size={32} />
              <h4>Financial Loss</h4>
              <p>Huge monetary damages</p>
            </div>
            <div className="impact-item">
              <ArrowDownCircle className="impact-icon text-neon" size={32} />
              <h4>Downtime</h4>
              <p>System & network unavailability</p>
            </div>
            <div className="impact-item">
              <AlertOctagon className="impact-icon text-warning" size={32} />
              <h4>Reputation Damage</h4>
              <p>Loss of trust and brand value</p>
            </div>
            <div className="impact-item">
              <Gavel className="impact-icon text-danger" size={32} />
              <h4>Legal Consequences</h4>
              <p>Fines, compliance and penalties</p>
            </div>
          </div>
        </div>

        <div className="protect-section neon-box">
          <h3 className="section-title"><ShieldCheck size={20} /> HOW TO PROTECT YOURSELF</h3>
          <ul className="protect-list">
            <li><CheckCircle size={16} className="text-neon" /> Keep your systems and software updated</li>
            <li><CheckCircle size={16} className="text-neon" /> Use strong passwords and enable 2FA</li>
            <li><CheckCircle size={16} className="text-neon" /> Be cautious of suspicious links and emails</li>
            <li><CheckCircle size={16} className="text-neon" /> Use antivirus and firewall protection</li>
            <li><CheckCircle size={16} className="text-neon" /> Regularly backup important data</li>
          </ul>
        </div>
      </div>

      <footer className="footer-quote text-neon mono-font glow-text">
        "KNOWLEDGE IS YOUR BEST DEFENSE - LEARN TODAY, SECURE TOMORROW."
      </footer>
    </div>
  );
};

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);


Cpu,
  UserX,
  Lock,
  MailWarning,
  CloudLightning,
  Link2,
  Smartphone,
  Code,
  Coins,
  Bug,
  Activity,
  AlertTriangle,
  Fingerprint,
  ShieldCheck,
  X,
  ChevronRight


const trendingAttacks = [
  { id: 1, name: 'AI-POWERED ATTACKS', icon: <Cpu />, desc: 'Attackers leverage AI/ML to automate, adapt, and evades detection.', level: 5 },
  { id: 2, name: 'DEEPFAKE ATTACKS', icon: <UserX />, desc: 'Use of deepfake technology for identity theft, fraud and misinformation.', level: 4 },
  { id: 3, name: 'RANSOMWARE', icon: <Lock />, desc: 'Malicious software that locks systems and demands ransom for access.', level: 5 },
  { id: 4, name: 'BUSINESS EMAIL COMPROMISE (BEC)', icon: <MailWarning />, desc: 'Fraudulent emails targeting businesses to steal money or sensitive data.', level: 4 },
  { id: 5, name: 'CLOUD ATTACKS', icon: <CloudLightning />, desc: 'Exploits targeting cloud infrastructure, misconfigurations and services.', level: 4 },
  { id: 6, name: 'SUPPLY CHAIN ATTACKS', icon: <Link2 />, desc: 'Attacks through third-party vendors to compromise entire organizations.', level: 5 },
  { id: 7, name: 'MOBILE MALWARE', icon: <Smartphone />, desc: 'Malicious apps and exploits targeting smartphones and mobile devices.', level: 3 },
  { id: 8, name: 'API ATTACKS', icon: <Code />, desc: 'Exploiting insecure APIs to access data, disrupt services or escalate access.', level: 4 },
  { id: 9, name: 'CRYPTOJACKING', icon: <Coins />, desc: 'Unauthorized use of systems to mine cryptocurrency.', level: 3 },
  { id: 10, name: 'ZERO-DAY EXPLOITS', icon: <Bug />, desc: 'Exploiting unknown vulnerabilities before vendors can patch.', level: 5 },
];

const renderThreatLevel = (level) => {
  return (
    <div className="threat-level-dots">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`dot ${i <= level ? 'active' : ''}`}></span>
      ))}
    </div>
  );
};

const TrendingAttacks = () => {
  const [selectedAttack, setSelectedAttack] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedAttack(null);
      setIsClosing(false);
    }, 700); // Wait for the hand pull animation
  };

  const renderModal = () => {
    if (!selectedAttack && !isClosing) return null;
    const details = trendingDetails[selectedAttack];

    return (
      <div className={`attack-modal-overlay ${isClosing ? 'overlay-closing' : ''}`} onClick={handleClose}>
        {isClosing && (
          <div className="robotic-hand">
            🦾
          </div>
        )}
        <div className={`attack-modal-content neon-box ${isClosing ? 'modal-pulled-away' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="text-neon glow-text">{details?.title}</h2>
            <button className="close-btn" onClick={handleClose}><X size={24} /></button>
          </div>
          <div className="modal-body custom-scrollbar">
            <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>{details?.whatItIs}</p>

            <div className="modal-section">
              <h3 className="section-title"><Bug size={18} /> Types</h3>
              <ul>{details?.types.map((item, i) => <li key={i}><ChevronRight size={14} className="text-neon inline-icon" /> {item}</li>)}</ul>
            </div>
            <div className="modal-section">
              <h3 className="section-title"><Activity size={18} /> History</h3>
              <ul>{details?.history.map((item, i) => <li key={i}><ChevronRight size={14} className="text-neon inline-icon" /> {item}</li>)}</ul>
            </div>
            <div className="modal-section">
              <h3 className="section-title"><AlertTriangle size={18} /> Impact</h3>
              <ul>{details?.impact.map((item, i) => <li key={i}><ChevronRight size={14} className="text-neon inline-icon" /> {item}</li>)}</ul>
            </div>
            <div className="modal-section">
              <h3 className="section-title"><ShieldCheck size={18} /> Prevention</h3>
              <ul>{details?.prevention.map((item, i) => <li key={i}><ChevronRight size={14} className="text-neon inline-icon" /> {item}</li>)}</ul>
            </div>
            <div className="modal-section">
              <h3 className="section-title"><Code size={18} /> Programming / Techniques</h3>
              <ul>{details?.programming.map((item, i) => <li key={i}><ChevronRight size={14} className="text-neon inline-icon" /> {item}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-container trend-page">
      {renderModal()}
      <div className="trend-header grid-sidebar">
        <div className="trend-main-intro">
          <div className="breadcrumb">Home &gt; Trending Attacks</div>
          <h1 className="title-main text-neon glow-text">
            TRENDING CYBER<br />ATTACKS.
          </h1>
          <p className="subtitle-desc">
            Stay ahead of the curve. Explore the most significant and emerging cyber threats targeting organizations and individuals worldwide.
          </p>

          <div className="trend-stats-row">
            <div className="trend-stat-badge neon-box">
              <Bug className="text-neon" size={20} />
              <div><span className="trend-stat-num">120+</span><br />Emerging Attack Types</div>
            </div>
            <div className="trend-stat-badge neon-box">
              <Activity className="text-neon" size={20} />
              <div><span className="trend-stat-num">85%</span><br />Increase in Sophistication</div>
            </div>
            <div className="trend-stat-badge neon-box">
              <Activity className="text-neon" size={20} />
              <div><span className="trend-stat-num">2026</span><br />High Impact Forecast</div>
            </div>
            <div className="trend-stat-badge neon-box highlight">
              <AlertTriangle className="text-warning" size={20} />
              <div><span className="trend-stat-num text-warning">HIGH</span><br />Threat Landscape</div>
            </div>
          </div>
        </div>

        <div className="trend-graphic neon-box image-graphic-container">
          <img src="https://res.cloudinary.com/dfjtvivgv/image/upload/v1782651860/2140b756-d704-4bdf-ba00-c1f83f4fa45a_ihvlao.png" alt="Trending Attacks Overview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
        </div>
      </div>

      <div className="trend-attacks-grid">
        <div className="section-header">
          <h3 className="section-title">TOP TRENDING ATTACKS</h3>
          <select className="sort-dropdown">
            <option>Sort by: Threat Level</option>
            <option>Sort by: Name</option>
          </select>
        </div>
        <div className="grid-5-auto">
          {trendingAttacks.map((attack) => (
            <div key={attack.id} className="trend-card neon-box">
              <div className="trend-icon-wrapper">{attack.icon}</div>
              <h4>{attack.name}</h4>
              <p>{attack.desc}</p>
              <div className="threat-level-container">
                <span className="level-label">THREAT LEVEL</span>
                {renderThreatLevel(attack.level)}
              </div>
              <button className="explore-link explore-btn" onClick={() => setSelectedAttack(attack.id)}>
                LEARN MORE &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="trend-content-layout">
        <div className="timeline-section">
          <h3 className="section-title">TRENDING ATTACKS TIMELINE</h3>
          <div className="horizontal-timeline neon-box">
            <div className="ht-line"></div>
            <div className="ht-items">
              {['2020', '2021', '2022', '2023', '2024', '2025', '2026'].map((year, index) => (
                <div key={year} className="ht-item">
                  <div className="ht-dot"></div>
                  <div className="ht-year">{year}</div>
                  <div className="ht-desc">
                    {index === 0 && 'Ransomware attacks surge globally'}
                    {index === 1 && 'Supply chain attacks gain traction'}
                    {index === 2 && 'Cloud infrastructure attacks rise'}
                    {index === 3 && 'API & AI based attacks emerge'}
                    {index === 4 && 'Deepfakes used for fraud'}
                    {index === 5 && 'AI powered malware becomes real'}
                    {index === 6 && 'Autonomous cyber attacks predicted'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="real-world-box neon-box" style={{ marginTop: '2rem' }}>
            <h3 className="section-title">REAL-WORLD INCIDENTS</h3>
            <ul className="trend-incident-list">
              <li>
                <span className="year-badge">2024</span>
                <div className="incident-details">
                  <h5 className="text-neon">Change Healthcare Ransomware Attack</h5>
                  <p>A ransomware attack impacted millions of users and sensitive healthcare data.</p>
                </div>
              </li>
              <li>
                <span className="year-badge">2023</span>
                <div className="incident-details">
                  <h5 className="text-neon">MOVEit Transfer Breach</h5>
                  <p>A critical vulnerability exploited, affecting thousands of organizations worldwide.</p>
                </div>
              </li>
              <li>
                <span className="year-badge">2022</span>
                <div className="incident-details">
                  <h5 className="text-neon">Colonial Pipeline Attack</h5>
                  <p>Ransomware attack disrupted fuel supply across the United States.</p>
                </div>
              </li>
              <li>
                <span className="year-badge">2021</span>
                <div className="incident-details">
                  <h5 className="text-neon">SolarWinds Supply Chain Attack</h5>
                  <p>Attackers compromised Orion software update mechanism.</p>
                </div>
              </li>
            </ul>
            <Link to="/blogs" className="explore-link right-align">VIEW ALL INCIDENTS &rarr;</Link>
          </div>
        </div>

        <div className="intelligence-sidebar">
          <div className="live-intel-box neon-box">
            <div className="intel-header">
              <h3 className="section-title">LIVE THREAT INTELLIGENCE</h3>
              <span className="live-indicator"><span className="pulse"></span> LIVE</span>
            </div>
            <ul className="threat-list">
              {/* Similar to Home page feed, but more detailed */}
              <li className="threat-item">
                <Lock className="threat-icon danger" />
                <div className="threat-info">
                  <h4>Ransomware Campaign Detected</h4>
                  <span>Targeting Healthcare Sector</span>
                </div>
                <div className="threat-meta">
                  <span className="threat-time">2m ago</span>
                  <span className="threat-badge high">HIGH</span>
                </div>
              </li>
              <li className="threat-item">
                <Cpu className="threat-icon warning" />
                <div className="threat-info">
                  <h4>AI-Generated Phishing Sites</h4>
                  <span>Financial Institutions Targeted</span>
                </div>
                <div className="threat-meta">
                  <span className="threat-time">5m ago</span>
                  <span className="threat-badge medium">MEDIUM</span>
                </div>
              </li>
              <li className="threat-item">
                <CloudLightning className="threat-icon danger" />
                <div className="threat-info">
                  <h4>Cloud Misconfiguration Exploit</h4>
                  <span>Multiple Organizations Affected</span>
                </div>
                <div className="threat-meta">
                  <span className="threat-time">12m ago</span>
                  <span className="threat-badge high">HIGH</span>
                </div>
              </li>
              <li className="threat-item">
                <Link2 className="threat-icon danger" />
                <div className="threat-info">
                  <h4>Supply Chain Breach</h4>
                  <span>Software Update Compromised</span>
                </div>
                <div className="threat-meta">
                  <span className="threat-time">18m ago</span>
                  <span className="threat-badge high">HIGH</span>
                </div>
              </li>
            </ul>
            <a href="#" className="explore-link right-align" style={{ marginTop: '1rem' }}>VIEW FULL THREAT FEED &rarr;</a>
          </div>

          <div className="trend-stats-box neon-box" style={{ marginTop: '2rem' }}>
            <h3 className="section-title">TRENDING ATTACK STATISTICS</h3>
            <div className="circular-stats-grid">
              <div className="circular-stat">
                <div className="circle-chart">78%</div>
                <p>Increase in Ransomware Attacks</p>
              </div>
              <div className="circular-stat">
                <div className="circle-chart">62%</div>
                <p>AI Based Attacks Growth (2024-2026)</p>
              </div>
              <div className="circular-stat">
                <div className="circle-chart">45%</div>
                <p>Cloud Related Incidents</p>
              </div>
              <div className="circular-stat">
                <div className="circle-chart">70%</div>
                <p>Attacks Targeting Small & Medium Businesses</p>
              </div>
            </div>
            <a href="#" className="explore-link right-align">VIEW DETAILED STATISTICS &rarr;</a>
          </div>
        </div>
      </div>

      <div className="protect-footer neon-box">
        <h3 className="section-title">HOW TO PROTECT AGAINST TRENDING ATTACKS</h3>
        <div className="grid-5-icons">
          <div className="protect-item">
            <ShieldCheck className="text-neon" size={24} />
            <span>Keep Systems & Software Updated</span>
          </div>
          <div className="protect-item">
            <Lock className="text-neon" size={24} />
            <span>Enable Multi-Factor Authentication (MFA)</span>
          </div>
          <div className="protect-item">
            <UserX className="text-neon" size={24} />
            <span>Employee Security Awareness Training</span>
          </div>
          <div className="protect-item">
            <Activity className="text-neon" size={24} />
            <span>Monitor & Detect Threats in Real-time</span>
          </div>
          <div className="protect-item">
            <Fingerprint className="text-neon" size={24} />
            <span>Use Zero Trust Security Model</span>
          </div>
        </div>
      </div>

      <footer className="footer-quote text-neon mono-font glow-text">
        "The best way to predict the future is to prepare for it." - Stay Informed. Stay Secure.
      </footer>
    </div>
  );
};




const Impact = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container impact-page">
      <div className="impact-header grid-sidebar">
        <div className="impact-nav neon-box">
          <h3 className="section-title">IMPACT OVERVIEW</h3>
          <ul className="side-nav-list">
            <li className="active"><Activity size={16} /> Dashboard Overview</li>
            <li onClick={() => navigate('/impact/financial')}><DollarSign size={16} /> Financial Impact</li>
            <li onClick={() => navigate('/impact/industries')}><Briefcase size={16} /> Industries Affected</li>
            <li onClick={() => navigate('/impact/globalMap')}><Globe size={16} /> Global Impact Map</li>
            <li onClick={() => navigate('/impact/dataBreach')}><Database size={16} /> Data Breach Impact</li>
            <li onClick={() => navigate('/impact/business')}><TrendingDown size={16} /> Business Impact</li>
            <li onClick={() => navigate('/impact/downtime')}><Clock size={16} /> Downtime & Recovery</li>
          </ul>

          <div className="did-you-know">
            <h4><Info size={16} /> DID YOU KNOW?</h4>
            <p>The global cost of cybercrime is predicted to reach <strong className="text-neon">$10.5 TRILLION</strong> annually by 2025.</p>
            <span className="source-text">Source: Cybersecurity Ventures</span>
          </div>

          <div className="impact-score-widget neon-box">
            <h4>GLOBAL IMPACT SCORE</h4>
            <div className="score-circle">
              <span className="score-value">8.7<span className="small">/10</span></span>
              <span className="score-label text-danger">EXTREME</span>
            </div>
          </div>
        </div>

        <div className="impact-main">
          <div className="impact-intro">
            <h1 className="title-main text-neon glow-text">CYBER ATTACK IMPACT</h1>
            <p className="subtitle-desc">
              Cyber attacks don't just steal data — they disrupt lives, damage reputations, and cost billions. Explore the real-world impact across industries, economies, and society.
            </p>
          </div>

          <div className="impact-kpi-grid">
            <div className="kpi-card neon-box">
              <div className="kpi-icon"><DollarSign size={24} /></div>
              <div className="kpi-data">
                <span className="kpi-label">TOTAL ANNUAL FINANCIAL LOSS</span>
                <span className="kpi-value text-neon">$ 8.44T</span>
                <span className="kpi-trend up"><ArrowUpRight size={14} /> 15.6% vs 2023</span>
              </div>
            </div>
            <div className="kpi-card neon-box">
              <div className="kpi-icon"><ShieldAlert size={24} /></div>
              <div className="kpi-data">
                <span className="kpi-label">TOTAL INCIDENTS (2024)</span>
                <span className="kpi-value">4.1M+</span>
                <span className="kpi-trend up"><ArrowUpRight size={14} /> 22.3% vs 2023</span>
              </div>
            </div>
            <div className="kpi-card neon-box">
              <div className="kpi-icon"><Database size={24} /></div>
              <div className="kpi-data">
                <span className="kpi-label">TOTAL RECORDS COMPROMISED</span>
                <span className="kpi-value">16.2B+</span>
                <span className="kpi-trend up"><ArrowUpRight size={14} /> 28.7% vs 2023</span>
              </div>
            </div>
            <div className="kpi-card neon-box">
              <div className="kpi-icon"><Users size={24} /></div>
              <div className="kpi-data">
                <span className="kpi-label">PEOPLE AFFECTED GLOBALLY</span>
                <span className="kpi-value">3.2B+</span>
                <span className="kpi-trend up"><ArrowUpRight size={14} /> 18.9% vs 2023</span>
              </div>
            </div>
            <div className="kpi-card neon-box">
              <div className="kpi-icon"><DollarSign size={24} /></div>
              <div className="kpi-data">
                <span className="kpi-label">AVERAGE COST PER BREACH</span>
                <span className="kpi-value">$ 4.88M</span>
                <span className="kpi-trend up"><ArrowUpRight size={14} /> 10.4% vs 2023</span>
              </div>
            </div>
          </div>

          <div className="impact-charts-row">
            <div className="chart-box neon-box flex-2">
              <h3 className="section-title">FINANCIAL IMPACT OVER TIME <span className="small-text">(IN TRILLIONS USD)</span></h3>
              <div className="bar-chart-placeholder">
                <div className="bar-wrapper"><div className="bar" style={{ height: '38%' }}></div><span>2020</span></div>
                <div className="bar-wrapper"><div className="bar" style={{ height: '46%' }}></div><span>2021</span></div>
                <div className="bar-wrapper"><div className="bar" style={{ height: '54%' }}></div><span>2022</span></div>
                <div className="bar-wrapper"><div className="bar" style={{ height: '66%' }}></div><span>2023</span></div>
                <div className="bar-wrapper"><div className="bar" style={{ height: '84%' }}></div><span>2024</span></div>
                <div className="bar-wrapper"><div className="bar text-neon" style={{ height: '100%' }}></div><span className="text-neon">2025*</span></div>
              </div>
            </div>

            <div className="chart-box neon-box flex-1">
              <h3 className="section-title">IMPACT BREAKDOWN (2024)</h3>
              <div className="donut-chart-container">
                <div className="donut-chart">
                  <div className="donut-hole">TOTAL<br />IMPACT</div>
                </div>
                <ul className="chart-legend">
                  <li><span className="legend-color c1"></span> Financial Loss 45%</li>
                  <li><span className="legend-color c2"></span> Data Breach 25%</li>
                  <li><span className="legend-color c3"></span> Downtime 15%</li>
                  <li><span className="legend-color c4"></span> Reputation 10%</li>
                  <li><span className="legend-color c5"></span> Legal 5%</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="impact-details-row grid-3">
            <div className="detail-box neon-box">
              <h3 className="section-title">DOWNTIME & RECOVERY</h3>
              <div className="downtime-stats">
                <div className="dt-stat">
                  <Clock className="text-neon" size={32} />
                  <span className="dt-val">24.6 HRS</span>
                  <span className="dt-lbl">Average Downtime per Incident</span>
                </div>
                <div className="dt-stat">
                  <DollarSign className="text-warning" size={32} />
                  <span className="dt-val">$1.85M</span>
                  <span className="dt-lbl">Average Recovery Cost</span>
                </div>
              </div>
            </div>

            <div className="detail-box neon-box">
              <h3 className="section-title">DATA BREACH IMPACT</h3>
              <div className="breach-stats">
                <div className="bs-stat">
                  <Database className="text-neon" size={24} />
                  <span className="bs-val">16.2B+</span>
                  <span className="bs-lbl">Records Compromised</span>
                </div>
                <div className="bs-stat">
                  <Users className="text-neon" size={24} />
                  <span className="bs-val">3.2B+</span>
                  <span className="bs-lbl">Individuals Affected</span>
                </div>
              </div>
            </div>

            <div className="detail-box neon-box">
              <h3 className="section-title">BUSINESS IMPACT ANALYSIS</h3>
              <ul className="bia-list">
                <li>
                  <AlertOctagon className="text-danger" size={20} />
                  <div className="bia-info">
                    <h5>Revenue Loss</h5>
                    <p>Loss of income due to system downtime.</p>
                  </div>
                </li>
                <li>
                  <ShieldAlert className="text-warning" size={20} />
                  <div className="bia-info">
                    <h5>Reputation Damage</h5>
                    <p>Loss of customer trust and brand value.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <div className="impact-footer neon-box">
        <div className="footer-actions">
          <div className="action-item">
            <ShieldCheck size={24} className="text-neon" />
            <span>Assess Risks</span>
          </div>
          <div className="action-item">
            <Lock size={24} className="text-neon" />
            <span>Strengthen Security</span>
          </div>
          <div className="action-item">
            <Activity size={24} className="text-neon" />
            <span>Incident Response</span>
          </div>
          <div className="action-item">
            <Briefcase size={24} className="text-neon" />
            <span>Business Continuity</span>
          </div>
        </div>
        <p className="mono-font glow-text text-neon">Every attack has an impact. Every impact teaches us how to defend. Learn. Stay Aware. Reduce Impact.</p>
      </div>
    </div>
  );
};



const ImpactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const content = impactDetailsData[id];

  if (!content) {
    return (
      <div className="page-container impact-page" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2 className="text-neon">Impact Not Found</h2>
        <button className="btn-primary" onClick={() => navigate('/impact')} style={{ marginTop: '2rem' }}>
          <ArrowLeft size={18} style={{ marginRight: '0.5rem', display: 'inline' }} /> BACK TO OVERVIEW
        </button>
      </div>
    );
  }

  return (
    <div className="page-container impact-page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          className="explore-btn text-neon neon-box"
          onClick={() => navigate('/impact')}
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--color-neon-green)',
            cursor: 'pointer',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <ArrowLeft size={18} /> BACK TO IMPACT OVERVIEW
        </button>
      </div>

      <div className="impact-detail-wrapper neon-box p-4" style={{ padding: '2rem', background: 'rgba(0,0,0,0.4)' }}>
        {content}
      </div>
    </div>
  );
};


FileText,
  Users,
  Calendar,
  Search,
  Star,
  ShieldAlert,
  Lock,
  Shield,
  Cloud,
  Cpu,
  MonitorOff,
  Crosshair,
  LockKeyhole,
  CheckCircle,
  Smartphone,
  X

const featuredArticles = [
  { id: '01', category: 'AI SECURITY', time: '8 min read', title: 'The Rise of AI-Powered Cyber Attacks in 2026', desc: 'Artificial Intelligence is transforming cybercrime. Discover how attackers use AI for phishing, deepfakes, malware creation, and social engineering.', tags: ['AI Security', 'Deepfake', 'Phishing'], image: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1781898304/621da498-46d7-4325-8268-47cb693ff87c_pfvggx.png' },
  { id: '02', category: 'MALWARE', time: '10 min read', title: 'Understanding Ransomware: How Modern Attacks Work', desc: 'Learn how ransomware infects systems, encrypts data, and demands payment. Explore real-world incidents and prevention strategies.', tags: ['Ransomware', 'Malware', 'Data Protection'], image: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1781899032/78af9f8f-086e-41ee-9e76-91effa18719b_nwgnaj.png' },
  { id: '03', category: 'AWARENESS', time: '6 min read', title: 'Top 10 Cybersecurity Threats Every Student Should Know', desc: 'A beginner-friendly guide covering phishing, malware, password attacks, social engineering, and online safety.', tags: ['Students', 'Awareness', 'Security'], image: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1781898778/70722c4f-49c4-4caa-a12c-82f962510721_slkd7t.png' },
  { id: '04', category: 'EMERGING THREATS', time: '7 min read', title: 'Deepfake Attacks: The New Face of Cybercrime', desc: 'Deepfake technology is becoming a serious security concern. Learn how fake videos and voices are used for fraud and manipulation.', tags: ['Deepfake', 'AI', 'Fraud'], image: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1781898472/5fcb275e-3790-45a8-86f1-b885091b8e42_ib14mz.png' },
  { id: '05', category: 'WEB SECURITY', time: '9 min read', title: 'SQL Injection Explained', desc: 'Understand one of the oldest yet most dangerous web application attacks and how developers can prevent it.', tags: ['SQLi', 'Web Security', 'OWASP'], image: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1781898548/9eca0fd9-f2f1-456c-af05-ba13e79af531_c2giy1.png' },
  { id: '06', category: 'CASE STUDY', time: '12 min read', title: 'Inside the WannaCry Ransomware Attack', desc: 'A detailed breakdown of the WannaCry outbreak that affected over 200,000 systems worldwide.', tags: ['WannaCry', 'Incident Analysis', 'Malware'], image: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1781898095/ff8c9fe2-92f1-4d1d-a93f-b228dc76788e_okscxt.png' },
  { id: '07', category: 'MALWARE', time: '15 min read', title: 'The $10 Billion Heartbreak: How a Rejected Thesis Broke the Internet', desc: 'On May 4, 2000, a digital epidemic began that would fundamentally rewrite the rules of global connectivity. This was the day the world opened a love letter it should have ignored.', tags: ['ILOVEYOU', 'Social Engineering', 'Malware'], image: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1781897560/cd1c3e4b-1221-4e41-aa80-393ef32f5cc4_lpdgaa.png' },
  { id: '08', category: 'MALWARE', time: '14 min read', title: 'The Virus That Broke the Internet: 5 Surprising Lessons from the 1999 Melissa Outbreak', desc: 'In March 1999, the digital world was a far more trusting place. That changed when a single Microsoft Word document began a silent, high-speed crawl across the globe.', tags: ['Melissa', 'Macro Virus', 'Cyber History'], image: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1781897681/72425fc3-43c1-4f68-88fc-8c394b483427_ywgvh2.png' },
  { id: '09', category: 'CASE STUDY', time: '16 min read', title: 'The Virus That Broke the Hardware: Lessons from the $1 Billion "Chernobyl" Bug', desc: 'In 1998, the CIH virus proved that a string of malicious bits could do more than just delete a file; it could effectively "kill" a physical machine.', tags: ['CIH', 'Chernobyl', 'Malware'], image: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1781897139/470f9aca-781d-4c44-b01f-64be012e1ad2_ydevnp.png' },
  { id: '10', category: 'MALWARE', time: '15 min read', title: 'The Unstoppable Digital Plague: 5 Surprising Truths About Mydoom, the Fastest-Spreading Worm in History', desc: 'In 2004, the Mydoom worm struck, bringing the global web to a crawl and holding the record for the fastest-spreading email worm ever.', tags: ['Mydoom', 'Worm', 'Malware'], image: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1781897325/9e961328-24f9-4567-9012-91b3938d0c49_gcdce6.png' },
  { id: '11', category: 'CASE STUDY', time: '13 min read', title: 'The Patch That Wasn’t: How an 18-Year-Old’s Code Ground the World to a Halt', desc: 'In April 2004, the zero-click Sasser worm triggered global system shutdowns by exploiting an unpatched Windows vulnerability, highlighting the vital need for digital hygiene.', tags: ['Sasser', 'Zero-Click', 'Incident Analysis'], image: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1781896465/d0302956-26b0-4e95-8565-14125967f594_t7xski.png' },
];

// Simple bug icon helper
const BugIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 2 1.88 1.88" /><path d="M14.12 3.88 16 2" /><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" /><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" /><path d="M12 20v-9" /><path d="M6.53 9C4.6 8.8 3 7.1 3 5" /><path d="M6 13H2" /><path d="M3 21c0-2.1 1.7-3.9 3.8-4" /><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" /><path d="M22 13h-4" /><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" /></svg>
)

const categories = [
  { name: 'Cybersecurity Basics', icon: <Shield /> },
  { name: 'Malware Analysis', icon: <BugIcon /> },
  { name: 'Ransomware', icon: <LockKeyhole /> },
  { name: 'Threat Intelligence', icon: <Crosshair /> },
  { name: 'AI Security', icon: <Cpu /> },
  { name: 'Web Application Security', icon: <MonitorOff /> },
  { name: 'Cloud Security', icon: <Cloud /> },
  { name: 'Digital Forensics', icon: <Search /> },
  { name: 'Ethical Hacking', icon: <ShieldAlert /> },
  { name: 'Incident Response', icon: <CheckCircle /> },
];

const popularTopics = ['Ransomware', 'Phishing', 'Malware', 'AI Security', 'Cloud Security', 'Threat Intelligence', 'Web Security', 'Data Protection', 'Ethical Hacking', 'Incident Response'];
const popularTags = ['#CyberSecurity', '#Ransomware', '#AIThreats', '#Deepfake', '#Malware', '#Phishing', '#EthicalHacking', '#CloudSecurity', '#ThreatIntel', '#OWASP', '#CyberAwareness', '#DataProtection', '#WebSecurity', '#SQLInjection', '#ZeroDay'];

const CyberBlogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredArticles = featuredArticles.filter(article => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.desc.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const articlesToDisplay = (showAll || searchQuery) ? filteredArticles : filteredArticles.slice(0, 4);

  const handleReadMore = (id, e) => {
    e.preventDefault();
    setSelectedBlog(id);
  };

  const closeBlog = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedBlog(null);
      setIsClosing(false);
    }, 700); // Wait for the hand pull animation
  };

  return (
    <div className="page-container blogs-page">
      {(selectedBlog || isClosing) && (
        <div className={`blog-modal-overlay ${isClosing ? 'overlay-closing' : ''}`} onClick={closeBlog}>
          {isClosing && (
            <div className="robotic-hand">
              🦾
            </div>
          )}
          <div className={`blog-modal-content neon-box ${isClosing ? 'modal-pulled-away' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="text-neon glow-text">{featuredArticles.find(a => a.id === selectedBlog)?.title}</h2>
              <button className="close-btn" onClick={closeBlog}><X size={24} /></button>
            </div>
            <div className="modal-body custom-scrollbar">
              {blogContents[selectedBlog]}
            </div>
          </div>
        </div>
      )}
      <div className="blogs-header grid-sidebar">
        <div className="blogs-main-intro">
          <div className="breadcrumb">Home &gt; Cyber Blogs</div>
          <h1 className="title-main text-neon glow-text">
            CYBER SECURITY<br />BLOGS
          </h1>
          <p className="subtitle-desc">
            Stay informed with the latest cybersecurity trends, attack analysis, threat intelligence, and security best practices.
          </p>

          <div className="blogs-stats-row">
            <div className="blog-stat">
              <FileText className="text-neon" size={24} />
              <div className="stat-text"><span className="stat-num">200+</span><br />Blog Articles</div>
            </div>
            <div className="blog-stat">
              <Users className="text-neon" size={24} />
              <div className="stat-text"><span className="stat-num">50+</span><br />Expert Authors</div>
            </div>
            <div className="blog-stat">
              <Calendar className="text-neon" size={24} />
              <div className="stat-text"><span className="stat-num">Updated</span><br />Weekly</div>
            </div>
          </div>
        </div>

        {/* removed decorative laptop-wireframe to reduce clutter on small screens */}
      </div>

      <div className="blogs-layout">
        <div className="blogs-left-col">
          <div className="section-header">
            <h3 className="section-title"><Star size={20} /> FEATURED ARTICLES</h3>
          </div>

          <div className="featured-grid">
            {articlesToDisplay.length > 0 ? articlesToDisplay.map(article => (
              <div key={article.id} className="blog-card neon-box">
                <div className="blog-card-img-placeholder" style={article.image ? { padding: 0, overflow: 'hidden' } : {}}>
                  <span className="blog-number" style={article.image ? { zIndex: 10 } : {}}>{article.id}</span>
                  {article.image ? (
                    <ZoomableImage src={article.image} alt={article.title} className="blog-card-full-img" />
                  ) : (
                    <>
                      {/* Pseudo images based on category */}
                      {article.category.includes('AI') && <Cpu size={48} className="placeholder-icon" />}
                      {article.category.includes('MALWARE') && <Lock size={48} className="placeholder-icon text-danger" />}
                      {article.category.includes('WEB') && <MonitorOff size={48} className="placeholder-icon" />}
                      {!['AI SECURITY', 'MALWARE', 'WEB SECURITY'].includes(article.category) && <ShieldAlert size={48} className="placeholder-icon" />}
                    </>
                  )}
                </div>
                <div className="blog-card-meta">
                  <span className="blog-category text-neon">{article.category}</span>
                  <span className="blog-time">• {article.time}</span>
                </div>
                <h4>{article.title}</h4>
                <p>{article.desc}</p>
                <div className="blog-tags">
                  {article.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <button className="read-more explore-btn text-neon" style={{ marginTop: 'auto' }} onClick={(e) => handleReadMore(article.id, e)}>READ MORE &rarr;</button>
              </div>
            )) : <p style={{ color: 'var(--color-text-muted)', gridColumn: '1 / -1' }}>No articles found matching "{searchQuery}"</p>}
          </div>

          {(!searchQuery && filteredArticles.length > 4) && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                className="explore-btn text-neon neon-box"
                style={{ background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', padding: '0.75rem 2rem' }}
                onClick={(e) => { e.preventDefault(); setShowAll(!showAll); }}
              >
                {showAll ? 'SHOW LESS \u2191' : 'VIEW ALL ARTICLES \u2192'}
              </button>
            </div>
          )}

          <div className="browse-category-section">
            <div className="section-header">
              <h3 className="section-title"><Search size={20} /> BROWSE BY CATEGORY</h3>
            </div>
            <div className="category-icons-grid">
              {categories.map(cat => (
                <div key={cat.name} className="cat-icon-box neon-box">
                  <div className="cat-icon-wrapper text-neon">{cat.icon}</div>
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="most-read-section">
            <div className="section-header">
              <h3 className="section-title"><FileText size={20} /> MOST READ ARTICLES</h3>
              <a href="#" className="explore-link">VIEW ALL POPULAR ARTICLES &rarr;</a>
            </div>
            <div className="most-read-list neon-box">
              <div className="most-read-item">
                <span className="mr-num">01</span>
                <div className="mr-info">
                  <h5>What is Phishing? How to Stay Safe from Phishing Attacks</h5>
                  <span className="mr-meta">15 min read • 25.3K views</span>
                </div>
              </div>
              <div className="most-read-item">
                <span className="mr-num">02</span>
                <div className="mr-info">
                  <h5>How Hackers Exploit Weak Passwords (And How to Stop Them)</h5>
                  <span className="mr-meta">10 min read • 18.7K views</span>
                </div>
              </div>
              <div className="most-read-item">
                <span className="mr-num">03</span>
                <div className="mr-info">
                  <h5>Guide to Securing Your Wi-Fi Network</h5>
                  <span className="mr-meta">8 min read • 14.2K views</span>
                </div>
              </div>
              <div className="most-read-item">
                <span className="mr-num">04</span>
                <div className="mr-info">
                  <h5>Zero-Day Exploits: How Hackers Find and Use Them</h5>
                  <span className="mr-meta">11 min read • 12.6K views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blogs-right-col">
          <div className="search-widget neon-box">
            <h3 className="sidebar-title">SEARCH BLOGS</h3>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search articles, topics..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="search-icon" />
            </div>
          </div>

          <div className="topics-widget">
            <h3 className="sidebar-title">POPULAR TOPICS</h3>
            <div className="tags-cloud">
              {popularTopics.map(topic => (
                <span
                  key={topic}
                  className="cloud-tag"
                  onClick={() => setSearchQuery(topic)}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="recent-headlines-widget neon-box">
            <h3 className="sidebar-title">RECENT HEADLINES</h3>
            <ul className="headlines-list">
              <li>
                <Cpu className="hl-icon text-neon" size={24} />
                <div className="hl-info">
                  <h5>New AI-Generated Phishing Campaigns Detected</h5>
                  <span>2 hours ago</span>
                </div>
              </li>
              <li>
                <Cloud className="hl-icon text-neon" size={24} />
                <div className="hl-info">
                  <h5>Rise in Cloud Security Misconfigurations</h5>
                  <span>5 hours ago</span>
                </div>
              </li>
              <li>
                <ShieldAlert className="hl-icon text-neon" size={24} />
                <div className="hl-info">
                  <h5>Healthcare Sector Targeted by Ransomware Groups</h5>
                  <span>1 day ago</span>
                </div>
              </li>
              <li>
                <Crosshair className="hl-icon text-neon" size={24} />
                <div className="hl-info">
                  <h5>Supply Chain Attacks Continue to Increase</h5>
                  <span>2 days ago</span>
                </div>
              </li>
              <li>
                <Smartphone className="hl-icon text-neon" size={24} />
                <div className="hl-info">
                  <h5>Mobile Banking Malware Threats Growing</h5>
                  <span>3 days ago</span>
                </div>
              </li>
            </ul>
            <a href="#" className="explore-link right-align" style={{ marginTop: '1rem' }}>VIEW ALL NEWS &rarr;</a>
          </div>

          <div className="tags-widget">
            <div className="section-header">
              <h3 className="sidebar-title"># POPULAR TAGS</h3>
              <a href="#" className="explore-link">VIEW ALL TAGS &rarr;</a>
            </div>
            <div className="tags-cloud hashtags">
              {popularTags.map(tag => <span key={tag} className="cloud-tag hash">{tag}</span>)}
            </div>
          </div>

          <div className="promo-widget neon-box">
            <h3 className="promo-title text-neon">WANT TO BECOME CYBER AWARE?</h3>
            <p className="promo-desc">Explore real-world cyber attacks, learn modern defense techniques, and stay updated with the latest threat intelligence.</p>
            <div className="promo-shield-wrap">
              <Shield size={60} className="text-neon glow-text" />
              <Lock size={20} className="promo-lock" />
            </div>
            <button className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>EXPLORE LEARNING HUB &rarr;</button>
            <button className="btn-secondary" style={{ width: '100%' }}>READ LATEST BLOGS &rarr;</button>
          </div>
        </div>
      </div>


    </div>
  );
};



// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const routerBase = import.meta.env.BASE_URL || '/';

  if (isLoading) {
    return <CyberLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <Router basename={routerBase}>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/traditional" element={<TraditionalAttacks />} />
            <Route path="/trending" element={<TrendingAttacks />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/impact/:id" element={<ImpactDetail />} />
            <Route path="/blogs" element={<CyberBlogs />} />
          </Routes>
        </main>
        <OfflinePopup />
      </div>
    </Router>
  );
}

export default App;
