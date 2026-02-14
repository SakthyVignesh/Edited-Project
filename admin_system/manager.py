import json
import os
import shutil
import psutil
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
SOURCES_FILE = os.path.join(DATA_DIR, "sources.json")
VISUALS_FILE = os.path.join(DATA_DIR, "visual_settings.json")

class AdminManager:
    def __init__(self):
        self._ensure_files()

    def _ensure_files(self):
        if not os.path.exists(DATA_DIR):
            os.makedirs(DATA_DIR)
        
        if not os.path.exists(SOURCES_FILE):
            with open(SOURCES_FILE, "w") as f:
                json.dump({}, f)

        if not os.path.exists(VISUALS_FILE):
            with open(VISUALS_FILE, "w") as f:
                json.dump({"theme": "dark", "layout": "grid", "refresh_rate": 60}, f)

    def get_sources(self):
        with open(SOURCES_FILE, "r") as f:
            return json.load(f)

    def add_source(self, name, url):
        sources = self.get_sources()
        sources[name] = url
        with open(SOURCES_FILE, "w") as f:
            json.dump(sources, f, indent=4)
        return True

    def remove_source(self, name):
        sources = self.get_sources()
        if name in sources:
            del sources[name]
            with open(SOURCES_FILE, "w") as f:
                json.dump(sources, f, indent=4)
            return True
        return False

    def get_visual_settings(self):
        with open(VISUALS_FILE, "r") as f:
            return json.load(f)

    def update_visual_settings(self, settings):
        current = self.get_visual_settings()
        current.update(settings)
        with open(VISUALS_FILE, "w") as f:
            json.dump(current, f, indent=4)
        return current

    def get_system_status(self):
        # Basic system metrics
        disk = shutil.disk_usage(BASE_DIR)
        memory = psutil.virtual_memory()
        
        return {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "status": "Healthy",
            "disk_usage": {
                "total_gb": round(disk.total / (1024**3), 2),
                "free_gb": round(disk.free / (1024**3), 2),
                "percent": round((disk.used / disk.total) * 100, 1)
            },
            "memory_usage": {
                "percent": memory.percent,
                "available_gb": round(memory.available / (1024**3), 2)
            },
            "sources_count": len(self.get_sources())
        }
