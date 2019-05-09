Vue.component('dialcontent', {
    props: ['icon', 'tooltip'],
    template: `
        <md-button class="md-icon-button">
            <md-icon>{{icon}}</md-icon>
            <md-tooltip md-direction="right">{{tooltip}}</md-tooltip>
        </md-button>
    `
})