import { reactive, computed } from "vue";
import axios from 'axios'

interface Article {
    id: number,
    title: string
    text: object
    plaintext: string
    subtitle: string
    date: string
    tags: string[]
    authors: string[]
    img: string
}

interface Numero {
    id: number,
    name: string,
    url: string,
    img: string
}

interface Art {
    id: number,
    title: string,
    authors: string[],
    tags: string[],
    img: string
}

export let notReady = reactive({
    value: true,
})

//global reactive variable that saves all the selected filters
export let filters = reactive({
    title: "",
    authors: [""],
    tags: [""],
    date: "",
})

export let artFilters = reactive({
    title: "",
    authors: [""],
    tags: [""],
})

//global computed variable that saves all the articles
//that pass the filter check
export let filtered = computed(() => {
    return filterData(filters)
})

export let artFiltered = computed(() => {
    return filterArt(artFilters)
})

//global reactive variable that is true when there's at least
//one filter active, false otherwise and triggeres the filter buttons to appear
export const showFilters = reactive({
    showFilters: false,
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

export function filterArt(artFilters: {authors: string[], title: string, tags: string[]}) {
    let filtered = []
    let nope = 0

    const toUpper = function(x: string){ 
        return x.toUpperCase();
      };

    for(let i=0; i<zabarte.length; i++) {
        const upperAuthors = zabarte[i]['authors'].map(toUpper)

        if ((zabarte[i]['title'].toUpperCase()).includes(artFilters.title.toUpperCase()) && artFilters.title != '') {
            filtered.push(zabarte[i])
            continue
        }
        
        for(let j in artFilters['authors']) {
            if (!upperAuthors.includes(artFilters['authors'][j].toUpperCase()) && artFilters['authors'][j]!='') {
                nope = 1
                break
            }
        }

        for(let k in artFilters['tags']) {
            if (!zabarte[i]['tags'].includes(artFilters['tags'][k]) && artFilters['tags'][k]!='') {
                nope = 1
                break
            }
        }
        if(nope===0) {filtered.push(zabarte[i])}
        nope = 0
    }
    artFilters.title = ''
    return filtered
}

//api that connects to the backend
//backup backend: https://zabaappbackend-1-j2113551.deta.app/
export const api = axios.create({
    baseURL: "https://zabapp-bakcned.onrender.com/",
})

//init of the articoli object
export let dataJson = reactive([{
    id: -1,
    title: '',
    text: {},
    plaintext: '',
    subtitle: '',
    date: '',
    tags: [''],
    authors: [''],
    img: '',
}])

//init of the numeri object
export let archive = reactive([{
    id: -1,
    name: '',
    url: '',
    img: '',
}])

//init of the zabarte object
export let zabarte = reactive([{
    id: -1,
    title: '',
    authors: [''],
    tags: [''],
    img: '',
}])

//functions to update the variables containing the database's data
export async function updateArticleDatabase() {
    await api.get<Article[]>('articles').then(
        (res) => {
            dataJson = res.data
        },
        (error) => console.log(error)
    )
}

export async function updateArchiveDatabase() {
    await api.get<Numero[]>('archive').then(
        (res) => {
            archive = res.data
        },
        (error) => console.log(error)
    )
}

export async function updateArtDatabase() {
    await api.get<Art[]>('zabart').then(
        (res) => {
            zabarte = res.data
        },
        (error) => console.log(error)
    )
}