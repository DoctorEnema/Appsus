// import { eventBus } from '../../../site-services/event-bus.js'
import { emailService } from '../services/email-service.js'
import { utilService } from '../../services/util-service.js'
import {eventBus} from '../../services/event-bus-service.js'

export default {
    props: ['replayEmail', 'note'],
    name: 'email-compose',
    template: `
        <section class="compose-email">
            <div class="compose-header">
                <h3>New Email</h3>
                <button class="close-composed"  @click.prevent="composeClosed"></button>
            </div>
            <div class="email-form">
            <form @submit.prevent="emailSubmitted">
                <div class="email-people">
                    <input v-model="to" placeholder="to:">
                    <input v-model="subject" placeholder="subject:">
                </div>
                <div>
                    <textarea v-model="body" placeholder="your email here..."></textarea>
                </div>
                <div class="compose-bottom">
                    <button class="email-submit-btn" type="submit" >Send</button>
                    <div class="head-writing"></div>
                </div>
            </form>
            </div>
        </section>`,
    data() {
        return {
            to: '',
            subject: '',
            body: '',
        }
    },
    methods: {
        setData() {
            if (this.replayEmail) {
                this.subject = `re: ${this.replayEmail.subject}`
                this.to = `${this.replayEmail.from}`
            }
            else if (this.note) this.body = this.note
        },
        emailSubmitted() {
            let newEmail = {
                folder: 'sent',
                subject: this.subject,
                from: 'me',
                to: this.to,
                body: this.body,
                isRead: false,
                sentAt: Date.now(),
                id: utilService.makeId()
            };
            emailService.save(newEmail)
                .then(() => {
                    this.$emit('emailSaved');
                    emailService.query()
                        .then(emails => {
                            this.emails = emails
                            eventBus.$emit('show-msg', { type: 'success', txt:'Email Sent!' })
                        });
                })
        },
        composeClosed() {
            this.$emit('composeClosed');
        },
    },
    created() {
        this.setData();
    }
}