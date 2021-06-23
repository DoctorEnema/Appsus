export default {
    props: ['note'],
    template: `
        <section>
            <div>
                {{note.info.title}}
                <iframe :src="note.info.url"></iframe>
                
            </div>
        </section>
    `,
    computed: {

    }
}