import re

# Read base64 image from current index.html
with open(r"G:\3d-creator-portfolio\index.html", "r", encoding="utf-8") as f:
    old_html = f.read()

match = re.search(r'heroPortrait:\s*"(data:image/png;base64,[^"]+)"', old_html)
if match:
    base64_portrait = match.group(1)
    print(f"Extracted Base64 Image of length: {len(base64_portrait)}")
else:
    base64_portrait = "./src/assets/talha_portrait.png"
    print("Warning: Base64 not found, falling back to path")

new_html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DSW | Websites, Apps & Automation Built for Leads, Not Just Looks</title>
  <meta name="description" content="Talha Tariq / Digital Skill World builds websites, apps, automations and ad campaigns designed around one goal — measurable results: more leads, more clicks, more conversions. Based in Multan, working with clients worldwide.">

  <!-- OpenGraph / SEO -->
  <meta property="og:title" content="DSW | Websites, Apps & Automation Built for Leads">
  <meta property="og:description" content="Talha Tariq / Digital Skill World builds web, mobile, and automation systems designed for measurable revenue.">
  <meta property="og:type" content="website">

  <!-- Google Fonts: Kanit -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet">

  <!-- React 18, ReactDOM 18, and HTM UMD Libraries -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/htm@3.1.1/dist/htm.umd.js" crossorigin></script>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          fontFamily: {{
            sans: ['Kanit', 'sans-serif'],
          }},
          colors: {{
            dark: '#0C0C0C',
            lightText: '#D7E2EA'
          }}
        }}
      }}
    }}
  </script>

  <style>
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    
    html, body, #root {{
      background-color: #0C0C0C;
      color: #D7E2EA;
      font-family: 'Kanit', sans-serif;
      overflow-x: clip;
      width: 100%;
      min-height: 100vh;
    }}

    /* Hero Heading Gradient Class */
    .hero-heading {{
      background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }}

    /* Floating Air Badge Animation */
    @keyframes floatAir {{
      0%, 100% {{
        transform: translateY(0px) rotate(0deg);
      }}
      50% {{
        transform: translateY(-14px) rotate(3deg);
      }}
    }}

    .floating-badge {{
      animation: floatAir 4.5s ease-in-out infinite;
    }}

    /* Custom scrollbar styling */
    ::-webkit-scrollbar {{
      width: 8px;
    }}
    ::-webkit-scrollbar-track {{
      background: #0C0C0C;
    }}
    ::-webkit-scrollbar-thumb {{
      background: #333;
      border-radius: 4px;
    }}
    ::-webkit-scrollbar-thumb:hover {{
      background: #555;
    }}
  </style>
