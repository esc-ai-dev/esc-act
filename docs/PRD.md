# Product Requirements Document: Ambient Task-Capture Engine

**Author:** Manus AI
**Version:** 1.0
**Date:** September 28, 2025

## 1. Introduction

This document outlines the product requirements for the Ambient Task-Capture Engine, a system designed to automatically ingest, process, and extract tasks from a user's personal and professional communication channels. Inspired by the functionality of the original Hoop application, this product aims to serve as an intelligent layer on top of existing communication platforms (email, Slack, and WhatsApp), ensuring that no commitment or action item is ever missed. The system will act as a personal AI assistant, reducing the cognitive load of manual task management and providing a single, unified source of truth for all obligations.

This product is for the busy professional who operates across multiple communication streams and struggles with the fragmentation of information and the risk of tasks falling through the cracks. It solves the problem of information overload by creating an automated, intelligent, and centralized task management workflow.

## 2. Goals and Objectives

The primary goal of this product is to provide a reliable and seamless safety net for all personal and delegated tasks.

| Goal ID | Goal Description | Success Metrics |
| :--- | :--- | :--- |
| G1 | **Eliminate Missed Tasks** | - 95% of all explicit and implicit tasks are successfully captured from all connected sources.<br>- User reports of missed tasks are less than 1 per week. |
| G2 | **Reduce Manual Work** | - Reduce the time spent manually creating and organizing tasks by at least 80%.<br>- 90% of captured tasks should require no manual editing of the title or summary. |
| G3 | **Preserve Actionable Context** | - Every captured task must include a direct link to the source and a concise, AI-generated summary of the surrounding context.<br>- User satisfaction with the quality and usefulness of the context summary is at least 4/5. |
| G4 | **Provide a Unified View** | - Create a single, intuitive interface where tasks from all sources can be viewed, triaged, and managed. |

## 3. User Persona

**Name:** The Modern Professional

**Description:** A tech-savvy individual juggling multiple projects, roles, and responsibilities. They are highly communicative and rely on a mix of email for formal communication, Slack for team collaboration, and WhatsApp for more immediate or informal coordination. They value efficiency, automation, and tools that reduce mental clutter.

**Pain Points:**
*   Action items get lost in long email threads or fast-moving Slack channels.
*   Forgetting verbal or implicit commitments made in conversations.
*   Wasting time manually copying and pasting information into a separate to-do list.
*   Losing the "why" behind a task because the context is buried in the original source.

## 4. Features and Requirements

### 4.1. Data Ingestion

The system must securely connect to and ingest data from the user's communication accounts.

| ID | Requirement | Details |
| :--- | :--- | :--- |
| F1.1 | **Email Integration (Gmail)** | - The system must connect to a user's Gmail account via OAuth 2.0 for secure authentication.<br>- It must be able to read the content of new incoming emails in near real-time.<br>- It should process the full email body, subject, sender, and timestamp. |
| F1.2 | **Slack Integration** | - The system must connect to a user's Slack workspace via the Slack API (OAuth 2.0).<br>- The user must be able to select which public channels, private channels, and direct messages the system should monitor.<br>- It must process message content, sender, channel, and timestamp. |
| F1.3 | **WhatsApp Integration** | - The system will integrate with the `2chat.io` API to access WhatsApp messages.<br>- It must be able to ingest messages from both individual and group chats associated with the connected phone number.<br>- It must process message content, sender, group/contact name, and timestamp. |
| F1.4 | **Data Security** | - All API keys and authentication tokens must be stored encrypted at rest.<br>- All data transmission between the system and external APIs must use TLS encryption. |

### 4.2. AI Core: Task Extraction

The core of the system is an LLM-based pipeline that processes ingested text to identify and structure tasks.

| ID | Requirement | Details |
| :--- | :--- | :--- |
| F2.1 | **LLM Processing** | - The system will use a state-of-the-art Large Language Model (e.g., OpenAI GPT series, Anthropic Claude series) for analysis.<br>- A detailed system prompt will be engineered to instruct the model to act as an expert assistant, identifying tasks, assignees, deadlines, and context. |
| F2.2 | **Structured Output** | - The LLM must return its findings in a structured JSON format. The schema must include fields for: `task_title`, `assignee`, `deadline`, `context_summary`, `source_platform`, and `source_link`. |
| F2.3 | **Implicit & Explicit Task Identification** | - The model must be able to identify both explicit commands ("Can you do X?") and implicit commitments ("I'll look into that tomorrow"). |
| F2.4 | **Context Summarization** | - The `context_summary` field should be a concise, one-to-two-sentence explanation of the conversation surrounding the task to provide immediate understanding. |

### 4.3. User Interface (UI) and Task Management

A simple, web-based interface will be provided for managing captured tasks.

| ID | Requirement | Details |
| :--- | :--- | :--- |
| F3.1 | **Task Triage Board** | - The UI will feature a Kanban-style board with the following columns: `Incoming` (for newly captured, unreviewed tasks), `To Do` (confirmed tasks), `In Progress`, and `Done`. |
| F3.2 | **Task Cards** | - Each task will be represented by a card displaying the task title, source icon (Gmail, Slack, WhatsApp), and deadline.<br>- Clicking a card will open a detailed view containing the full context summary, assignee, and a direct link to the source message/thread. |
| F3.3 | **Manual Actions** | - Users must be able to manually edit all fields of a task.<br>- Users must be able to delete a task.<br>- Users can drag and drop tasks between columns. |

## 5. Out of Scope (Version 1.0)

To ensure a focused and achievable initial release, the following features will not be included in version 1.0:

*   **Automatic Task Completion:** The system will not automatically detect when a task is finished.
*   **Third-Party Task Manager Integration:** There will be no native integration to sync tasks with external tools like Todoist, Asana, etc.
*   **Advanced Analytics:** No reporting or dashboards on task volume, completion rates, etc.
*   **Native Mobile/Desktop App:** The product will be a web application only.
*   **Calendar Integration:** The system will not create calendar events for tasks with deadlines.

## 6. Assumptions and Dependencies

*   The user has access to and is willing to provide API keys for a high-capability LLM provider (OpenAI or Anthropic).
*   The user is willing to grant the necessary permissions (via OAuth) for the system to read data from their Gmail and Slack accounts.
*   A reliable and commercially available WhatsApp API (such as `2chat.io`) is feasible for integration and meets the project's real-time needs.
*   The project will be developed on macOS, and the implementation plan will be tailored for this environment.
