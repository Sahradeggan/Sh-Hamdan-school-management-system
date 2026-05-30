document.addEventListener("DOMContentLoaded", () => {

function getCount(key){
    return JSON.parse(localStorage.getItem(key))?.length || 0;
}

const stats = [
    getCount("students"),
    getCount("teachers"),
    getCount("classes"),
    getCount("attendance"),
    getCount("results"),
    getCount("fees")
];

const labels = [
    "Students",
    "Teachers",
    "Classes",
    "Attendance",
    "Results",
    "Fees"
];

const colors = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4"
];


// BAR CHART
new Chart(document.getElementById("barChart"), {

    type:"bar",

    data:{
        labels:labels,
        datasets:[{
            data:stats,
            backgroundColor:colors,
            borderRadius:8
        }]
    },

    options:{
        responsive:true,
        maintainAspectRatio:false,
        animation:false,
        plugins:{
            legend:{ display:false }
        }
    }

});


// PIE CHART
new Chart(document.getElementById("pieChart"), {

    type:"pie",

    data:{
        labels:labels,
        datasets:[{
            data:stats,
            backgroundColor:colors
        }]
    },

    options:{
        responsive:true,
        maintainAspectRatio:false,
        animation:false
    }

});

});