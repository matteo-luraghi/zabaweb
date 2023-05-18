<script setup lang="ts">
    import { articleDetails } from '../state';
    //the global variable articleDetails contains all the info to display a single article
    //it gets updated by the Cards component
</script>

<template>
    <div class="articolo-header" :style="{'background-image': `url(${articleDetails.img})`}">
        <h1 class="articolo-title text-center title-font"
        >{{ articleDetails.title }}</h1>
    </div>

    <div class="articolo">
        <h3 class="articolo-subtitle text-font">{{ articleDetails.subtitle }}</h3>
        <h3 v-for="author in articleDetails.authors" class="articolo-authors">{{ author }}</h3>
        <p class="articolo-date text-font"> {{ articleDetails.date }}</p>
        <p class="articolo-text text-font"> {{ articleDetails.text }}</p>
    </div>
</template>

<style>

    .articolo-header {
        display: flex;
        position: relative;
        width: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        justify-content: center;
        opacity: 0.8;
    }

    .articolo {
        display: flex;
        flex-direction: column;
        padding: 80px 60px;
    }

    .articolo-title {
        font-size: 50px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.6);
        padding: 20px;
        max-width: 800px;
    }

    .articolo-text {
        white-space: pre-wrap;
        font-size: 16px;
        letter-spacing: 1px;
    }
</style>