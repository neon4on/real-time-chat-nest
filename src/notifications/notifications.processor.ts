import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notifications')
export class NotificationsProcessor {
  @Process('send')
  async handleSendNotification(job: Job<any>) {
    const { user, message } = job.data;
    
    console.log(`Отправка уведомления пользователю ${user}: ${message}`);
  }
}
