# Dockerfile

# syntax=docker/dockerfile:1.4

# --- Stage 1: Install dependencies ---
FROM node:20-alpine AS deps
WORKDIR /app

# Copy only package files first for better caching
COPY package.json package-lock.json ./
RUN npm ci --omit=dev


# --- Stage 2: Build the app ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the app source
COPY . .

# -------------------------------------------------------
# Copy build-time environment variables
# (.env.production contains NEXT_PUBLIC_* only)
# -------------------------------------------------------
COPY .env.production .env.local

# Build the Next.js app with real public environment variables
RUN npm run build

# Remove development dependencies
RUN npm prune --production


# --- Stage 3: Production runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy the built Next.js standalone output & assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose app port
EXPOSE 3000

# -------------------------------------------------------
# 👇 Runtime secrets will come from EKS Secret (envFrom)
#    e.g. STRIPE_SECRET_KEY, SUPABASE_SERVICE_KEY, etc.
# -------------------------------------------------------

CMD ["node", "server.js"]
