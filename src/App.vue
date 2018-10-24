<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Accueil</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/Domaines">Domaines</router-link> | 
            <router-link to="/Evolution">Evolution</router-link>
        </div>
        <router-view />
    </div>
</template>

