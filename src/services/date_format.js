export function dateAndDay(date) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const str_date = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
    const day_date = "(" + String(days[date.getDay()]) + ")";
    return str_date + " " + day_date
}

export function isLastNDays(n, date) {
    const threeDaysInMs = n * 24 * 60 * 60 * 1000; // 3일
    const threeDaysAgo = new Date(Date.now() - threeDaysInMs);
    return date.getTime() >= threeDaysAgo.getTime();
}

export function dataAndDayAndTime(date) {
    const str_date = dateAndDay(date);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${str_date} ${hours}:${minutes}`;
}

export function generateCalendar() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // 1월~12월 표기 위해 +1
    const firstDate = new Date(currentYear, currentMonth - 1, 1);
    const lastDate = new Date(currentYear, currentMonth, 0).getDate();

    const startDay = firstDate.getDay();

    const calendar = [];
    let week = [];

    for (let i = 0; i < startDay; i++) {
        week.push(null);
    }
    for (let day = 1; day <= lastDate; day++) {
        week.push(day);
        if (week.length === 7) {
            calendar.push(week);
            week = [];
        }
    }

    if (week.length > 0) {
        while (week.length < 7) {
            week.push(null);
        }
        calendar.push(week);
    }

    return calendar;
}

export function getRelativeTime(date) {
    const start = new Date(date)
    const now = new Date(); // 현재 시간
    const diff = (now - start) / 1000;

    const times = [
        { name: '년', seconds: 60 * 60 * 24 * 365 },
        { name: '달', seconds: 60 * 60 * 24 * 30 },
        { name: '일', seconds: 60 * 60 * 24 },
        { name: '시간', seconds: 60 * 60 },
        { name: '분', seconds: 60 },
    ];

    if (diff < 60) return '방금 전';
    for (const value of times) {
        const betweenTime = Math.floor(diff / value.seconds);

        if (betweenTime > 0) {
            return `${betweenTime}${value.name} 전`;
        }
    }

    return '방금 전';
}