import { reactive, computed } from "vue";
import axios from 'axios'

interface Article {
    title: string
    text: object
    plaintext: string
    subtitle: string
    date: string
    tags: string[]
    authors: string[]
    img: string
}

//global reactive variable that saves all the selected filters
export let filters = reactive({
    title: "",
    authors: [""],
    tags: [""],
    date: "",
})

//global computed variable that saves all the articles
//that pass the filter check
export let filtered = computed(() => {
    return filterData(filters)
})

//global reactive variable that saves all the info about the article to display
export const articleDetails = reactive({
    title: "",
    subtitle: "",
    text: {},
    date: "",
    tags: {},
    authors: {},
    img:"",
})

//global reactive variable that is true when there's at least
//one filter active, false otherwise and triggeres the filter buttons to appear
export const showFilters = reactive({
    showFilters: false,
})

//global reactive variable that saves all the info about the pdf (numero) to display
export const showPdf = reactive({
    url: '',
    name: ''
})

//function that filters the data from the database based on the filters
//it is used to keep updated the filtered global variable and, consequently, the Articoli view
export function filterData(filters: {title: string, authors: string[], tags: string[], date: string,}) {
    let filtered = []
    let nope = 0

    const toUpper = function(x: string){ 
        return x.toUpperCase();
      };

    for(let i=0; i<dataJson.length; i++) {
        const upperAuthors = dataJson[i]['authors'].map(toUpper)

        if ((dataJson[i]['title'].toUpperCase()).includes(filters.title.toUpperCase()) && filters.title != '') {
            filtered.push(dataJson[i])
            continue
        }
        
        for(let j in filters['authors']) {
            if (!upperAuthors.includes(filters['authors'][j].toUpperCase()) && filters['authors'][j]!='') {
                nope = 1
                break
            }
        }
        for(let k in filters['tags']) {
            if (!dataJson[i]['tags'].includes(filters['tags'][k]) && filters['tags'][k]!='') {
                nope = 1
                break
            }
        }
        if(dataJson[i]['date'] != filters['date'] && filters['date']!='') {
            nope=1
            break
        }
        if(nope===0) {filtered.push(dataJson[i])}
        nope = 0
    }
    filters.title = ''
    return filtered
}
  
//api that connects to the backend
export const api = axios.create({
    baseURL: 'https://zabaappbackend-1-j2113551.deta.app/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

//setup of the articoli object from the backend, it is necessary for the filtered object
export let dataJson = reactive([{
    title: '',
    text: {},
    plaintext: '',
    subtitle: '',
    date: '',
    tags: [''],
    authors: [''],
    img: '',
}])

await api.get<Article[]>('articles').then(
    (res) => {
        dataJson = res.data
    },
    (error) => console.log(error)
)