import { useEffect, useState, useRef } from 'react';

type EmailData = {
  subject: string;
  bodyHtml: string;
  bodyText: string;
};

type RewrittenEmail = {
  subject: string;
  body: string;
};

export function SidePanelApp() {
  const [tone, setTone] = useState('Formal');
  const [_addSignature, _setAddSignature] = useState(true);
  const [email, setEmail] = useState<EmailData | null>(null);
  const [translate, setTranslate] = useState(false);
  const [fromLanguage, setFromLanguage] = useState('Auto-detect');
  const [toLanguage, setToLanguage] = useState('Spanish');
  const [rewritten, setRewritten] = useState<RewrittenEmail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const hasAutoWritten = useRef(false);
  const [cooldownProgress, setCooldownProgress] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);
  const loadingIntervalRef = useRef<number | null>(null);
  const cooldownIntervalRef = useRef<number | null>(null);
  const [typedSubject, setTypedSubject] = useState('');
  const [typedBody, setTypedBody] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);
  
  const [isLightMode, setIsLightMode] = useState(true);

  // Calculate character count from email body
  const charCount = email?.bodyText ? email.bodyText.trim().length : 0;

  // Load existing data when side panel opens
  useEffect(() => {
    // 1) Load latest email when panel opens
    chrome.storage.local.get('mailpilotEmailData', (result) => {
      console.log('[MailPilot sidepanel] initial storage.get', result);
      if (result.mailpilotEmailData) {
        setEmail(result.mailpilotEmailData as EmailData);
      }
    });

    // 2) Listen for future updates
    const handleChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string,
    ) => {
      if (areaName !== 'local') return;
      if (changes.mailpilotEmailData?.newValue) {
        console.log(
          '[MailPilot sidepanel] storage.onChanged',
          changes.mailpilotEmailData.newValue,
        );
        setEmail(changes.mailpilotEmailData.newValue as EmailData);
        // Clear rewritten email when new email is loaded
        setRewritten(null);
      }
    };

    chrome.storage.onChanged.addListener(handleChange);
    return () => chrome.storage.onChanged.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (!email) return;
    if (hasAutoWritten.current) return;

    hasAutoWritten.current = true;
    void handleRewrite();
    
  }, [email]);

  // Loading animation effect (white overlay during rewrite)
  useEffect(() => {
    if (isLoading) {
      // Start loading animation when loading starts
      setCooldownProgress(0);
      
      const duration = 3000; // 3 seconds
      const interval = 50; // Update every 50ms
      const increment = (100 / (duration / interval));
      
      loadingIntervalRef.current = window.setInterval(() => {
        setCooldownProgress((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            if (loadingIntervalRef.current) {
              clearInterval(loadingIntervalRef.current);
              loadingIntervalRef.current = null;
            }
            return 100;
          }
          return next;
        });
      }, interval);
    } else {
      // Reset when loading stops
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
      // Only reset progress if not in cooldown
      if (!isCooldown) {
        setCooldownProgress(0);
      }
    }

    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
    };
  }, [isLoading, isCooldown]);

  // Cooldown animation effect (blue overlay after rewrite completes)
  useEffect(() => {
    if (isCooldown) {
      // Start cooldown animation
      setCooldownProgress(0);
      
      const duration = 5000; // 5 seconds cooldown
      const interval = 50; // Update every 50ms
      const increment = (100 / (duration / interval));
      
      cooldownIntervalRef.current = window.setInterval(() => {
        setCooldownProgress((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            if (cooldownIntervalRef.current) {
              clearInterval(cooldownIntervalRef.current);
              cooldownIntervalRef.current = null;
            }
            setIsCooldown(false);
            return 0;
          }
          return next;
        });
      }, interval);
    } else {
      // Reset when cooldown stops
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
        cooldownIntervalRef.current = null;
      }
      if (!isLoading) {
        setCooldownProgress(0);
      }
    }

    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
        cooldownIntervalRef.current = null;
      }
    };
  }, [isCooldown, isLoading]);

  // Typing animation effect
  useEffect(() => {
    if (!rewritten) {
      setTypedSubject('');
      setTypedBody('');
      setIsTyping(false);
      return;
    }

    // Reset and start typing animation
    setTypedSubject('');
    setTypedBody('');
    setIsTyping(true);

    const typeSpeed = 10; // milliseconds per character (fast typing)
    let subjectIndex = 0;
    let bodyIndex = 0;
    let isTypingSubject = true;

    const typeNextChar = () => {
      if (isTypingSubject) {
        if (subjectIndex < rewritten.subject.length) {
          setTypedSubject(rewritten.subject.substring(0, subjectIndex + 1));
          subjectIndex++;
          typingTimeoutRef.current = window.setTimeout(typeNextChar, typeSpeed);
        } else {
          // Subject done, start typing body
          isTypingSubject = false;
          typingTimeoutRef.current = window.setTimeout(typeNextChar, typeSpeed);
        }
      } else {
        if (bodyIndex < rewritten.body.length) {
          setTypedBody(rewritten.body.substring(0, bodyIndex + 1));
          bodyIndex++;
          typingTimeoutRef.current = window.setTimeout(typeNextChar, typeSpeed);
        } else {
          // All done
          setIsTyping(false);
        }
      }
    };

    // Start typing
    typingTimeoutRef.current = window.setTimeout(typeNextChar, typeSpeed);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, [rewritten]);

  // Listen for rewrite responses from background script
  useEffect(() => {
    // Method 1: Listen for runtime messages
    const handleMessage = (message: any) => {
      console.log('[MailPilot sidepanel] Received message:', message);
      
      if (message.type === 'REWRITE_COMPLETE') {
        console.log('[MailPilot sidepanel] Got rewritten email:', message.rewritten);
        setRewritten(message.rewritten as RewrittenEmail);
        setIsLoading(false);
        setError(null);
        // Start cooldown after rewrite completes
        setIsCooldown(true);
      }
      if (message.type === 'REWRITE_ERROR') {
        console.error('[MailPilot sidepanel] Rewrite error:', message.error);
        setError(message.error as string);
        setIsLoading(false);
        // Don't start cooldown on error
        setIsCooldown(false);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);
    
    // Method 2: Also listen for storage changes as backup
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string,
    ) => {
      if (areaName !== 'local') return;
      
      if (changes.mailpilotRewrittenEmail?.newValue) {
        console.log('[MailPilot sidepanel] Got rewritten email from storage:', changes.mailpilotRewrittenEmail.newValue);
        setRewritten(changes.mailpilotRewrittenEmail.newValue as RewrittenEmail);
        setIsLoading(false);
        setError(null);
        // Start cooldown after rewrite completes
        setIsCooldown(true);
      }
      
      if (changes.mailpilotRewriteError?.newValue) {
        console.error('[MailPilot sidepanel] Got error from storage:', changes.mailpilotRewriteError.newValue);
        setError(changes.mailpilotRewriteError.newValue as string);
        setIsLoading(false);
        setIsCooldown(false);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    
    // Also check storage on mount in case message was missed
    chrome.storage.local.get(['mailpilotRewrittenEmail', 'mailpilotRewriteError'], (result) => {
      if (result.mailpilotRewrittenEmail) {
        setRewritten(result.mailpilotRewrittenEmail as RewrittenEmail);
        setIsLoading(false);
      }
      if (result.mailpilotRewriteError) {
        setError(result.mailpilotRewriteError as string);
        setIsLoading(false);
      }
    });

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);
  
  useEffect(() => {
    chrome.storage.local.get('mailpilotTheme', (result) => {
      if (result.mailpilotTheme !== undefined) {
        setIsLightMode(result.mailpilotTheme as boolean);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ mailpilotTheme: isLightMode });
  }, [isLightMode]);

  const toggleLightMode = () => {
    setIsLightMode((prev) => !prev);
  }

  // Function to detect suspicious patterns that might be jailbreak attempts
  const detectSuspiciousPatterns = (text: string): string | null => {
    const suspiciousPatterns = [
      { pattern: /ignore\s+(all\s+)?(previous|above|prior)\s+instructions/i, message: 'Contains instructions to ignore AI guidelines' },
      { pattern: /disregard\s+(all\s+)?(previous|above|prior)\s+instructions/i, message: 'Contains instructions to disregard AI guidelines' },
      { pattern: /forget\s+(all\s+)?(previous|above|prior)\s+instructions/i, message: 'Contains instructions to forget AI guidelines' },
      { pattern: /you\s+are\s+now\s+(a|an)?\s+(math|creative|poem|story|calculator|chatbot)/i, message: 'Attempts to redefine AI role' },
      { pattern: /act\s+as\s+(a|an)\s+(math|creative|poem|story|calculator|chatbot|assistant)\s+(?!for\s+(our|the|my))/i, message: 'Attempts to change AI behavior' },
      { pattern: /pretend\s+to\s+be\s+(a|an)/i, message: 'Attempts to change AI role' },
      { pattern: /roleplay\s+as/i, message: 'Attempts roleplay behavior' },
      { pattern: /your\s+new\s+role\s+(is|will)/i, message: 'Attempts to assign new role' },
      { pattern: /system\s+prompt/i, message: 'References system prompt' },
      { pattern: /do\s+not\s+(rewrite|improve|make|change|add|remove|summarize|paraphrase)\s+(this|it|anything)/i, message: 'Instructs AI not to perform its function' },
      { pattern: /this\s+is\s+not\s+an?\s+email/i, message: 'Claims content is not an email' },
      { pattern: /test\s+(of\s+)?ai\s+(email|rewrite|extension|model|behavior)/i, message: 'Appears to be testing AI behavior' },
      { pattern: /test\s+conditions/i, message: 'Contains test conditions for AI' },
      { pattern: /output\s+only\s+(the|one)/i, message: 'Attempts to control AI output format' },
      { pattern: /you\s+must\s+(not\s+)?output\s+(anything|only)/i, message: 'Attempts to control AI output' },
      { pattern: /the\s+only\s+thing\s+you\s+must/i, message: 'Attempts to override AI instructions' },
    ];
    
    for (const { pattern, message } of suspiciousPatterns) {
      if (pattern.test(text)) {
        return message;
      }
    }
    
    // Check for excessive use of capital letters (shouting/emphasis to force behavior)
    // Exclude common patterns like URLs, email addresses, acronyms
    const words = text.split(/\s+/);
    const capsWords = words.filter(word => {
      // Skip words that are likely acronyms (3 chars or less) or URLs/emails
      if (word.length <= 3 || word.includes('@') || word.includes('://') || word.includes('.com')) {
        return false;
      }
      return word === word.toUpperCase() && /^[A-Z]+$/.test(word);
    });
    
    if (capsWords.length > 8) {
      return 'Contains excessive capitalization that may attempt to manipulate AI';
    }
    
    return null;
  };

  const rewriteEmail = async () => {
    setIsLoading(true);
    setError(null);
    setWarning(null);
    setRewritten(null);
    setIsCooldown(false);

    chrome.storage.local.get('mailpilotActiveTabId', (res) => {
      const tabId = res.mailpilotActiveTabId as number | undefined;
      if (!tabId) {
        setError('No active Gmail tab found for this panel.');
        setIsLoading(false);
        return;
      }

      chrome.tabs.sendMessage(tabId, { type: 'GET_EMAIL_DATA' }, (response) => {
        if (chrome.runtime.lastError) {
          setError('Could not retrieve email data');
          setIsLoading(false);
          return;
        }

        const freshEmail = response as EmailData;
        if (!freshEmail) {
          setError('Could not retrieve email data');
          setIsLoading(false);
          return;
        }

        setEmail(freshEmail);
        const charCount = freshEmail.bodyText ? freshEmail.bodyText.trim().length : 0;

        if (!freshEmail.subject?.trim()) {
          setError('Add a subject to your email before using MailPilot.');
          setIsLoading(false);
          return;
        }

        if (!freshEmail.bodyText?.trim()) {
          setError('Your email body is empty. Write your email first, then click Rewrite.');
          setIsLoading(false);
          return;
        }

        if (charCount < 30) {
          setError('Email is too short. Please write at least 30 characters.');
          setIsLoading(false);
          return;
        }

        // Check for suspicious patterns
        const combinedText = `${freshEmail.subject} ${freshEmail.bodyText}`;
        const suspiciousWarning = detectSuspiciousPatterns(combinedText);
        
        if (suspiciousWarning) {
          setWarning(`⚠️ Warning: Your email ${suspiciousWarning}. The AI will still attempt to rewrite it as a professional email, but results may vary.`);
          console.warn('Suspicious pattern detected:', suspiciousWarning);
        }

        console.log('Rewriting with tone:', tone);
        if (translate) {
          console.log('Translation from:', fromLanguage, 'to:', toLanguage);
        }

        // Send rewrite request with fresh email data
        chrome.runtime.sendMessage({
          type: 'REWRITE_EMAIL',
          email: freshEmail,
          tone,
          translate: translate ? { from: fromLanguage !== 'Auto-detect' ? fromLanguage : undefined, to: toLanguage } : undefined,
        });
      });
    });
  };

  const handleRewrite = () => {
    void rewriteEmail();
  };

  const handleApply = () => {
    if (!rewritten) return;

    console.log('[MailPilot sidepanel] Applying email:', rewritten);

    chrome.runtime.sendMessage({
      type: 'APPLY_EMAIL',
      subject: rewritten.subject,
      body: rewritten.body,
    }, (_response) => {
      if (chrome.runtime.lastError) {
        // console.error('[MailPilot sidepanel] Error applying email:', chrome.runtime.lastError);
      } else {
        console.log('[MailPilot sidepanel] Email applied successfully');
      }
    });
  };

  const isTooShort = charCount < 30;
  const isButtonDisabled = isTooShort || isLoading || isCooldown;

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Chinese',
    'Japanese',
    'Korean',
    'Arabic',
    'Hindi',
    'Russian',
    'Dutch',
    'Polish',
    'Turkish',
    'Tamil',
    'Vietnamese',
    'Thai',
    'Indonesian',
    'Greek',
    'Swedish',
    'Norwegian',
    'Danish',
    'Finnish',
    'Czech',
    'Hungarian',
    'Romanian',
    'Ukrainian',
    'Hebrew',
    'Malay',
  ];

  return (
    <div className={`flex flex-col h-screen ${isLightMode ? 'bg-white' : 'bg-[#1a1a1a]'} ${isLightMode ? 'text-[#1a1a1a]' : 'text-white'} font-sans`}>
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto mb-4">
        {/* <h1 className="text-2xl font-bold mt-6 mb-4 text-[#1a1a1a]">MailPilot AI</h1>
        <h2 className="text-lg font-medium mb-8 text-[#333333]">
          Enhance your email drafts with AI-powered rewriting
        </h2>

        <hr className="border-t border-gray-300 w-full mx-auto mb-8" /> */}
        <div className="flex justify-end">
          <button className="" onClick={toggleLightMode}>
            {isLightMode ? (
              <img src="icons/moon.svg" alt="Dark Mode" className="mt-[2rem] w-9 h-9 hover:opacity-80" />
            ) : (
              <img src="icons/sun.svg" alt="Light Mode" className="mt-[2rem] w-9 h-9 hover:opacity-80" />
            )}
          </button>
        </div>
        

        <h1 className="text-xl font-semibold mt-[-2rem] mb-6">Select your tone</h1>

        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="flex-1 min-w-[120px]">
            <select
              className={`w-full px-3 py-2.5 border border-[#d0d0d0] rounded-md text-sm ${isLightMode ? 'bg-white text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white'}  cursor-pointer appearance-none hover:border-[#a0a0a0] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 pr-9`}
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5l3 3 3-3' stroke='%231a1a1a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
              }}
            >
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
              <option value="Professional">Professional</option>
              <option value="Friendly">Friendly</option>
            </select>
          </div>

          {/* Translation Section - moved here */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={translate}
                onChange={(e) => setTranslate(e.target.checked)}
                className="w-4 h-4 text-[#1a73e8] border-[#d0d0d0] rounded focus:ring-2 focus:ring-[#1a73e8]/10 cursor-pointer"
              />
              <span className="text-sm font-medium">Translate</span>
            </label>
          </div>
        </div>

        {/* Translation language selector - shown when translate is checked */}
        {translate && (
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-xs text-[#666] mb-1">Translate from</label>
              <select
                className={`w-full px-3 py-2.5 border border-[#d0d0d0] rounded-md text-sm ${isLightMode ? 'bg-white text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white'} cursor-pointer appearance-none hover:border-[#a0a0a0] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 pr-9`}
                value={fromLanguage}
                onChange={(e) => setFromLanguage(e.target.value)}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5l3 3 3-3' stroke='%231a1a1a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
              >
                <option value="Auto-detect">Auto-detect</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-[#666] mb-1">Translate to</label>
              <select
                className={`w-full px-3 py-2.5 border border-[#d0d0d0] rounded-md text-sm ${isLightMode ? 'bg-white text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white'} cursor-pointer appearance-none hover:border-[#a0a0a0] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 pr-9`}
                value={toLanguage}
                onChange={(e) => setToLanguage(e.target.value)}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5l3 3 3-3' stroke='%231a1a1a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Rewrite Button - moved here */}
        <div className="mb-6">
          <button
            className={`relative bg-[#d3272b] text-white border-none rounded-md px-5 py-2.5 text-sm font-medium cursor-pointer flex items-center gap-2 hover:bg-[#b01f23] transition-colors flex-shrink-0 ${isLightMode ? 'disabled:bg-[#c0c0c0]' : 'disabled:bg-[#404040]'} disabled:cursor-not-allowed disabled:opacity-60 overflow-hidden`}
            onClick={handleRewrite}
            disabled={isButtonDisabled}
            style={{
              transition: 'background-color 0.2s, opacity 0.2s',
            }}
          >
            {/* Loading animation - white overlay (during rewrite) */}
            {isLoading && (
              <div
                className="absolute inset-0 bg-white/30 transition-all duration-75 ease-linear"
                style={{
                  width: `${cooldownProgress}%`,
                  left: 0,
                  top: 0,
                  bottom: 0,
                  pointerEvents: 'none',
                }}
              />
            )}
            
            {/* Cooldown animation - darker red overlay (after rewrite completes) */}
            {isCooldown && !isLoading && (
              <div
                className="absolute inset-0 bg-[#8a1619]/50 transition-all duration-75 ease-linear"
                style={{
                  width: `${cooldownProgress}%`,
                  left: 0,
                  top: 0,
                  bottom: 0,
                  pointerEvents: 'none',
                }}
              />
            )}
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? 'Rewriting...' : isCooldown ? 'Cooldown...' : 'Rewrite'}
              {!isLoading && !isCooldown && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 4.5l3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex rounded-md mb-4 overflow-hidden">
            <div className="w-1 bg-[#dc3545] flex-shrink-0"></div>
            <div className="flex-1 p-4 text-sm leading-relaxed bg-[#f8d7da] text-[#721c24]">
              {error}
            </div>
          </div>
        )}

        {/* Warning Message */}
        {warning && (
          <div className="flex rounded-md mb-4 overflow-hidden">
            <div className="w-1 bg-[#ff9800] flex-shrink-0"></div>
            <div className="flex-1 p-4 text-sm leading-relaxed bg-[#fff4e6] text-[#5f3700]">
              {warning}
            </div>
          </div>
        )}

        {/* Too Short Error */}
        {isTooShort && (
          <div className="flex rounded-md mb-4 overflow-hidden">
            <div className="w-1 bg-[#ff9800] flex-shrink-0"></div>
            <div className="flex-1 p-4 text-sm leading-relaxed bg-[#fff4e6] text-[#5f3700]">
              Your email is currently too short. Please go back to your email and write{' '}
              <span className="font-bold">at least 30 characters</span>. You have {charCount} characters right
              now.
            </div>
          </div>
        )}

        <hr className="border-t border-gray-300 w-full mx-auto mt-2 mb-8" />

        {/* Rewritten Email Display */}
        {rewritten && (
          <div className={`mt-4 p-4 border border-[#d0d0d0] rounded-md ${isLightMode ? 'bg-white text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white'} box-shadow-lg`}>
            <h2 className="text-lg font-semibold mb-4">Rewritten Email</h2>
            
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1">Subject</label>
              <div className="px-3 py-2 border border-[#d0d0d0] rounded-md text-sm">
                {typedSubject}
                {isTyping && typedSubject.length < rewritten.subject.length && (
                  <span className="inline-block w-0.5 h-4 bg-[#1a1a1a] ml-1 animate-pulse" />
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium mb-1">Body</label>
              <div className="px-3 py-2 border border-[#d0d0d0] rounded-md text-sm whitespace-pre-wrap">
                {typedBody}
                {isTyping && typedBody.length < rewritten.body.length && (
                  <span className="inline-block w-0.5 h-4 bg-[#1a1a1a] ml-1 animate-pulse" />
                )}
              </div>
            </div>

            <button
              className="w-full bg-[#d3272b] text-white border-none rounded-md px-5 py-2.5 text-sm font-medium cursor-pointer hover:bg-[#b01f23] transition-colors disabled:bg-[#c0c0c0] disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleApply}
              disabled={isTyping}
            >
              {isTyping ? 'Typing...' : 'Apply to Email'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
