// Résumé content shared by the portfolio and its AI assistant.
export const CHAPTERS = [
  {
    "id": "education",
    "content": {
      "headline": "Vellore Institute of Technology, Vellore",
      "subhead": "B.Tech, Information Technology",
      "dateRange": "2021 – 2025",
      "stat": {
        "label": "CGPA",
        "value": "8.48 / 10"
      },
      "bullets": [
        "Bachelor of Technology in Information Technology.",
        "Focus across application development, databases, and applied machine learning."
      ],
      "tags": [
        "Information Technology",
        "Vellore, India"
      ]
    }
  },
  {
    "id": "experience",
    "content": {
      "headline": "Firstsource Solutions Limited",
      "subhead": "Software Engineer — GenAI (Remote)",
      "dateRange": "Jul 2025 – Present",
      "floors": [
        {
          "title": "Intelligent document automation",
          "body": "Built and deployed a GenAI-powered system for Deed, Mortgage and Tax processing — end-to-end pipelines for ingestion, prompt-engineered extraction, structured JSON transformation and enterprise integration."
        },
        {
          "title": "Resware integration",
          "body": "Integrated REST-API workflows with Resware, removing manual processing and cutting package handling time to ~4.5 minutes at 100% extraction accuracy."
        },
        {
          "title": "Guardrails & schema enforcement",
          "body": "Implemented Pydantic validation with automated retry/correction and a custom HuggingFace transformer validation layer for semantic verification, hallucination detection and confidence scoring — over 40% fewer structured-extraction failures."
        },
        {
          "title": "Enterprise AI guardrails framework",
          "body": "Built a framework with 10+ content validators (jailbreak, prompt injection, PII, toxicity, bias) across Azure, AWS and GCP safety services, with primary/fallback model design and cross-cloud cost estimation."
        },
        {
          "title": "RAG over 100k+ documents",
          "body": "Engineered a retrieval pipeline for automated form testing and validation — chunking, vector indexing and retrieval workflows for scalable document search."
        },
        {
          "title": "Distributed batch inference on Azure Batch",
          "body": "Architected an event-driven system (Azure Functions coordinator, Service Bus triggered) submitting tasks to an autoscaling pool, with deterministic idempotent task IDs guaranteeing exactly-once processing under at-least-once delivery."
        },
        {
          "title": "Multi-LLM load balancing",
          "body": "Designed per-task endpoint assignment and token-bucket TPM throttling across multiple Azure OpenAI endpoints — eliminated 429 rate-limit failures and sustained high-throughput concurrent inference."
        },
        {
          "title": "Python automation tooling",
          "body": "Developed Playwright + n8n tools for end-to-end form workflows — Excel ingestion, automated form filling across authenticated sessions, structured output generation."
        }
      ],
      "tags": [
        "GenAI",
        "Azure",
        "AWS",
        "GCP",
        "RAG",
        "Guardrails",
        "Python"
      ]
    }
  },
  {
    "id": "travel-buddy",
    "project": true,
    "content": {
      "headline": "Travel Buddy",
      "subhead": "AI-first travel companion with a multi-modal extraction pipeline",
      "stack": [
        "Python",
        "FastAPI",
        "Gemini 2.5 Flash",
        "SQLite",
        "yt-dlp",
        "Docker"
      ],
      "bullets": [
        "4-stage multi-modal extraction pipeline (yt-dlp metadata → Gemini video → Gemini audio → Open Graph fallback) with graceful degradation at every tier — turns Instagram reels, YouTube shorts and Maps links into structured travel notes.",
        "Gemini 2.5 Flash via REST API using native vision, audio and video in a single call, with responseSchema-enforced JSON and zero post-processing; hardened subprocess orchestration with timeouts, fallbacks and stderr diagnostics.",
        "Backend as RESTful services across 9 route modules over FastAPI/SQLite with idempotent, backward-compatible schema migrations; real-time GPS auto-visit detector and smart-routing endpoint (Haversine + nearest-neighbour + 2-opt heuristic); containerised with Docker and deployed to cloud."
      ],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/RonnieArnab",
          "note": "repo link — swap for the exact URL"
        }
      ]
    }
  },
  {
    "id": "resume-editor",
    "project": true,
    "content": {
      "headline": "AI Resume Editor",
      "subhead": "Agentic résumé-tailoring system with a LaTeX-native edit pipeline",
      "stack": [
        "Python",
        "FastAPI",
        "OpenAI function calling",
        "LaTeX",
        "tectonic"
      ],
      "bullets": [
        "OpenAI function-calling agent loop (up to 8 tool-call steps) with 7 tools spanning section retrieval, LaTeX validation and staged-edit proposals for both single-section and multi-section editing modes.",
        "Server-side re-validation gate: every agent-proposed edit is independently tested for LaTeX correctness and structural integrity before it reaches the user — including a custom guard against the model silently dropping section headings.",
        "Sandboxed LaTeX compilation pipeline (tectonic subprocess, timeout-bound, network-restricted) with a fast pre-compile syntax validator that catches most errors in milliseconds instead of a multi-second recompile."
      ],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/RonnieArnab",
          "note": "repo link — swap for the exact URL"
        }
      ]
    }
  },
  {
    "id": "skills",
    "content": {
      "headline": "Engineering toolkit",
      "subhead": "Languages, frameworks and platforms",
      "groups": [
        {
          "label": "Programming Languages",
          "items": [
            "Python",
            "Java",
            "JavaScript",
            "SQL"
          ]
        },
        {
          "label": "Application Development",
          "items": [
            "FastAPI",
            "Node.js",
            "Express.js",
            "REST APIs",
            "React",
            "Application design",
            "Debugging"
          ]
        },
        {
          "label": "Databases",
          "items": [
            "MongoDB",
            "MySQL",
            "SQLite",
            "AWS RDS"
          ]
        },
        {
          "label": "GenAI & Automation",
          "items": [
            "LLM integration",
            "Agentic AI",
            "RAG",
            "Prompt engineering",
            "HuggingFace Transformers",
            "Guardrails",
            "Playwright",
            "n8n"
          ]
        },
        {
          "label": "Tools & Platforms",
          "items": [
            "Docker",
            "Azure (Batch, Functions, OpenAI, Service Bus)",
            "AWS",
            "Git",
            "Linux",
            "Postman"
          ]
        }
      ]
    }
  }
];
