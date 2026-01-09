// ============================================
// PROFESSIONAL PORTFOLIO - JAVASCRIPT (CLASS-BASED)
// ============================================

// Project Class Definition
class Project {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.category = data.category;
        this.featured = data.featured || false;
        this.image = data.image || '';
        this.tagline = data.tagline;
        this.tags = data.tags;
        this.metrics = data.metrics;
        this.overview = data.overview;
        this.problem = data.problem;
        this.solution = data.solution;
        this.impact = data.impact;
        this.tech_stack = data.tech_stack;
        this.role = data.role;
        this.learnings = data.learnings;
        this.github = data.github || '';
        this.demo = data.demo || '';
    }

    // Generate project card HTML
    generateCard() {
        const imageHTML = this.image 
            ? `<img src="${this.image}" alt="${this.title}" class="project-image" onerror="this.style.display='none'">` 
            : `<div class="project-image-placeholder">COMING SOON</div>`;
        
        return `
            <div class="project-card ${this.category}" data-id="${this.id}" data-category="${this.category}">
                ${imageHTML}
                <div class="project-content">
                    <span class="project-category">${this.getCategoryLabel()}</span>
                    <h3>${this.title}</h3>
                    <p class="project-tagline">${this.tagline}</p>
                    <div class="project-tags">
                        ${this.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-metrics">
                        ${this.metrics.map(metric => `<span class="project-metric">${metric}</span>`).join('')}
                    </div>
                    <span class="view-details">VIEW DETAILS</span>
                </div>
            </div>
        `;
    }

    // Get category display label
    getCategoryLabel() {
        const labels = {
            'professional': 'PROFESSIONAL',
            'ai-ml': 'AI/ML',
            'full-stack': 'FULL-STACK'
        };
        return labels[this.category] || this.category.toUpperCase();
    }

    // Populate modal with project details
    populateModal() {
        document.getElementById('modal-title').textContent = this.title;
        
        // Image
        const modalImage = document.getElementById('modal-image');
        if (this.image) {
            modalImage.src = this.image;
            modalImage.alt = this.title;
            modalImage.style.display = 'block';
            modalImage.onerror = function() { this.style.display = 'none'; };
        } else {
            modalImage.style.display = 'none';
        }
        
        // Tags
        document.getElementById('modal-tags').innerHTML = this.tags
            .map(tag => `<span class="modal-tag">${tag}</span>`)
            .join('');
        
        // Metrics
        document.getElementById('modal-metrics').innerHTML = this.metrics
            .map(metric => `
                <div class="metric-badge">
                    <strong>${metric.split(' ')[0]}</strong>
                    <span>${metric.split(' ').slice(1).join(' ')}</span>
                </div>
            `).join('');
        
        // Content
        document.getElementById('modal-overview').textContent = this.overview;
        document.getElementById('modal-problem').textContent = this.problem;
        document.getElementById('modal-solution').textContent = this.solution;
        
        // Impact list
        document.getElementById('modal-impact').innerHTML = this.impact
            .map(item => `<li>${item}</li>`)
            .join('');
        
        // Tech stack
        document.getElementById('modal-tech-stack').innerHTML = this.tech_stack
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');
        
        // Role list
        document.getElementById('modal-role').innerHTML = this.role
            .map(item => `<li>${item}</li>`)
            .join('');
        
        // Learnings list
        document.getElementById('modal-learnings').innerHTML = this.learnings
            .map(item => `<li>${item}</li>`)
            .join('');
        
        // Links
        const githubBtn = document.getElementById('modal-github');
        const demoBtn = document.getElementById('modal-demo');
        
        githubBtn.style.display = this.github ? 'inline-flex' : 'none';
        githubBtn.href = this.github;
        
        demoBtn.style.display = this.demo ? 'inline-flex' : 'none';
        demoBtn.href = this.demo;
    }
}

// ============================================
// PROJECT DATA
// ============================================

