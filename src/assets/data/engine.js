import { reactive } from "vue";
import axios from "axios";
import course from './data'

const engine = reactive({
    initialize(){
        console.log('Engine Initialized')
        axios.get('https://665c19f33e4ac90a04d8a940.mockapi.io/api/v1/course')
        .then( response => {
            console.log(response.data)
            course.chapters = response.data
            this.player.init()
        })
        .catch(error => {
            console.error("Data Fetching error:", error)
        })
        this.player.currentEpisode = course.intro
    }, 
    player: {
        episodes: [],
        currentEpisode: {},
        init(){
            course.chapters.forEach(c => {
                c.episodes.forEach(e => {
                    this.episodes.push(e)
                })
            })
        },
        play(episode){
            this.currentEpisode = episode
        },
        playNext(){
            let nextIndex = 0;
            const currentEpisodeUuid = this.currentEpisode.uuid
            if(currentEpisodeUuid){
                nextIndex = this.episodes.findIndex(e => e.uuid == currentEpisodeUuid) + 1
            }
            if(this.episodes[nextIndex]){
                const nextEpisode = this.episodes[nextIndex]
                this.play(nextEpisode)
            }
        },
        playPrev(){
            let nextIndex = 0;
            const currentEpisodeUuid = this.currentEpisode.uuid
            if(currentEpisodeUuid){
                nextIndex = this.episodes.findIndex(e => e.uuid == currentEpisodeUuid) - 1
            }
            if(this.episodes[nextIndex]){
                const nextEpisode = this.episodes[nextIndex]
                this.play(nextEpisode)
            }
        }
    }
})
export default engine