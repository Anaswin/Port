/* ==========================================================================
   INTERACTIVE LOGIC: K Anaswin Raj Portfolio
   ========================================================================== */

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
  <span class="code-hl">about</span>      - Professional summary
  <span class="code-hl">skills</span>     - Core technology stack
  <span class="code-hl">projects</span>   - Detailed project portfolio
  <span class="code-hl">contact</span>    - Connect options & social links
  <span class="code-hl">clear</span>      - Clear terminal console screen
  <span class="code-hl">github</span>     - Link to Anaswin's GitHub profile
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
        responseLine.innerHTML = trimmed === 'sudo hack' 
          ? `<span class="text-alert">Access Denied. Nice try though!</span>` 
          : `<span class="text-alert">Error: guest does not have root privileges.</span>`;
        terminalBody.appendChild(responseLine);
      } else {
        responseLine.innerHTML = `command not found: <span class="text-alert">${escapeHTML(trimmed)}</span>. Type <span class="code-hl">help</span> to list commands.`;
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

  // Resize canvas internally to prevent blurriness
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
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
  // WIDGET 3: AI Project Report Generator (Zip Extractor Simulation)
  // ==========================================================================
  const btnSimZip = document.getElementById('btn-simulate-zip');
  const dropzoneIdle = document.getElementById('dropzone-idle');
  const dropzoneRunning = document.getElementById('dropzone-running');
  const dropzoneCompleted = document.getElementById('dropzone-completed');
  const zipLogs = document.getElementById('zip-console-logs');
  const mdPreview = document.getElementById('md-preview-content');
  const btnResetZip = document.getElementById('btn-reset-zip');
  
  const simulationLogs = [
    { delay: 0, text: '[JSZip] Initializing file read system context...' },
    { delay: 250, text: '[JSZip] Opening zip archive: project_src.zip (384 KB)...' },
    { delay: 500, text: '[JSZip] File index loaded: 4 active source descriptors found.' },
    { delay: 750, text: '[JSZip] → Extracting src/backend/main.py (3.8 KB)... [OK]' },
    { delay: 1000, text: '[JSZip] → Extracting src/backend/models.py (2.1 KB)... [OK]' },
    { delay: 1250, text: '[JSZip] → Extracting src/dashboard/App.js (4.6 KB)... [OK]' },
    { delay: 1500, text: '[JSZip] → Extracting package.json (0.8 KB)... [OK]' },
    { delay: 1750, text: '[JSZip] Unpacking complete. Passing contents to generator daemon...' },
    { delay: 2000, text: '[AI-DocEngine] Building structural syntax AST maps...' },
    { delay: 2250, text: '[AI-DocEngine] Documenting REST schemas and function contracts...' },
    { delay: 2500, text: '[AI-DocEngine] Formatting template output as GFM Markdown...' }
  ];

  const generatedMarkdown = `# AI Project Analysis

## Project Structure
- \`src/backend/main.py\` - REST controllers and FastAPI bootloader.
- \`src/backend/models.py\` - SQL schemas and Database connections.
- \`src/dashboard/App.js\` - Entry point for dashboard UI components.

## Extracted Metas
- **Language Ratio:** Python (65%), JavaScript (35%)
- **Backend Framework:** FastAPI v0.95
- **DB Driver:** SQLAlchemy (MySQL Adapter)

## Generated Docs
Project documentation compiler successfully run at 2026-06-26.
`;

  btnSimZip.addEventListener('click', () => {
    dropzoneIdle.classList.add('hide');
    dropzoneRunning.classList.remove('hide');
    zipLogs.innerHTML = '';

    simulationLogs.forEach(log => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'log-line';
        line.textContent = log.text;
        zipLogs.appendChild(line);
        zipLogs.scrollTop = zipLogs.scrollHeight;
      }, log.delay);
    });

    // Finished simulation sequence
    setTimeout(() => {
      dropzoneRunning.classList.add('hide');
      dropzoneCompleted.classList.remove('hide');
      mdPreview.textContent = generatedMarkdown;
    }, 2800);
  });

  btnResetZip.addEventListener('click', () => {
    dropzoneCompleted.classList.add('hide');
    dropzoneIdle.classList.remove('hide');
  });

  // Drag and drop mock feedback
  const zipDropzone = document.getElementById('zip-dropzone');
  ['dragenter', 'dragover'].forEach(eventName => {
    zipDropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      zipDropzone.style.borderColor = 'var(--accent-teal)';
      zipDropzone.style.background = 'rgba(0, 242, 254, 0.02)';
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    zipDropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      zipDropzone.style.borderColor = 'var(--card-border)';
      zipDropzone.style.background = 'transparent';
      if (eventName === 'drop') {
        // Trigger simulation on drop
        btnSimZip.click();
      }
    }, false);
  });

  // ==========================================================================
  // CONTACT FORM LOGIC (SMTP Daemon Simulation Output)
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formConsoleBody = document.getElementById('form-console-body');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    
    // Initial submission printout
    formConsoleBody.innerHTML = `
      <div class="console-log-line">[PAYLOAD] Packaging form values... [OK]</div>
      <div class="console-log-line">[SMTP] Handshaking: mail.anaswin.dev:465...</div>
    `;

    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'console-log-line';
      line.textContent = '[SMTP] TLS 1.3 secured socket channel established.';
      formConsoleBody.appendChild(line);
    }, 600);

    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'console-log-line';
      line.innerHTML = `[DAEMON] Transmitting content body for <span style="color:var(--accent-teal);">${escapeHTML(name)}</span> (${escapeHTML(email)})...`;
      formConsoleBody.appendChild(line);
    }, 1200);

    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'console-log-line text-success';
      line.textContent = '✔ SUCCESS: Transmission completed. Return envelope ID: smtp_msg_9a2f8c.';
      formConsoleBody.appendChild(line);
      
      // Reset inputs
      contactForm.reset();
    }, 2000);
  });

});
