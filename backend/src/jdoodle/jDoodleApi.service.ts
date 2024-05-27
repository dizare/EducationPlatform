// jdoodle.service.ts
import fetch from 'node-fetch';

export class JdoodleService {
  async executeCode(script: string, language: string, versionIndex: string, clientId: string, clientSecret: string) {
    try {
      const response = await fetch('https://api.jdoodle.com/v1/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script,
          language,
          versionIndex,
          clientId,
          clientSecret
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error executing code:', error);
      throw error;
    }
  }
}
