<script setup lang="ts">
    import { filters, articleDetails } from '../state'

    //info of the article object
    const props = defineProps<{
        title:string,
        subtitle: string,
        text: string,
        date: string,
        tags: object,
        authors: object,
        img: string
    }>()

    //the text of the article displayed will be no longer than 600 characters
    //the following code will search for the '.' nearest to the 600 chars limit and add '[...]'
    let slicedText:string
    if (props.text.length > 400 ) {
        let last = 0
        for(let i=0; i<props.text.length; i++) {
            if (props.text[i] === ".") {
                last = i
            }
            if (last > 400) {break}
        }
        slicedText = props.text.slice(0, last+1) + ' [...]'
    }
    else{
        slicedText = props.text
    }

    //if the user clicks on an author's name, the date or a tag, the global variable filters will be updated with the right filters
    //the router will manage the routing to the /articoli view with the filters on
    function addFilters(data:string, button:string) {
        if (button === 'authors') {
            filters.authors.push(data)
        } else if (button === 'tags') {
            filters.tags.push(data)
        } else if (button === 'date') {
            filters.date = data
        }
    }

    //if the user clicks on the image, the title or "LEGGI", this function will pass to the global variable
    //articleDetails the info needed to display the selected article, the router will manage the routing to the /articolo view
    function passArticle(title:string, subtitle:string, text:string, date:string, tags:object, authors:object, img:string){
        articleDetails.title = title
        articleDetails.subtitle = subtitle
        articleDetails.text = text
        articleDetails.date = date
        articleDetails.tags = tags
        articleDetails.authors = authors
        articleDetails.img = img
    }

</script>

<template>
    <div class="article-card">
        <router-link to="/articolo">
            <img class="button article-card-image" :src="img"
            @click="passArticle(title, subtitle, text, date, tags, authors, img)"/>
        </router-link>
        <div class="article-card-title-container">
            <router-link to="/articolo" class="router-link">
                <p class="button article-card-title title-font"
                @click="passArticle(title, subtitle, text, date, tags, authors, img)">{{ title }}</p>
            </router-link>
        </div>
        <div class="article-card-info">
            <div class="article-card-tags">
                <router-link to="/articoli" v-for="tag in tags" class="router-link">
                    <p class="button article-card-tag text-font" 
                    @click="addFilters(tag, 'tags')">
                        {{ tag }}
                    </p>
                </router-link>
            </div>
            <router-link to="/articoli" class="router-link">
                <p class="button article-card-date text-font"
                @click="addFilters(date, 'date')"
                >{{ date }}</p>
            </router-link>
        </div>
        <div class="article-card-authors">
            <router-link to="/articoli" v-for="author in authors" class="router-link">
                    <p class="button article-card-author text-font" 
                    @click="addFilters(author, 'authors')">
                        {{ author }}
                    </p>
                </router-link>
        </div>
        <p class="article-card-text text-font">{{ slicedText }}</p>
        <router-link to="/articolo" class="router-link">
            <p class="button article-card-button text-font"
            @click="passArticle(title, subtitle, text, date, tags, authors, img)">LEGGI</p>
        </router-link>
    </div>
</template>

<style>
    .article-card {
        width: 430px;
        max-height: 900px;
        margin-bottom: 20px;
    }

    .article-card-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
        display: block;
    }

    .article-card-title-container {
        display: flex;
        flex-wrap: wrap;
        text-align:center; 
        height:10%;
        align-items: center;
    }

    .article-card-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: #333;
        text-align: center;
    }


    .article-card-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .article-card-tags {
        display: flex;
        gap: 5px;
    }

    .article-card-authors {
        display: flex;
        gap: 5px;
    }

    .article-card-date {
        margin: 0;
    }
</style>