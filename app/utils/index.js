
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

export const days = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
]

export const isDay = (str) => {
  return days.includes(str) === true;
}

export const validateGigObject = async (obj) => {
  let hasError = false;
  let postBody = {};
  let error = null;

  // 1. should always be there
  const territory = obj.dbToPostTo ? obj.dbToPostTo : 'gigs';
  const id = obj.id;
  const name = obj.name ? obj.name : null;
  const venue = obj.venue ? obj.venue : null;
  const blurb = obj.blurb ? obj.blurb : null;
  const nights = obj.nights ? obj.nights : null;
  const img = obj.img ? obj.img : null;
  const nearestTubes = obj.nearestTubes ? obj.nearestTubes : null;
  const postcode = obj.postcode ? obj.postcode : null;

  // strings that need to change to booleans
  const bringer = obj.bringer && obj.bringer === 'Yes' ? true : false;
  const walkins = obj.walkins && obj.walkins === 'Yes' ? true : false;
  const prebook = obj.prebook && obj.prebook === 'Yes' ? true : false;

  // 2. these are mostly optional but should be validated
  const walkinSignUp = obj.walkinSignUp ? obj.walkinSignUp : null;
  const attended = obj.attended ? obj.attended : [];
  const comments = obj.comments ? obj.comments : [];
  let lat = obj.lat ? obj.lat : null;
  let lng = obj.lng ? obj.lng : null;
  const facebook = obj.facebook ? obj.facebook : null;
  const twitterHandle = obj.twitterHandle ? obj.twitterHandle : null; // with or without the '@'
  const youtube = obj.youtube ? obj.youtube : null; // with or without the '@'
  const website = obj.website ? obj.website : null;

  const howToBook = obj.howToBook ? obj.howToBook : null; // link to their how to book page
  const prebookSignUp = obj.prebookSignUp ? obj.prebookSignUp : null; // link to their specific signup page, <input /> or google sheets etc.
  const imgs = obj.imgs ? obj.imgs : []; // alternative images in case main one dies

  const expectedEssentialKeys = [
    'id',
    'name',
    'venue',
    'blurb',
    'nights',
    'img',
    'nearestTubes',
    'postcode',
    'bringer',
    'walkins'
  ];

  expectedEssentialKeys.map((each) => {
    if (!obj[each] && obj[each] !== 0) {
      hasError = true;
      error = {
        msg: 'Essential Key/Value Missing',
        val: each
      }
      return console.log('Missing Essential Information: ', each);
    }
  });

  if ((!lat || !lng) && postcode) {
    let postcodeWithoutSpaces = postcode.replace(/\s/g, '');
    let res = await fetch(`https://api.postcodes.io/postcodes/${postcodeWithoutSpaces}`);
    let json = await res.json();
    let { latitude, longitude } = json.result;
    lng = longitude;
    lat = latitude;
  }

  postBody = {
      territory,
      id,
      name,
      venue,
      blurb,
      nights,
      bringer,
      img,
      nearestTubes,
      attended,
      comments,
      postcode,
      lat,
      lng,
      facebook,
      twitterHandle,
      youtube,
      website,
      prebook,
      howToBook,
      prebookSignUp,
      imgs,
      walkinSignUp,
      walkins,
  }


  if (hasError) {
    return error;
  }


  setTimeout(() => {
    console.log('Waiting Half a Second Before POST...');
  }, 500);

  return postBody;
}