</head>
<body class="bg-[#0C0C0C] text-[#D7E2EA] font-sans antialiased">
  <div id="root"></div>

  <!-- Single Standalone Bulletproof Portfolio Application -->
  <script>
    (function () {{
      const {{ useState, useEffect, useRef }} = React;
      const html = htm.bind(React.createElement);

      // --- PORTFOLIO DATA CONFIGURATION ---
      const personalInfo = {{
        brand: "Digital Skill World (DSW)",
        name: "TALHA TARIQ",
        seoH1: "Talha Tariq | Digital Skill World — Web, App & Growth Systems That Convert",
        heroHeadline: "I Don't Just Build Websites, Apps & Automations. I Build the Systems Behind Your Next Client.",
        heroSubheadline: "Digital Skill World (DSW) helps businesses turn traffic into leads and leads into revenue — through websites that convert, apps that retain, automations that save time, and ad campaigns that actually get clicks that matter.",
        heroPortrait: "{base64_portrait}",
        aboutHeading: "About Me",
        aboutParagraphs: [
          "I'm Talha Tariq, founder of Digital Skill World (DSW). I didn't start out trying to be a 'web developer' or a 'marketer' — I started by asking a simpler question: why do so many small businesses spend money on websites and ads that never bring in a single real customer?",
          "The answer is almost always the same: the tech gets built, but the strategy behind it doesn't. A beautiful site with no conversion path. An app with no retention loop. An ad campaign optimized for clicks instead of customers.",
          "That's the gap DSW fills. Every project I take on — whether it's a website, a mobile app, a workflow automation, or a paid ad campaign — is built around one question first: what result does this need to produce? The design, the code, and the strategy come after that answer, not before it.",
          "I'm based in Multan, Pakistan, and work with clients across Pakistan, the US, and beyond — small businesses, e-commerce brands, and founders who need their digital presence to actually perform, not just exist."
        ],
        contactEmail: "talhatariq0836@gmail.com",
        location: "Multan, Pakistan (Serving Clients Worldwide)",
        socialLinks: {{
          linkedin: "https://www.linkedin.com/in/talha-tariq-b3653b410?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          github: "https://github.com"
        }}
      }};

      // Floating round technology badges
      const techBadges = [
        {{ name: "HTML5 & CSS3", category: "Frontend", delay: "0s" }},
        {{ name: "JavaScript", category: "Language", delay: "0.8s" }},
        {{ name: "TypeScript", category: "Language", delay: "1.6s" }},
        {{ name: "React.js", category: "Framework", delay: "2.4s" }},
        {{ name: "Next.js", category: "Framework", delay: "0.4s" }},
        {{ name: "Node.js", category: "Backend", delay: "1.2s" }},
        {{ name: "Python", category: "AI & Scripts", delay: "2.0s" }},
        {{ name: "AI Automations", category: "Workflows", delay: "2.8s" }},
        {{ name: "n8n Workflows", category: "Automation", delay: "0.6s" }},
        {{ name: "Flutter & Apps", category: "Mobile", delay: "1.4s" }},
        {{ name: "Meta Ads & SEO", category: "Growth", delay: "2.2s" }},
        {{ name: "Shopify & Woo", category: "E-Commerce", delay: "1.0s" }}
      ];

      const services = [
        {{
          number: "01",
          name: "Websites That Convert",
          problem: "Most business websites look fine and do nothing. Visitors land, scroll, and leave — because the site was built to look professional, not to move people toward a decision.",
          solution: "I build websites structured around one goal: turning visitors into inquiries. That means clear positioning above the fold, trust signals placed where doubt naturally shows up, and a conversion path that doesn't rely on the visitor 'figuring it out' themselves.",
          builtFor: "lead generation, service businesses, personal brands, SaaS landing pages.",
          features: [
            "Clear Positioning & Value Proposition Above the Fold",
            "Strategic Trust Placement & Social Proof Integration",
            "High-Converting Lead Capture Funnels & Forms",
            "Mobile-First Responsive Design & Ultra Fast Loading",
            "Technical SEO Architecture & Meta Optimization"
          ]
        }},
        {{
          number: "02",
          name: "Mobile Apps That Retain Users",
          problem: "An app that gets downloaded once and never opened again isn't a product — it's a cost. The hard part of app development was never the build; it's designing for the second and tenth session, not just the first.",
          solution: "I design and build apps around retention from day one: onboarding that doesn't lose people in the first 60 seconds, core actions that are one tap away, and a structure that scales without a rebuild six months in.",
          builtFor: "startups validating an MVP, businesses extending a service into mobile, founders who need retention data to raise or scale.",
          features: [
            "Smooth 60-Second Onboarding Flows",
            "Cross-Platform Performance (iOS & Android)",
            "Push Notification & Re-engagement Triggers",
            "Scalable Backend & REST API Architecture",
            "App Store & Google Play Launch Support"
          ]
        }},
        {{
          number: "03",
          name: "Automation That Saves Time & Money",
          problem: "Every business has 3–5 hours a week going into tasks a human shouldn't be doing anymore — manual data entry, repetitive client replies, lead follow-ups that fall through the cracks.",
          solution: "I build automation workflows (using tools like n8n and custom scripts) that plug directly into how you already work, so the win shows up immediately: fewer dropped leads, faster response times, and hours back in your week.",
          builtFor: "agencies, e-commerce operators, service businesses drowning in repetitive admin work.",
          features: [
            "Zero-Drop Lead Routing & CRM Sync",
            "Instant Automated Email & WhatsApp Responses",
            "Custom n8n & Python Workflow Integration",
            "E-Commerce Inventory & Order Automations",
            "Weekly Saved Time & Error Prevention"
          ]
        }},
        {{
          number: "04",
          name: "Paid Ads & Digital Marketing That Get Leads",
          problem: "Running ads isn't hard. Running ads that produce quality clicks — the kind that turn into actual customers instead of curious scrollers — is the part almost everyone gets wrong.",
          solution: "I manage Meta Ads and content strategy built around one metric that matters: cost per real lead, not cost per click. That includes creative direction, targeting, and the follow-up systems that catch a lead the moment they show interest.",
          builtFor: "e-commerce brands, local businesses, anyone currently paying for clicks that don't convert.",
          features: [
            "High-Intent Target Audience Research",
            "Conversion-Focused Ad Copy & Creative Direction",
            "Cost-Per-Lead (CPL) Optimization Strategy",
            "Instant Lead Capture & Retargeting Pipelines",
            "Transparent ROI & Campaign Tracking"
          ]
        }},
        {{
          number: "05",
          name: "E-Commerce Systems That Sell",
          problem: "A store that's live isn't the same as a store that sells. Most e-commerce builds stop at 'the checkout works' — they never solve for cart abandonment, trust at the point of purchase, or repeat buyers.",
          solution: "I build e-commerce systems (Shopify & Custom setups) with the sales psychology built in from the start — not bolted on after launch.",
          builtFor: "Pakistani and international brands selling physical or digital products online.",
          features: [
            "Frictionless One-Page Checkout Systems",
            "Cart Abandonment Recovery Workflows",
            "High-Trust Product Display & Reviews",
            "Payment Gateway & Local/Global Shipping Sync",
            "Upsell & Repeat Customer Revenue Loops"
          ]
        }}
      ];

      const processSteps = [
        {{
          number: "01",
          title: "Discovery Call",
          desc: "I learn your actual business problem, not just what you think you want built."
        }},
        {{
          number: "02",
          title: "Strategy First",
          desc: "Before any design or code, we agree on what result this needs to produce."
        }},
        {{
          number: "03",
          title: "Build & Iterate",
          desc: "You see progress in stages, not a surprise reveal at the end."
        }},
        {{
          number: "04",
          title: "Launch & Measure",
          desc: "Every project ships with a way to track whether it's working."
        }}
      ];

      const faqs = [
        {{
          q: "How is this different from just hiring a web developer?",
          a: "Most developers write code based on a feature list without understanding your customer funnel. At Digital Skill World, we engineer the entire conversion strategy, user experience, and backend automation to ensure every line of code produces measurable business leads and revenue."
        }},
        {{
          q: "Do you only work with businesses in Pakistan?",
          a: "No. While DSW is proudly founded in Multan, Pakistan, we work with clients across Pakistan, the US, UK, UAE, and international founders worldwide who need high-performing digital systems."
        }},
        {{
          q: "What if I only need one service, not all of them?",
          a: "You can start with a single focused project — such as a high-converting landing page, an n8n workflow automation, or a paid ad campaign — and scale into full systems as your revenue grows."
        }},
        {{
          q: "How do you measure if a project is actually working?",
          a: "We establish clear conversion metrics before writing a single line of code — tracking real lead submissions, cost-per-lead, time saved on manual tasks, and app retention rates."
        }}
      ];

      const decorativeIcons = {{
        moon: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
        p59: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
        lego: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
        group134: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
      }};

      const completedProjects = [
        {{
          id: "01",
          name: "High-Converting Web & Mobile Systems",
          category: "Websites That Convert & Retain",
          images: {{
            col1_top: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
            col1_bottom: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
            col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
          }},
          liveUrl: "mailto:talhatariq0836@gmail.com"
        }},
        {{
          id: "02",
          name: "AI Workflows & Business Automations",
          category: "n8n & Custom CRM Pipelines",
          images: {{
            col1_top: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
            col1_bottom: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
            col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
          }},
          liveUrl: "mailto:talhatariq0836@gmail.com"
        }},
        {{
          id: "03",
          name: "E-Commerce & Paid Ads Lead Funnels",
          category: "Meta Ads & Revenue Optimization",
          images: {{
            col1_top: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
            col1_bottom: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
            col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
          }},
          liveUrl: "mailto:talhatariq0836@gmail.com"
        }}
      ];

      // --- COMPONENTS ---
      function PrimaryCTAButton({{ label = "Book a Free Strategy Call", onClick }}) {{
        const handleClick = onClick || (() => {{
          const contactSection = document.getElementById('contact');
          if (contactSection) {{
            contactSection.scrollIntoView({{ behavior: 'smooth' }});
          }} else {{
            window.location.href = `mailto:${{personalInfo.contactEmail}}?subject=Strategy Call Inquiry`;
          }}
        }});

        return html`
          <button
            onClick=${{handleClick}}
            className="relative group overflow-hidden rounded-full font-medium uppercase tracking-widest text-white transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-4.5 text-xs sm:text-sm md:text-base cursor-pointer"
            style=${{
              background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow: '0px 4px 15px rgba(181, 1, 167, 0.35), inset 4px 4px 12px #7721B1',
              outline: '2px solid white',
              outlineOffset: '-3px'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              ${{label}} \u2192
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </button>
        `;
      }}

      function SecondaryButton({{ label = "See How It Works", onClick }}) {{
        const handleClick = onClick || (() => {{
          const processSection = document.getElementById('process');
          if (processSection) processSection.scrollIntoView({{ behavior: 'smooth' }});
        }});

        return html`
          <button
            onClick=${{handleClick}}
            className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm hover:border-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            ${{label}}
          </button>
        `;
      }}

      function FadeIn({{ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "" }}) {{
        const [isVisible, setIsVisible] = useState(false);
        const ref = useRef(null);

        useEffect(() => {{
          const observer = new IntersectionObserver(
            ([entry]) => {{
              if (entry.isIntersecting) setIsVisible(true);
            }},
            {{ rootMargin: "50px", threshold: 0 }}
          );
          if (ref.current) observer.observe(ref.current);
          return () => observer.disconnect();
        }}, []);

        return html`
          <div
            ref=${{ref}}
            className=${{className}}
            style=${{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translate(0px, 0px)' : `translate(${{x}}px, ${{y}}px)`,
              transition: `opacity ${{duration}}s cubic-bezier(0.25, 0.1, 0.25, 1) ${{delay}}s, transform ${{duration}}s cubic-bezier(0.25, 0.1, 0.25, 1) ${{delay}}s`
            }}
          >
            ${{children}}
          </div>
        `;
      }}

      function ServiceDetailModal({{ service, onClose }}) {{
        if (!service) return null;

        return html`
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all duration-300">
            <div className="bg-[#0C0C0C] border border-[#D7E2EA]/30 text-[#D7E2EA] rounded-[30px] p-6 sm:p-10 max-w-2xl w-full relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              <button
                onClick=${{onClose}}
                className="absolute top-6 right-6 text-[#D7E2EA]/60 hover:text-white text-2xl font-bold w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors z-20"
              >
                &times;
              </button>

              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-black text-[#D7E2EA]" style=${{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1 }}>
                  ${{service.number}}
                </span>
                <h3 className="font-medium uppercase text-xl sm:text-2xl md:text-3xl text-white">
                  ${{service.name}}
                </h3>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200/90 text-sm">
                <strong className="block text-red-300 mb-1 font-semibold uppercase text-xs tracking-wider">The Problem:</strong>
                ${{service.problem}}
              </div>

              <p className="text-[#D7E2EA]/90 font-light leading-relaxed mb-6 text-sm sm:text-base border-b border-white/10 pb-4">
                <strong className="block text-[#B600A8] mb-1 font-semibold uppercase text-xs tracking-wider">How I Fix It:</strong>
                ${{service.solution}}
              </p>

              <div className="mb-8">
                <h4 className="font-medium uppercase tracking-widest text-xs text-[#D7E2EA]/60 mb-3">Key Solution Features:</h4>
                <ul className="space-y-2">
                  ${{service.features.map((feature, idx) => html`
                    <li key=${{idx}} className="flex items-center gap-3 text-sm font-light text-[#D7E2EA]">
                      <span className="w-2 h-2 rounded-full bg-[#B600A8] inline-block shrink-0"></span>
                      <span>${{feature}}</span>
                    </li>
                  `)}}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
                <span className="text-xs text-[#D7E2EA]/50 uppercase tracking-widest">
                  ${{service.builtFor}}
                </span>
                <${{PrimaryCTAButton}} label="Get Started" onClick=${{() => {{
                  onClose();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) contactSection.scrollIntoView({{ behavior: 'smooth' }});
                }}}} />
              </div>
            </div>
          </div>
        `;
      }}

      // --- JELLY PHYSICS LANYARD CARD ---
      function JellyLanyardCard() {{
        const [jellyStage, setJellyStage] = useState('initial');
        const [physicsTransform, setPhysicsTransform] = useState('translateY(0px) rotate(0deg) scale(1,1)');
        const [isPhysicsActive, setIsPhysicsActive] = useState(false);

        useEffect(() => {{
          const t1 = setTimeout(() => setJellyStage('drop'), 100);
          const t2 = setTimeout(() => setJellyStage('bounce'), 600);
          const t3 = setTimeout(() => setJellyStage('settled'), 1100);
          return () => {{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); }};
        }}, []);

        const triggerJellyPhysics = () => {{
          if (isPhysicsActive) return;
          setIsPhysicsActive(true);

          const keyframes = [
            {{ t: 'translateY(-10px) rotate(16deg) scale(0.95, 1.05)', d: 150 }},
            {{ t: 'translateY(12px) rotate(-14deg) scale(1.06, 0.94)', d: 300 }},
            {{ t: 'translateY(-6px) rotate(10deg) scale(0.97, 1.03)', d: 450 }},
            {{ t: 'translateY(4px) rotate(-6deg) scale(1.02, 0.98)', d: 600 }},
            {{ t: 'translateY(-2px) rotate(3deg) scale(0.99, 1.01)', d: 750 }},
            {{ t: 'translateY(0px) rotate(0deg) scale(1, 1)', d: 900 }}
          ];

          keyframes.forEach(({{ t, d }}) => {{
            setTimeout(() => {{
              setPhysicsTransform(t);
              if (d === 900) setIsPhysicsActive(false);
            }}, d);
          }});
        }};

        let dropStyle = 'translateY(-140px) scale(0.8, 1.3) rotate(0deg)';
        if (jellyStage === 'drop') {{
          dropStyle = 'translateY(15px) scale(1.08, 0.92) rotate(4deg)';
        }} else if (jellyStage === 'bounce') {{
          dropStyle = 'translateY(-5px) scale(0.96, 1.04) rotate(-2deg)';
        }} else if (jellyStage === 'settled') {{
          dropStyle = physicsTransform;
        }}

        return html`
          <div 
            className="relative flex flex-col items-center my-4 z-30 cursor-pointer select-none" 
            onClick=${{triggerJellyPhysics}}
            onMouseEnter=${{triggerJellyPhysics}}
          >
            <div 
              className=${{`w-3.5 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0d0d0d] border-x border-white/20 transition-all duration-700 ease-out origin-top ${{
                jellyStage !== 'initial' ? 'h-16 sm:h-20 opacity-100' : 'h-0 opacity-0'
              }}`}}
              style=${{ boxShadow: '0 0 12px rgba(0,0,0,0.9)' }}
            >
              <div className="w-full h-full flex flex-col items-center justify-around text-[6px] text-white/40 font-bold uppercase tracking-widest rotate-90">
                <span>DSW</span>
              </div>
            </div>

            <div
              className="transition-all duration-300 ease-out origin-top-center"
              style=${{
                transform: dropStyle,
                transition: isPhysicsActive ? 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.5s ease-out'
              }}
            >
              <div className="w-60 sm:w-68 bg-white text-slate-900 rounded-2xl p-1.5 sm:p-2 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-slate-200 flex flex-col items-center relative group hover:scale-105 transition-transform duration-300 -mt-1">
                <div className="w-8 h-1.5 rounded-full bg-slate-900 mb-1.5 border border-slate-400 shadow-inner"></div>

                <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-neutral-900 shadow-md border border-slate-200 mb-2">
                  <img 
                    src=${{personalInfo.heroPortrait}} 
                    alt="Talha Tariq ID Photo" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="text-center pb-1">
                  <h3 className="font-serif italic text-lg sm:text-xl tracking-wide text-slate-900 font-bold leading-tight">
                    Talha Tariq
                  </h3>
                  <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-widest text-slate-500 block">
                    Founder & System Architect
                  </span>
                </div>
              </div>
            </div>
          </div>
        `;
      }}

      // --- FLOATING AIR BADGES SECTION ---
      function FloatingAirBadgesSection() {{
        return html`
          <section className="bg-[#0C0C0C] py-16 sm:py-20 border-y border-white/10 overflow-hidden w-full relative z-20">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 px-4 py-1.5 rounded-full border border-[#B600A8]/30">
                Core Capabilities & Tech Stack
              </span>
              <h3 className="hero-heading font-black uppercase text-2xl sm:text-4xl mt-3 mb-10">
                Technologies & Tools Floating in Sync
              </h3>

              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 max-w-5xl mx-auto">
                ${{techBadges.map((badge, idx) => html`
                  <div
                    key=${{idx}}
                    className="floating-badge bg-[#120826]/90 border border-[#B600A8]/40 hover:border-[#B600A8] rounded-full px-5 py-2.5 sm:px-6 sm:py-3 shadow-[0_0_20px_rgba(182,0,168,0.2)] hover:scale-110 transition-all cursor-default flex items-center gap-3 backdrop-blur-md"
                    style=${{ animationDelay: badge.delay }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B600A8] animate-pulse"></span>
                    <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">${{badge.name}}</span>
                    <span className="text-[#D7E2EA]/40 text-[9px] uppercase tracking-widest hidden sm:inline">&bull; ${{badge.category}}</span>
                  </div>
                `)}}
              </div>
            </div>
          </section>
        `;
      }}

      // --- HERO SECTION ---
      function HeroSection() {{
        return html`
          <section className="relative min-h-screen w-full flex flex-col justify-between overflow-x-clip px-6 md:px-12 bg-[#0C0C0C] pb-12">
            <${{FadeIn}} delay=${{0}} y=${{-20}} className="w-full z-30">
              <nav className="flex justify-between items-center w-full pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base">
                <span className="font-black tracking-widest text-[#BBCCD7]">DSW &bull; DIGITAL SKILL WORLD</span>
                <div className="flex gap-4 sm:gap-8">
                  <a href="#about" className="hover:opacity-70 transition-opacity duration-200">About</a>
                  <a href="#services" className="hover:opacity-70 transition-opacity duration-200">Services</a>
                  <a href="#process" className="hover:opacity-70 transition-opacity duration-200">Process</a>
                  <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">Work</a>
                  <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">Contact</a>
                </div>
              </nav>
            <//>

            <div className="w-full flex flex-col items-center text-center pt-8 md:pt-10 z-20 max-w-5xl mx-auto">
              
              <!-- Hidden SEO H1 Tag -->
              <h1 className="sr-only">${{personalInfo.seoH1}}</h1>

              <${{FadeIn}} delay=${{0.15}} y=${{30}} className="w-full">
                <h2 className="hero-heading font-black uppercase tracking-tight leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl select-none mb-4 max-w-4xl">
                  ${{personalInfo.heroHeadline}}
                </h2>
              <//>

              <${{FadeIn}} delay=${{0.3}} y=${{20}}>
                <p className="text-[#D7E2EA]/90 font-light tracking-wide leading-relaxed text-sm sm:text-base md:text-lg max-w-3xl mb-6">
                  ${{personalInfo.heroSubheadline}}
                </p>
              <//>

              <${{JellyLanyardCard}} />

              <${{FadeIn}} delay=${{0.45}} y=${{20}} className="mt-6 flex flex-wrap justify-center items-center gap-4">
                <${{PrimaryCTAButton}} label="Book a Free Strategy Call" />
                <${{SecondaryButton}} label="See How It Works" />
              <//>
            </div>

            <div className="w-full flex justify-between items-center pt-8 border-t border-white/10 text-xs uppercase tracking-widest text-[#D7E2EA]/40 mt-6">
              <span>Digital Skill World &bull; Multan, PK</span>
              <span>Systems Built for Results</span>
            </div>
          </section>
        `;
      }}

      // --- ABOUT ME SECTION ---
      function AboutSection() {{
        return html`
          <section id="about" className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-24 bg-[#0C0C0C] overflow-hidden">
            <${{FadeIn}} delay=${{0.1}} x=${{-80}} y=${{0}} duration=${{0.9}} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10">
              <img src=${{decorativeIcons.moon}} alt="Moon Icon" className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl" />
            <//>

            <${{FadeIn}} delay=${{0.25}} x=${{-80}} y=${{0}} duration=${{0.9}} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10">
              <img src=${{decorativeIcons.p59}} alt="3D Object" className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-xl" />
            <//>

            <${{FadeIn}} delay=${{0.15}} x=${{80}} y=${{0}} duration=${{0.9}} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10">
              <img src=${{decorativeIcons.lego}} alt="Lego Icon" className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl" />
            <//>

            <${{FadeIn}} delay=${{0.3}} x=${{80}} y=${{0}} duration=${{0.9}} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10">
              <img src=${{decorativeIcons.group134}} alt="3D Group" className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-xl" />
            <//>

            <div className="flex flex-col items-center text-center z-20 max-w-4xl mx-auto gap-8 sm:gap-10">
              <${{FadeIn}} delay=${{0}} y=${{40}}>
                <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                  ${{personalInfo.aboutHeading}}
                </h2>
              <//>

              <div className="space-y-6 text-[#D7E2EA] font-light leading-relaxed max-w-3xl text-sm sm:text-base md:text-lg text-left sm:text-center">
                ${{personalInfo.aboutParagraphs.map((para, i) => html`
                  <p key=${{i}} className="bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10 shadow-lg">
                    ${{para}}
                  </p>
                `)}}
              </div>

              <div className="pt-4">
                <${{FadeIn}} delay=${{0.4}} y=${{20}}>
                  <${{PrimaryCTAButton}} label="Let's Build Your System" />
                <//>
              </div>
            </div>
          </section>
        `;
      }}

      // --- SERVICES SECTION ---
      function ServicesSection() {{
        const [selectedService, setSelectedService] = useState(null);

        return html`
          <section id="services" className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
            <div className="max-w-5xl mx-auto">
              <${{FadeIn}} delay=${{0}} y=${{40}}>
                <div className="text-center mb-16 sm:mb-20">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#7621B0] bg-[#7621B0]/10 px-4 py-1.5 rounded-full border border-[#7621B0]/20">
                    What I Solve &bull; Problem-First Framing
                  </span>
                  <h2 className="font-black uppercase text-[#0C0C0C] mt-4" style=${{ fontSize: 'clamp(2.5rem, 8vw, 120px)', lineHeight: 1 }}>
                    Services
                  </h2>
                </div>
              <//>

              <div className="divide-y divide-[#0C0C0C]/15 border-t border-b border-[#0C0C0C]/15">
                ${{services.map((service, i) => html`
                  <${{FadeIn}} key=${{service.number}} delay=${{i * 0.1}} y=${{30}} className="py-8 sm:py-10 md:py-12">
                    <div 
                      onClick=${{() => setSelectedService(service)}}
                      className="group flex flex-col sm:flex-row sm:items-start justify-between gap-6 cursor-pointer p-4 rounded-2xl hover:bg-[#0C0C0C]/5 transition-colors duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 md:gap-12">
                        <span className="font-black text-[#0C0C0C] shrink-0 group-hover:text-[#7621B0] transition-colors" style=${{ fontSize: 'clamp(2.5rem, 7vw, 100px)', lineHeight: 1 }}>
                          ${{service.number}}
                        </span>

                        <div className="flex flex-col gap-2 sm:gap-3">
                          <h3 className="font-medium uppercase text-[#0C0C0C] group-hover:translate-x-2 transition-transform text-xl sm:text-2xl md:text-3xl">
                            ${{service.name}}
                          </h3>
                          <p className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/70 text-sm sm:text-base">
                            <strong className="text-red-700 block text-xs uppercase tracking-wider font-semibold">The Problem:</strong>
                            ${{service.problem}}
                          </p>
                          <span className="inline-block mt-2 text-xs font-semibold uppercase tracking-wider text-[#7621B0] bg-[#7621B0]/10 px-3 py-1 rounded-md w-max">
                            ${{service.builtFor}}
                          </span>
                        </div>
                      </div>

                      <div className="self-end sm:self-center shrink-0">
                        <span className="text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full border border-[#0C0C0C]/20 group-hover:bg-[#0C0C0C] group-hover:text-white transition-colors">
                          View Solution \u2192
                        </span>
                      </div>
                    </div>
                  <//>
                `)}}
              </div>
            </div>

            <${{ServiceDetailModal}} service=${{selectedService}} onClose=${{() => setSelectedService(null)}} />
          </section>
        `;
      }}

      // --- PROCESS SECTION ---
      function ProcessSection() {{
        return html`
          <section id="process" className="bg-[#0C0C0C] text-[#D7E2EA] py-24 px-6 md:px-12 border-t border-white/10 relative z-20">
            <div className="max-w-6xl mx-auto">
              <${{FadeIn}} delay=${{0}} y=${{40}}>
                <div className="text-center mb-16">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 px-4 py-1.5 rounded-full border border-[#B600A8]/30">
                    How I Work &bull; Trust Before The Ask
                  </span>
                  <h2 className="hero-heading font-black uppercase text-3xl sm:text-5xl md:text-6xl mt-4">
                    4-Step Execution Process
                  </h2>
                </div>
              <//>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${{processSteps.map((step, idx) => html`
                  <${{FadeIn}} key=${{idx}} delay=${{idx * 0.1}} y=${{30}}>
                    <div className="bg-[#120826] border border-white/15 rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between hover:border-[#B600A8] transition-all">
                      <div>
                        <span className="font-black text-[#B600A8] text-4xl block mb-4">${{step.number}}</span>
                        <h3 className="font-bold uppercase text-lg sm:text-xl text-white mb-2">${{step.title}}</h3>
                        <p className="text-[#D7E2EA]/70 font-light text-sm leading-relaxed">${{step.desc}}</p>
                      </div>
                    </div>
                  <//>
                `)}}
              </div>
            </div>
          </section>
        `;
      }}

      // --- PROOF OF WORK (PROJECTS) SECTION ---
      function ProjectsSection() {{
        return html`
          <section id="projects" className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 relative z-20 pt-20 sm:pt-24 md:pt-28 pb-32 px-4 sm:px-6 md:px-10">
            <div className="max-w-6xl mx-auto">
              <${{FadeIn}} delay=${{0}} y=${{40}}>
                <div className="text-center mb-16">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 px-4 py-1.5 rounded-full border border-[#B600A8]/30">
                    Proof of Work
                  </span>
                  <h2 className="hero-heading font-black uppercase text-3xl sm:text-5xl md:text-6xl mt-4">
                    Featured Systems & Case Studies
                  </h2>
                </div>
              <//>

              <div className="relative flex flex-col gap-12 sm:gap-16">
                ${{completedProjects.map((project, index) => {{
                  const topOffset = index * 28;

                  return html`
                    <div
                      key=${{project.id}}
                      className="sticky top-24 md:top-32 w-full transition-transform duration-300"
                      style=${{ top: `${{96 + topOffset}}px` }}
                    >
                      <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col justify-between gap-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D7E2EA]/20">
                          <div className="flex items-center gap-4 sm:gap-8">
                            <span className="font-black text-[#D7E2EA]" style=${{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1 }}>
                              ${{project.id}}
                            </span>
                            <div>
                              <span className="text-xs sm:text-sm font-light uppercase tracking-widest text-[#D7E2EA]/60 block mb-1">
                                ${{project.category}}
                              </span>
                              <h3 className="font-medium uppercase text-lg sm:text-2xl md:text-3xl text-[#D7E2EA]">
                                ${{project.name}}
                              </h3>
                            </div>
                          </div>

                          <a
                            href=${{project.liveUrl}}
                            className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 text-xs sm:text-sm hover:bg-white/10 transition-all"
                          >
                            Inquire Case Study \u2192
                          </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
                          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
                            <img 
                              src=${{project.images.col1_top}} 
                              alt="${{project.name}} preview 1"
                              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-white/10"
                              style=${{ height: 'clamp(130px, 16vw, 230px)' }}
                            />
                            <img 
                              src=${{project.images.col1_bottom}} 
                              alt="${{project.name}} preview 2"
                              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-white/10"
                              style=${{ height: 'clamp(160px, 22vw, 340px)' }}
                            />
                          </div>

                          <div className="md:col-span-7 h-full">
                            <img 
                              src=${{project.images.col2}} 
                              alt="${{project.name}} full render"
                              className="w-full h-full min-h-[300px] md:min-h-[420px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-white/10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  `;
                }})}}
              </div>
            </div>
          </section>
        `;
      }}

      // --- FAQ SECTION ---
      function FAQSection() {{
        const [openIdx, setOpenIdx] = useState(0);

        return html`
          <section id="faq" className="bg-[#0C0C0C] text-[#D7E2EA] py-24 px-6 md:px-12 border-t border-white/10 relative z-20">
            <div className="max-w-4xl mx-auto">
              <${{FadeIn}} delay=${{0}} y=${{40}}>
                <div className="text-center mb-16">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 px-4 py-1.5 rounded-full border border-[#B600A8]/30">
                    Frequently Asked Questions
                  </span>
                  <h2 className="hero-heading font-black uppercase text-3xl sm:text-5xl md:text-6xl mt-4">
                    Clear Answers Before We Talk
                  </h2>
                </div>
              <//>

              <div className="space-y-4">
                ${{faqs.map((faq, idx) => html`
                  <${{FadeIn}} key=${{idx}} delay=${{idx * 0.1}} y=${{20}}>
                    <div 
                      onClick=${{() => setOpenIdx(openIdx === idx ? -1 : idx)}}
                      className="bg-[#120826] border border-white/15 hover:border-[#B600A8] rounded-2xl p-6 cursor-pointer transition-all"
                    >
                      <div className="flex justify-between items-center gap-4">
                        <h3 className="font-bold text-base sm:text-lg text-white">${{faq.q}}</h3>
                        <span className="text-xl font-bold text-[#B600A8]">${{openIdx === idx ? '−' : '+'}}</span>
                      </div>
                      ${{openIdx === idx && html`
                        <p className="mt-4 text-[#D7E2EA]/80 font-light text-sm sm:text-base leading-relaxed pt-4 border-t border-white/10">
                          ${{faq.a}}
                        </p>
                      `}}
                    </div>
                  <//>
                `)}}
              </div>
            </div>
          </section>
        `;
      }}

      // --- CONTACT SECTION ---
      function ContactSection() {{
        return html`
          <footer id="contact" className="bg-[#0C0C0C] text-[#D7E2EA] pt-24 pb-12 px-6 md:px-10 border-t border-[#D7E2EA]/10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 px-4 py-1.5 rounded-full border border-[#B600A8]/30 mb-4 inline-block">
                  Let's Talk &bull; DSW
                </span>
                <h2 className="hero-heading font-black uppercase text-3xl sm:text-5xl md:text-6xl tracking-tight mb-2">
                  Ready to Build Your System?
                </h2>
                <p className="text-[#D7E2EA]/70 font-light text-sm sm:text-base max-w-lg">
                  Based in Multan, Pakistan &bull; Engineering high-conversion websites, mobile apps, automations, and ad systems worldwide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a 
                  href=${{personalInfo.socialLinks.linkedin}} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white px-6 py-3 rounded-full border border-[#D7E2EA]/30 hover:border-white transition-all"
                >
                  LinkedIn Profile \u2192
                </a>
                <${{PrimaryCTAButton}} label="Book a Free Strategy Call" onClick=${{() => window.location.href = `mailto:${{personalInfo.contactEmail}}?subject=Strategy Call Inquiry`}} />
              </div>
            </div>

            <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row justify-between items-center text-xs text-[#D7E2EA]/40 gap-4">
              <p>&copy; ${{new Date().getFullYear()}} ${{personalInfo.brand}} &bull; ${{personalInfo.name}}. All Rights Reserved.</p>
              <div className="flex gap-[#1.5rem] uppercase tracking-widest font-medium">
                <a href="#about" className="hover:text-[#D7E2EA]">About</a>
                <a href="#services" className="hover:text-[#D7E2EA]">Services</a>
                <a href="#process" className="hover:text-[#D7E2EA]">Process</a>
                <a href="#projects" className="hover:text-[#D7E2EA]">Work</a>
                <a href="#faq" className="hover:text-[#D7E2EA]">FAQs</a>
              </div>
            </div>
          </footer>
        `;
      }}

      function App() {{
        return html`
          <div className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans overflow-x-clip selection:bg-[#B600A8] selection:text-white">
            <${{HeroSection}} />
            <${{FloatingAirBadgesSection}} />
            <${{AboutSection}} />
            <${{ServicesSection}} />
            <${{ProcessSection}} />
            <${{ProjectsSection}} />
            <${{FAQSection}} />
            <${{ContactSection}} />
          </div>
        `;
      }}

      // --- MOUNT TO DOM ---
      const rootElement = document.getElementById('root');
      if (rootElement) {{
        if (ReactDOM.createRoot) {{
          ReactDOM.createRoot(rootElement).render(html`<${{App}} />`);
        }} else {{
          ReactDOM.render(html`<${{App}} />`, rootElement);
        }}
      }}
    }})();
  </script>
</body>
</html>
'''

with open(r"G:\3d-creator-portfolio\index.html", "w", encoding="utf-8") as f:
    f.write(new_html_content)

print("Successfully generated new DSW single-file index.html!")
