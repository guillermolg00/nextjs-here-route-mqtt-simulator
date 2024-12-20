import mqtt from 'mqtt';
import { MqttConnectionParams } from './mqtt.dto';

export class MqttService {
  private client: mqtt.MqttClient | null = null;

  connect(params: MqttConnectionParams) {
    const { host, username, password, topic } = params

    if (!this.client) {
      this.client = mqtt.connect(host, {
        username: username,
        password: password,
      });

      this.client.on('connect', () => {
        console.log('Connected to MQTT broker');

        this.subscribe(topic, (topic, message) => {
          console.log(`Message received on ${topic}:`, message.toString());
        });
      });

      this.client.on('error', (error) => {
        console.error('MQTT Error:', error);
      });
    }
  }

  async validateConfig(params: MqttConnectionParams): Promise<boolean> {
    const { host, username, password } = params

    if (!host || typeof host !== 'string' || host.trim() === '') {
      console.error('Invalid host');
      return false;
    }

    if (!username || typeof username !== 'string' || username.trim() === '') {
      console.error('Invalid host');
      return false;
    }

    if (typeof password !== 'string') {
      console.error('Invalid password');
      return false;
    }

    try {
      const tempClient = mqtt.connect(host, {
        username: username,
        password: password
      });

      return await new Promise((resolve) => {
        tempClient.on('connect', () => {
          console.log('Validation successful: Connected to MQTT broker');
          tempClient.end();
          resolve(true);
        });

        tempClient.on('error', (error) => {
          console.error('Validation error:', error);
          tempClient.end();
          resolve(false);
        });
      });
    } catch (error) {
      console.error('Validation failed:', error);
      return false;
    }
  }

  publish(topic: string, message: string) {
    if (this.client) {
      this.client.publish(topic, message, (error) => {
        if (error) {
          console.error('Publish Error:', error);
        } else {
          console.log(`Message published to ${topic}`);
        }
      });
    } else {
      console.error('MQTT Client not connected');
    }
  }

  subscribe(topic: string, onMessage: (topic: string, message: Buffer) => void) {
    if (this.client) {
      this.client.subscribe(topic, (error) => {
        if (error) {
          console.error('Subscribe Error:', error);
        } else {
          console.log(`Subscribed to ${topic}`);
          this.client?.on('message', onMessage);
        }
      });
    } else {
      console.error('MQTT Client not connected');
    }
  }

  disconnect() {
    if (this.client) {
      this.client.end(() => {
        console.log('Disconnected from MQTT broker');
      });
    }
  }
}
