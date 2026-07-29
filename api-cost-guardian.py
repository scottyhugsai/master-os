#!/usr/bin/env python3
"""
API Cost Guardian
Monitors Claude API spending and auto-switches to free models when limit is hit.
Flags all non-Claude work for later re-audit with Claude.
"""

import json
import os
from datetime import datetime
from pathlib import Path

OBSIDIAN_VAULT = Path.home() / "Desktop/Obsidian"
NON_CLAUDE_LOG = OBSIDIAN_VAULT / "NON_CLAUDE_REVISIONS.md"
CLAUDE_BUDGET = 4  # dollars remaining
ALERT_THRESHOLD = 1.0  # Alert when $1 left

class APIGateway:
    def __init__(self):
        self.vault = OBSIDIAN_VAULT
        self.vault.mkdir(parents=True, exist_ok=True)
        
        # Ensure log file exists
        if not NON_CLAUDE_LOG.exists():
            NON_CLAUDE_LOG.write_text(
                "# Non-Claude Model Revisions\n\n"
                "Tracks all work done with free models when Claude API budget exceeded.\n"
                "These will be re-audited and re-done with Claude once credits replenish.\n\n"
                "---\n\n"
            )
    
    def check_claude_budget(self):
        """Check if we're under budget"""
        return CLAUDE_BUDGET > ALERT_THRESHOLD
    
    def flag_non_claude_work(self, task: str, model_used: str, reasoning: str, output_path: str = ""):
        """Log non-Claude work for later re-audit"""
        
        timestamp = datetime.now().isoformat()
        entry = f"""
## [{timestamp}] — {model_used.upper()}

**Task:** {task}

**Model Used:** {model_used} (free tier — Claude API budget exceeded)

**Reasoning:** {reasoning}

**Output Location:** {output_path or 'See inline'}

**Status:** ⏳ Pending re-audit with Claude when credits replenish

**Action Required:** When API credits replenish, review this work and re-execute with Claude if needed.

---

"""
        with open(NON_CLAUDE_LOG, "a") as f:
            f.write(entry)
        
        print(f"🚨 NON-CLAUDE WORK FLAGGED: {task}")
        print(f"   Model: {model_used}")
        print(f"   Log: {NON_CLAUDE_LOG}")
        return str(NON_CLAUDE_LOG)
    
    def get_fallback_model(self):
        """Get appropriate free model when Claude is maxed out"""
        # Try in order: Groq Mistral (free), Llama 3.1 405B (local/groq), Claude again (with warning)
        available_models = {
            "mistral-7b-instruct": "Groq Mistral (free tier, 30/min limit)",
            "llama-3.1-405b": "Groq Llama 3.1 405B (free tier)",
            "claude-haiku": "Claude Haiku (lower cost fallback)"
        }
        return "mistral-7b-instruct", available_models["mistral-7b-instruct"]
    
    def should_use_fallback(self, operation: str = "") -> tuple:
        """
        Determine if we should use fallback model.
        Returns: (use_fallback: bool, model: str, reason: str)
        """
        
        if not self.check_claude_budget():
            fallback_model, description = self.get_fallback_model()
            reason = f"Claude API budget ({CLAUDE_BUDGET}$) exceeded. Switching to {description}"
            print(f"⚠️  {reason}")
            return True, fallback_model, reason
        
        return False, "claude-haiku-4-5-20251001", "Using Claude (budget available)"

# CLI for agents to check before making API calls
if __name__ == "__main__":
    gateway = APIGateway()
    use_fallback, model, reason = gateway.should_use_fallback()
    
    print(f"\n📊 API COST STATUS:")
    print(f"   Budget remaining: ${CLAUDE_BUDGET}")
    print(f"   Use fallback: {use_fallback}")
    print(f"   Model: {model}")
    print(f"   Reason: {reason}\n")
    
    if use_fallback:
        print("💡 Non-Claude work will be flagged for re-audit when credits replenish.")
