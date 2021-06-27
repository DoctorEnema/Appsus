
import { emailService } from '../services/email-service.js';
import { eventBus } from '../../services/event-bus-service.js'
export default {
    template: `
    <section v-if="email" class="email-details">
        <div class="email-actions">
            <router-link title="Back" class="back" :to="'./'"></router-link>   
            <button title="Reply" class="reply" @click="setReplayEmail(email)"></button>
            <button title="Save as Note" class="save-as-note" @click="saveAsNote(email.body)"></button>  
            <button title="Delete Email" class="remove" @click="emailEreased(email.id)"></button>
        </div>
        <div class="email-details-info">
            <h2>{{email.subject}}</h2>
            <p>From: {{email.from}}</p>
            <p>To: {{email.to}}</p>
        </div>
        <p class="email-details-body">{{email.body}}</p>

    </section>`,
    data() {
        return {
            email: null
        }
    },
    methods: {
        loadEmail() {
            const id = this.$route.params.emailId
            emailService.getById(id)
                .then(email => {
                    this.email = email
                });
        },
        setReplayEmail(email) {
            this.$emit('replayEmailSet', email);
        },
        saveAsNote(emailTxt) {
            this.$router.push(`/keep?email=${emailTxt}`);
        },
        emailEreased(id) {
            eventBus.$emit('emailEreased', id)
            eventBus.$emit('show-msg', { type: 'success', txt:'Erased!' })
        }
    },
    created() {
        this.loadEmail();
    }
}