/* ==========================================================================
   INTERACTIVE LOGIC: K Anaswin Raj Portfolio
   ========================================================================== */

// Web3Forms Access Key (Get a free key from https://web3forms.com/ to activate the contact form)
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

// HTML Escaping Utility to prevent XSS
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, (match) => {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return escapeMap[match];
  });
}

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // NAVIGATION: Active link highlights & Smooth Scroll
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Hamburger Menu Drawer Logic
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navLinksContainer.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinksContainer.classList.contains('open') && !navLinksContainer.contains(e.target) && e.target !== navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinksContainer.classList.remove('open');
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinksContainer.classList.remove('open');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinksContainer.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinksContainer.classList.remove('open');
        navToggle.focus();
      }
    });
  }
  
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when section occupies the middle of viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ==========================================================================
  // TERMINAL EMULATOR LOGIC
  // ==========================================================================
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  
  // Click anywhere on terminal card to focus input
  document.querySelector('.terminal-card').addEventListener('click', () => {
    terminalInput.focus();
  });

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
Available Commands:
  <span class="code-hl command-shortcut" tabindex="0" role="button">about</span>      - Professional summary
  <span class="code-hl command-shortcut" tabindex="0" role="button">skills</span>     - Core technology stack
  <span class="code-hl command-shortcut" tabindex="0" role="button">projects</span>   - Detailed project portfolio
  <span class="code-hl command-shortcut" tabindex="0" role="button">resume</span>     - Download PDF resume
  <span class="code-hl command-shortcut" tabindex="0" role="button">timeline</span>   - View ASCII git-graph timeline
  <span class="code-hl command-shortcut" tabindex="0" role="button">history</span>    - List command history log
  <span class="code-hl command-shortcut" tabindex="0" role="button">contact</span>    - Connect options & social links
  <span class="code-hl command-shortcut" tabindex="0" role="button">joke</span>       - Get a random developer joke
  <span class="code-hl command-shortcut" tabindex="0" role="button">secret</span>     - Access classified specs
  <span class="code-hl command-shortcut" tabindex="0" role="button">matrix</span>     - Toggle Matrix rain terminal theme
  <span class="code-hl command-shortcut" tabindex="0" role="button">clear</span>      - Clear terminal console screen
  <span class="code-hl command-shortcut" tabindex="0" role="button">github</span>     - Link to Anaswin's GitHub profile
    `,
    about: () => `
<strong>K Anaswin Raj</strong> - Final-year MCA student.
Core Focus: Software development, automated backends, & developer utilities.
Philosophy: "Prefer building practical scripts over typing endless boilerplate."
    `,
    skills: () => `
<strong>Technical Stack:</strong>
  - <strong>Languages:</strong> Python, Java, JavaScript, MySQL, HTML/CSS
  - <strong>Frameworks:</strong> Django, React, FastAPI
  - <strong>APIs/Tools:</strong> NLTK, JSZip, Chrome Extensions
    `,
    projects: () => `
<strong>Featured Projects:</strong>
  1. <strong>Fake News Detector</strong> (Chrome NLP Extension)
     - DOM node parsing, structural analysis, NLTK validation.
  2. <strong>Smart Street Light Web Dashboard</strong> (IoT Django/React App)
     - Manage sensor nodes, time-series power consumption metrics.
  3. <strong>AI Project Report Generator</strong> (Frontend Compiler Utility)
     - Zip extraction in-browser, templates compilation.
    `,
    resume: () => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'resume.pdf';
        link.download = 'K_Anaswin_Raj_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 1200);
      return `
<strong>[GET] /assets/resume.pdf...</strong>
  <span class="text-muted">File Size: 1.2 MB | MIME-Type: application/pdf</span>
  <span class="text-success">✔ Handshake verified. Fetching payload...</span>
  <span class="code-hl">Initializing secure download. Please check your downloads folder.</span>
      `;
    },
    joke: () => {
      const jokes = [
        "Why do programmers wear glasses? Because they can't C#.",
        "There are 10 types of people in this world: Those who understand binary, and those who don't.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?'",
        "Why did the database administrator leave his wife? She had one-to-many relationships.",
        "['hip', 'hip'] (hip hip array!)",
        "Why do programmers prefer dark mode? Because light attracts bugs.",
        "To understand what recursion is, you must first understand recursion.",
        "An optimist says: 'The glass is half full.' A pessimist says: 'The glass is half empty.' A programmer says: 'The glass is twice as large as it needs to be.'",
        "What's the object-oriented way to become wealthy? Inheritance.",
        "What do you call a programmer from Finland? Nerdic.",
        "A programmer's spouse asks: 'Go to the store and buy a loaf of bread. If they have eggs, get a dozen.' The programmer returns with 12 loaves of bread.",
        "What is the best thing about UDP? I'd tell you a joke, but you might not get it.",
        "What is a database administrator's favorite song? 'No SQL, No Cry'.",
        "Debugging is like being the detective in a crime movie where you are also the murderer.",
        "There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors."
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return `<span class="text-success">${randomJoke}</span>`;
    },
    secret: () => `
