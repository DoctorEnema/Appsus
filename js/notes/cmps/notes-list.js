import notePreview from "./note-preview.js"

export default {
    props: ['notes'],
    components: {
        notePreview
    },
    template: `
        <section>
            <ul>
                <li v-for="note in notes">
                    <note-preview :note="note" />
                </li>
            </ul>
        </section>
    `,
}