const projectsData = [
    {
        id: "merchant-cash-advance",
        title: "Merchant Cash Advance",
        category: "professional",
        featured: true,
        image: "assets/img/merchant_cash_advance.png",
        tagline: "Fintech platform generating USD 1M+ revenue",
        tags: ["Deluge", "Full-Stack", "UX Design", "FinTech"],
        metrics: ["USD 1M+ Revenue", "66% Conversion", "KYC Automation"],
        overview: "Developed streamlined online Merchant Cash Advance flow integrated into Grab's business portal, simplifying capital access for merchant-partners. Includes Singpass government API integration for secure KYC verification.",
        problem: "Grab merchant-partners needed quick access to capital for business growth, but traditional loan applications were slow and complex. Manual KYC verification was time-consuming and prone to errors.",
        solution: "Designed an intuitive UX that simplified the application process, implemented full-stack development using Deluge, integrated Singpass OAuth 2.0 for instant KYC verification, and conducted comprehensive UAT to ensure smooth deployment.",
        impact: [
            "Generated USD 1,000,000+ in revenue through merchant loans",
            "Achieved 66% increase in loan take-up rate",
            "Reduced application processing time by 70%",
            "Reduced KYC verification time from 2 days to instant with Singpass integration"
        ],
        tech_stack: ["HTML5/CSS3", "JavaScript", "Deluge (Zoho)", "Singpass API", "OAuth 2.0", "RESTful APIs", "Figma"],
        role: [
            "UX Design: Created intuitive mockups and wireframes",
            "Full-Stack Development: Built 95% of application flow",
            "API Integration: Implemented Singpass government authentication",
            "UAT: Conducted testing with real merchants",
            "Data Analysis: Supported Credit Risk team"
        ],
        learnings: [
            "Navigating professional development environments",
            "Building production-grade fintech applications",
            "Government API integration standards and OAuth 2.0 security",
            "Stakeholder management and negotiation",
            "Full-stack development lifecycle"
        ],
        github: "",
        demo: "https://www.grab.com/sg/merchant/lending/easy-loans"
    },
    {
        id: "asl-recognition",
        title: "ASL Letter Recognition",
        category: "ai-ml",
        featured: true,
        image: "",
        tagline: "Real-time sign language detection with 90.38% accuracy",
        tags: ["Python", "PyTorch", "MediaPipe", "Computer Vision"],
        metrics: ["90.38% Accuracy", "87K+ Images", "<50ms Latency"],
        overview: "Real-time American Sign Language recognition system using MediaPipe for hand landmark detection and PyTorch neural network, trained on 87,000+ images.",
        problem: "Hearing-impaired individuals face communication barriers due to limited real-time ASL translation tools. Existing solutions lack accuracy, speed, or accessibility.",
        solution: "Developed end-to-end system using MediaPipe for hand landmark detection and custom 3-layer neural network (256-128-64) with focal loss for class imbalance. Trained on combined Kaggle dataset with custom samples.",
        impact: [
            "Achieved 90.38% validation accuracy on 10 common letters",
            "Processes 87,000+ training images with augmentation",
            "Real-time inference under 50ms per frame",
            "Open-source contribution for accessibility research"
        ],
        tech_stack: ["PyTorch", "MediaPipe", "NumPy/Pandas", "OpenCV", "Python"],
        role: [
            "Data Pipeline: Combined Kaggle dataset with custom samples",
            "Model Architecture: 3-layer MLP with dropout regularization",
            "Real-time System: Optimized inference pipeline for webcam",
            "Documentation: Comprehensive GitHub README with setup guide"
        ],
        learnings: [
            "End-to-end ML pipeline from data to deployment",
            "Computer vision with MediaPipe hand landmarks",
            "Handling class imbalance and overfitting with focal loss",
            "Real-time inference optimization techniques"
        ],
        github: "https://github.com/mlemxy/asl-recognition",
        demo: ""
    },
    {
        id: "supplypay",
        title: "SupplyPay Platform",
        category: "professional",
        featured: true,
        image: "assets/img/supplypay_platform.jpg",
        tagline: "Lead developer building automated transaction platform",
        tags: ["Deluge", "Full-Stack", "Automation", "FinTech"],
        metrics: ["95% Dev Ownership", "Multi-Party Portal", "Invoice Automation"],
        overview: "As lead developer, architected centralized portal automating transactions between Grab, suppliers, and merchants with invoice processing automation and workflow management.",
        problem: "Suppliers and merchants faced manual, error-prone invoice processing. Finance team spent hours on reconciliation, causing payment delays and vendor dissatisfaction.",
        solution: "Built centralized portal automating invoice upload, payment workflows, tracking dashboard, and notifications with comprehensive audit logging and multi-party transaction management.",
        impact: [
            "Reduced processing time by 95% (3-5 days to 2 hours)",
            "99% elimination of manual reconciliation errors",
            "Streamlined workflows for suppliers, merchants, and finance teams",
            "Comprehensive audit trails and automated notifications"
        ],
        tech_stack: ["HTML5/CSS3", "JavaScript", "Deluge", "Workflow Pipelines", "APIs"],
        role: [
            "Lead Developer: 95% ownership of full system architecture",
            "Requirements: Created comprehensive documentation from inception",
            "Architecture: Built multi-party workflow engine with automation",
            "Strategy: Daily stand-ups with business teams for alignment"
        ],
        learnings: [
            "Leading projects from conception to deployment",
            "Requirement gathering to prevent scope creep",
            "Building scalable automation systems for complex workflows",
            "Time management with multiple responsibilities"
        ],
        github: "",
        demo: "https://www.grab.com/sg/merchant/lending/supplypay"
    },
    {
        id: "peacesign",
        title: "PeaceSign",
        category: "ai-ml",
        featured: false,
        image: "assets/img/peacesign_microsoft_hackathon.png",
        tagline: "Microsoft Code Without Barriers 2023 Grand Finalist",
        tags: ["Python", "Flask", "Azure", "NLP"],
        metrics: ["2023 Grand Finalist", "Azure Services", "Community Impact"],
        overview: "Microsoft Code Without Barriers 2023 hackathon grand finalist. Web application translating speech into American Sign Language using Azure Cognitive Services for accessibility and inclusion.",
        problem: "Hearing-impaired community lacks accessible tools for translating spoken content into sign language, limiting communication and access to audio/video information.",
        solution: "Built web application using Azure Speech-to-Text API to transcribe audio/video content, then converts each letter into ASL hand signs with visual output display.",
        impact: [
            "Featured as Grand Finalist in Microsoft Code Without Barriers 2023 hackathon",
            "Supports translation of hours-long video content",
            "Community-focused solution for accessibility and inclusivity",
            "Open-source project with comprehensive documentation"
        ],
        tech_stack: ["Python", "Flask", "Microsoft Azure", "Speech-to-Text API", "HTML/CSS/JS"],
        role: [
            "Full-Stack Development: Built entire application flow",
            "API Integration: Azure Cognitive Services setup and testing",
            "Problem Research: Studied accessibility needs and requirements",
            "Optimization: Implemented continuous speech processing"
        ],
        learnings: [
            "Azure cloud services and API integration",
            "Building socially beneficial applications",
            "Time management in hackathon environment",
            "Accessibility-first design principles"
        ],
        github: "https://github.com/mlemxy/PeaceSign",
        demo: ""
    },
    {
        id: "sim-automation",
        title: "SIM Automation Solution",
        category: "professional",
        featured: false,
        image: "assets/img/automation.png",
        tagline: "99% time reduction in voucher distribution process",
        tags: ["Python", "Automation", "Excel", "Process Optimization"],
        metrics: ["99% Time Saved", "100 Students", "1 Minute Process"],
        overview: "Developed automation solution expediting voucher redemption email distribution to 100 students, reducing process time from 100 minutes to 1 minute.",
        problem: "Business development team manually processed voucher distribution for 100+ students, taking over 100 minutes of repetitive work per batch.",
        solution: "Created Python automation script integrating with email system and Excel database to generate personalized vouchers and send batch emails automatically.",
        impact: [
            "99% reduction in process time (100min to 1min)",
            "Zero errors in voucher code generation",
            "Enabled team to focus on strategic work",
            "Scalable solution for future campaigns"
        ],
        tech_stack: ["Python", "Pandas", "Email APIs", "Excel Integration", "Automation Libraries"],
        role: [
            "Requirements Analysis: Identified process bottlenecks",
            "Script Development: Built end-to-end automation solution",
            "Testing: Validated with pilot groups before deployment",
            "Training: Documented for team adoption and use"
        ],
        learnings: [
            "Business process automation principles",
            "Python scripting for practical business solutions",
            "Impact of small optimizations at scale",
            "User-friendly tool design for non-technical users"
        ],
        github: "",
        demo: ""
    },
    {
        id: "suicide-analysis",
        title: "Suicide Rate Analysis",
        category: "ai-ml",
        featured: false,
        image: "assets/img/suicide_rate_analysis_research.png",
        tagline: "Uncovering social determinants through data science and NLP",
        tags: ["Python", "NLP", "Data Analysis", "Research"],
        metrics: ["Research Paper", "NLP Analysis", "Policy Insights"],
        overview: "Data-driven investigation into Singapore's suicide rates using exploratory analysis and natural language processing to uncover correlations between mental health outcomes, psychiatric admissions, unemployment, and community sentiment from online forums.",
        problem: "Rising suicide rates in Singapore require understanding of underlying social determinants and effectiveness of intervention programs to inform evidence-based policy decisions.",
        solution: "Conducted comprehensive data analysis combining suicide statistics, psychiatric admissions, unemployment data, and NLP sentiment analysis of public forums and social media to identify patterns.",
        impact: [
            "Identified significant correlations with social and economic factors",
            "NLP analysis revealed community mental health needs and concerns",
            "Provided data-driven insights for policy recommendations",
            "Published comprehensive research findings and methodology"
        ],
        tech_stack: ["Python", "Pandas", "NLP Libraries", "Matplotlib/Seaborn", "Statistical Analysis"],
        role: [
            "Data Collection: Integrated multiple data sources and datasets",
            "EDA: Identified trends, patterns, and correlations",
            "NLP Analysis: Sentiment extraction from online forums",
            "Research Writing: Documented methodology and findings"
        ],
        learnings: [
            "Handling sensitive data with ethical considerations",
            "Interdisciplinary analysis combining multiple fields",
            "Advanced NLP techniques for sentiment analysis",
            "Research methodology and academic documentation"
        ],
        github: "https://github.com/mlemxy/Suicide-Analysis",
        demo: ""
    },
    {
        id: "orangebot",
        title: "OrangeBot",
        category: "full-stack",
        featured: false,
        image: "assets/img/orangebot_discord_nlp.png",
        tagline: "Intelligent Discord companion with natural language understanding",
        tags: ["Python", "Discord.py", "NLP", "Bot Development"],
        metrics: ["Multi-Server", "NLP Features", "Community Tool"],
        overview: "Multi-server Discord bot leveraging natural language processing for intuitive command parsing, automated task management, community moderation, and interactive engagement features that understand conversational commands.",
        problem: "Discord communities need intelligent automation that goes beyond rigid command syntax - requiring tools that understand natural language, automate moderation, manage scheduled tasks, and boost engagement through interactive features.",
        solution: "Built comprehensive Discord bot using discord.py with NLP for human-like command interpretation, scheduled task system with SQLite persistence, automated moderation features, and fun community interaction commands.",
        impact: [
            "Deployed across multiple Discord servers",
            "Automated routine community management tasks",
            "Natural language command understanding for better UX",
            "Enhanced user engagement and retention"
        ],
        tech_stack: ["Python", "Discord.py", "NLP", "SQLite", "Async Programming"],
        role: [
            "Bot Development: Full feature implementation from scratch",
            "NLP Integration: Natural language parsing and understanding",
            "Database Design: User preferences and task storage",
            "Community Management: Handled feature requests and updates"
        ],
        learnings: [
            "Discord API and bot architecture patterns",
            "Asynchronous programming in Python",
            "NLP for command interpretation and parsing",
            "Community-driven development and feedback loops"
        ],
        github: "",
        demo: ""
    },
    {
        id: "locky",
        title: "Locky IoT System",
        category: "full-stack",
        featured: false,
        image: "assets/img/locky_iot_system.png",
        tagline: "Smart locker with blockchain and Firebase",
        tags: ["Java", "Android", "Firebase", "Blockchain", "IoT"],
        metrics: ["IoT Integration", "Blockchain Security", "Mobile App"],
        overview: "Android application for smart locker system integrating Google Firebase for real-time backend and blockchain for secure data encryption and audit trails.",
        problem: "Traditional locker systems lack secure authentication, real-time monitoring capabilities, and tamper-proof logging of access events for security audits.",
        solution: "Built Android app with Firebase backend enabling hardware-cloud communication, OAuth 2.0 sign-in, and blockchain data encryption for immutable audit trails.",
        impact: [
            "Secure authentication with OAuth 2.0 integration",
            "Real-time locker status monitoring and alerts",
            "Immutable blockchain access logs for auditing",
            "Seamless hardware-cloud integration and sync"
        ],
        tech_stack: ["Java", "Android Studio", "Firebase", "Blockchain", "OAuth 2.0"],
        role: [
            "Mobile Development: Built entire Android application",
            "Backend Integration: Firebase setup and API implementation",
            "Security Implementation: Blockchain encryption layer",
            "IoT Communication: Hardware-cloud communication protocols"
        ],
        learnings: [
            "Android development with Firebase integration",
            "Blockchain implementation for IoT security",
            "OAuth 2.0 authentication flows in mobile apps",
            "Hardware-software integration challenges"
        ],
        github: "",
        demo: ""
    },
    {
        id: "face-detector",
        title: "Face Detector",
        category: "ai-ml",
        featured: false,
        image: "assets/img/face_detection_realtime.gif",
        tagline: "Real-time face and eye detection using OpenCV",
        tags: ["Python", "OpenCV", "Computer Vision", "Haar Cascade"],
        metrics: ["Real-time Detection", "Webcam Integration", "Cascade Classifiers"],
        overview: "Real-time face and eye detection application using OpenCV's Haar Cascade classifiers for live webcam video processing.",
        problem: "Need for simple, accessible face detection solution for learning computer vision fundamentals and real-time video processing.",
        solution: "Implemented OpenCV-based detection system using pre-trained Haar Cascade classifiers for frontal face and eye detection on live webcam feed.",
        impact: [
            "Real-time face and eye detection from webcam",
            "Educational project for CV fundamentals",
            "Lightweight solution with no ML training required",
            "Foundation for more advanced CV projects"
        ],
        tech_stack: ["Python", "OpenCV", "NumPy", "Haar Cascade Classifiers"],
        role: [
            "Implementation: Built detection pipeline using OpenCV",
            "Video Processing: Real-time frame capture and processing",
            "Optimization: Tuned detection parameters for accuracy",
            "Testing: Validated across different lighting conditions"
        ],
        learnings: [
            "OpenCV fundamentals and video capture",
            "Haar Cascade classifiers and detection parameters",
            "Real-time video processing techniques",
            "Computer vision pipeline design"
        ],
        github: "",
        demo: ""
    },
    {
        id: "influenza-prediction",
        title: "Influenza Prediction",
        category: "ai-ml",
        featured: false,
        image: "",
        tagline: "Machine learning model for outbreak prediction",
        tags: ["Python", "Machine Learning", "Data Science", "Healthcare"],
        metrics: ["ML Model", "Predictive Analytics", "Healthcare AI"],
        overview: "Machine learning model predicting influenza outbreaks by region using historical health data, weather patterns, and demographic factors.",
        problem: "Healthcare systems need predictive tools for resource allocation and early intervention during potential influenza outbreaks to minimize impact.",
        solution: "Built classification model using scikit-learn analyzing historical outbreak data, weather patterns, and demographic factors to predict regional outbreak probability.",
        impact: [
            "Accurate regional outbreak predictions for planning",
            "Enabled proactive resource allocation and preparation",
            "Data-driven public health insights and recommendations",
            "Scalable prediction framework for other diseases"
        ],
        tech_stack: ["Python", "Scikit-learn", "Pandas", "Jupyter Notebooks", "Data Visualization"],
        role: [
            "Data Analysis: Cleaned and preprocessed health datasets",
            "Feature Engineering: Selected predictive variables and features",
            "Model Training: Tested multiple ML algorithms for best fit",
            "Validation: Cross-validation and metrics analysis"
        ],
        learnings: [
            "Healthcare data analysis considerations and ethics",
            "Machine learning model selection criteria",
            "Feature engineering techniques for time-series data",
            "Model evaluation and validation methodologies"
        ],
        github: "",
        demo: ""
    },
    {
        id: "crisisbot",
        title: "CrisisBot",
        category: "ai-ml",
        featured: false,
        image: "assets/img/crisisbot_emergency_chatbot.png",
        tagline: "Emergency chatbot with AI-powered responses",
        tags: ["Python", "NLP", "Chatbot", "Emergency Response"],
        metrics: ["AI Chatbot", "Emergency Support", "Resource Guidance"],
        overview: "AI-powered emergency chatbot providing immediate support and resource guidance during crisis situations using natural language processing and intent classification.",
        problem: "People in crisis need immediate support but helplines have limited hours and may be overwhelmed during peak times, leaving people without help.",
        solution: "Developed NLP chatbot trained on crisis response patterns, offering immediate support, resource recommendations, and escalation to human help when needed.",
        impact: [
            "Immediate response reducing critical wait times",
            "Resource guidance tailored to specific situations",
            "Seamless handoff to human support when necessary",
            "Intent recognition for appropriate crisis response"
        ],
        tech_stack: ["Python", "NLP", "Chatbot Framework", "Intent Classification", "Dialog Flow"],
        role: [
            "NLP Development: Intent recognition system design and training",
            "Training Data: Curated crisis response patterns and dialogues",
            "Safety Features: Implemented escalation triggers for severity",
            "Testing: Validated with diverse crisis scenarios"
        ],
        learnings: [
            "Ethical AI for sensitive and life-critical use cases",
            "Intent classification and entity extraction techniques",
            "Safety mechanisms and fail-safes in chatbots",
            "Empathetic conversation design principles"
        ],
        github: "",
        demo: ""
    },
    {
        id: "gameflix",
        title: "GameFlix Platform",
        category: "full-stack",
        featured: false,
        image: "assets/img/gameflix_subscription_platform.png",
        tagline: "Subscription-based gaming platform",
        tags: ["C#", "PHP", "MySQL", "Full-Stack"],
        metrics: ["Full Subscription System", "Payment Integration", "User Management"],
        overview: "Full-stack subscription platform for gaming content with user authentication, management system, payment processing, and content delivery.",
        problem: "Gamers need centralized platform for discovering and accessing curated gaming content through flexible subscription models instead of scattered sources.",
        solution: "Built complete platform with user authentication system, tiered subscription management, payment gateway integration, and comprehensive content management system using C# and PHP.",
        impact: [
            "Complete subscription management system with tiers",
            "Secure payment processing integration and handling",
            "Scalable content delivery architecture for growth",
            "User-friendly interface and dashboard for management"
        ],
        tech_stack: ["C#", "PHP", "MySQL", "Payment Gateway APIs", "HTML/CSS/JavaScript"],
        role: [
            "Full-Stack Development: Implemented frontend and backend logic",
            "Database Design: User accounts and subscription tables schema",
            "Payment Integration: Gateway setup, testing, and error handling",
            "UI/UX Design: Created user interface and navigation flow"
        ],
        learnings: [
            "Multi-language full-stack development coordination",
            "Payment gateway integration and security best practices",
            "Subscription business logic and billing cycles",
            "Database design for complex relational data"
        ],
        github: "",
        demo: ""
    },
    {
        id: "decentralized-restaurant",
        title: "Decentralized Restaurant App",
        category: "full-stack",
        featured: false,
        image: "assets/img/decentralized_restaurant_app.png",
        tagline: "Blockchain-based restaurant management system",
        tags: ["Blockchain", "Smart Contracts", "Web3", "Restaurant Management"],
        metrics: ["Blockchain Integration", "Smart Contracts", "Decentralized System"],
        overview: "Decentralized restaurant application using blockchain technology for transparent supply chain management, inventory tracking, and transaction recording.",
        problem: "Restaurant supply chains lack transparency and trust, with difficulties in tracking ingredient sourcing, authenticity verification, and tamper-proof transaction records.",
        solution: "Built blockchain-based application with smart contracts for supply chain tracking, inventory management, and automated payment processing with immutable records.",
        impact: [
            "Transparent supply chain from farm to table",
            "Immutable transaction records for auditing and compliance",
            "Automated smart contract payment execution",
            "Enhanced trust and authenticity verification for customers"
        ],
        tech_stack: ["Blockchain", "Smart Contracts", "Web3.js", "Ethereum", "React"],
        role: [
            "Blockchain Development: Smart contract design and deployment",
            "Frontend Integration: Web3 integration with user interface",
            "System Architecture: Designed decentralized application flow",
            "Testing: Contract testing and security audit"
        ],
        learnings: [
            "Blockchain fundamentals and smart contract development",
            "Decentralized application architecture patterns",
            "Web3 integration and wallet connection",
            "Gas optimization and contract security"
        ],
        github: "",
        demo: ""
    }
];

