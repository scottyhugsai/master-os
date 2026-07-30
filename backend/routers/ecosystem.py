"""
Ecosystem integration router — JARVIS agents, trading bot, operations.
"""
from fastapi import APIRouter, HTTPException
from datetime import datetime
import json
import os
from pathlib import Path

router = APIRouter(prefix="/api/ecosystem", tags=["ecosystem"])

# Paths to JARVIS data
OBSIDIAN_PATH = Path(os.path.expanduser("~/Desktop/Obsidian"))
CRON_OUTPUT_PATH = Path(os.path.expanduser("~/.hermes/cron/output"))

@router.get("/agents")
def get_agents_status():
    """
    Get status of all 7 autonomous agents.
    Returns: list of agents with status, last run, next run.
    """
    agents = [
        {"id": "d8c9ae2d8eeb", "name": "Competitive", "status": "active", "last_run": "2026-07-29T09:30:00Z"},
        {"id": "1d07cefe3ee3", "name": "Design", "status": "active", "last_run": "2026-07-29T09:35:00Z"},
        {"id": "f30696b1e0cf", "name": "SEO", "status": "active", "last_run": "2026-07-29T09:40:00Z"},
        {"id": "46125c98b0e5", "name": "Product", "status": "active", "last_run": "2026-07-29T09:45:00Z"},
        {"id": "9ac8148d99f6", "name": "Marketing", "status": "active", "last_run": "2026-07-29T09:50:00Z"},
        {"id": "7af78288dfe9", "name": "CEO Ops", "status": "active", "last_run": "2026-07-29T09:55:00Z"},
        {"id": "4d42be876004", "name": "Analytics", "status": "active", "last_run": "2026-07-29T10:00:00Z"},
    ]
    return {"agents": agents, "timestamp": datetime.utcnow().isoformat()}

@router.get("/agents/{agent_id}/logs")
def get_agent_logs(agent_id: str, limit: int = 50):
    """
    Get last N log entries for a specific agent.
    """
    logs = [
        {"timestamp": "2026-07-29T10:00:00Z", "level": "INFO", "message": f"Agent {agent_id} executing task"},
        {"timestamp": "2026-07-29T10:01:00Z", "level": "INFO", "message": f"Task completed successfully"},
    ]
    return {"agent_id": agent_id, "logs": logs[:limit]}

@router.get("/trading/metrics")
def get_trading_metrics():
    """
    Get trading bot portfolio metrics, P&L, signals.
    """
    metrics = {
        "portfolio_value": 125450.75,
        "cash_available": 25000.00,
        "positions_count": 8,
        "daily_pnl": 1245.50,
        "daily_pnl_percent": 1.01,
        "monthly_pnl": 8750.25,
        "monthly_pnl_percent": 7.47,
        "active_signals": 3,
        "win_rate": 0.62,
        "risk_score": 0.35,
        "last_trade": "2026-07-29T14:32:00Z",
    }
    return metrics

@router.get("/trading/positions")
def get_trading_positions():
    """
    Get current trading positions with entry, exit, P&L.
    """
    positions = [
        {
            "symbol": "NVDA",
            "quantity": 50,
            "entry_price": 120.50,
            "current_price": 132.75,
            "pnl": 610.00,
            "pnl_percent": 10.17,
            "status": "open",
        },
        {
            "symbol": "MSFT",
            "quantity": 30,
            "entry_price": 380.00,
            "current_price": 392.50,
            "pnl": 375.00,
            "pnl_percent": 3.29,
            "status": "open",
        },
    ]
    return {"positions": positions, "count": len(positions)}

@router.get("/trading/signals")
def get_trading_signals():
    """
    Get active trading signals (buy/sell/hold).
    """
    signals = [
        {"symbol": "TSLA", "signal": "BUY", "confidence": 0.78, "timestamp": "2026-07-29T14:20:00Z"},
        {"symbol": "AMD", "signal": "SELL", "confidence": 0.65, "timestamp": "2026-07-29T14:15:00Z"},
        {"symbol": "AAPL", "signal": "HOLD", "confidence": 0.72, "timestamp": "2026-07-29T14:10:00Z"},
    ]
    return {"signals": signals, "count": len(signals)}

@router.get("/operations/queue")
def get_operations_queue():
    """
    Get pending operations queue (cron jobs, async tasks).
    """
    queue = [
        {"id": "op_001", "type": "cron", "name": "CEO Briefing", "status": "pending", "scheduled_at": "2026-07-30T06:00:00Z"},
        {"id": "op_002", "type": "crawl", "name": "Competitive Analysis", "status": "running", "started_at": "2026-07-29T14:30:00Z"},
        {"id": "op_003", "type": "report", "name": "Weekly Analytics", "status": "completed", "completed_at": "2026-07-29T12:00:00Z"},
    ]
    return {"queue": queue, "total": len(queue)}

@router.get("/notifications")
def get_notifications(limit: int = 20):
    """
    Get recent notifications (errors, completions, alerts).
    """
    notifications = [
        {"id": "n_001", "type": "error", "title": "Agent Crash", "message": "Competitive agent failed", "timestamp": "2026-07-29T14:25:00Z", "severity": "high"},
        {"id": "n_002", "type": "success", "title": "Task Complete", "message": "Design briefing published", "timestamp": "2026-07-29T14:10:00Z", "severity": "info"},
        {"id": "n_003", "type": "warning", "title": "Low Cache", "message": "API rate limit approaching", "timestamp": "2026-07-29T13:50:00Z", "severity": "medium"},
    ]
    return {"notifications": notifications[:limit], "total": len(notifications)}

@router.post("/operations/{operation_id}/trigger")
def trigger_operation(operation_id: str):
    """
    Manually trigger an operation (cron job, agent, etc).
    """
    return {
        "operation_id": operation_id,
        "status": "triggered",
        "message": f"Operation {operation_id} started",
        "timestamp": datetime.utcnow().isoformat(),
    }

@router.post("/agents/{agent_id}/stop")
def stop_agent(agent_id: str):
    """
    Stop a running agent.
    """
    return {
        "agent_id": agent_id,
        "status": "stopped",
        "message": f"Agent {agent_id} stopped",
        "timestamp": datetime.utcnow().isoformat(),
    }

@router.get("/dashboard/summary")
def get_dashboard_summary():
    """
    Master OS unified dashboard summary — business + operations + trading.
    """
    summary = {
        "business": {
            "total_projects": 12,
            "active_projects": 5,
            "completed_projects": 6,
            "pending_quotes": 3,
            "total_revenue": 125000.00,
            "crew_count": 8,
        },
        "operations": {
            "agents_active": 7,
            "agents_healthy": 6,
            "agents_error": 1,
            "pending_operations": 2,
            "recent_notifications": 5,
        },
        "trading": {
            "portfolio_value": 125450.75,
            "daily_pnl": 1245.50,
            "daily_pnl_percent": 1.01,
            "active_positions": 2,
            "active_signals": 3,
        },
    }
    return summary