<span class="text-gradient"><strong>*** CLASSIFIED: ACCESS GRANTED ***</strong></span>
Anaswin's Secret Specs:
- Coffee consumed per lines of code: 1.2 cups/100 LOC.
- Favorite text editor: JetBrains / VS Code (obviously).
- Superpower: Automating Excel sheets into Web dashboards.
- Hidden Talent: Solving 3x3 Rubik's cube in under 40 seconds.
    `,
    matrix: () => {
      document.body.classList.toggle('matrix-theme');
      const active = document.body.classList.contains('matrix-theme');
      return active 
        ? '<span class="text-success">[SYSTEM] Matrix Digital Rain Overlay Override Initiated. Theme set to MATRIX GREEN.</span>'
        : '<span class="text-success">[SYSTEM] Global theme reset to Slate Dark.</span>';
    },
    history: () => {
      if (commandHistory.length === 0) return '<span class="text-muted">No commands in session history.</span>';
      return commandHistory
        .map((cmd, idx) => `  ${idx + 1}  <span class="code-hl command-shortcut" tabindex="0" role="button">${escapeHTML(cmd)}</span>`)
        .join('<br>');
    },
    timeline: () => `
<span class="text-gradient"><strong>--- ANASWIN'S SYSTEM LOGS (GIT GRAPH) ---</strong></span><br>
<span style="color:#ff5f56; font-weight:bold;">*</span>  <span style="color:var(--accent-teal); font-weight:bold;">[main]</span> <span class="text-success">MCA-2026: Master of Computer Applications (Final Year)</span>
<span style="color:#ff5f56; font-weight:bold;">|</span>  <span class="text-secondary">Core specs: Python automation scripts, React dashboards, async APIs.</span>
<span style="color:#ff5f56; font-weight:bold;">|</span>
<span style="color:#ff5f56; font-weight:bold;">*</span>  <span style="color:var(--accent-violet); font-weight:bold;">[feature/nlp]</span> <span class="text-success">2025: Chrome NLP Credibility scanner built</span>
<span style="color:#ff5f56; font-weight:bold;">|</span>  <span class="text-secondary">Leveraged NLTK tokenizers, DOM node queries, and score matrix models.</span>
<span style="color:#ff5f56; font-weight:bold;">|</span>
<span style="color:#ff5f56; font-weight:bold;">*</span>  <span style="color:var(--accent-violet); font-weight:bold;">[feature/iot]</span> <span class="text-success">2024: Street Light Web dashboard dashboard deployed</span>
<span style="color:#ff5f56; font-weight:bold;">|</span>  <span class="text-secondary">Linked React time-series graphics, Django REST controllers, sensor relays.</span>
<span style="color:#ff5f56; font-weight:bold;">|</span>
<span style="color:#ff5f56; font-weight:bold;">*</span>  <span style="color:var(--accent-teal); font-weight:bold;">[main]</span> <span class="text-success">GRAD-2024: Completed Bachelor of Computer Applications (BCA)</span>
<span style="color:var(--text-muted); font-weight:bold;">&nbsp;  Focused on SQL optimization, core Java, and database schemas.</span>
    `,
    contact: () => `