// Create Project instances
const projects = projectsData.map(data => new Project(data));

// ============================================
// DOM ELEMENTS
// ============================================
const featuredProjectsContainer = document.getElementById('featured-projects');
const allProjectsContainer = document.getElementById('all-projects');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('project-modal');
const closeModalBtn = document.querySelector('.close-modal');

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    setupFilters();
    setupModal();
    setupSmoothScroll();
    setupMobileMenu();
});

// ============================================
// RENDER PROJECTS
// ============================================
function renderProjects() {
    // Render featured projects
    const featured = projects.filter(p => p.featured);
    featuredProjectsContainer.innerHTML = featured.map(p => p.generateCard()).join('');
    
    // Render all projects
    allProjectsContainer.innerHTML = projects.map(p => p.generateCard()).join('');
    
    // Add click listeners
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.id;
            openModal(projectId);
        });
    });
}

// ============================================
// FILTER SETUP
// ============================================
function setupFilters() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.dataset.filter;
            const cards = allProjectsContainer.querySelectorAll('.project-card');
            
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// MODAL SETUP
// ============================================
function setupModal() {
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModalFunction);
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });
}

function closeModalFunction() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    // Use Project class method to populate modal
    project.populateModal();
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// ============================================
// SMOOTH SCROLL
// ============================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking nav links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}
