
export const whatDayIsIt = () => {
    const date = new Date();
    const day = date.getDay();

    switch(day) {
        case 0:
            return 'Sun';
            break;
        case 1:
            return 'Mon';
            break;
        case 2:
            return 'Tue';
            break;
        case 3:
            return 'Wed';
            break;
        case 4:
            return 'Thu';
            break;
        case 5:
            return 'Fri';
            break;
        case 6:
            return 'Sat';
            break;
    }
}

export const trimString = str => {
    if (str.length > 540) {
        return str.slice(0, 41040) + '...';
    }
    return str;
}

export const trimStringSpecifically = (str, length) => {
    if (str.length > length) {
        return str.slice(0, length) + '...';
    }
    return str;
}

export const tooSoon = () => {
    const lastTimeVoted = localStorage.getItem('timevoted');
    const timeNow = Date.now();
    const differenceBetween = timeNow - parseInt(lastTimeVoted);
    if (differenceBetween <= 9999) {
        return true;
    } else {
        return false;
    }
}

export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
