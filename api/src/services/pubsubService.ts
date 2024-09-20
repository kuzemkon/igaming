import { PubSub } from '@google-cloud/pubsub';
import { singleton } from 'tsyringe';
import { config } from '../config';

@singleton()
export class PubSubService {
  private pubsub: PubSub;

  constructor() {
    this.pubsub = new PubSub({ projectId: config.gcp.projectId });
  }

  async publishMessage(topicName: string, message: object) {
    const dataBuffer = Buffer.from(JSON.stringify(message));
    await this.pubsub.topic(topicName).publish(dataBuffer);
  }
}
