let date = new Date();
const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.querySelector('.year-month').innerText = `${viewYear}년 ${viewMonth + 1}월`;

    const prevLast = new Date(viewYear, viewMonth, 0);  // 0은 일,시,분,초,밀리초를 모두 0으로 초기화
    const thisLast = new Date(viewYear, viewMonth+1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1); //0~31까지의 수를 1개씩 넣은 배열에서 1부터 시작하는 새로운 배열 = 1~31
    //slice(1,3) => 1~3까지 잘라서 새로운 배열 반환
    /*  ...의 의미
    let array = [3, 4, 5]
    let newArray = [...array];  
    newArray는 [3,4,5]가 된다.  
    */
    const nextDates = [];

    //이전 달 마지막 날짜가 토요일이 아니라면 배열에 31부터 낮아지면서 앞에 추가
    if (PLDay !== 6){
        for(let i = 0; i < PLDay + 1; i++){
            prevDates.unshift(PLDate - i);  //새로운 요소를 배열 맨 앞에 추가
        }
    }
    //한 줄 중에서 빈 칸 수만큼 다음 달 날짜로 채우기
    for (let i = 1; i < 7 - TLDay; i++){
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);   //concat : 둘 이상의 배열을 합쳐서 새로운 배열 생성
    const firstDateIndex = dates.indexOf(1);        //이번 달의 첫째 날 
    const lastDateIndex = dates.lastIndexOf(TLDate);    //이번 달의 마지막 날

    // 화살표 함수 
    // ()안의 값은 매개변수 => {} 는 함수 실행
    dates.forEach((date, i)=>{
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
                            ? 'this'    // ?는 if의 반환  이번 달이면 class에 this
                            : 'other';  //  :은 else의 반환  다른 달이면 class에 other
        dates[i] = `<div class="date"><span class=${condition}>${date}</span></div>`; 
    });
    document.querySelector('.dates').innerHTML = dates.join(''); //dates배열을 하나의 문자열로 만듬 -> html화

    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()){
                date.classList.add('today');
                break;
            }
        }
    }
};

renderCalendar();   //처음에 한번 현재 달 렌더링

/* 이후에 클릭 이벤트 발생 시 해당 달에 대해 렌더링 */
const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
};

const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar()
};

const goToday = () => {
    date = new Date();
    renderCalendar();
};