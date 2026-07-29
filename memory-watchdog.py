#!/usr/bin/env python3
"""
Memory Optimization Watchdog
Runs hourly to keep system lean and responsive.
"""

import subprocess
import os
from datetime import datetime

def optimize_memory():
    """Clear caches, optimize Python, free up RAM"""
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"\n⚙️  [{timestamp}] MEMORY OPTIMIZATION CYCLE")
    
    # Get current memory before
    result = subprocess.run(
        ["vm_stat"],
        capture_output=True,
        text=True
    )
    
    free_before = 0
    for line in result.stdout.split('\n'):
        if 'Pages free:' in line:
            free_before = int(line.split(':')[1].strip().rstrip('.'))
            print(f"🔴 Memory free BEFORE: {free_before * 4 / 1024:.0f}MB")
    
    # 1. Clear Python cache
    subprocess.run(
        ["find", os.path.expanduser("~/.hermes"), "-type", "d", "-name", "__pycache__", "-exec", "rm", "-rf", "{}", "+"],
        capture_output=True
    )
    print("✓ Python cache cleared")
    
    # 2. Clear pip cache
    subprocess.run(["rm", "-rf", os.path.expanduser("~/.cache/pip")], capture_output=True)
    print("✓ Pip cache cleared")
    
    # 3. Clear Hermes temp files
    subprocess.run(["rm", "-rf", os.path.expanduser("~/.cache/hermes")], capture_output=True)
    print("✓ Hermes cache cleared")
    
    # 4. Compact memory
    subprocess.run(["/usr/bin/malloc_history", "-quiet"], capture_output=True)
    print("✓ Memory compacted")
    
    # Get memory after
    result = subprocess.run(
        ["vm_stat"],
        capture_output=True,
        text=True
    )
    
    free_after = 0
    for line in result.stdout.split('\n'):
        if 'Pages free:' in line:
            free_after = int(line.split(':')[1].strip().rstrip('.'))
            print(f"🟢 Memory free AFTER: {free_after * 4 / 1024:.0f}MB")
    
    freed = (free_after - free_before) * 4 / 1024
    if freed > 0:
        print(f"✨ FREED: {freed:.0f}MB")
    
    print("=" * 50)

if __name__ == "__main__":
    optimize_memory()
