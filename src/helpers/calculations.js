import { personalitiesData } from "../services/ApiService";

export const calculatePersonality = (answers) => {
  const keywords = [];
  answers.map((answer, index) => {
    if (index <= 3) answer.keywords.map((keyword) => keywords.push(keyword));
  });

  const frequent = mostFrequentValue(keywords);

  const personalities = [];
  personalitiesData()
    .then((res) => personalities.push(res.data.data))
    .catch((err) => console.log(err));

  if (personalities.length) {
    let personality = {};

    personalities.map((item) => {
      if (item.keyword == frequent) {
        personality = item;
      }
    });

    return personality;
  }

  return false;
};

export const calculateFood = (answers) => {};
export const calculateAccommodation = (answers) => {};
export const calculateSociality = (answers) => {};
export const calculateStayDuration = (answers) => {};
export const calculatePreferredSeason = (answers) => {};
export const getFinalResults = (answers) => {};

const mostFrequentValue = (keywords) => {
  let count = {};
  for (let i = 0; i < keywords.length; i++) {
    let value = keywords[i];

    if (!count[value]) {
      count[value] = 1;
    } else {
      count[value]++;
    }
  }

  let mostFrequent;
  let max = 0;
  for (let key in count) {
    if (count[key] > max) {
      mostFrequent = key;
      max = count[key];
    }
  }

  return mostFrequent;
};
