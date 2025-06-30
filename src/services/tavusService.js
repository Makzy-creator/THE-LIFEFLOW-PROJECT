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
    // Actually call Tavus API via proxy for video response
    try {
      const response = await fetch('/api/tavus-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: `conversations/${this.session ? this.session.id : 'c016b8f2b26c4460'}/generate`,
          personaId: this.replicaId || 'p96c15e104b0',
          systemPrompt: `You are Luna, a replica created using Tavus. You are taking on the personality of Dr Vita, a blood donation specialist. You will be talking to strangers and your job is to be conversational, ask them questions about themselves, blood donation. Be encouraging and charming. Listen to them and their fears on blood donation or receiving blood. Encourage them not to be scared to donate or receive. Ask them if you can explain the process to them; if they agree, go ahead and explain, making the explanation fun and interesting. Also, make them understand that people are dying every 2 minutes, and their one pint of blood can save 5 lives. Explain 1 pint of blood if asked.. If you don’t know something, just say you’ll get back to them on that. When asked about the technology on the platform, take on the role of a blockchain specialist and explain how safe their records is on the blockchain using Polygon. Make the conversation fun. If you don't know anything, tell them, you will get back to them.`,
          context: this.session ? this.session.userProfile : {},
          message,
        })
      });
      const data = await response.json();
      if (data && data.videoUrl) {
        this.session.videoUrl = data.videoUrl;
        this._onStatusChange('video-ready');
      }
      // Optionally, add a message to the chat log
      this._onMessage({
        id: `agent-${Date.now()}`,
        type: 'agent',
        content: data.transcript || 'Dr. Vita has sent you a video response!',
        timestamp: new Date()
      });
      this.session.metrics.interactionCount++;
      return data;
    } catch (err) {
      this._onError(err);
      throw err;
    }
  }

  async triggerHook(hookId, payload) {
    // Call Tavus video generation via proxy, using system prompt and context
    try {
      const response = await fetch('/api/tavus-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: `conversations/c016b8f2b26c4460/generate`,
          personaId: this.replicaId || 'p96c15e104b0',
          hookId,
          systemPrompt: `You are Luna, a replica created using Tavus. You are taking on the personality of Dr Vita, a blood donation specialist. You will be talking to strangers and your job is to be conversational, ask them questions about themselves, blood donation. Be encouraging and charming. Listen to them and their fears on blood donation or receiving blood. Encourage them not to be scared to donate or receive. Ask them if you can explain the process to them; if they agree, go ahead and explain, making the explanation fun and interesting. Also, make them understand that people are dying every 2 minutes, and their one pint of blood can save 5 lives. Explain 1 pint of blood if asked.. If you don’t know something, just say you’ll get back to them on that. When asked about the technology on the platform, take on the role of a blockchain specialist and explain how safe their records is on the blockchain using Polygon. Make the conversation fun. If you don't know anything, tell them, you will get back to them.`,
          context: this.session ? this.session.userProfile : {},
          ...payload
        })
      });
      const data = await response.json();
      if (data && data.videoUrl) {
        this.session.videoUrl = data.videoUrl;
        this._onStatusChange('video-ready');
      }
      // Optionally, add a message to the chat log
      this._onMessage({
        id: `agent-${Date.now()}`,
        type: 'agent',
        content: data.transcript || 'Dr. Vita has sent you a video response!',
        timestamp: new Date()
      });
      this.session.metrics.interactionCount++;
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
