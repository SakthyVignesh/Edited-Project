from flask import Flask, jsonify, request
from manager import AdminManager
import os
import threading
import time

# Initialize Flask App
app = Flask(__name__)
admin = AdminManager()

# --- SECURITY ---
ACCESS_KEY = "miraculous"

@app.before_request
def check_auth():
    # Allow simple health check or root without auth if needed, but let's be strict for APIs
    if request.path.startswith('/api/'):
        key = request.headers.get('x-admin-key')
        print(f"DEBUG: Request to {request.path} | Received Key: '{key}' | Expected: '{ACCESS_KEY}'")
        if key != ACCESS_KEY:
            return jsonify({"error": "Unauthorized"}), 401

@app.route('/api/status', methods=['GET'])
def get_status():
    """System Health Check"""
    return jsonify(admin.get_system_status())

@app.route('/api/sources', methods=['GET'])
def get_sources():
    """List all news sources"""
    return jsonify(admin.get_sources())

@app.route('/api/sources', methods=['POST'])
def add_source():
    """Add a new news source"""
    data = request.json
    name = data.get('name')
    url = data.get('url')
    
    if not name or not url:
        return jsonify({"error": "Name and URL required"}), 400
        
    admin.add_source(name, url)
    return jsonify({"message": f"Source {name} added"}), 201

@app.route('/api/sources/<name>', methods=['DELETE'])
def delete_source(name):
    """Remove a news source"""
    if admin.remove_source(name):
        return jsonify({"message": f"Source {name} removed"}), 200
    return jsonify({"error": "Source not found"}), 404

@app.route('/api/visuals', methods=['GET'])
def get_visuals():
    """Get visual settings"""
    return jsonify(admin.get_visual_settings())

@app.route('/api/visuals', methods=['POST'])
def update_visuals():
    """Update visual settings (theme, layout, etc.)"""
    data = request.json
    new_settings = admin.update_visual_settings(data)
    return jsonify(new_settings), 200

if __name__ == '__main__':
    print("Starting Admin Server on port 5000...")
    print("End points available:")
    print(" - GET/POST /api/sources")
    print(" - GET/POST /api/visuals")
    print(" - GET      /api/status")
    app.run(port=5000, debug=True)
