// src/services/tavusService.js


// TavusService class for all Tavus API interactions via /api/tavus-proxy
export default class TavusService {
  constructor(config = {}) {
    this.apiKey = config.apiKey;
    this.replicaId = config.replicaId;
    this._onMessage = () => {};
    this._onError = () => {};
    this._onStatusChange = () => {};
    this.session = null;
  }

  onMessage(cb) { this._onMessage = cb; }
  onError(cb) { this._onError = cb; }
  onStatusChange(cb) { this._onStatusChange = cb; }

  async initializeSession(userId, userProfile) {
    // Simulate session creation (replace with real Tavus logic if needed)
    this.session = {
      id: `sess-${Date.now()}`,
      userId,
      userProfile,
      status: 'connected',
      metrics: { engagementScore: 100, interactionCount: 0 },
      videoUrl: null
    };
    this._onStatusChange('connected');
    return this.session;
  }

  async sendMessage(message) {
    // Simulate agent response
    setTimeout(() => {
      this._onMessage({
        id: `agent-${Date.now()}`,
        type: 'agent',
        content: "I'm Dr. Vita. Thank you for your message!",
        timestamp: new Date()
      });
    }, 800);
    this.session.metrics.interactionCount++;
    return true;
  }

  async triggerHook(hookId, payload) {
    // Call Tavus video generation via proxy
    try {
      const response = await fetch('/api/tavus-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: 'conversations/c016b8f2b26c4460/generate', // update as needed
          personaId: 'p96c15e104b0',
          hookId,
          ...payload
        })
      });
      const data = await response.json();
      if (data && data.videoUrl) {
        this.session.videoUrl = data.videoUrl;
        this._onStatusChange('video-ready');
      }
      return data;
    } catch (err) {
      this._onError(err);
      throw err;
    }
  }

  async endSession() {
    this.session = null;
    this._onStatusChange('ended');
  }
}