<strong>Connect with Anaswin:</strong>
  - Email: <a href="mailto:kanaswinraj695@gmail.com" style="color: var(--accent-teal);">kanaswinraj695@gmail.com</a>
  - LinkedIn: <a href="https://www.linkedin.com/in/anaswin-raj" target="_blank" rel="noopener noreferrer" style="color: var(--accent-teal);">linkedin.com/in/anaswin-raj</a>
  - GitHub: <a href="https://github.com/Anaswin" target="_blank" rel="noopener noreferrer" style="color: var(--accent-teal);">github.com/Anaswin</a>
    `,
    github: () => {
      setTimeout(() => {
        window.open('https://github.com/Anaswin', '_blank', 'noopener,noreferrer');
      }, 500);
      return "Opening github.com/Anaswin in a new tab...";
    },
    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    }
  };

  // Process input command
  function processCommand(cmdText) {
    const trimmed = cmdText.trim().toLowerCase();
    
    // Add input log line
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-line';
    inputLine.innerHTML = `<span class="term-prompt">guest@anaswin.dev:~$</span> <span>${escapeHTML(cmdText)}</span>`;
    terminalBody.appendChild(inputLine);

    if (trimmed) {
      commandHistory.push(cmdText);
      historyIndex = commandHistory.length;
      
      const responseLine = document.createElement('div');
      responseLine.className = 'terminal-line';

      if (commands[trimmed]) {
        const output = commands[trimmed]();
        if (output !== '') {
          responseLine.innerHTML = output;
          terminalBody.appendChild(responseLine);
        }
      } else if (trimmed.startsWith('sudo')) {
        if (trimmed === 'sudo hack') {
          responseLine.innerHTML = '<span class="code-hl">[DAEMON] Bypassing security firewalls...</span>';
          terminalBody.appendChild(responseLine);
          
          const hackSteps = [
            'Connecting to remote proxy relay... [OK]',
            'Cracking root SSH key exchange... [PENDING]',
            'Injecting system buffer overflow payload... [SUCCESS]',
            'Extracting core credentials: /etc/shadow... [WARNING]',
            '<span class="text-alert">❌ DETECTED: Intrusion Countermeasures Electronics (ICE) triggered.</span>',
            '<span class="text-alert">🔒 Connection Terminated: Guest identity locked. Nice try!</span>'
          ];

          hackSteps.forEach((step, idx) => {
            setTimeout(() => {
              const logLine = document.createElement('div');
              logLine.className = 'terminal-line';
              logLine.innerHTML = step;
              terminalBody.appendChild(logLine);
              terminalBody.scrollTop = terminalBody.scrollHeight;
            }, (idx + 1) * 500);
          });
        } else {
          responseLine.innerHTML = `<span class="text-alert">Error: guest does not have root privileges. This incident will be reported.</span>`;
          terminalBody.appendChild(responseLine);
        }
      } else {
        responseLine.innerHTML = `command not found: <span class="text-alert">${escapeHTML(trimmed)}</span>. Type <span class="code-hl command-shortcut" tabindex="0" role="button">help</span> to list commands.`;
        terminalBody.appendChild(responseLine);
      }
    }
    
    // Scroll terminal to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Keyboard controls for Terminal
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value;
      processCommand(command);
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const inputVal = terminalInput.value.trim().toLowerCase();
      if (inputVal) {
        const matchingCmd = Object.keys(commands).find(cmd => cmd.startsWith(inputVal));
        if (matchingCmd) {
          terminalInput.value = matchingCmd;
        }
      }
    }
  });

  // Command Click/Keyboard Shortcut Delegation
  function executeShortcut(target) {
    const command = target.textContent.trim().replace(/['"]/g, '');
    if (command && commands[command]) {
      terminalInput.value = command;
      processCommand(command);
      terminalInput.value = '';
      terminalInput.focus();
    }
  }

  terminalBody.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('code-hl') || target.classList.contains('command-shortcut')) {
      executeShortcut(target);
    }
  });

  terminalBody.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target;
      if (target.classList.contains('code-hl') || target.classList.contains('command-shortcut')) {
        e.preventDefault();
        executeShortcut(target);
      }
    }
  });

  // ==========================================================================
  // WIDGET 1: Fake News Detector DOM Scanner
  // ==========================================================================
  const btnScanDom = document.getElementById('btn-scan-dom');
  const scanProgressContainer = document.getElementById('scan-progress-container');
  const scanFill = document.getElementById('scan-fill');
  const scanStatus = document.getElementById('scan-status');
  const scanResultsContainer = document.getElementById('scan-results-container');
  const pageNodes = document.querySelectorAll('.page-node');
  const metricNodes = document.getElementById('metric-nodes');
  const metricFlags = document.getElementById('metric-flags');

  btnScanDom.addEventListener('click', () => {
    // Disable button & Reset fields
    btnScanDom.disabled = true;
    scanResultsContainer.classList.add('hide');
    scanProgressContainer.classList.remove('hide');
    
    // Remove flagged classes
    pageNodes.forEach(node => {
      node.classList.remove('scanning', 'flagged');
    });

    let progress = 0;
    scanFill.style.width = '0%';
    
    const interval = setInterval(() => {
      progress += 2;
      scanFill.style.width = `${progress}%`;

      if (progress < 30) {
        scanStatus.textContent = 'Extracting tab DOM text nodes...';
        pageNodes[0].classList.add('scanning');
      } else if (progress < 60) {
        scanStatus.textContent = 'Parsing linguistics structures...';
        pageNodes[0].classList.remove('scanning');
        pageNodes[1].classList.add('scanning');
      } else if (progress < 85) {
        scanStatus.textContent = 'Running NLTK feature analysis...';
        pageNodes[1].classList.remove('scanning');
        pageNodes[2].classList.add('scanning');
      } else if (progress < 100) {
        scanStatus.textContent = 'Calculating markers vector matrix...';
        pageNodes[2].classList.remove('scanning');
      } else {
        clearInterval(interval);
        
        // Scan Done
        scanProgressContainer.classList.add('hide');
        scanResultsContainer.classList.remove('hide');
        btnScanDom.disabled = false;
        
        // Highlight flagged nodes (Nodes containing sensational elements)
        pageNodes[0].classList.add('flagged');
        pageNodes[1].classList.add('flagged');
        
        metricNodes.textContent = '3';
        metricFlags.textContent = '2';
      }
    }, 50);
  });

  // ==========================================================================
  // WIDGET 2: Smart Street Light IoT Chart (Canvas implementation)
  // ==========================================================================
  const ecoToggle = document.getElementById('eco-mode-toggle');
  const valLoad = document.getElementById('val-load');
  const valSavings = document.getElementById('val-savings');
  const canvas = document.getElementById('iot-chart');
  const ctx = canvas.getContext('2d');

  let ecoMode = false;
  let chartData = Array.from({length: 12}, () => Math.random() * 15 + 35); // Initial load 35-50W

  // Dynamic values
  ecoToggle.addEventListener('change', (e) => {
    ecoMode = e.target.checked;
    if (ecoMode) {
      valSavings.textContent = '2.4x';
      valSavings.className = 'card-val text-success';
    } else {
      valSavings.textContent = '1.0x';
      valSavings.className = 'card-val';
    }
  });

  // Resize canvas internally to prevent blurriness (High DPI support)
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
  }
  
  resizeCanvas();
  window.addEventListener('resize', () => {
    resizeCanvas();
    drawChart(); // Redraw immediately on resize
  });

  // Time-series update loop
  setInterval(() => {
    chartData.shift(); // Remove oldest
    
    let nextVal;
    if (ecoMode) {
      // Eco mode: load around 15W-22W
      nextVal = Math.random() * 7 + 15;
    } else {
      // Normal mode: load around 38W-48W
      nextVal = Math.random() * 10 + 38;
    }
    
    chartData.push(nextVal);
    valLoad.textContent = `${nextVal.toFixed(1)} W`;
    drawChart();
  }, 1200);

  function drawChart() {
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    
    ctx.clearRect(0, 0, width, height);
    
    const padding = 20;
    const chartHeight = height - padding * 2;
    const chartWidth = width - padding * 2;
    
    // Draw subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Convert power values to chart points
    const maxVal = 60; // Max load range 60W
    const points = chartData.map((val, idx) => {
      const x = padding + (chartWidth / (chartData.length - 1)) * idx;
      const y = padding + chartHeight - (val / maxVal) * chartHeight;
      return { x, y };
    });
    
    // Set dynamic gradient for stroke & fill (Green for Eco, Teal-Violet for Normal)
    const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
    const fillGrad = ctx.createLinearGradient(0, 0, 0, height);
    
    if (ecoMode) {
      lineGrad.addColorStop(0, '#00e676');
      lineGrad.addColorStop(1, '#00b0ff');
      fillGrad.addColorStop(0, 'rgba(0, 230, 118, 0.15)');
      fillGrad.addColorStop(1, 'rgba(0, 230, 118, 0)');
      ctx.strokeStyle = '#00e676';
    } else {
      lineGrad.addColorStop(0, '#00f2fe');
      lineGrad.addColorStop(1, '#9b51e0');
      fillGrad.addColorStop(0, 'rgba(0, 242, 254, 0.15)');
      fillGrad.addColorStop(1, 'rgba(155, 81, 224, 0)');
      ctx.strokeStyle = lineGrad;
    }
    
    // Draw the chart fill area
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    
    // Smooth bezier curve connections
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = fillGrad;
    ctx.fill();

    // Draw the main line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 8;
    ctx.shadowColor = ecoMode ? 'rgba(0, 230, 118, 0.3)' : 'rgba(0, 242, 254, 0.3)';
    ctx.stroke();
    
    // Clean shadow properties for other assets
    ctx.shadowBlur = 0;
    
    // Draw glowing data point at the end
    const lastPt = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(lastPt.x, lastPt.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = ecoMode ? '#00e676' : '#00f2fe';
    ctx.fill();
    ctx.strokeStyle = '#090b10';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Initial render
  setTimeout(drawChart, 200);

  // ==========================================================================
  // WIDGET 3: Cloud Vault Simulator (Flask Cloud Storage Mockup)
  // ==========================================================================
  
  // State variables
  let activeFiles = [
    { id: 1, name: "K_Anaswin_Raj_Resume.pdf", size: "1.2 MB", rawSize: 1.2, type: "pdf", icon: "📄" },
    { id: 2, name: "backup_data.zip", size: "34.2 MB", rawSize: 34.2, type: "zip", icon: "📦" },
    { id: 3, name: "portfolio_draft.png", size: "10.4 MB", rawSize: 10.4, type: "png", icon: "🖼️" }
  ];
  let trashFiles = [
    { id: 4, name: "old_temp_draft.txt", size: "0.1 MB", rawSize: 0.1, type: "txt", icon: "📝", daysLeft: 28 }
  ];
  let selectedFileToShare = null;
  let fileIdCounter = 5;

  // DOM references
  const btnVaultFilesTab = document.getElementById('btn-vault-files');
  const btnVaultTrashTab = document.getElementById('btn-vault-trash');
  const btnVaultUpload = document.getElementById('btn-vault-upload');
  const vaultActiveList = document.getElementById('vault-active-list');
  const vaultTrashList = document.getElementById('vault-trash-list');
  const vaultTrashCount = document.getElementById('vault-trash-count');
  const vaultStorageUsed = document.getElementById('vault-storage-used');
  const vaultStorageFill = document.getElementById('vault-storage-fill');
  const vaultConsoleLog = document.getElementById('vault-console-log');
  
  // Share Modal DOM
  const vaultShareModal = document.getElementById('vault-share-modal');
  const shareExpiry = document.getElementById('share-expiry');
  const sharePassword = document.getElementById('share-password');
  const shareResultContainer = document.getElementById('share-result-container');
  const shareResultUrl = document.getElementById('share-result-url');
  const btnCopyShare = document.getElementById('btn-copy-share');
  const btnShareCancel = document.getElementById('btn-share-cancel');
  const btnShareGenerate = document.getElementById('btn-share-generate');

  // Logs utility
  function addVaultLog(message, type = 'normal') {
    const line = document.createElement('div');
    line.className = 'vault-log-line';
    if (type === 'success') line.classList.add('text-success');
    if (type === 'alert') line.classList.add('text-alert');
    if (type === 'warning') line.classList.add('text-muted');
    
    const timestamp = new Date().toLocaleTimeString();
    line.innerHTML = `<span class="text-muted">[${timestamp}]</span> ${message}`;
    vaultConsoleLog.appendChild(line);
    vaultConsoleLog.scrollTop = vaultConsoleLog.scrollHeight;
  }

  // Render file system lists
  function renderVault() {
    // 1. Render Active Files
    vaultActiveList.innerHTML = '';
    if (activeFiles.length === 0) {
      vaultActiveList.innerHTML = '<div class="text-muted" style="font-size: 0.8rem; padding: 12px; text-align: center;">No files uploaded yet.</div>';
    } else {
      activeFiles.forEach(file => {
        const row = document.createElement('div');
        row.className = 'file-row';
        row.innerHTML = `
          <div class="file-info-col">
            <span class="file-icon" aria-hidden="true">${file.icon}</span>
            <div class="file-name-meta">
              <span class="file-name">${escapeHTML(file.name)}</span>
              <span class="file-size">${file.size}</span>
            </div>
          </div>
          <div class="file-actions-col">
            <button class="btn btn-outline btn-xs btn-file-share" data-id="${file.id}">Share</button>
            <button class="btn btn-secondary btn-xs btn-file-delete" data-id="${file.id}">Delete</button>
          </div>
        `;
        vaultActiveList.appendChild(row);
      });
    }

    // 2. Render Trash Bin Files
    vaultTrashList.innerHTML = '';
    if (trashFiles.length === 0) {
      vaultTrashList.innerHTML = '<div class="text-muted" style="font-size: 0.8rem; padding: 12px; text-align: center;">Trash is empty.</div>';
    } else {
      trashFiles.forEach(file => {
        const row = document.createElement('div');
        row.className = 'file-row';
        row.innerHTML = `
          <div class="file-info-col">
            <span class="file-icon" aria-hidden="true">🗑️</span>
            <div class="file-name-meta">
              <span class="file-name">${escapeHTML(file.name)}</span>
              <span class="text-alert" style="font-size: 0.65rem;">Expires in ${file.daysLeft} days</span>
            </div>
          </div>
          <div class="file-actions-col">
            <button class="btn btn-outline btn-xs btn-file-restore" data-id="${file.id}">Restore</button>
            <button class="btn btn-secondary btn-xs btn-file-purge" data-id="${file.id}">Purge</button>
          </div>
        `;
        vaultTrashList.appendChild(row);
      });
    }

    // 3. Update storage limits
    const totalActiveSize = activeFiles.reduce((acc, f) => acc + f.rawSize, 0);
    const totalTrashSize = trashFiles.reduce((acc, f) => acc + f.rawSize, 0);
    const combinedSize = totalActiveSize + totalTrashSize;
    
    vaultStorageUsed.textContent = `${combinedSize.toFixed(1)} MB`;
    
    const percentage = Math.min((combinedSize / 512) * 100, 100);
    vaultStorageFill.style.width = `${percentage}%`;
    vaultTrashCount.textContent = trashFiles.length;
  }

  // Active files button clicks delegation
  vaultActiveList.addEventListener('click', (e) => {
    const target = e.target;
    const fileId = parseInt(target.getAttribute('data-id'), 10);
    
    if (target.classList.contains('btn-file-delete')) {
      const index = activeFiles.findIndex(f => f.id === fileId);
      if (index !== -1) {
        const file = activeFiles.splice(index, 1)[0];
        file.daysLeft = 30; // 30-day grace period
        trashFiles.push(file);
        
        addVaultLog(`[TRASH] Moved "${file.name}" to Trash. Auto-purge in 30 days.`, 'warning');
        renderVault();
      }
    } else if (target.classList.contains('btn-file-share')) {
      const file = activeFiles.find(f => f.id === fileId);
      if (file) {
        selectedFileToShare = file;
        
        // Reset share modal fields
        shareResultContainer.classList.add('hide');
        shareResultUrl.textContent = '';
        btnShareGenerate.disabled = false;
        
        // Show modal overlay
        vaultShareModal.classList.remove('hide');
        addVaultLog(`[SHARE] Configuring temporary parameters for "${file.name}"...`);
      }
    }
  });

  // Trash bin buttons click delegation
  vaultTrashList.addEventListener('click', (e) => {
    const target = e.target;
    const fileId = parseInt(target.getAttribute('data-id'), 10);

    if (target.classList.contains('btn-file-restore')) {
      const index = trashFiles.findIndex(f => f.id === fileId);
      if (index !== -1) {
        const file = trashFiles.splice(index, 1)[0];
        delete file.daysLeft;
        activeFiles.push(file);
        
        addVaultLog(`[RECOVERY] File "${file.name}" restored to Active Storage successfully.`, 'success');
        renderVault();
      }
    } else if (target.classList.contains('btn-file-purge')) {
      const index = trashFiles.findIndex(f => f.id === fileId);
      if (index !== -1) {
        const file = trashFiles.splice(index, 1)[0];
        
        addVaultLog(`[SHREDDER] Permanently shredded file blocks of "${file.name}" from disk.`, 'alert');
        renderVault();
      }
    }
  });

  // Tab buttons
  btnVaultFilesTab.addEventListener('click', () => {
    btnVaultFilesTab.classList.add('active');
    btnVaultTrashTab.classList.remove('active');
    vaultActiveList.classList.remove('hide');
    vaultTrashList.classList.add('hide');
  });

  btnVaultTrashTab.addEventListener('click', () => {
    btnVaultTrashTab.classList.add('active');
    btnVaultFilesTab.classList.remove('active');
    vaultTrashList.classList.remove('hide');
    vaultActiveList.classList.add('hide');
  });

  // Simulate File Upload
  const uploadCandidates = [
    { name: "analytics_dashboard.json", size: "4.8 MB", rawSize: 4.8, type: "json", icon: "📊" },
    { name: "server_config.yml", size: "0.2 MB", rawSize: 0.2, type: "yaml", icon: "⚙️" },
    { name: "header_bg.jpg", size: "2.1 MB", rawSize: 2.1, type: "jpg", icon: "🖼️" },
    { name: "avatar_vector.svg", size: "0.5 MB", rawSize: 0.5, type: "svg", icon: "🎨" }
  ];

  btnVaultUpload.addEventListener('click', () => {
    btnVaultUpload.disabled = true;
    
    // Choose a random candidate file
    const candidate = uploadCandidates[Math.floor(Math.random() * uploadCandidates.length)];
    const uniqueName = candidate.name;
    
    addVaultLog(`[HTTP] POST /api/v1/files/upload - multipart/form-data [${uniqueName}]`);
    
    setTimeout(() => {
      // Step 1: Duplicate check (SHA256)
      addVaultLog(`[SECURITY] Calculating SHA256 duplicate scanning index...`);
      
      setTimeout(() => {
        // If file already exists in active storage, block it
        const exists = activeFiles.some(f => f.name === uniqueName);
        if (exists) {
          addVaultLog(`[ABORT] SHA256 match found! Duplicate file "${uniqueName}" rejected.`, 'alert');
          btnVaultUpload.disabled = false;
          return;
        }

        // Pushing new simulated file
        const newFile = {
          id: fileIdCounter++,
          name: uniqueName,
          size: candidate.size,
          rawSize: candidate.rawSize,
          type: candidate.type,
          icon: candidate.icon
        };
        
        activeFiles.push(newFile);
        addVaultLog(`[DATABASE] Added metadata descriptors to local database.`, 'success');
        
        setTimeout(() => {
          addVaultLog(`[DAEMON] File upload completed successfully. Storage sync ok.`, 'success');
          renderVault();
          btnVaultUpload.disabled = false;
        }, 300);

      }, 600);

    }, 400);
  });

  // Share Modal controls
  btnShareCancel.addEventListener('click', () => {
    vaultShareModal.classList.add('hide');
    selectedFileToShare = null;
  });

  btnShareGenerate.addEventListener('click', () => {
    btnShareGenerate.disabled = true;
    const expiry = shareExpiry.value;
    const isPassword = sharePassword.checked;
    
    addVaultLog(`[API-CALL] POST /api/v1/share/create - { expiry: ${expiry}, password: ${isPassword} }`);
    
    setTimeout(() => {
      const randomHash = Math.random().toString(36).substr(2, 6);
      const generatedLink = `anaswin.dev/s/${randomHash}`;
      
      shareResultUrl.textContent = generatedLink;
      shareResultContainer.classList.remove('hide');
      
      addVaultLog(`[SHARE] Generated secure link: "${generatedLink}" for "${selectedFileToShare.name}"`, 'success');
    }, 600);
  });

  btnCopyShare.addEventListener('click', () => {
    const textToCopy = shareResultUrl.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = btnCopyShare.textContent;
      btnCopyShare.textContent = 'Copied!';
      btnCopyShare.classList.add('text-success');
      
      setTimeout(() => {
        btnCopyShare.textContent = originalText;
        btnCopyShare.classList.remove('text-success');
      }, 1500);
    });
  });

  // Close share modal clicking on overlay
  vaultShareModal.addEventListener('click', (e) => {
    if (e.target === vaultShareModal) {
      vaultShareModal.classList.add('hide');
      selectedFileToShare = null;
    }
  });

  // Initial Vault rendering
  renderVault();

  // ==========================================================================
  // CONTACT FORM LOGIC (SMTP Daemon Simulation Output)
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formConsoleBody = document.getElementById('form-console-body');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;
    
    // Initial submission printout
    formConsoleBody.innerHTML = `
      <div class="console-log-line">[PAYLOAD] Packaging form values... [OK]</div>
      <div class="console-log-line">[SMTP] Handshaking: mail.anaswin.dev:465...</div>
    `;

    // Step 1: Handshake log
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'console-log-line';
      line.textContent = '[SMTP] TLS 1.3 secured socket channel established.';
      formConsoleBody.appendChild(line);
    }, 400);

    // Step 2: Transmission log & Fetch start
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'console-log-line';
      line.innerHTML = `[DAEMON] Transmitting content body for <span style="color:var(--accent-teal);">${escapeHTML(name)}</span> (${escapeHTML(email)})...`;
      formConsoleBody.appendChild(line);

      // Honeypot spam filter check
      const isBot = document.getElementById('contact-honeypot').checked;
      if (isBot) {
        setTimeout(() => {
          const errLine = document.createElement('div');
          errLine.className = 'console-log-line text-alert';
          errLine.innerHTML = '✖ ERROR: Spam transmission detected. Payload discarded.';
          formConsoleBody.appendChild(errLine);
        }, 500);
        return;
      }

      // Check if access key is configured
      if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
        setTimeout(() => {
          const errLine = document.createElement('div');
          errLine.className = 'console-log-line text-alert';
          errLine.innerHTML = '✖ ERROR: Transmission failed. Web3Forms access key is not configured. Please add your key to app.js.';
          formConsoleBody.appendChild(errLine);
        }, 600);
        return;
      }

      // Perform real email submission via fetch
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: name,
          email: email,
          message: message,
          subject: `New Portfolio Message from ${name}`,
          botcheck: isBot
        })
      })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 200) {
          const succLine = document.createElement('div');
          succLine.className = 'console-log-line text-success';
          succLine.textContent = `✔ SUCCESS: Transmission completed. Message delivered to inbox. ID: ${json.id || 'smtp_msg_ok'}`;
          formConsoleBody.appendChild(succLine);
          contactForm.reset();
        } else {
          throw new Error(json.message || 'Server error');
        }
      })
      .catch((error) => {
        const errLine = document.createElement('div');
        errLine.className = 'console-log-line text-alert';
        errLine.innerHTML = `✖ ERROR: Transmission failed: ${escapeHTML(error.message)}`;
        formConsoleBody.appendChild(errLine);
      });

    }, 800);
  });

  // ==========================================================================
  // HERO MATRIX BACKGROUND ANIMATION
  // ==========================================================================
  const mCanvas = document.getElementById('hero-canvas');
  if (mCanvas) {
    const mCtx = mCanvas.getContext('2d');
    
    let mWidth = (mCanvas.width = mCanvas.offsetWidth || window.innerWidth);
    let mHeight = (mCanvas.height = mCanvas.offsetHeight || window.innerHeight);

    window.addEventListener('resize', () => {
      mWidth = (mCanvas.width = window.innerWidth);
      mHeight = (mCanvas.height = window.innerHeight);
    });

    const mColumns = Math.floor(mWidth / 20) + 1;
    const mYPositions = Array(mColumns).fill(0).map(() => Math.floor(Math.random() * -100));

    const mCharacters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[];:';
    
    function drawMatrix() {
      mCtx.fillStyle = 'rgba(9, 11, 16, 0.05)';
      mCtx.fillRect(0, 0, mWidth, mHeight);

      mCtx.font = '13px "JetBrains Mono", monospace';

      for (let i = 0; i < mYPositions.length; i++) {
        const char = mCharacters[Math.floor(Math.random() * mCharacters.length)];
        const x = i * 20;
        const y = mYPositions[i];

        // Alternate between accent teal and violet gradients
        if (i % 2 === 0) {
          mCtx.fillStyle = 'rgba(0, 242, 254, 0.45)';
        } else {
          mCtx.fillStyle = 'rgba(155, 81, 224, 0.45)';
        }

        mCtx.fillText(char, x, y);

        if (y > mHeight && Math.random() > 0.98) {
          mYPositions[i] = 0;
        } else {
          mYPositions[i] = y + 16;
        }
      }
    }

    setInterval(drawMatrix, 40);
  }

  // ==========================================================================
  // LIVE SYSTEM METRICS LOGIC
  // ==========================================================================
  const metricsStatus = document.getElementById('metrics-status');
  const metricsPing = document.getElementById('metrics-ping');
  const metricsUptime = document.getElementById('metrics-uptime');
  const metricsBrowser = document.getElementById('metrics-browser');

  if (metricsStatus && metricsPing && metricsUptime && metricsBrowser) {
    // 1. Session Uptime Clock
    let uptimeSeconds = 0;
    setInterval(() => {
      uptimeSeconds++;
      const hrs = String(Math.floor(uptimeSeconds / 3600)).padStart(2, '0');
      const mins = String(Math.floor((uptimeSeconds % 3600) / 60)).padStart(2, '0');
      const secs = String(uptimeSeconds % 60).padStart(2, '0');
      metricsUptime.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);

    // 2. Simulated Network Latency (Ping)
    setInterval(() => {
      if (navigator.onLine) {
        const simulatedPing = Math.floor(Math.random() * 19) + 10; // 10ms to 28ms
        metricsPing.textContent = `${simulatedPing} ms`;
      } else {
        metricsPing.textContent = '-- ms';
      }
    }, 2500);

    // 3. Online/Offline Connection Status
    function updateConnectionStatus() {
      if (navigator.onLine) {
        metricsStatus.textContent = 'ONLINE';
        metricsStatus.className = 'metric-value text-success';
      } else {
        metricsStatus.textContent = 'OFFLINE';
        metricsStatus.className = 'metric-value text-alert';
        metricsPing.textContent = '-- ms';
      }
    }
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
    updateConnectionStatus(); // Initial run

    // 4. Visitor Browser & OS Information
    function detectVisitorDetails() {
      const ua = navigator.userAgent;
      let osName = 'Unknown OS';
      let browserName = 'Unknown Browser';

      // Simple OS Detection
      if (ua.indexOf('Win') !== -1) osName = 'Win';
      else if (ua.indexOf('Mac') !== -1) osName = 'Mac';
      else if (ua.indexOf('Linux') !== -1) osName = 'Linux';
      else if (ua.indexOf('Android') !== -1) osName = 'Android';
      else if (ua.indexOf('like Mac') !== -1) osName = 'iOS';

      // Simple Browser Detection
      if (ua.indexOf('Chrome') !== -1 && ua.indexOf('Edge') === -1) browserName = 'Chrome';
      else if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1) browserName = 'Safari';
      else if (ua.indexOf('Firefox') !== -1) browserName = 'Firefox';
      else if (ua.indexOf('Edge') !== -1) browserName = 'Edge';
      else if (ua.indexOf('Opera') !== -1 || ua.indexOf('OPR') !== -1) browserName = 'Opera';

      metricsBrowser.textContent = `${browserName}/${osName}`;
    }
    detectVisitorDetails();
  }

  // ==========================================================================
  // INTERACTIVE PROJECT FILTER
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectWrappers = document.querySelectorAll('.project-wrapper');
  const separators = document.querySelectorAll('.project-separator');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active classes on buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectWrappers.forEach(wrapper => {
        const categories = wrapper.getAttribute('data-category').split(' ');
        
        // Show/hide wrappers
        if (filterValue === 'all' || categories.includes(filterValue)) {
          wrapper.classList.remove('hide');
        } else {
          wrapper.classList.add('hide');
        }
      });

      // Handle separators: hide them if filtering is active, or show them if "all" is active
      separators.forEach(sep => {
        if (filterValue === 'all') {
          sep.classList.remove('hide');
        } else {
          sep.classList.add('hide');
        }
      });
    });
  });

});
