# Cribr — YouTube Transcript Extraction

Cribr is a web application that allows users to quickly generate transcripts from YouTube videos.


---

## Features

- Extract transcripts from any YouTube video URL  
- Postgre DB and Auth powered by Supabase and Google Identity Services  
- Transcript generation using DumplingAI and youtube-transcript.io APIs  
- Hosted and deployed on Vercel  

---

## Tech Stack

| Technology                               Purpose                            |
|----------------------------------------|-------------------------------------
| **Next.js (React)**                    |                              |   
| **Supabase**                           | Authentication & Postgres database |
| **Google Identity Services (GIS)**     | User auth integration              |
| **DumplingAI & youtube-transcript.io** | Transcript generation APIs         |
| **Vercel**                             | Hosting and deployment             |

---

## Getting Started

### Prerequisites

- Node.js (v16 or later)  
- npm
- Supabase project with API keys  
- Google Cloud project for Identity Services
- DumplingAI and youtube-transcript.io API keys  

### Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/darlingtonogbuefi/cribr.git
   cd cribr
