<script setup lang="ts">
    import { filters } from '../state';
    function isDateStringValid(dateString: string): boolean {
        const dateFormats = [
            /^\d{4}-\d{2}-\d{2}$/,    // Format: YYYY-MM-DD
            /^\d{2}-\d{2}-\d{4}$/,    // Format: DD-MM-YYYY
            /^\d{4}\/\d{2}\/\d{2}$/,  // Format: YYYY/MM/DD
            /^\d{2}\/\d{2}\/\d{4}$/   // Format: DD/MM/YYYY
        ];

        for (const format of dateFormats) {
            if (format.test(dateString)) {
                return true
            }
        }
        return false
    }
    //when the enter key or the lens icon are pressed the variable search, which contains
    //the text written by the user in the searchbar, will be pushed to the authors and title methods of 
    //the global variable filter, go in the 'state.ts' file to see how the filtering system works
    let search = ''
    function searchFilter() {
        if (search != '') {
            if(isDateStringValid(search)===true) {
                filters.date = search
            }
            else {
                filters.authors.push(search)
                filters.title = search
            }
            search = ''
        }
    }
</script>

<template>
    <div class="searchbar">
        <input v-model="search" 
        @keyup.enter="searchFilter"
        :ref="search" 
        type="text" placeholder="Inserisci titolo, autore o data" class="searchbar-input"/>
        <button @click="searchFilter" class="searchbar-button"><i class="fas fa-search searchbar-icon"></i></button>
    </div>
</template>

<style>
    .searchbar {
        display: flex;
        align-items: center;
        background-color: transparent;
        border: 1px solid #303030;
        border-radius: 15px;
        color: #3B3B3B;
        font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
        font-size: 16px;
        font-weight: 600;
        max-height: 60px;
        min-width: 0;
        transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
        touch-action: manipulation;
        will-change: transform;
    }

    .searchbar-input {
        border: none;
        outline: none;
        height: 100%;
        width: 85%;
        border-radius: 15px;
    }

    .searchbar-input:focus {
        border: none;
        outline: none;
    }

    .searchbar-icon {
        cursor: pointer;
        color: #e0e0e0;
    }

    .searchbar-button {
        background-color: #303030;
        border-radius: 8px;
        border: 1px solid #303030
    }

</style>