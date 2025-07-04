# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ShowChef is an AI-powered recipe discovery app that transforms leftover ingredients into personalized meal solutions using voice and visual interfaces. The app is designed to solve the "5:30pm dinner dilemma" for busy families by allowing users to show their ingredients to the camera and speak about what they have to receive immediate recipe suggestions.

## Core Architecture

This project is in early development phase and will be built as a mobile-first application focusing on:

### Primary Technology Stack
- **Mobile Platform**: React Native (Android-first, then iOS)
- **Computer Vision**: Cloud-hybrid processing with MobileNetV2/EfficientNet-Lite for edge processing
- **Voice Processing**: Cloud-based speech-to-text with kitchen vocabulary optimization
- **Backend**: RESTful services with WebSocket support for real-time interactions
- **Partnerships**: Instacart Developer Platform API integration for grocery delivery

### Key Features (MVP)
1. **Visual Ingredient Recognition**: Real-time camera-based ingredient identification with 85% accuracy target
2. **Voice Interaction System**: Hands-free operation optimized for kitchen environments
3. **Intelligent Recipe Matching**: Multi-factor scoring with partial ingredient matching (80-90% scenarios)
4. **Persistent Ingredient Inventory**: Cross-session ingredient tracking with pantry management
5. **Grocery Integration**: Automatic shopping list generation with Instacart integration

## Development Commands

**Start Development Server:**
- `npm start` - Start Expo development server
- `npm run dev` - Start with dev client
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator (macOS required)
- `npm run web` - Run in web browser

**Build Commands:**
- `npm run build:android` - Build Android APK
- `npm run build:ios` - Build iOS app

**Code Quality:**
- `npm run lint` - TypeScript error checking
- `npm run typecheck` - Type checking without emitting

## Performance Requirements

- **Recognition Speed**: <2 seconds for basic ingredient identification
- **Voice Response**: <1 second for common commands  
- **App Launch**: <3 seconds to camera-ready state
- **Accuracy Targets**: 85% ingredient recognition, 90% voice command accuracy

## Target User Profile

Primary persona: "Sarah the Practical Mom" - 34-year-old suburban mother dealing with weeknight dinner decisions around 5:30pm with limited time and random leftover ingredients. All features should pass the "Does this solve Sarah's 5:30pm dinner dilemma?" test.

## Business Context

- **Revenue Model**: Affiliate commissions (70%) + Premium subscriptions (25%) + Data insights (5%)
- **Launch Strategy**: Android-first targeting North American suburban families
- **Success Metrics**: 10,000 downloads in first month, 75% recipe success rate, 40% 30-day retention

## Privacy & Security Requirements

- Process images locally when possible
- 30-day maximum voice data retention
- User-controlled image deletion
- GDPR compliance required