/* 
import "@fortawesome/fontawesome-free/css/all.min.css";
import JDTable from 'vue-jd-table';

export default
{
name : 'MyApp',

// JD-TABLE REQUIRED - COMPONENT REGISTRATION
components:
{
JDTable
},

// JD-TABLE REQUIRED - OPTIONS/PROPS
data ()
{
return {
    tableOptions        : { // ADD OPTIONS HERE },
    eventFromApp        : { name : null, data : null },
    eventFromAppTrigger : false,
    tableLoader         : false,
    columns             : [ // ADD COLUMNS HERE ]
}
}
}
</script>

<style lang="scss">
// JD-TABLE OPTIONAL - VARIABLE OVERRIDE

// JD-TABLE REQUIRED - THEME
@import "~vue-jd-table/dist/assets/jd-table.scss";
</style>
`<template>
<div id="app">
    <!-- JD-TABLE REQUIRED - TEMPLATE -->
    <JDTable
        :option                 = "tableOptions"
        :loader                 = "tableLoader"
        :event-from-app         = "eventFromApp"
        :event-from-app-trigger = "eventFromAppTrigger"
        @event-from-jd-table    = "processEventFromApp( $event )"
    />

    <!-- JD-TABLE REQUIRED - EXCEL EXPORT -->
    <iframe id="excelExportArea" style="display:none"></iframe>
</div>
</template>` */