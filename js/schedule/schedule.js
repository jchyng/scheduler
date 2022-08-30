const dates = document.querySelectorAll('.date');
const schedule = document.querySelector('.schedule');
const exitBtn = document.querySelector('.exit-btn');

function showSchedule(){
    schedule.classList.toggle('hide');
};

dates.forEach(date =>{
    date.addEventListener('click',showSchedule);
});
exitBtn.addEventListener('click',showSchedule);